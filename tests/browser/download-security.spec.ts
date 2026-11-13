import { test, expect } from "@playwright/test";
import { getAppDownload, type DownloadApp } from "../../src/lib/app-downloads";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("production CSP allows Cloudflare script and telemetry without permitting all external scripts", async ({ page }) => {
  const response = await page.goto("/");
  const csp = response!.headers()["content-security-policy"];
  expect(csp).toContain("https://static.cloudflareinsights.com");
  expect(csp).toContain("https://cloudflareinsights.com");
  expect(csp).not.toContain("script-src *");
  expect(csp).toContain("object-src 'none'");
});

test("app downloads are direct when released, explicitly disabled otherwise, and distinguish Android from iPhone", async ({ page }) => {
  for (const [path, apps] of [["/app", ["customer", "fleet"]], ["/safir", ["fleet"]]] as [string, DownloadApp[]][]) {
    await page.goto(path);
    const section = page.locator("#downloads");
    await expect(section).toBeVisible();
    await expect(section).toContainText("iPhone");
    for (const app of apps) {
      const release = getAppDownload(app);
      const card = section.locator(`[data-download-app="${app}"]`);
      if (release.available) {
        await expect(card.locator("a[download]")).toHaveAttribute("href", release.href);
        const response = await page.request.head(release.href);
        expect(response.status()).toBe(200);
        expect(response.headers()["x-robots-tag"]).toContain("noindex");
        expect(response.headers()["content-disposition"]).toContain("attachment");
      } else {
        await expect(card.getByRole("button")).toBeDisabled();
        await expect(card.locator('a[href$=".apk"]')).toHaveCount(0);
        await expect(card).toContainText("هنوز منتشر نشده");
      }
      await expect(card.getByRole("link", { name: /ورود به نسخه وب/ })).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
});

test("dark theme is present in server HTML without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto(baseURL!);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  } finally { await context.close(); }
});
