import {test,expect} from "@playwright/test";
import {serviceFeedback} from "../../src/content/reviews";
test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem("khodrochare:welcome-seen:v2","1"));});
test("store is removed and real supplied feedback replaces it as a navigable carousel",async({page,isMobile})=>{
 await page.goto("/");await expect(page.locator("#products")).toHaveCount(0);
 await expect(page.getByText("فروشگاه قطعات منتخب",{exact:true})).toHaveCount(0);
 const section=page.locator("#home-feedback");await section.scrollIntoViewIfNeeded();await expect(section).toHaveCSS("opacity","1");
 await expect(section.locator("blockquote")).toHaveText(serviceFeedback.map(f=>f.text));
 await expect(section.getByRole("button",{name:"نظرات قبلی"})).toBeDisabled();
 await section.getByRole("button",{name:"نظرات بعدی"}).click();await expect(section.locator(".feedback-position")).not.toHaveText("بازخورد ۱ از ۳۰");
 await section.getByRole("button",{name:"نظرات قبلی"}).click();await expect(section.getByRole("button",{name:"نظرات قبلی"})).toBeDisabled();
 expect(await section.textContent()).not.toContain("★");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await section.screenshot({path:`coverage/browser/feedback-${isMobile?'mobile':'desktop'}.png`});
});
test("app uses the two exact supplied screens, not the redesigned mockups",async({page,isMobile})=>{
 await page.goto("/");const app=page.locator("#app");await app.scrollIntoViewIfNeeded();
 await expect(app.locator(".app-phone")).toHaveCount(2);
 await expect(app.locator(".app-phone-front")).toHaveAttribute("src",/home-exact/);
 await expect(app.locator(".app-phone-back")).toHaveAttribute("src",/services-exact/);
 await expect(app.locator(".app-phone-front")).toHaveAttribute("width","598");
 expect((await app.locator(".app-phone-front").boundingBox())!.y).toBeGreaterThanOrEqual((await app.boundingBox())!.y);
 await app.screenshot({path:`coverage/browser/exact-app-${isMobile?'mobile':'desktop'}.png`});
});
test("1920 and 2560 monitors preserve laptop hero and content widths",async({page})=>{
 await page.setViewportSize({width:1366,height:900});await page.goto("/");await expect(page.locator(".home-landing")).toBeVisible();
 const measure=()=>page.evaluate(()=>({main:document.querySelector(".home-landing")!.getBoundingClientRect().width,hero:document.querySelector(".premium-hero")!.getBoundingClientRect().width,app:document.querySelector("#app")!.getBoundingClientRect().width,header:document.querySelector(".header-container")!.getBoundingClientRect().width}));
 const laptop=await measure();
 for(const width of [1920,2560]){
  await page.setViewportSize({width,height:1080});const current=await measure();
  for(const key of ["main","hero","app","header"] as const)expect(Math.abs(current[key]-laptop[key])).toBeLessThan(1);
  expect(await page.evaluate(()=>Math.abs(document.querySelector(".home-landing")!.getBoundingClientRect().x-(innerWidth-1366)/2))).toBeLessThan(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
 await page.screenshot({path:"coverage/browser/large-monitor-home.png"});
});
