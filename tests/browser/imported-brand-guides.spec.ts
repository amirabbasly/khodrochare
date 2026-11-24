import { test, expect } from "@playwright/test";

test("imported-brand decision tables, request entry and existing navigation survive on mobile and desktop", async ({ page }) => {
  for (const slug of ["toyota", "hyundai", "kia", "mazda", "renault", "nissan", "bmw", "mercedes-benz"]) {
    await page.goto(`/brands/${slug}`);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('#request a[href="https://app.khodrochare.ir/"]').first()).toBeVisible();
    await expect(page.locator("table caption").first()).toBeVisible();
    await expect(page.locator("#electrical")).toBeVisible();
    await expect(page.locator('a[href="/pricing"]').first()).toBeAttached();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), slug).toBe(true);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://khodrochare.ir/brands/${slug}`);
  }
});
