import { test, expect } from "@playwright/test";

test("licenses are reachable and distinguish a management claim from published verification", async ({ page }) => {
  await page.goto("/licenses");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("دارای جواز یکتا");
  await expect(page.locator("main")).toContainText("پیشرو امدادگران هوانیروز");
  await expect(page.locator("main")).toContainText("علیرضا سلیمانی");
  await expect(page.locator("main img")).toHaveCount(1);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://khodrochare.ir/licenses");
  await expect(page.locator("footer").getByRole("link", { name: "مجوزها و جواز کشوری" })).toHaveAttribute("href", "/licenses");

});
test("Toyota model guidance appears on general and northern brand pages without horizontal overflow", async ({ page }) => {
  for (const path of ["/brands/toyota", "/شمال/brands/toyota"]) {
    await page.goto(path);
    if (path.startsWith("/شمال/")) {
      await expect(page.locator("#model-details")).toHaveCount(0);
      await expect(page.getByRole("link", { name: "راهنمای فنی و مدل‌های تویوتا" })).toHaveAttribute("href", "/brands/toyota");
      continue;
    }
    const section = page.locator("#model-details");
    await expect(section.getByRole("heading", { name: "راوفور (RAV4)، پرادو و لندکروزر", exact: true })).toBeVisible();
    await expect(section.getByRole("heading", { name: "پریوس، کمری هیبرید و کرولا هیبرید", exact: true })).toBeVisible();
    await expect(section.locator("article")).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
  }
});
test("north motorway links model-specific support and city handover guides", async ({ page }) => {
  await page.goto("/roads/tehran-north");
  await expect(page.getByRole("heading", { name: "توقف در تونل و تصمیم برای بارگیری", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "انتخاب وسیله حمل", exact: false }).click();
  await expect(page).toHaveURL(/tools\/transport-selector/);
  await page.goto("/محمودآباد");
  await expect(page.getByRole("heading", { name: "خرابی در اقامتگاه محمودآباد؛ ورودی ویلا را با ساحل اشتباه نگیریم", exact: true })).toBeVisible();
});
