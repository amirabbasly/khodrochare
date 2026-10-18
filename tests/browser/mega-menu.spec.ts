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

test("desktop cascade reveals only the hovered region and remains within the viewport", async ({ page }, info) => {
  test.skip(info.project.name === "mobile");
  await page.goto("/");
  await page.getByRole("navigation", { name: "منوی اصلی", exact: true }).getByRole("button", { name: "امداد خودرو", exact: true }).hover();
  const panel = page.locator("#desktop-assistance-menu");
  await expect(panel).toBeVisible();
  await expect(panel.locator('a[href="/تهران/brands/toyota"]')).toBeHidden();
  await panel.getByRole("button", { name: /تهران/ }).hover();
  const toyota = panel.locator('a[href="/تهران/brands/toyota"]');
  await expect(toyota).toBeVisible();
  await expect(panel.locator('a[href="/کرج/brands/toyota"]')).toBeHidden();
  await toyota.hover();
  await expect(toyota).toBeVisible();
  const box = await toyota.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  await page.getByRole("button", { name: "بستن مگامنو", exact: true }).click({ position: { x: 20, y: 750 } });
  await expect(panel).toBeHidden();
});

test("large menu dims the page and includes an image", async ({ page }, info) => {
  test.skip(info.project.name === "mobile");
  await page.goto("/");
  await page.getByRole("navigation", { name: "منوی اصلی", exact: true }).getByRole("button", { name: "امداد خودرو", exact: true }).hover();
  const panel = page.locator("#desktop-assistance-menu");
  await expect(panel).toBeVisible();
  await expect(panel.locator("img")).toBeVisible();
  await expect(page.getByRole("button", { name: "بستن مگامنو", exact: true })).toHaveCSS("opacity", "1");
  expect((await panel.boundingBox())!.width).toBeGreaterThan(1000);
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
});
test("desktop brand carousel fills the service gap with linked original marks", async ({ page }, info) => {
  test.skip(info.project.name === "mobile");
  await page.goto("/");
  const slider = page.getByTestId("home-brand-carousel");
  await expect(slider).toBeVisible();
  await expect(slider.locator("img")).toHaveCount(8);
  const categories = (await page.getByTestId("service-categories").boundingBox())!;
  const box = (await slider.boundingBox())!;
  expect(box.y).toBeGreaterThanOrEqual(categories.y + categories.height);
  expect(Math.abs(box.x - categories.x)).toBeLessThan(2);
  const track = slider.getByLabel("فهرست قابل پیمایش برندها");
  await slider.getByRole("button", { name: "برندهای بعدی" }).click();
  await expect.poll(() => track.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
  await slider.locator('a[href="/brands/toyota"]').focus();
  await slider.locator('a[href="/brands/toyota"]').click();
  await expect(page).toHaveURL(/brands\/toyota$/);
});
