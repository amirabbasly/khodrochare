import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});
test("regional mega menu works by keyboard, closes on Escape and navigates", async ({ page }, info) => {
  await page.goto("/");
  const mobile = info.project.name === "mobile";
  if (mobile) await page.getByRole("button", { name: "باز کردن منوی اصلی" }).click();
  const nav = page.getByRole("navigation", { name: mobile ? "منوی موبایل" : "منوی اصلی", exact: true });
  const trigger = nav.getByRole("button", { name: "امداد خودرو", exact: true });
  await trigger.focus(); await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const panel = page.locator(mobile ? "#mobile-assistance-menu" : "#desktop-assistance-menu");
  await expect(panel).toBeVisible();
  await expect(panel.locator('a[href*="/brands/"]')).toHaveCount(36);
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden(); await expect(trigger).toBeFocused();
  await trigger.click();
  await panel.getByRole("button", { name: /شمال/ }).click();
  await panel.locator('a[href="/شمال/brands/toyota"]').click();
  await expect(page).toHaveURL(/brands\/toyota$/);
  await expect(page.locator("h1")).toHaveText("امداد خودرو تویوتا شمال");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
test("regional brand pages provide reciprocal area and brand links", async ({ page }) => {
  await page.goto("/شمال/brands/bmw");
  await expect(page.locator("h1")).toHaveText("امداد خودرو بی‌ام‌و شمال");
  const main = page.locator("main");
  await expect(main.locator('a[href="/brands/bmw"]')).toBeVisible();
  await expect(main.locator('a[href="/تهران/brands/bmw"]')).toBeVisible();
  await expect(main.locator('a[href="/شمال/brands/iran-khodro"]')).toBeVisible();
});

test("desktop menu opens only on click, defaults to Tehran and persists after pointer exit", async ({ page }, info) => {
  test.skip(info.project.name === "mobile");
  await page.goto("/");
  const trigger = page.getByRole("navigation", { name: "منوی اصلی", exact: true }).getByRole("button", { name: "امداد خودرو", exact: true });
  const panel = page.locator("#desktop-assistance-menu");
  await trigger.hover();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await expect(panel.locator('a[href="/تهران/brands/toyota"]')).toBeVisible();
  await panel.getByRole("button", { name: /کرج/ }).hover();
  await expect(panel.locator('a[href="/کرج/brands/toyota"]')).toBeHidden();
  await panel.getByRole("button", { name: /کرج/ }).click();
  await expect(panel.locator('a[href="/کرج/brands/toyota"]')).toBeVisible();
  await page.mouse.move(20, 750);
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await trigger.click();
  await expect(panel).toBeHidden();
});

test("large menu dims the page and includes an image", async ({ page }, info) => {
  test.skip(info.project.name === "mobile");
  await page.goto("/");
  await page.getByRole("navigation", { name: "منوی اصلی", exact: true }).getByRole("button", { name: "امداد خودرو", exact: true }).click();
  const panel = page.locator("#desktop-assistance-menu");
  await expect(panel).toBeVisible();
  await expect(panel.locator("img")).toBeVisible();
  await expect(page.getByRole("button", { name: "بستن مگامنو", exact: true })).toHaveCSS("opacity", "1");
  expect((await panel.boundingBox())!.width).toBeGreaterThan(1000);
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
});
test("brand ticker is seamless, linked and visible on both viewports", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const slider = page.getByTestId("home-brand-carousel");
  await expect(slider).toBeVisible();
  await expect(slider.locator("img")).toHaveCount(16);
  const track = slider.locator(".brand-marquee-track");
  await expect(track).toHaveCSS("animation-iteration-count", "infinite");
  const firstTransform = await track.evaluate(element => getComputedStyle(element).transform);
  await expect.poll(() => track.evaluate(element => getComputedStyle(element).transform)).not.toBe(firstTransform);
  if (info.project.name === "desktop") {
    const categories = (await page.getByTestId("service-categories").boundingBox())!;
    const box = (await slider.boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(categories.y + categories.height);
    expect(box.height).toBeGreaterThan(190);
  }
  await slider.locator('a[href="/brands/toyota"]').first().focus();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await slider.locator('a[href="/brands/toyota"]').first().click();
  await expect(page).toHaveURL(/brands\/toyota$/);
});

test("north hub is expanded, sample intake removed and landing cards are glass", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("home-north-hub").getByRole("link")).toHaveCount(20);
  await expect(page.locator("#coverage")).not.toContainText("RAV4");
  await expect(page.locator("#coverage")).not.toContainText("هماهنگی پذیرش");
  await expect(page.getByTestId("tow-stage")).toBeVisible();
  await page.goto("/شمال/brands/toyota");
  await expect(page.locator(".landing-glass").first()).toHaveCSS("backdrop-filter", "blur(18px)");
});

test("tow truck has visible travel motion on mobile and desktop", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const stage = page.getByTestId("tow-stage");
  await expect(stage).toBeVisible();
  const truck = stage.locator(".tow-truck");
  await expect(truck).toHaveCSS("animation-name", "tow-bob, tow-drive");
  const first = await truck.evaluate(element => getComputedStyle(element).translate);
  await expect.poll(() => truck.evaluate(element => getComputedStyle(element).translate)).not.toBe(first);
  await expect(stage.locator(".wheel").first()).toHaveCSS("animation-name", "wheel-spin");
});
