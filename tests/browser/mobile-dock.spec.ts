import {test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem("khodrochare:welcome-seen:v2","1"));});
test("three-column comparison uses the image wordmark and no criterion column",async({page})=>{
 await page.goto("/");const table=page.locator(".assistance-comparison-table");
 await expect(table.locator("thead th")).toHaveCount(3);await expect(table.locator("tbody tr")).toHaveCount(5);
 for(const row of await table.locator("tbody tr").all())await expect(row.locator("th,td")).toHaveCount(3);
 await expect(table.getByRole("columnheader",{name:"معیار مقایسه"})).toHaveCount(0);
 await expect(table.locator(".comparison-wordmark")).toHaveAttribute("alt","خودرو چاره");
});
test("mobile preserves desktop section placements, two banners and three review cards",async({page,isMobile})=>{
 await page.goto("/");await expect(page.locator(".home-landing")).toBeVisible();
 const features=page.locator("#services article");const pair=await features.evaluateAll(nodes=>nodes.map(n=>({x:n.getBoundingClientRect().x,y:n.getBoundingClientRect().y})));
 expect(Math.abs(pair[0].y-pair[1].y)).toBeLessThan(2);
 const trust=page.locator("#trust");await trust.scrollIntoViewIfNeeded();
 const art=(await trust.locator(".trust-showcase-art").boundingBox())!,copy=(await trust.locator(".trust-showcase-copy").boundingBox())!;
 expect(art.x+art.width).toBeLessThanOrEqual(copy.x+2);
 const feedback=page.locator("#home-feedback");await feedback.scrollIntoViewIfNeeded();
 const track=feedback.locator(".feedback-track");const count=await track.evaluate(el=>{const rect=el.getBoundingClientRect();return Array.from(el.children).filter(c=>{const box=c.getBoundingClientRect();return box.left>=rect.left-1&&box.right<=rect.right+1;}).length;});expect(count).toBe(3);
 const contact=page.locator("#contact");await contact.scrollIntoViewIfNeeded();
 const car=(await contact.locator(".contact-rescue-art").boundingBox())!,text=(await contact.locator(".contact-rescue-copy").boundingBox())!;
 expect(car.x).toBeLessThan(text.x);expect(car.y).toBeLessThanOrEqual(text.y+1);
 if(isMobile){for(const section of [trust,feedback,contact])await section.screenshot({path:`coverage/browser/dock-${await section.getAttribute('id')}.png`});}
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test("image-based bottom navigation stays clear of support and works on temporary pages",async({page,isMobile,request})=>{
 for(const path of ["/friday-market","/car-market","/imports"]){const response=await request.get(path);expect(response.ok()).toBe(true);expect(await response.text()).toContain("noindex");}
 await page.goto("/");const dock=page.getByRole("navigation",{name:"ناوبری پایین موبایل"});
 if(!isMobile){await expect(dock).not.toBeVisible();return;}
 await expect(dock).toBeVisible();await expect(dock.getByRole("link")).toHaveCount(4);await expect(dock.locator("img")).toHaveCount(4);await expect(dock.locator("svg")).toHaveCount(0);
 const support=(await page.locator(".floating-support").boundingBox())!,nav=(await dock.boundingBox())!;expect(support.y+support.height).toBeLessThan(nav.y);
 await dock.getByRole("link",{name:"جمعه بازار لوازم یدکی",exact:true}).click();await expect(page.locator("h1")).toHaveText("جمعه بازار لوازم یدکی");await expect(dock.getByRole("link",{name:"جمعه بازار لوازم یدکی",exact:true})).toHaveAttribute("aria-current","page");
 await page.setViewportSize({width:320,height:800});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.screenshot({path:"coverage/browser/mobile-dock-320.png"});
});
