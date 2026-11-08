import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("service cards stay in one four-item row, use real images, and retain dark hover contrast", async ({ page }, info) => {
  await page.goto("/");
  const cards = page.getByTestId("service-categories").getByRole("link");
  await expect(cards).toHaveCount(4);
  await expect(cards.locator("img")).toHaveCount(4);
  await expect(cards.locator("svg")).toHaveCount(0);
  for (let index = 0; index < 4; index++) {
    await expect(cards.nth(index)).toHaveAttribute("href", ["/services/tow-truck", "/services/jump-start", "/services/mobile-carwash", "/store"][index]);
    await expect.poll(() => cards.nth(index).locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  const row = await cards.evaluateAll(items => items.map(el => el.getBoundingClientRect().top));
  expect(Math.max(...row) - Math.min(...row)).toBeLessThan(2);
  await cards.first().hover();
  await expect(cards.first().locator(".service-category-label")).toHaveCSS("color", "rgb(255, 225, 199)");
  expect(await cards.first().evaluate(el => getComputedStyle(el).backgroundImage)).toContain("gradient");
  await page.screenshot({ path: `coverage/browser/service-refresh-${info.project.name}.png`, fullPage: true });
  if (info.project.name === "mobile") {
    await page.setViewportSize({ width:320, height:780 });
    const narrow = await cards.evaluateAll(items => items.map(el => el.getBoundingClientRect().top));
    expect(Math.max(...narrow) - Math.min(...narrow)).toBeLessThan(2);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test("brand logos sit on dark plinths with original links and moving ticker", async ({ page }) => {
  await page.goto("/");
  const showcase = page.getByTestId("home-brand-carousel");
  await expect(showcase.locator(".brand-logo-plinth")).toHaveCount(16);
  const first = showcase.locator(".brand-logo-plinth").first();
  expect(await first.evaluate(el => getComputedStyle(el).backgroundImage)).not.toContain("rgb(255, 255, 255)");
  await expect(first.locator("img")).toHaveClass(/brand-logo-silver/);
  await expect(showcase.locator('a[href="/brands/toyota"]').first()).toBeVisible();
  await expect(showcase.locator('ul[aria-hidden="true"] a')).toHaveCount(8);
  await expect(showcase.locator('.brand-marquee-track')).toHaveCSS("animation-iteration-count", "infinite");
});

test("desktop glow animates without hiding click-only mega menu; reduced motion/mobile disable it", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion:"no-preference" });
  await page.goto("/");
  const light = page.locator(".nav-ambient-orb");
  if (info.project.name === "desktop") {
    await expect(light).toBeVisible();
    await expect.poll(() => light.evaluate(el => el.getAnimations().length)).toBe(1);
    const transform = await light.evaluate(el => getComputedStyle(el).transform);
    await expect.poll(() => light.evaluate(el => getComputedStyle(el).transform)).not.toBe(transform);
    const trigger = page.getByRole("button", {name:"امداد خودرو", exact:true}).first();
    await trigger.hover();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await trigger.click();
    await expect(page.locator("#desktop-assistance-menu")).toBeVisible();
    await expect(page.locator("#desktop-assistance-menu").getByRole("button", {name:/تهران/})).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await page.emulateMedia({ reducedMotion:"reduce" });
  }
  await expect.poll(() => light.evaluate(el => el.getAnimations().length)).toBe(0);
});
