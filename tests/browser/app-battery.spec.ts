import { test, expect } from "@playwright/test";
for (const path of ["/app", "/battery", "/امداد-خودرو-آنلاین", "/licenses"]) {
  test(`app release page is usable with canonical and no overflow: ${path}`, async ({page}) => {
    await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
    const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new URL(path,"https://khodrochare.ir").href);
    await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
    if (path==="/app") {
      await expect(page.locator('main a[href="https://safir.khodrochare.ir/"]').first()).toBeVisible();
      await expect(page.locator('main a[href="https://app.khodrochare.ir/"]').first()).toBeVisible();
    }
    if (path==="/battery") {
      await expect(page.locator('[id^="battery-"]')).toHaveCount(12);
      await expect(page.locator('#battery-iran-khodro')).toContainText("دنا و تارا");
    }
  });
}
