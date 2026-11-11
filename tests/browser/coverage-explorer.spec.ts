import { test, expect } from "@playwright/test";
import { homeLocalLinkGroups } from "../../src/content/home-local-links";
import { allCities } from "../../src/content/coverage";
import { mapServices } from "../../src/content/coverage-explorer";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("city search and province pins select real local services without sending requests", async ({ page }, info) => {
  const posted: string[] = [];
  page.on("request", request => { if (request.method() === "POST") posted.push(request.url()); });
  await page.goto("/");
  const map = page.getByTestId("coverage-explorer");
  await expect(map).toHaveCount(1);
  await expect(map.getByRole("heading", { name:"امداد خودرو تهران", exact:true })).toBeVisible();
  const search = map.getByLabel("جست‌وجوی شهر یا استان", {exact:true});
  await search.fill("رشت");
  await expect(map.locator("#coverage-city-list button:visible")).toHaveCount(1);
  await map.locator("#coverage-city-list").getByRole("button", {name:/رشت/}).click();
  await expect(map.getByRole("heading", {name:"امداد خودرو رشت",exact:true})).toBeVisible();
  await expect(map.locator(".coverage-selected-services a").first()).toHaveAttribute("href", "/رشت/امداد-خودرو");
  await search.fill("وجودندارد");
  await expect(map.getByText("شهری پیدا نشد.", {exact:false})).toBeVisible();
  await map.getByRole("button", {name:"نمایش همه شهرها",exact:true}).click();
  await expect(map.locator("#coverage-city-list button:visible")).toHaveCount(allCities.length);
  await map.getByRole("button", {name:"انتخاب استان گلستان",exact:true}).click();
  await expect(map.getByRole("heading", {name:"امداد خودرو گرگان",exact:true})).toBeVisible();
  await expect(map.getByRole("button", {name:"انتخاب استان گلستان",exact:true})).toHaveAttribute("aria-pressed", "true");
  await search.fill("كرج");
  await expect(map.locator("#coverage-city-list button:visible")).toHaveCount(1);
  await search.fill("");
  await expect(map.locator(".coverage-stats strong")).toHaveText(["۳۰","۳","۵","۱"]);
  await expect(map.locator(".coverage-average-note")).toContainText("میانگین اعلام‌شده");
  await expect(map.locator(".coverage-map-geography > img")).toBeVisible();
  await expect.poll(() => map.locator(".coverage-map-geography > img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await map.screenshot({path:`coverage/browser/coverage-map-${info.project.name}.png`});
  if (info.project.name === "mobile") await page.setViewportSize({width:320,height:780});
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  expect(posted).toEqual([]);
});

test("all original service, north and 59 directory links remain in server HTML and can be opened", async ({ page, request }) => {
  const response = await request.get("/");
  expect(response.ok()).toBe(true);
  const html = await response.text();
  for (const item of [...homeLocalLinkGroups.flatMap(group => group.links), ...mapServices]) {
    expect(html).toContain(`href="${item.href}"`);
  }
  await page.goto("/");
  const details = page.locator(".coverage-seo-directory");
  await expect(details).not.toHaveAttribute("open");
  await details.locator("summary").click();
  await expect(page.getByTestId("home-local-directory").getByRole("link")).toHaveCount(59);
  await expect(page.getByTestId("home-north-hub").getByRole("link")).toHaveCount(20);
  await expect(details.getByRole("heading", {name:"هماهنگی متخصص بر اساس خودرو و موقعیت"})).toBeVisible();
  await expect(details.getByRole("link", {name:"تویوتا تهران",exact:false})).toHaveAttribute("href","/تهران/brands/toyota");
});


test("compact city actions stay in the introduction and reveals start at map entry", async ({ page }) => {
  await page.emulateMedia({ reducedMotion:"no-preference" });
  await page.goto("/");
  const explorer = page.getByTestId("coverage-explorer");
  await expect(explorer).toHaveAttribute("data-city-motion", "waiting");
  await expect(explorer.locator(".coverage-map-pin").first()).toHaveCSS("animation-name", "none");
  await expect(explorer.locator(".coverage-map-board .coverage-inline-summary")).toHaveCount(0);
  await expect(explorer.locator(".coverage-selection")).toHaveCount(0);
  await expect(explorer.locator(".coverage-controls .coverage-stats strong")).toHaveText(["۳۰","۳","۵","۱"]);
  await expect(explorer.locator(".coverage-controls .coverage-selected-services a")).toHaveCount(4);
  await explorer.locator(".coverage-map-geography").scrollIntoViewIfNeeded();
  await expect(explorer).toHaveAttribute("data-city-motion", "on");
  const pin = explorer.getByRole("button", {name:"انتخاب استان تهران",exact:true});
  await pin.scrollIntoViewIfNeeded();
  await expect(pin).toHaveAttribute("data-city-revealed", "true");
  await expect(pin).toHaveCSS("animation-name", "coverage-pin-arrive");
  await expect(explorer.locator(".coverage-map-pin").nth(1)).toHaveCSS("animation-delay", "0.14s");
  const notes = explorer.locator(".coverage-map-notes");
  await notes.locator("summary").click();
  await expect(notes.locator(".coverage-average-note")).toBeVisible();
  await expect(notes.locator(".coverage-service-descriptions p")).toHaveCount(4);
  await page.emulateMedia({ reducedMotion:"reduce" });
  await expect(explorer).toHaveAttribute("data-city-motion", "off");
  await expect(pin).toHaveCSS("animation-name", "none");
  await expect(pin).toHaveCSS("opacity", "1");
});
