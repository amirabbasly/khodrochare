import { test, expect, type Page } from "@playwright/test";
import { newBlogGuides } from "../../src/content/blog-new-guides";
import { localServiceGuides } from "../../src/content/service-knowledge";

const errors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const list: string[] = []; errors.set(page, list);
  page.on("pageerror", (error) => list.push(error.message));
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
  await page.route(/google-analytics\.com|googletagmanager\.com/, (route) => route.abort());
});
test.afterEach(async ({ page }) => { expect(errors.get(page) ?? []).toEqual([]); });

const pages = ["/tools", "/tools/transport-selector", "/tools/breakdown-guide", "/tools/obd-code", ...newBlogGuides.map((post) => `/blog/${post.slug}`), ...Object.keys(localServiceGuides), "/services/flat-tire", "/services/mobile-diagnostics"];
for (const path of pages) test(`content growth renders with the existing RTL layout: ${path}`, async ({ page }) => {
  const response = await page.goto(path); expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1); await expect(page.locator("h1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("footer a[href='https://ble.ir/join/G627cQxSZD']")).toBeAttached();
  if (path.startsWith("/tools/")) await expect(page.locator("#tool")).toBeVisible();
  if (path.startsWith("/blog/")) {
    await expect(page.getByRole("navigation", { name: "فهرست مطالب مقاله" })).toBeVisible();
    await expect(page.getByRole("region", { name: "منابع و حدود راهنما" })).toBeAttached();
  }
});

async function fillTransport(page: Page) {
  for (const [name, value] of Object.entries({ power: "combustion", gearbox: "manual", drive: "front", wheels: "rolling", clearance: "standard", access: "open", manualAllows: "yes" })) await page.locator(`#tool-${name}`).selectOption(value);
}

test("transport choices reset stale advice, recognize garage/locked wheels and handle clipboard denial", async ({ page }) => {
  await page.goto("/tools/transport-selector"); await fillTransport(page);
  await page.getByRole("button", { name: "بررسی اطلاعات حمل خودرو" }).click();
  const result = page.getByTestId("tool-result");
  await expect(result).toContainText("چرخ‌گیر فقط پس از تأیید");
  await page.locator("#tool-gearbox").selectOption("automatic"); await expect(result).toHaveCount(0);
  await page.locator("#tool-wheels").selectOption("locked"); await page.locator("#tool-access").selectOption("garage");
  await page.getByRole("button", { name: "بررسی اطلاعات حمل خودرو" }).click();
  await expect(result).toContainText("اول بررسی دسترسی و خروج"); await expect(result).toContainText("اسکیت");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new DOMException("Denied in test", "NotAllowedError"); } } }));
  await result.getByRole("button", { name: "کپی خلاصه با انتخاب شما" }).click();
  await expect(result).toContainText("کپی خودکار در دسترس نیست");
});

test("an emergency answer is shown immediately without waiting for the remaining form", async ({ page }) => {
  await page.goto("/tools/breakdown-guide");
  await page.locator("#tool-emergency").selectOption("yes");
  const result = page.getByTestId("tool-result");
  await expect(result).toContainText("خدمات اضطراری عمومی مقدم");
  await expect(result.locator("a")).toHaveCount(0);
  await expect(page.locator("#tool-symptom")).toHaveValue("");
  await page.locator("#tool-emergency").selectOption("no"); await expect(result).toHaveCount(0);
});

test("symptom guidance gives priority to unsafe locations and resets after edits", async ({ page }) => {
  await page.goto("/tools/breakdown-guide");
  await page.locator("#tool-emergency").selectOption("no");
  await page.locator("#tool-location").selectOption("traffic");
  await page.locator("#tool-symptom").selectOption("flat-tire");
  await page.getByRole("button", { name: "نمایش مسیر بررسی" }).click();
  await expect(page.getByTestId("tool-result")).toContainText("اول وضعیت خطر و محل توقف");
  await page.locator("#tool-location").selectOption("safe"); await expect(page.getByTestId("tool-result")).toHaveCount(0);
  await page.getByRole("button", { name: "نمایش مسیر بررسی" }).click();
  await expect(page.getByTestId("tool-result")).toContainText("بررسی تایر، زاپاس");
  await expect(page.getByTestId("tool-result").getByRole("link", { name: /پنچرگیری و تعویض/ })).toHaveAttribute("href", "/services/flat-tire");
});

