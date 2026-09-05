import { test, expect, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const templates = ["/app", "/coverage", "/تهران/شمال-تهران", "/", "/تهران", "/رشت", "/مازندران", "/شمال", "/تهران/سعادت-آباد", "/کرج/گوهردشت", "/رشت/یدک-کش", "/brands/toyota", "/roads/chalus", "/امداد-خودرو", "/امداد-خودرو-آنلاین", "/pricing"];
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("khodrochare:welcome-dismissed-at", String(Date.now())));
  await page.route(/google-analytics\.com|googletagmanager\.com/, (route) => route.abort());
});
for (const path of templates) test(`render without overflow or hydration errors: ${path}`, async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(path); expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1); await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("footer a[href='https://ble.ir/join/G627cQxSZD']")).toBeAttached();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  await page.evaluate(() => document.fonts.ready);
  expect(errors).toEqual([]);
  if (path === "/" || path === "/شمال") { await mkdir("coverage/browser/screenshots", { recursive: true }); await page.screenshot({ path: `coverage/browser/screenshots/${info.project.name}-${path === "/" ? "home" : "north"}.png` }); }
});
async function fillRequest(page: Page, online = false) {
  await page.locator("#request-service").selectOption("tow-truck");
  await page.locator("#request-region").selectOption("گیلان");
  await page.locator("#request-vehicle").fill("خودروی تست اتوماتیک");
  await page.locator("#request-location").fill("نشانی آزمایشی؛ درخواست واقعی نیست");
  if (online) { await page.locator("#request-phone").fill("۰۹۱۲۰۰۰۰۰۰۰"); await page.locator("#request input[name='consent']").check(); }
}
test("offline intake prepares a summary but never sends or counts a conversion", async ({ page }) => {
  let posts = 0; page.on("request", (request) => { if (request.url().includes("/api/service-requests") && request.method() === "POST") posts++; });
  await page.goto("/امداد-خودرو-آنلاین"); await expect(page.locator("#request-status")).toContainText("فعال نیست");
  await fillRequest(page); await page.locator("#request button[type='submit']").click();
  await expect(page.locator("#request [role='status']")).toContainText("هیچ درخواستی");
  await expect(page.locator("#request-summary")).toHaveValue(/نشانی آزمایشی/);
  await expect(page.locator("#request-phone")).toHaveCount(0); expect(posts).toBe(0);
  const data = await page.evaluate(() => JSON.stringify((window as Window & { dataLayer?: unknown[] }).dataLayer ?? []));
  expect(data).toContain("service_request_prepared"); expect(data).not.toContain("service_request_received"); expect(data).not.toContain("نشانی آزمایشی");
  expect(new URL(page.url()).search).toBe("");
});
test("accepted acknowledgment is the only received event; retries reuse request ID", async ({ page }) => {
  const ids: string[] = [];
  await page.route("**/api/service-requests", async (route) => {
    if (route.request().method() === "GET") return route.fulfill({ json: { enabled: true } });
    ids.push(route.request().postDataJSON().requestId);
    return ids.length === 1 ? route.fulfill({ status: 502, json: { error: "acceptance_not_confirmed" } }) : route.fulfill({ status: 201, json: { status: "received", reference: "LOCAL-TEST-001" } });
  });
  await page.goto("/امداد-خودرو-آنلاین"); await expect(page.locator("#request-status")).toContainText("فعال است");
  await fillRequest(page, true); await page.locator("#request button[type='submit']").click();
  await expect(page.locator("#request [role='status']")).toContainText("تأیید نشد");
  await page.locator("#request button[type='submit']").click();
  await expect(page.locator("#request [role='status']")).toContainText("LOCAL-TEST-001");
  expect(ids).toHaveLength(2); expect(ids[0]).toBe(ids[1]);
  const data = await page.evaluate(() => JSON.stringify((window as Window & { dataLayer?: unknown[] }).dataLayer ?? []));
  expect(data.match(/service_request_received/g)).toHaveLength(1); expect(data).not.toContain("09120000000"); expect(data).not.toContain("نشانی آزمایشی");
});
test("a generic 200 response does not fake a received request", async ({ page }) => {
  await page.route("**/api/service-requests", (route) => route.fulfill({ json: route.request().method() === "GET" ? { enabled: true } : { ok: true } }));
  await page.goto("/امداد-خودرو-آنلاین"); await expect(page.locator("#request-status")).toContainText("فعال است");
  await fillRequest(page, true); await page.locator("#request button[type='submit']").click();
  await expect(page.locator("#request [role='status']")).toContainText("تأیید نشد");
  const data = await page.evaluate(() => JSON.stringify((window as Window & { dataLayer?: unknown[] }).dataLayer ?? []));
  expect(data).not.toContain("service_request_received");
});
test("calculator supports Persian rates and resets stale results on edits", async ({ page }) => {
  await page.goto("/pricing");
  const inputs = { base: "۱۰۰۰۰۰", distance: "۱۰", includedKm: "۲", perKm: "۲۰۰۰۰", waitingMinutes: "۱۰", perMinute: "۱۰۰۰", parts: "۵۰۰۰۰", extras: "۱۵۰۰۰", discount: "۵۰۰۰" };
  for (const [key, value] of Object.entries(inputs)) await page.locator(`#quote-${key}`).fill(value);
  await page.locator("#calculator input[name='confirmed']").check(); await page.locator("#calculator button[type='submit']").click();
  await expect(page.getByTestId("quote-total")).toHaveText("۳۳۰٬۰۰۰ تومان");
  await page.locator("#quote-base").fill("-1"); await expect(page.getByTestId("quote-total")).toHaveCount(0);
  await page.locator("#calculator button[type='submit']").click(); await expect(page.locator("#calculator [role='status']")).toContainText("عدد مثبت یا صفر");
});
test("responsive navigation reaches brands and mobile menu supports Escape", async ({ page }, info) => {
  await page.goto("/");
  if (info.project.name === "mobile") {
    const menu = page.getByRole("button", { name: "باز کردن منوی اصلی" });
    await menu.click(); await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape"); await expect(menu).toHaveAttribute("aria-expanded", "false");
    await menu.click(); await page.locator("#mobile-navigation").getByRole("link", { name: "برندها", exact: true }).click();
  } else await page.locator("header nav[aria-label='منوی اصلی']").getByRole("link", { name: "برندها", exact: true }).click();
  await expect(page).toHaveURL(/\/brands$/); await expect(page.locator("h1")).toContainText("برندهای ایرانی و خارجی");
});
test("main heading remains when the carousel advances", async ({ page }) => {
  await page.goto("/"); const heading = await page.locator("h1").textContent();
  await expect.poll(() => page.locator("#top").textContent(), { timeout: 15000 }).toContain("شست‌وشوی حرفه‌ای");
  await expect(page.locator("h1")).toHaveText(heading!); await page.getByRole("button", { name: "توقف نمایش خودکار" }).click();
  await expect(page.getByRole("button", { name: "ادامه نمایش معرفی خدمات" })).toHaveAttribute("aria-pressed", "true");
});

test("client-side Persian navigation follows province, city and service without 404", async ({ page }) => {
  await page.goto("/شمال");
  for (const [path, heading] of [["/گیلان", "گیلان"], ["/رشت", "رشت"], ["/رشت/یدک-کش", "رشت"]]) {
    await page.locator(`main a[href="${path}"]`).first().click();
    await expect.poll(() => decodeURIComponent(new URL(page.url()).pathname)).toBe(path);
    await expect(page.locator("h1")).toContainText(heading);
    await expect(page.locator("h1")).not.toContainText("پیدا نشد");
  }
});
