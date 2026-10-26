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

test("both loops run by default even with reduced motion and an old saved off switch", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => localStorage.setItem("khodrochare:motion", "off"));
  await page.goto("/");
  const slider = page.getByTestId("home-brand-carousel");
  const truck = page.locator(".tow-truck");
  await expect(page.getByRole("button", { name: /فعال کردن انیمیشن|کاهش حرکت انیمیشن/ })).toHaveCount(0);
  await expect(truck).toHaveCSS("animation-name", "tow-bob, tow-drive");
  const position = await truck.evaluate(element => getComputedStyle(element).translate);
  await expect.poll(() => truck.evaluate(element => getComputedStyle(element).translate)).not.toBe(position);
  const track = slider.locator(".brand-marquee-track");
  await expect(track).toHaveCSS("animation-iteration-count", "infinite");
  const first = await track.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe(first);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.reload();
  await expect(truck).toHaveCSS("animation-name", "tow-bob, tow-drive");
});

test("home app has one install action and no QR or add-to-home promotional cards", async ({ page }) => {
  await page.goto("/");
  const app = page.locator("#app");
  await expect(app).not.toContainText("اسکن و نصب سریع");
  await expect(app).not.toContainText("دوربین موبایل را روی کد بگیرید");
  await expect(app).not.toContainText("خودرو چاره را به صفحه اصلی اضافه کنید");
  await expect(app.locator('img[src*="app-qr"]')).toHaveCount(0);
  const install = app.getByRole("link", { name: "دانلود و نصب وب‌اپلیکیشن", exact: true });
  await expect(install).toHaveAttribute("href", "https://app.khodrochare.ir/");
  await expect(app).toContainText("نصب از امکانات مرورگر همان اپ");
  await expect(app).toHaveCSS("backdrop-filter", "blur(20px)");
});

test("service backgrounds cover each whole card and local directory is expanded", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("#services article");
  await expect(cards).toHaveCount(2);
  for (const card of await cards.all()) {
    const geometry = await card.evaluate(element => {
      const card = element.getBoundingClientRect();
      const img = element.querySelector("img")!.getBoundingClientRect();
      return { cardWidth: card.width, imgWidth: img.width, cardHeight: card.height, imgHeight: img.height };
    });
    expect(Math.abs(geometry.cardWidth - geometry.imgWidth)).toBeLessThan(3);
    expect(Math.abs(geometry.cardHeight - geometry.imgHeight)).toBeLessThan(3);
    await expect(card.locator(".home-glass-dark")).toHaveCount(0);
  }
  const directory = page.getByTestId("home-local-directory");
  expect(await directory.getByRole("link").count()).toBeGreaterThanOrEqual(59);
  await expect(directory.getByRole("link", { name: "تویوتا تهران", exact: false })).toHaveAttribute("href", "/تهران/brands/toyota");
});
