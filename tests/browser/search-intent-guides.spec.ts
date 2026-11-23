import { test, expect } from "@playwright/test";

test("online request action precedes long guidance and keeps the real customer destination", async ({ page }) => {
  await page.goto("/امداد-خودرو-آنلاین");
  await expect(page.locator("h1")).toHaveText(/امداد خودرو آنلاین/);
  await expect(page.locator('#request a[href="https://app.khodrochare.ir/"]').first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "کدام خدمت را آنلاین درخواست کنم؟", exact: true })).toBeVisible();
  const headings = await page.locator("main h2").allTextContents();
  expect(headings.indexOf("شروع درخواست آنلاین؛ سه مرحله روشن")).toBeLessThan(headings.indexOf("کدام خدمت را آنلاین درخواست کنم؟"));
  expect(await page.locator('link[rel="canonical"]').getAttribute("href")).toContain(encodeURI("/امداد-خودرو-آنلاین"));
});

test("five clusters expose server-rendered decision tables without widening the mobile page", async ({ page }) => {
  for (const [path, caption] of [
    ["/pricing", "نرخ حمل ۱۴۰۵ تهران و البرز؛ مبالغ به تومان"],
    ["/battery", "چه نتیجه‌ای را پیش از تأیید تعویض بپرسیم؟"],
    ["/roads/tehran-north", "نمونه شرح موقعیت؛ جای خالی‌ها را با اطلاعات واقعی پر کنید"],
    ["/شمال", "کدام اطلاعات در سفر شمال تعیین‌کننده‌اند؟"],
    ["/blog/car-battery-warning-signs", "نشانه، احتمال و اقدام بعدی"],
    ["/blog/car-tow-truck-price-guide", "مقایسه آموزشی؛ همه اعداد فرضی و به تومان"],
    ["/blog/online-roadside-assistance-request-guide", "تصمیم بعد از تلاش برای درخواست آنلاین"],
  ]) {
    await page.goto(path);
    await expect(page.getByText(caption, { exact: true })).toBeVisible();
    if (path === "/pricing") {
      const tariffImage = page.locator('figure img[src*="transport-tariff-1405"]');
      await expect(tariffImage).toBeVisible();
      await expect.poll(() => tariffImage.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      await expect(page.getByRole("link", { name: "مشاهده تصویر در اندازه اصلی", exact: true })).toHaveAttribute("href", "/images/pricing/transport-tariff-1405.jpg");
    }
    await expect(page.locator("h1")).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), path).toBe(true);
    const errors = await page.locator('script[type="application/ld+json"]').evaluateAll(nodes => nodes.flatMap(node => {
      try { JSON.parse(node.textContent || ""); return []; } catch { return ["invalid JSON-LD"]; }
    }));
    expect(errors, path).toEqual([]);
  }
});
