import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("online landing has useful intake guide, canonical and matching FAQ schema", async ({ page }) => {
  await page.goto("/امداد-خودرو-آنلاین");
  await expect(page.locator("h1")).toContainText("امداد خودرو آنلاین");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /%D8%A7/);
  await expect(page.locator("#choose-service tbody tr")).toHaveCount(5);
  await expect(page.locator("#request-checklist blockquote")).toContainText("محل توقف");
  await page.getByRole("link", { name: "هزینه و تأیید اعزام", exact: true }).click();
  await expect(page).toHaveURL(/#request-cost$/);
  const faqs = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.map(n => JSON.parse(n.textContent || "{}")).filter(n => n["@type"] === "FAQPage"));
  expect(faqs).toHaveLength(1);
  expect(faqs[0].mainEntity).toHaveLength(7);
});

test("header app navigation and features work at both viewport sizes", async ({ page }, testInfo) => {
  await page.goto("/app");
  const mobile = testInfo.project.name === "mobile";
  if (mobile) await page.getByRole("button", { name: "باز کردن منوی اصلی" }).click();
  const nav = mobile ? page.locator("#mobile-navigation") : page.getByRole("navigation", { name: "اپلیکیشن‌های خودرو چاره", exact: true });
  await expect(nav.getByRole("link", { name: "اپلیکیشن سفیران", exact: true })).toHaveAttribute("href", "https://safir.khodrochare.ir/");
  await expect(nav.getByRole("link", { name: "اپلیکیشن خودرو چاره", exact: true })).toHaveAttribute("href", "https://app.khodrochare.ir/");
  await nav.getByRole("link", { name: "قابلیت‌های اپلیکیشن‌ها", exact: true }).click();
  await expect(page).toHaveURL(/\/app#features$/);
  await expect(page.locator("#features")).toBeVisible();
  await expect(page.locator("#features h4")).toHaveCount(6);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("unverified copied reviews and rating schema are not published", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByText("۱۵ دقیقه‌ای رسیدند", { exact: false })).toHaveCount(0);
  const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schemas.join(" ")).not.toContain('"aggregateRating"');
});
