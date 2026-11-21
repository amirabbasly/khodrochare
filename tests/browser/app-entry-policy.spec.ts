import { test, expect } from "@playwright/test";

test("only explicitly named PWA links enter the app directly", async ({ page }) => {
  for (const path of ["/", "/app", "/safir", "/partners", "/about", "/blog", "/services/tow-truck", "/امداد-خودرو-آنلاین"]) {
    await page.goto(path);
    const direct = page.locator('a[href^="https://app.khodrochare.ir"],a[href^="https://safir.khodrochare.ir"]');
    for (const link of await direct.all()) await expect(link).toHaveAccessibleName("ورود به اپلیکیشن PWA");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test("app page contains only the new hero and app showcase; APK never falls back to a guide", async ({ page }, info) => {
  await page.goto("/app");
  await expect(page.locator("main > section")).toHaveCount(2);
  await expect(page.locator("h1")).toHaveText("سوپر اپلیکیشن خودرو چاره");
  await expect(page.locator("main")).not.toContainText("پاسخ کوتاه");
  await expect(page.locator("main")).not.toContainText("به‌روزرسانی محتوای صفحه");
  await expect(page.locator(".super-app-hero").getByRole("link", { name: "ورود به اپلیکیشن PWA" })).toHaveAttribute("href", "https://app.khodrochare.ir/");
  await expect(page.locator(".super-app-hand")).toBeVisible();
  await expect(page.locator(".super-app-highlights strong")).toHaveText(["4.8", "50000", "+1000"]);
  await expect(page.locator("#app .app-device")).toHaveCount(2);
  const apk = page.locator("#app .app-showcase-actions").getByRole("button", { name: /دریافت نسخه اندروید/ });
  const download = page.locator('#app a[download]');
  if (await download.count()) await expect(download).toHaveAttribute("href", "/downloads/khodrochare-customer.apk");
  else await expect(apk).toBeDisabled();
  await page.locator(".super-app-hero").screenshot({ path: `coverage/browser/app-hero-${info.project.name}.png` });
});

test("team route is a dedicated director-and-team gallery without general FAQ", async ({ page }, info) => {
  await page.goto("/team");
  await expect(page.locator("main > section")).toHaveCount(1);
  await expect(page.locator(".team-showcase article")).toHaveCount(4);
  await expect(page.locator("main")).toContainText("خانواده خودرو چاره");
  await expect(page.locator("main")).not.toContainText("پرسش‌های متداول");
  await expect(page.locator(".team-showcase article").first()).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await page.locator(".team-showcase").screenshot({ path: `coverage/browser/team-reference-${info.project.name}.png` });
});
