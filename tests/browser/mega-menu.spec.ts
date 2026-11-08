import {test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{await page.addInitScript(()=>sessionStorage.setItem("khodrochare:welcome-seen:v2","1"));});
test("marketplace links replace the assistance button in both navigation versions",async({page,isMobile})=>{
 await page.goto("/");
 if(isMobile)await page.getByRole("button",{name:"باز کردن منوی اصلی"}).click();
 const nav=page.getByRole("navigation",{name:isMobile?"منوی موبایل":"منوی اصلی",exact:true});
 await expect(nav.getByRole("button",{name:"امداد خودرو",exact:true})).toHaveCount(0);
 await expect(nav.getByRole("link",{name:"جمعه بازار لوازم یدکی",exact:true})).toHaveAttribute("href","/friday-market");
 await nav.getByRole("link",{name:"تالار خرید و فروش خودرو",exact:true}).click();
 await expect(page).toHaveURL(/car-market/);await expect(page.locator("h1")).toHaveText("تالار خرید و فروش خودرو");
 await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content",/noindex/);
 if(isMobile)await expect(page.locator("#mobile-navigation")).toHaveAttribute("aria-hidden","true");
});
