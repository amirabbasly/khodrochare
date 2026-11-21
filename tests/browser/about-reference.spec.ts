import { test, expect } from "@playwright/test";

test("about follows the reference section sequence with original company content and working controls", async ({ page }, info) => {
  await page.goto("/about");
  await expect(page.locator("h1")).toHaveText("خودرو چاره؛ تیمی همراه و پاسخ‌گو");
  await expect(page.locator("[data-stat-value]")).toHaveText(["4.8", "50,000+", "1,000+"]);
  const journey = page.getByRole("group", { name: "بخش‌های مسیر خودرو چاره" });
  await journey.scrollIntoViewIfNeeded();
  const welcome = page.getByRole("button", { name: "بستن پیام خوش‌آمدگویی" });
  if (await welcome.isVisible()) await welcome.click();
  await journey.getByRole("button", { name: /سوپر اپلیکیشن/ }).click();
  await expect(page.locator("#about-story-panel")).toContainText("یک مسیر دیجیتال برای خدمات خودرو");
  await expect(journey.getByRole("button", { name: /سوپر اپلیکیشن/ })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "چشم‌انداز ما", exact: true }).click();
  await expect(page.locator("#about-purpose-panel h2")).toContainText("همراه یکپارچه رانندگان");
  await expect(page.locator("#about-license-title")).toBeVisible();
  await expect(page.locator(".about-license-grid")).toContainText("سیما رایگان ایرانیان");
  await expect(page.locator(".about-service-links a[href='/press']")).toHaveCount(1);
  await expect(page.locator('main img[src*="mdotcar"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.locator(".about-intro").screenshot({ path: `coverage/browser/about-intro-${info.project.name}.png` });
});

test("team navy/orange cards remain readable and contained across narrow, tablet and desktop widths", async ({ page }, info) => {
  await page.goto("/team");
  for (const width of [320, 390, 768, 1024, 1366]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    const director = page.locator(".team-director");
    const rect = (await director.boundingBox())!;
    expect(rect.x).toBeGreaterThanOrEqual(0);
    expect(rect.x + rect.width).toBeLessThanOrEqual(width + 1);
    await expect(director).toHaveCSS("background-image", /linear-gradient/);
    await expect(page.locator(".team-members article")).toHaveCount(3);
    for (const card of await page.locator(".team-members article").all()) {
      expect(await card.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    }
    if (width === 390 || width === 1366) await page.locator(".team-showcase").screenshot({ path: `coverage/browser/team-palette-${info.project.name}-${width}.png` });
  }
});
