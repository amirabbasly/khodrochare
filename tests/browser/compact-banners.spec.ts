import {test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem("khodrochare:welcome-seen:v2","1"));});
test("contact banner uses overhead car, diagonal background and real phone actions",async({page,isMobile})=>{
 await page.goto("/");
 const contact=page.locator("#contact");await contact.scrollIntoViewIfNeeded();
 await expect(contact).toHaveCSS("opacity","1");
 await expect(contact.locator("h2")).toHaveText("همین حالا کمک می‌خواهید؟");
 await expect(contact.locator("img")).toHaveAttribute("src",/contact-overhead-car/);
 await expect(contact.locator(".contact-rescue-call")).toHaveAttribute("href","tel:09123022064");
 await expect(contact.locator(".contact-rescue-number")).toHaveAttribute("href","tel:09123022064");
 await contact.screenshot({path:`coverage/browser/contact-compact-${isMobile?'mobile':'desktop'}.png`});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test("journey hides on mobile and comparison is compact without dropping its rows",async({page,isMobile})=>{
 await page.goto("/");
 if(isMobile)await expect(page.locator("#request-process")).not.toBeVisible();else await expect(page.locator("#request-process")).toBeVisible();
 const comparison=page.locator("#assistance-comparison");await comparison.scrollIntoViewIfNeeded();
 await expect(comparison.locator("tbody tr")).toHaveCount(5);
 expect((await comparison.locator(".comparison-scroll").boundingBox())!.height).toBeLessThan(340);
 if(isMobile)expect((await comparison.boundingBox())!.height).toBeLessThan(560);
 const note=comparison.locator("#comparison-note");await expect(note).not.toHaveAttribute("open");await note.locator("summary").click();await expect(note.locator("p")).toBeVisible();await note.locator("summary").click();
 await comparison.screenshot({path:`coverage/browser/comparison-compact-${isMobile?'mobile':'desktop'}.png`});
});
