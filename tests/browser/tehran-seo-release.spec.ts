import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});
test("Tehran service owners, district table and mobile layout remain usable", async ({ page }) => {
  for (const path of ["/تهران", "/تهران/یدک-کش", "/تهران/مکانیک-سیار", "/تهران/کارواش-سیار"]) {
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new URL(path, "https://khodrochare.ir").href);
    await expect(page.getByRole("navigation", { name: "خوشه خدمات تهران", exact: true })).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await expect(page.locator('main [data-tehran-depth="service"]')).toHaveCount(1);
  const faq = page.locator("main details").first();
  await faq.locator("summary").click(); await expect(faq.locator("p")).toBeVisible();
});
test("neighborhood breadcrumbs, region and model-specific intake are visible", async ({ page }) => {
  await page.goto("/تهران/سعادت-آباد");
  await expect(page.locator("main").getByRole("link", { name: "شمال تهران", exact: true }).first()).toBeVisible();
  await page.goto("/تهران/شمال-تهران");
  await expect(page.getByRole("heading", { name: "شیب و پارکینگ؛ اطلاعات لازم پیش از انتخاب وسیله" })).toBeVisible();
  await page.goto("/تهران/brands/toyota");
  await expect(page.getByRole("heading", { name: "کمری و راوفور هیبرید در پارکینگ؛ READY را گزارش کنید" })).toBeVisible();
  await expect(page.locator('main a[href="/تهران/خودروبر"]').first()).toHaveAttribute("href", "/تهران/خودروبر");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
test("urban highway guide is distinct and server-rendered without running JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}/${encodeURI("roads/tehran-highways")}`);
  await expect(page.locator("h1")).toHaveText("امداد خودرو بزرگراه‌های تهران");
  await expect(page.locator("main h3")).toHaveCount(6);
  await expect(page.locator("main")).toContainText("این صفحه به آزادراه تهران–شمال اختصاص ندارد");
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  for (const schema of schemas) expect(() => JSON.parse(schema)).not.toThrow();
  expect(schemas.map(value => JSON.parse(value)).filter(value => value["@type"] === "FAQPage")).toHaveLength(1);
  await context.close();
});
test("home does not receive Tehran content sections or overflow", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator("[data-tehran-depth]")).toHaveCount(0);
  await expect(page.getByRole("navigation", { name: "خوشه خدمات تهران", exact: true })).toHaveCount(0);
  await expect(page.locator("#assistance-comparison .comparison-cross")).toHaveCount(10);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});
