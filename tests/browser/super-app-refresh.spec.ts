import { test, expect } from "@playwright/test";

test("header exposes exactly the three requested secondary destinations", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) await page.getByRole("button", { name: "باز کردن منوی اصلی" }).click();
  const scope = isMobile ? page.locator("#mobile-navigation > div").last() : page.locator(".app-navigation");
  await expect(scope.locator("a")).toHaveText(["سوپر اپلیکیشن خودرو چاره", "ثبت نام سفیران خودرو چاره", "درباره ما"]);
  for (const [i, href] of ["/app", "/safir", "/about"].entries()) await expect(scope.locator("a").nth(i)).toHaveAttribute("href", href);
});

test("welcome reappears after refresh even with a previous session marker", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
  await page.goto("/");
  await expect(page.getByTestId("welcome-dialog")).toBeVisible();
  await page.getByRole("button", { name: "بستن پیام خوش‌آمدگویی" }).click();
  await expect(page.getByTestId("welcome-dialog")).toHaveCount(0);
  await page.reload();
  await expect(page.getByTestId("welcome-dialog")).toBeVisible();
});

test("app, fleet and team pages show current content without overflow or broken images", async ({ page }) => {
  for (const [path, title] of [["/app", "سوپر اپلیکیشن خودرو چاره"], ["/safir", "اپلیکیشن سفیران خودرو چاره؛ فرصت‌های بیشتر برای همکاری"], ["/team", "تیم ما؛ خودرو چاره"]]) {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveText(title);
    if (path === "/app") {
      await expect(page.locator("#app .app-device")).toHaveCount(2);
      await expect(page.locator("#features")).toContainText("دیاگ هوشمند با هوش مصنوعی");
      await expect(page.locator("#features")).toContainText("تالار فروش ۲۴ ساعته خودرو");
      await expect(page.locator("#features")).toContainText("پرداخت خلافی و عوارض");
      await expect(page.locator("#app")).toContainText("نسخه IOS");
    }
    if (path === "/safir") await expect(page.locator("#fleet-showcase-title")).toContainText("کسب درآمد");
    if (path === "/team") await expect(page.locator(".team-showcase article")).toHaveCount(4);
    const footer = page.locator("footer");
    await expect(footer).not.toContainText("راهنمای دانلود مستقیم");
    await expect(footer.getByRole("link", { name: "دانلود اپلیکیشن از مایکت", exact: true })).toHaveAttribute("href", "https://myket.ir/app/com.khodrochare.app");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});
