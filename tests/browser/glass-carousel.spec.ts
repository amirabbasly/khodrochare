import {test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem("khodrochare:welcome-seen:v2","1"));});
test("mobile review centres a larger card with both neighbours clipped and new arrow controls",async({page,isMobile})=>{
 await page.goto("/");const reviews=page.locator("#home-feedback");await reviews.scrollIntoViewIfNeeded();await expect(reviews).toHaveCSS("opacity","1");
 await expect(reviews.locator(".feedback-arrow svg")).toHaveCount(2);
 if(isMobile){
  await expect(reviews.locator(".feedback-card").nth(1)).toHaveAttribute("data-active","true");
  const geometry=()=>reviews.locator(".feedback-track").evaluate(el=>{const r=el.getBoundingClientRect(),cards=Array.from(el.children).map(c=>c.getBoundingClientRect());return {centre:Math.abs((cards[1].left+cards[1].right)/2-(r.left+r.right)/2),larger:cards[1].width>cards[0].width,left:cards[2].left<r.left&&cards[2].right>r.left,right:cards[0].left<r.right&&cards[0].right>r.right};});
  await expect.poll(async()=> (await geometry()).centre).toBeLessThan(2);
  expect(await geometry()).toMatchObject({larger:true,left:true,right:true});
  await reviews.getByRole("button",{name:"نظرات بعدی"}).click();await expect(reviews.locator(".feedback-card").nth(2)).toHaveAttribute("data-active","true");
  const track=reviews.locator(".feedback-track");await track.focus();await page.keyboard.press("ArrowRight");await expect(reviews.locator(".feedback-card").nth(1)).toHaveAttribute("data-active","true");
  await page.emulateMedia({reducedMotion:"reduce"});await expect(reviews.locator(".feedback-card").nth(1)).toHaveCSS("transition-duration",/0s|1e-05s/);
 }
 await reviews.screenshot({path:`coverage/browser/centred-feedback-${isMobile?'mobile':'desktop'}.png`});
});
test("glass dock and desktop header are rounded, keep destinations and safe clearances",async({page,isMobile})=>{
 await page.goto("/");await expect(page.locator(".home-landing")).toBeVisible();
 if(isMobile){const nav=page.locator(".mobile-bottom-nav");await expect(nav).toHaveCSS("border-radius","25px");await expect(nav).toHaveCSS("backdrop-filter",/blur\(22px\)/);const r=(await nav.boundingBox())!;expect(r.x).toBeGreaterThan(0);expect(r.x+r.width).toBeLessThan(360);const support=(await page.locator(".floating-support").boundingBox())!;expect(support.y+support.height).toBeLessThan(r.y);await page.screenshot({path:"coverage/browser/glass-bottom-nav.png"});}
 else{const header=page.locator(".desktop-header-shell");await expect(header).toHaveCSS("border-radius","30px");await expect(header).toHaveCSS("backdrop-filter",/blur\(22px\)/);await expect(page.getByRole("navigation",{name:"منوی اصلی",exact:true}).getByRole("link",{name:"تالار خرید و فروش خودرو",exact:true})).toBeVisible();await page.locator(".site-header").screenshot({path:"coverage/browser/glass-header.png"});}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test("magazine retains readable cards, page controls and recent-only loading",async({page,isMobile})=>{
 await page.goto("/");const magazine=page.locator(".magazine-shell");await magazine.scrollIntoViewIfNeeded();await expect(magazine).toHaveCSS("opacity","1");await expect(magazine.locator(".magazine-slide-card")).toHaveCount(5);await expect(magazine.locator(".magazine-read svg")).toHaveCount(5);await magazine.screenshot({path:`coverage/browser/editorial-magazine-${isMobile?'mobile':'desktop'}.png`});
});
