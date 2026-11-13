import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});
test("comparison alternatives are ten accessible crosses, without comparative copy in cells", async ({ page }) => {
  await page.goto("/");
  const comparison = page.locator("#assistance-comparison");
  await comparison.scrollIntoViewIfNeeded();
  await expect(comparison.locator(".comparison-cross")).toHaveCount(10);
  await expect(comparison.locator("tbody td:nth-child(3),tbody td:nth-child(4)")).toHaveText(Array(10).fill("×"));
  await expect(comparison.locator(".comparison-cross").first()).toHaveAccessibleName("شرایط این ارائه‌دهنده تأیید نشده است");
  await comparison.locator("#comparison-note summary").click();
  await expect(comparison.locator("#comparison-note")).toContainText("نه اینکه فاقد آن خدمت یا تعهد باشد");
});
test("contextual links are server-rendered, relevant, and do not self-link", async ({ page }) => {
  for (const path of ["/services/fuel-delivery", "/services/tow-truck", "/brands/toyota", "/رشت/امداد-خودرو"]) {
    await page.goto(path);
    const root = page.locator("main");
    await expect(root.locator("h1")).toBeVisible();
    const inline = root.locator('a[data-contextual-link]');
    await expect.poll(() => inline.count()).toBeGreaterThan(0);
    for (const href of await inline.evaluateAll(nodes => nodes.map(node => node.getAttribute("href")))) {
      expect(href?.split("#")[0]).not.toBe(path);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});
