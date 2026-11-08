import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("real AOS initializes and reveals below-fold content while preserving its space", async ({ page }) => {
  await page.emulateMedia({ reducedMotion:"no-preference" });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-scroll-motion", "on");
  const feedback = page.locator("#home-feedback");
  await expect(feedback).toHaveClass(/aos-init/);
  await expect(feedback).not.toHaveClass(/aos-animate/);
  const heightBefore = await feedback.evaluate(el => el.getBoundingClientRect().height);
  expect(heightBefore).toBeGreaterThan(100);
  await feedback.scrollIntoViewIfNeeded();
  await expect(feedback).toHaveClass(/aos-animate/);
  await expect(feedback).toHaveCSS("opacity", "1");
  expect(Math.abs((await feedback.evaluate(el => el.getBoundingClientRect().height)) - heightBefore)).toBeLessThan(2);
  await page.locator(".coverage-seo-directory summary").click();
  await expect(page.getByTestId("home-local-directory")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  expect(errors).toEqual([]);
});

test("reduced motion keeps AOS sections visible and client navigation remains usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion:"reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-scroll-motion", "off");
  await expect(page.locator("#home-feedback")).toHaveCSS("opacity", "1");
  await expect(page.locator("#home-feedback")).toHaveCSS("transform", "none");
  await expect(page.locator("#home-feedback")).toHaveCSS("transition-duration", "0s");
  await page.locator(".coverage-seo-directory summary").click();
  await page.getByTestId("home-local-directory").getByRole("link", {name:"تویوتا تهران",exact:false}).click();
  await expect(page).toHaveURL(/brands\/toyota/);
  await expect(page.locator("h1")).toBeVisible();
  await page.goBack();
  await expect(page.locator("#home-feedback")).toHaveClass(/aos-init/);
  await expect(page.locator("html")).toHaveAttribute("data-scroll-motion", "off");
});
