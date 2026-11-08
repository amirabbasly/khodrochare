import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("commitment text and checkmarks share a consistent right edge", async ({ page }) => {
  await page.goto("/");
  const section = page.locator("#assistance-comparison");
  await section.scrollIntoViewIfNeeded();
  const labels = section.locator(".comparison-promise-text");
  await expect(labels).toHaveCount(5);
  const edges = await labels.evaluateAll(nodes => nodes.map(node => node.getBoundingClientRect().right));
  expect(Math.max(...edges) - Math.min(...edges)).toBeLessThan(1);
  await expect(section.locator(".comparison-promise").first()).toHaveCSS("text-align", "right");
});

test("both original app previews are upright and feedback has richer real content", async ({ page }, testInfo) => {
  await page.goto("/");
  const app = page.locator("#app");
  await app.scrollIntoViewIfNeeded();
  for (const selector of [".app-phone-front", ".app-phone-back"]) {
    await expect(app.locator(selector)).toHaveCSS("transform", "none");
    await expect(app.locator(selector)).toBeVisible();
  }
  await app.screenshot({ path: `coverage/browser/upright-app-${testInfo.project.name}.png` });
  const feedback = page.locator("#home-feedback");
  await feedback.scrollIntoViewIfNeeded();
  await expect(feedback.locator(".feedback-collection")).toContainText("۳۰ بازخورد خدمات");
  await expect(feedback.locator("blockquote")).toHaveCount(30);
  await expect(feedback.locator(".feedback-card-number")).toHaveCount(30);
  await expect(feedback.getByRole("link", { name: "ارتباط با پشتیبانی" })).toHaveAttribute("href", "/contact");
  await feedback.screenshot({ path: `coverage/browser/full-feedback-${testInfo.project.name}.png` });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
