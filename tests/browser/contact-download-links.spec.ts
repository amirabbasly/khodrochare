import { test, expect } from "@playwright/test";
import { customerMyketUrl } from "../../src/content/app-links";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("new contact and customer Myket links are visible without horizontal overflow", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('header a[href="tel:02182801043"]:visible').first()).toBeVisible();
  await expect(page.locator('a[href="tel:09123022064"]')).toHaveCount(0);
  const footer = page.locator("footer");
  await footer.scrollIntoViewIfNeeded();
  await expect(footer.getByRole("link", { name: "دانلود از مایکت", exact: true })).toHaveAttribute("href", customerMyketUrl);
  await expect(page.locator(`#app a[href="${customerMyketUrl}"]`)).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schema.join(" ")).toContain("+982182801043");
  expect(schema.join(" ")).not.toContain("+989123022064");
});

test("Myket belongs to customer downloads, not the fleet package", async ({ page }) => {
  await page.goto("/app#downloads");
  const section = page.locator("#downloads");
  await expect(section.locator('[data-download-app="customer"]').getByRole("link", { name: "دانلود اپلیکیشن از مایکت" })).toHaveAttribute("href", customerMyketUrl);
  await expect(section.locator(`[data-download-app="fleet"] a[href="${customerMyketUrl}"]`)).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
