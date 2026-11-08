import { test, expect } from "@playwright/test";

test("footer social links use app icons with accessible names and unchanged destinations", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
  await page.goto("/");
  const nav = page.locator("footer").getByRole("navigation", { name: "شبکه‌های اجتماعی خودرو چاره" });
  await nav.scrollIntoViewIfNeeded();
  for (const [name, href] of [["اینستاگرام خودرو چاره", "https://www.instagram.com/khodrochare"], ["کانال خودرو چاره در بله", "https://ble.ir/khodrochare"]]) {
    const link = nav.getByRole("link", { name, exact: true });
    await expect(link).toHaveAttribute("href", href);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
    await expect(link).toHaveText("");
    const image = link.locator("img");
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    const bounds = await link.boundingBox();
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
    await link.focus(); await expect(link).toBeFocused();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
});
