import { test, expect } from "@playwright/test";
test("discussion keeps customer input pending and clearly separates it from emergency intake", async ({ page }) => {
  await page.route("**/api/community?*", route => route.fulfill({ json: { enabled: true, comments: [] } }));
  await page.route("**/api/community", route => route.fulfill({ status: 201, json: { status: "pending", id: "test-only" } }));
  await page.goto("/blog/emergency-car-assistance-tehran-districts");
  await expect(page.getByRole("heading", { name: "پرسش و دیدگاه شما" })).toBeVisible();
  await page.getByLabel("نام نمایشی", { exact: true }).fill("آزمون نمایشی");
  await page.getByLabel("متن دیدگاه", { exact: true }).fill("این یک ورودی آزمایش است نه تجربه واقعی مشتری.");
  await page.getByRole("checkbox", { name: /با انتشار عمومی/ }).check();
  await page.getByRole("button", { name: "ارسال برای بررسی" }).click();
  await expect(page.getByRole("status")).toContainText("پس از بررسی منتشر می‌شود");
});
