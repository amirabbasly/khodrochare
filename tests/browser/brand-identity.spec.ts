import { test, expect } from "@playwright/test";

test("brand identity stays dark, uses both supplied marks, and keeps section colors navy", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const header = page.locator(".site-header");
  await expect(header.locator(".brand-lockup-symbol:visible").first()).toBeVisible();
  await expect(header.locator(".brand-lockup-wordmark:visible").first()).toHaveAttribute("src", /wordmark-dark/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  expect(await page.locator("body").evaluate(el => getComputedStyle(el).backgroundColor)).toBe("rgb(5, 13, 28)");
  for (const selector of [".app-showcase-panel", ".trust-showcase", ".home-feedback", ".magazine-shell"]) {
    const section = page.locator(selector).first();
    await expect(section).toBeAttached();
    const bg = await section.evaluate(el => getComputedStyle(el).backgroundImage);
    expect(bg, selector).toContain("11, 45, 107");
  }
  for (const image of await page.locator('img[src*="brand-"]').all()) {
    await expect(image).not.toHaveAttribute("src", /brand-wordmark\.webp/);
  }
});
