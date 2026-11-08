import { test, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const templates = ["/app", "/coverage", "/تهران/شمال-تهران", "/", "/تهران", "/رشت", "/مازندران", "/شمال", "/تهران/سعادت-آباد", "/کرج/گوهردشت", "/رشت/یدک-کش", "/brands/toyota", "/roads/chalus", "/امداد-خودرو", "/امداد-خودرو-آنلاین", "/pricing"];
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
  await page.route(/google-analytics\.com|googletagmanager\.com/, (route) => route.abort());
});
for (const path of templates) test(`render without overflow or hydration errors: ${path}`, async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(path); expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveCount(1); await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("footer a[href='https://ble.ir/khodrochare']")).toBeAttached();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
  await page.evaluate(() => document.fonts.ready);
  expect(errors).toEqual([]);
  if (path === "/" || path === "/شمال") { await mkdir("coverage/browser/screenshots", { recursive: true }); await page.screenshot({ path: `coverage/browser/screenshots/${info.project.name}-${path === "/" ? "home" : "north"}.png` }); }
});
test("online requests use the real customer app without calling legacy intake", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", r => { if (r.url().includes("/api/service-requests")) requests.push(r.method()); });
  await page.goto("/امداد-خودرو-آنلاین");
  await expect(page.locator('#request [data-app-entry="customer"]')).toHaveAttribute("href", "https://app.khodrochare.ir/");
  await expect(page.locator("#request form")).toHaveCount(0);
  expect(requests).toEqual([]);
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
  await expect(page.locator("h1")).toHaveText(heading!);
  await expect(page.getByRole("button", { name: "توقف نمایش خودکار" })).toHaveCount(0);
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
