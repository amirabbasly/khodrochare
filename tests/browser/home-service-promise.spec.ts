import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});

test("four photographic request steps replace business facts and the assistant section is gone", async ({ page, isMobile }) => {
  await page.goto("/");
  await expect(page.getByTestId("home-brand-carousel").getByRole("heading")).toHaveText("پوشش تمامی برندهای خودرو و کارشناسان آموزش‌دیده");
  await expect(page.locator("#business-facts-title, #assistant")).toHaveCount(0);
  const steps = page.locator("#request-process");
  await expect(steps.locator("ol > li")).toHaveCount(4);
  await expect(steps.locator("img")).toHaveCount(4);
  await expect(steps.locator("h3")).toHaveText(["ثبت درخواست و بررسی موقعیت", "اعلام هزینه و اعزام کارشناس", "بررسی فنی و انجام خدمت", "تأیید پایان کار و پیگیری سفارش"]);
  await expect(steps.locator("a")).toHaveAttribute("href","https://app.khodrochare.ir/");
  if (isMobile) { await expect(steps).not.toBeVisible(); return; }
  await steps.scrollIntoViewIfNeeded();
  await expect(steps).toHaveCSS("opacity", "1");
  const boxes = await steps.locator("ol > li").evaluateAll(nodes => nodes.map(node => ({x:node.getBoundingClientRect().x,y:node.getBoundingClientRect().y})));
  expect(new Set(boxes.map(box => Math.round(isMobile ? box.x : box.y))).size).toBe(1);
  await page.screenshot({path:`coverage/browser/journey-${isMobile ? "mobile" : "desktop"}.png`});
});

test("comparison has five declared commitments, qualified alternatives and locally scrollable mobile table", async ({ page, isMobile }) => {
  await page.goto("/");
  const comparison = page.locator("#assistance-comparison");
  await comparison.scrollIntoViewIfNeeded();
  await expect(comparison).toHaveCSS("opacity","1");
  await expect(comparison.locator("thead th")).toHaveText(["معیار مقایسه","تعهدات ما","سایر شرکت‌ها","امدادگران آزادکار"]);
  await expect(comparison.locator("tbody tr")).toHaveCount(5);
  const promises = comparison.locator("tbody .comparison-featured");
  for (const phrase of ["تعرفه اتحادیه","واردات عمده","بازگشت وجه","تضمین کامل","مدرک صادرشده از سوی خود شرکت"]) await expect(promises.filter({hasText:phrase})).toHaveCount(1);
  await expect(comparison.locator("#comparison-note")).toContainText("به معنی فقدان این خدمات در همه آن‌ها نیست");
  await expect(comparison.locator("#comparison-note")).toContainText("مدرک داخلی شرکت");
  const scrollable = await comparison.locator(".comparison-scroll").evaluate(el => el.scrollWidth > el.clientWidth);
  expect(scrollable).toBe(isMobile);
  if (isMobile) {
    await comparison.locator(".comparison-scroll").evaluate(el => {el.scrollLeft = -el.scrollWidth;});
    await expect(comparison.getByRole("columnheader", {name:"امدادگران آزادکار"})).toBeInViewport();
    await comparison.locator(".comparison-scroll").evaluate(el => {el.scrollLeft = 0;});
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await comparison.screenshot({path:`coverage/browser/comparison-${isMobile ? "mobile" : "desktop"}.png`});
});

test("magazine is a horizontal snap carousel on mobile, not five stacked articles", async ({ page, isMobile }) => {
  await page.goto("/");
  const magazine = page.getByTestId("home-latest-articles");
  await magazine.scrollIntoViewIfNeeded();
  await expect(magazine.getByRole("link")).toHaveCount(5);
  await expect(magazine.locator(".magazine-card-track")).toHaveCSS("scroll-snap-type","x mandatory");
  const rects = await magazine.getByRole("link").evaluateAll(cards => cards.map(card => ({x:card.getBoundingClientRect().x, y:card.getBoundingClientRect().y, height:card.getBoundingClientRect().height, width:card.getBoundingClientRect().width})));
  expect(new Set(rects.map(rect => Math.round(rect.y))).size).toBe(1);
  if (isMobile) {
    const width = await magazine.locator(".magazine-card-track").evaluate(el => el.clientWidth);
    expect(rects[0].width).toBeLessThan(width);
    expect(rects[0].width).toBeGreaterThan(width * .8);
    // A genuine touch swipe, independent of the arrow buttons.
    const track = magazine.locator(".magazine-card-track");
    const box = (await track.boundingBox())!;
    const session = await page.context().newCDPSession(page);
    const y = box.y + Math.min(160,box.height / 2);
    await session.send("Input.dispatchTouchEvent", {type:"touchStart",touchPoints:[{x:box.x + 55,y}]});
    for (let i=1;i<=8;i++) await session.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:box.x + 55 + i * 24,y}]});
    await session.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
    await expect(magazine).not.toHaveAttribute("data-active-article","0");
    await magazine.getByRole("button",{name:"صفحه 1 مقالات"}).click();
    await expect(magazine).toHaveAttribute("data-active-article","0");
  }
  if (isMobile) {
    await page.setViewportSize({width:320,height:800});
    await expect(magazine).toHaveAttribute("data-active-article","0");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  }
  await magazine.screenshot({path:`coverage/browser/magazine-${isMobile ? "mobile" : "desktop"}.png`});
});
