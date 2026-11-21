import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("owner figures finish counting, license copy and responsive request card", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.getByText("دارای مجوز یکتا اتحادیه کشوری", { exact: true })).toBeVisible();
  await page.locator(".hero-stats").scrollIntoViewIfNeeded();
  const values = page.locator("[data-stat-value]");
  await expect(values).toHaveText(["4.8", "20,000+", "450+"]);
  const request = page.getByTestId("home-request-card");
  if (testInfo.project.name === "mobile") await expect(request).toBeHidden();
  else await expect(request).toBeVisible();
  await page.getByRole("button", { name: "کارواش سیار", exact: true }).click();
  await expect(values).toHaveText(["4.8", "20,000+", "450+"]);
});

test("reduced motion shows final figures without a count animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("[data-stat-value]")).toHaveText(["4.8", "20,000+", "450+"]);
});
