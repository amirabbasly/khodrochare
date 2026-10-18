import { test, expect } from "@playwright/test";

test("licenses are reachable and distinguish a management claim from published verification", async ({ page }) => {
  await page.goto("/licenses");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("دارای جواز کشوری");
  await expect(page.getByText("هنوز در سایت منتشر نشده؛ نیازمند مشاهده مستندات", { exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://khodrochare.ir/licenses");
  await expect(page.locator("footer").getByRole("link", { name: "مجوزها و جواز کشوری" })).toHaveAttribute("href", "/licenses");
  await expect(page.getByRole("link", { name: "امداد خودرو آزادراه تهران شمال", exact: true })).toHaveAttribute("href", "/roads/tehran-north");
});
test("Toyota model guidance appears on general and northern brand pages without horizontal overflow", async ({ page }) => {
  for (const path of ["/brands/toyota", "/شمال/brands/toyota"]) {
    await page.goto(path);
    const section = page.locator("#model-details");
    await expect(section.getByRole("heading", { name: "راوفور (RAV4)، پرادو و لندکروزر", exact: true })).toBeVisible();
    await expect(section.getByRole("heading", { name: "پریوس، کمری هیبرید و کرولا هیبرید", exact: true })).toBeVisible();
    await expect(section.locator("article")).toHaveCount(4);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
  }
});
test("north motorway links model-specific support and city handover guides", async ({ page }) => {
  await page.goto("/roads/tehran-north");
  await expect(page.getByRole("heading", { name: "توقف در تونل؛ درخواست امداد با تعمیر در فضای باز فرق دارد", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "تویوتا در سفر شمال؛ مدل و روش حمل", exact: false }).click();
  await expect(page).toHaveURL(/brands\/toyota/);
  await expect(page.locator("#model-details")).toBeVisible();
  await page.goto("/محمودآباد");
  await expect(page.getByRole("heading", { name: "خرابی در اقامتگاه محمودآباد؛ ورودی ویلا را با ساحل اشتباه نگیریم", exact: true })).toBeVisible();
});
