import { test, expect } from "@playwright/test";

test.beforeEach(async ({page}) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("home request card has no app entry, magazine bullets navigate", async ({page}) => {
  await page.goto("/");
  const card = page.getByTestId("home-request-card");
  await expect(card.locator('[data-app-entry="customer"]')).toHaveCount(0);
  await expect(card.getByRole("link", {name:"راهنمای امداد خودرو آنلاین؛ انتخاب خدمت و هزینه"})).toBeVisible();
  const magazine = page.getByTestId("home-latest-articles");
  await magazine.getByRole("button", {name:"صفحه 2 مقالات", exact:true}).click();
  await expect(magazine.getByRole("button", {name:"صفحه 2 مقالات", exact:true})).toHaveAttribute("aria-current","page");
  await magazine.getByRole("button", {name:"مقالات قبلی"}).click();
  await expect(magazine.getByRole("button", {name:"صفحه 1 مقالات", exact:true})).toHaveAttribute("aria-current","page");
});

test("archive keeps featured images but latest guides are text-only with pagination", async ({page}) => {
  await page.goto("/blog");
  const pages = page.getByTestId("article-pagination");
  await expect(pages.locator("img")).toHaveCount(0);
  await expect(page.locator("main img").first()).toBeVisible();
  const firstTitle = await pages.locator('div:not([hidden]) > article h3').first().textContent();
  const nav = page.getByRole("navigation", {name:"صفحه‌بندی تازه‌ترین راهنماها"});
  await expect(nav.getByRole("button", {name:"قبلی Prev"})).toBeDisabled();
  await nav.getByRole("button", {name:"بعدی Next"}).click();
  await expect(nav.getByRole("button", {name:"صفحه 2 راهنماها",exact:true})).toHaveAttribute("aria-current","page");
  expect(await pages.locator('div:not([hidden]) > article h3').first().textContent()).not.toBe(firstTitle);
  await nav.getByRole("button", {name:"صفحه 1 راهنماها",exact:true}).click();
  await expect(nav.getByRole("button", {name:"قبلی Prev"})).toBeDisabled();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1)).toBe(true);
});

test("theme uses neutral text and app actions align right on desktop", async ({page}, info) => {
  await page.goto("/");
  await expect(page.locator("#home-request-title")).toHaveCSS("color","rgb(23, 23, 23)");
  await page.getByRole("button", {name:"تم تاریک",exact:true}).click();
  await expect(page.locator("#home-request-title")).toHaveCSS("color","rgb(240, 241, 243)");
  if (info.project.name === "desktop") {
    const nav = page.getByRole("navigation", {name:"اپلیکیشن‌های خودرو چاره",exact:true});
    await expect(nav).toHaveCSS("justify-content","flex-start");
    await expect(nav).toHaveCSS("direction","rtl");
  }
});
