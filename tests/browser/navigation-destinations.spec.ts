import { test, expect } from "@playwright/test";

test("mobile app shortcuts and grouped accordion stay above the dock", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const dock = page.getByRole("navigation", { name: "ناوبری پایین موبایل" });
  await expect(dock.locator("a")).toHaveText(["سوپر اپلیکیشن خودرو چاره", "عضویت سفیران"]);
  await expect(dock.locator("a").nth(0)).toHaveAttribute("href", "/app");
  await expect(dock.locator("a").nth(1)).toHaveAttribute("href", "/safir");
  await page.getByRole("button", { name: "باز کردن منوی اصلی" }).click();
  const menu = page.locator("#mobile-navigation");
  const group = menu.getByRole("button", { name: "امداد خودرو", exact: false });
  await group.click();
  await expect(group).toHaveAttribute("aria-expanded", "true");
  await expect(menu.getByRole("link", { name: "حمل خودرو", exact: true })).toBeVisible();
  await menu.getByRole("button", { name: "تالار خودرو", exact: false }).click();
  await expect(group).toHaveAttribute("aria-expanded", "false");
  await expect(menu.getByRole("link", { name: "ثبت آگهی", exact: true })).toHaveAttribute("href", "/car-market");
  await expect(menu.locator('.mobile-install-actions a[href="/safir"]')).toBeVisible();
  expect(await page.locator("header.site-header").evaluate(el => Number(getComputedStyle(el).zIndex))).toBeGreaterThan(await dock.evaluate(el => Number(getComputedStyle(el).zIndex)));
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-hidden", "true");
});

test("desktop upper menu opens groups on click and retains lower installation links", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");
  const main = page.getByRole("navigation", { name: "منوی اصلی", exact: true });
  await main.getByRole("button", { name: "جمعه بازار لوازم یدکی" }).click();
  await expect(main.getByRole("link", { name: "برق و باتری", exact: true })).toHaveAttribute("href", "/battery");
  await expect(page.locator('.app-navigation a[href="/app"]')).toBeVisible();
  await expect(page.locator('.app-navigation a[href="/safir"]')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
