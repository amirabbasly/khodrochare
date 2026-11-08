import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("dark-only theme ignores old light preference and has no toggle", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  await page.addInitScript(() => localStorage.setItem("khodrochare:theme", "light"));
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("button", { name: "تم تاریک", exact: true })).toHaveCount(0);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});

test("dark page families keep content, canonical and responsive width", async ({ page }) => {
  for (const path of ["/", "/تهران", "/امداد-خودرو-آنلاین", "/app", "/safir", "/battery", "/services/tow-truck", "/blog/safe-towing-guide"]) {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("h1")).toHaveCount(1);
    expect(new URL((await page.locator('link[rel="canonical"]').getAttribute("href"))!).href).toBe(new URL(path, "https://khodrochare.ir").href);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), path).toBe(true);
    const colors = await page.locator(".site-header").evaluate(el => ({ bg: getComputedStyle(el).backgroundColor, fg: getComputedStyle(el).color }));
    expect(colors.bg).not.toBe(colors.fg);
  }
});

test("reduced-motion preference stops decorative hero motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero-aurora-one")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".hero-route-trace")).toHaveCSS("animation-name", "none");
});

test("hero scene controls preserve the SEO heading and allow manual selection", async ({ page }) => {
  await page.goto("/");
  const heading = await page.locator("h1").textContent();
  await page.getByRole("button", { name: "کارواش سیار", exact: true }).click();
  await expect(page.getByRole("button", { name: "کارواش سیار", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("h1")).toHaveText(heading!);
  await expect(page.locator(".hero-image-layer img")).toHaveCount(2);
});
