import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2","1"));
});

test("app ribbon uses supplied phone screenshots with real app actions, no fake store link", async ({page,isMobile}) => {
  await page.goto("/");
  const app=page.locator("#app");
  await app.scrollIntoViewIfNeeded();
  await expect(app).toHaveCSS("opacity","1");
  await expect(app.locator(".app-phone")).toHaveCount(3);
  for(const phone of await app.locator(".app-phone").all()) {
    await expect(phone).toHaveJSProperty("complete",true);
    expect(await phone.evaluate(el=>(el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await expect(phone).toHaveAttribute("src",/app-screens/);
  }
  await expect(app.getByRole("link",{name:"دانلود و نصب وب‌اپلیکیشن",exact:true})).toHaveAttribute("href","https://app.khodrochare.ir/");
  await expect(app.getByRole("link",{name:/راهنمای نصب در آیفون/})).toHaveAttribute("href","/app");
  await expect(app.locator('a[href*="bazaar"],a[href*="sibapp"]')).toHaveCount(0);
  const panel=(await app.locator(".app-showcase-panel").boundingBox())!;
  const phone=(await app.locator(".app-phone-front").boundingBox())!;
  expect(phone.y).toBeLessThan(panel.y);
  const heading=(await app.locator("h2").boundingBox())!;
  if(isMobile) expect(phone.y+phone.height).toBeLessThan(heading.y);
  else expect(heading.x+heading.width).toBeLessThan(phone.x);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await app.screenshot({path:`coverage/browser/app-ribbon-${isMobile?"mobile":"desktop"}.png`});
});

test("trust banner uses the actual image wordmark and dedicated vehicle art, retains trust details",async({page,isMobile})=>{
  await page.goto("/");
  const trust=page.locator("#trust");
  await trust.scrollIntoViewIfNeeded();
  await expect(trust).toHaveCSS("opacity","1");
  await expect(trust.locator(".trust-showcase-wordmark")).toHaveAttribute("alt","خودرو چاره");
  await expect(trust.locator(".trust-showcase-wordmark")).toHaveAttribute("src",/khodrochare-wordmark/);
  await expect(trust.locator("li")).toHaveCount(4);
  for(const phrase of ["خدمات مطمئن","اعلام هزینه پیش از شروع","هماهنگی رسید و شرایط ضمانت","پاسخ‌گویی شبانه‌روزی"]) await expect(trust).toContainText(phrase);
  await expect(trust.getByRole("link",{name:/آشنایی با مجموعه/})).toHaveAttribute("href","/about");
  await trust.screenshot({path:`coverage/browser/trust-ribbon-${isMobile?"mobile":"desktop"}.png`});
  if(isMobile) {
    await page.setViewportSize({width:320,height:800});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    const app=page.locator("#app");
    await app.scrollIntoViewIfNeeded();
    const phone=(await app.locator(".app-phone-front").boundingBox())!;
    const heading=(await app.locator("h2").boundingBox())!;
    expect(phone.y+phone.height).toBeLessThan(heading.y);
  }
});
