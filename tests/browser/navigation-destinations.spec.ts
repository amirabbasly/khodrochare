import { test, expect } from "@playwright/test";

test("mobile dock contains only imports and representatives; markets remain in menu", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const dock = page.getByRole("navigation", { name: "ناوبری پایین موبایل" });
  await expect(dock.locator("a")).toHaveText(["واردات خودرو", "طرح نمایندگان خودرو چاره"]);
  await expect(dock.locator("a").nth(0)).toHaveAttribute("href", "/imports");
  await expect(dock.locator("a").nth(1)).toHaveAttribute("href", "/partners");
  await page.getByRole("button", { name: "باز کردن منوی اصلی" }).click();
  const menu = page.locator("#mobile-navigation");
  await expect(menu.getByRole("link", { name: "جمعه بازار لوازم یدکی", exact: true })).toHaveAttribute("href", "/friday-market");
  await expect(menu.getByRole("link", { name: "تالار خرید و فروش خودرو", exact: true })).toHaveAttribute("href", "/car-market");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test("desktop secondary menu places representatives and imports immediately after fleet signup", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");
  await expect(page.locator(".app-navigation a")).toHaveText(["سوپر اپلیکیشن خودرو چاره", "ثبت نام سفیران خودرو چاره", "طرح نمایندگان خودرو چاره", "واردات خودرو", "درباره ما", "تیم ما"]);
  await expect(page.locator(".app-navigation a").nth(2)).toHaveAttribute("href", "/partners");
  await expect(page.locator(".app-navigation a").nth(3)).toHaveAttribute("href", "/imports");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
