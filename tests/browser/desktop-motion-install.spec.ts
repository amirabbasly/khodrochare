import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    sessionStorage.setItem("khodrochare:welcome-seen:v2", "1");
  });
});

test("motion continues while hovered; ticker never creates a horizontal scroll area", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const slider = page.getByTestId("home-brand-carousel");
  const track = slider.locator(".brand-marquee-track");
  await slider.hover();
  await expect(track).toHaveCSS("animation-play-state", "running");
  const first = await track.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe(first);
  const overflow = await slider.evaluate(element => ({ width: element.clientWidth, scroll: element.scrollWidth, viewport: getComputedStyle(element.querySelector(".brand-marquee-viewport")!).overflowX }));
  expect(overflow.scroll).toBeLessThanOrEqual(overflow.width + 1);
  expect(["hidden", "clip"]).toContain(overflow.viewport);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const truck = page.locator(".tow-truck");
  await page.getByTestId("tow-stage").hover();
  const position = await truck.evaluate(element => getComputedStyle(element).translate);
  await expect.poll(() => truck.evaluate(element => getComputedStyle(element).translate)).not.toBe(position);
});

test("reduced-motion users can explicitly enable both animations without overflow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const slider = page.getByTestId("home-brand-carousel");
  const truck = page.locator(".tow-truck");
  await expect(truck).toHaveCSS("animation-name", "none");
  await expect(slider.locator(".brand-marquee-track")).toHaveCSS("animation-name", "none");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await slider.getByRole("button", { name: "فعال کردن انیمیشن‌ها", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-site-motion", "on");
  await expect(truck).toHaveCSS("animation-name", "tow-bob, tow-drive");
  const track = slider.locator(".brand-marquee-track");
  await expect(track).toHaveCSS("animation-iteration-count", "infinite");
  const first = await track.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe(first);
  expect(await page.evaluate(() => localStorage.getItem("khodrochare:motion"))).toBe("on");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-site-motion", "on");
  await expect(truck).toHaveCSS("animation-name", "tow-bob, tow-drive");
  // The saved explicit choice may also be turned off again.
  await slider.getByRole("button", { name: "کاهش حرکت انیمیشن‌ها", exact: true }).click();
  await expect(truck).toHaveCSS("animation-name", "none");
  await expect(track).toHaveCSS("animation-name", "none");
});

test("home app has one install action and no QR or add-to-home promotional cards", async ({ page }) => {
  await page.goto("/");
  const app = page.locator("#app");
  await expect(app).not.toContainText("اسکن و نصب سریع");
  await expect(app).not.toContainText("دوربین موبایل را روی کد بگیرید");
  await expect(app).not.toContainText("خودرو چاره را به صفحه اصلی اضافه کنید");
  await expect(app.locator('img[src*="app-qr"]')).toHaveCount(0);
  const install = app.getByRole("button", { name: "دانلود و نصب وب‌اپلیکیشن", exact: true });
  await install.click();
  await expect(app.getByRole("status")).toContainText("از منوی مرورگر");
  await page.evaluate(() => {
    const event = new Event("beforeinstallprompt");
    Object.assign(event, { prompt: async () => {}, userChoice: Promise.resolve({ outcome: "accepted" }) });
    window.dispatchEvent(event);
  });
  await install.click();
  await expect(app.getByRole("status")).toContainText("به صفحه اصلی اضافه شد");
  await expect(app).toHaveCSS("backdrop-filter", "blur(20px)");
});