test("OBD results accept Persian digits, reject bad inputs and never send or log their values", async ({ page }) => {
  const posts: string[] = []; page.on("request", (request) => { if (request.method() === "POST") posts.push(request.url()); });
  await page.goto("/tools/obd-code");
  await page.locator("#obd-code").fill("p۰۴۲۰");
  await page.getByRole("button", { name: "نمایش معنی کد" }).click();
  await expect(page.getByTestId("tool-result")).toContainText("P0420");
  await expect(page.getByTestId("tool-result")).toContainText("تعویض فوری");
  const events = await page.evaluate(() => (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer ?? []);
  const toolEvents = events.filter((event) => event.event === "tool_used"); expect(toolEvents).toHaveLength(1);
  expect(Object.keys(toolEvents[0]).sort()).toEqual(["event", "page_path", "tool_id"]);
  expect(JSON.stringify(events)).not.toMatch(/P0420|p۰۴۲۰/);
  expect(new URL(page.url()).search).toBe(""); expect(posts).toEqual([]);
  await page.locator("#obd-code").fill("U0100"); await expect(page.getByTestId("tool-result")).toHaveCount(0);
  await page.getByRole("button", { name: "نمایش معنی کد" }).click();
  await expect(page.getByTestId("tool-result")).toContainText("در فهرست محدود ابزار نیست");
  await page.locator("#obd-code").fill("P9999"); await page.getByRole("button", { name: "نمایش معنی کد" }).click();
  await expect(page.getByTestId("obd-lookup").getByRole("alert")).toContainText("کد پنج‌حرفی");
});

test("quote comparison supports Persian amounts, ties and errors without inventing a tariff", async ({ page }) => {
  await page.goto("/pricing");
  const comparison = page.locator("#compare-quotes");
  const values = { "a-quoted": "۱۰۰٬۰۰۰", "a-extras": "۳۰۰۰۰", "a-discount": "۱۰۰۰۰", "b-quoted": "۱۱۰۰۰۰", "b-extras": "۵۰۰۰", "b-discount": "۰" };
  for (const [key, value] of Object.entries(values)) await page.locator(`#${key}`).fill(value);
  await comparison.locator("input[name='same-scope']").check();
  await comparison.getByRole("button", { name: "مقایسه جمع دو برآورد" }).click();
  await expect(page.getByTestId("quote-difference")).toContainText("برآورد ب");
  await expect(page.getByTestId("quote-difference")).toContainText("۵٬۰۰۰ تومان");
  await page.locator("#b-extras").fill("۱۰۰۰۰"); await expect(page.getByTestId("quote-difference")).toHaveCount(0);
  await comparison.getByRole("button", { name: "مقایسه جمع دو برآورد" }).click();
  await expect(page.getByTestId("quote-difference")).toContainText("برابر است");
  await page.locator("#a-quoted").fill("1,5"); await comparison.getByRole("button", { name: "مقایسه جمع دو برآورد" }).click();
  await expect(comparison.getByRole("alert")).toBeVisible(); await expect(page.getByTestId("quote-difference")).toHaveCount(0);
});

test("without JavaScript, guides remain readable and tool forms cannot submit URL parameters", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, serviceWorkers: "block" });
  const page = await context.newPage();
  try {
    for (const [path, selector] of [["/tools/transport-selector", "[data-testid='transport-selector'] form"], ["/tools/breakdown-guide", "[data-testid='breakdown-guide'] form"], ["/tools/obd-code", "[data-testid='obd-lookup'] form"], ["/pricing", "#calculator form, #compare-quotes form"]]) {
      await page.goto(`${baseURL}${path}`);
      await expect(page.locator("h1")).toBeVisible();
      for (const control of await page.locator(selector).locator("input, select, button[type='submit']").all()) await expect(control).toBeDisabled();
      expect(new URL(page.url()).search).toBe("");
    }
  } finally { await context.close(); }
});

test("new tools and guides are reachable by client navigation from the primary pillar", async ({ page }) => {
  await page.goto("/امداد-خودرو");
  await page.locator("main a[href='/tools']").first().click(); await expect(page).toHaveURL(/\/tools$/);
  await page.locator("main a[href='/tools/transport-selector']").first().click(); await expect(page).toHaveURL(/\/tools\/transport-selector$/);
  await page.locator("main a[href='/blog/flatbed-handover-checklist']").first().click(); await expect(page).toHaveURL(/\/blog\/flatbed-handover-checklist$/);
  await expect(page.locator("h1")).toContainText("تحویل خودرو");
  await page.getByRole("navigation", { name: "فهرست مطالب مقاله" }).getByRole("link").first().click();
  await expect(page.locator("#section-1")).toBeInViewport();
});

test("tool controls and long result text stay inside narrow and tablet viewports", async ({ page }) => {
  await page.goto("/tools/transport-selector"); await fillTransport(page);
  await page.locator("#tool-access").selectOption("garage"); await page.getByRole("button", { name: "بررسی اطلاعات حمل خودرو" }).click();
  for (const width of [320, 390, 768, 1366]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    for (const item of await page.locator("#tool select, #tool [data-testid='tool-result']").all()) {
      const box = (await item.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0); expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
    }
  }
});
