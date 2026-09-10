import { test, expect, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { towHighlights, towHighlightSlotSeconds } from "../../src/content/home-highlights";

const welcomeStorageKey = "khodrochare:welcome-seen:v2";

test.beforeEach(async ({ page }) => {
  await page.route(/google-analytics\.com|googletagmanager\.com/, (route) => route.abort());
});

async function freezeBeforeVisit(page: Page) {
  await page.clock.install({ time: new Date("2026-09-06T08:00:00Z") });
  await page.clock.pauseAt(new Date("2026-09-06T09:00:00Z"));
}

async function visitReady(page: Page, path = "/") {
  await page.goto(path);
  await expect(page.locator("h1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

test.describe("home presentation", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript((key) => sessionStorage.setItem(key, "1"), welcomeStorageKey);
  });

  test("home request card is static, makes no intake request and keeps real contact links", async ({ page }) => {
    const intakeRequests: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).pathname === "/api/service-requests") intakeRequests.push(request.method());
    });
    await visitReady(page);
    const card = page.getByTestId("home-request-card");
    await expect(card.getByRole("heading")).toHaveText("آماده‌سازی درخواست امداد خودرو");
    await expect(card.locator("form, input, select, textarea, button[type='submit']")).toHaveCount(0);
    await expect(card).not.toContainText(/نمایشی|فعال نیست|سفارش ثبت نمی‌کند|در حال بررسی/);
    await expect(card.getByRole("link")).toHaveAttribute("href", "tel:09123022064");
    await expect(card.locator("dt")).toHaveCount(4);
    expect(intakeRequests).toEqual([]);
    const data = await page.evaluate(() => JSON.stringify((window as Window & { dataLayer?: unknown[] }).dataLayer ?? []));
    expect(data).not.toContain("service_request_received");
    expect(data).not.toContain("service_request_prepared");
    const links = page.getByTestId("service-categories").getByRole("link");
    expect(await links.evaluateAll((items) => items.map((item) => item.getAttribute("href")))).toEqual([
      "/services/tow-truck", "/services/jump-start", "/services/mobile-carwash", "/store",
    ]);
  });

  test("service categories meet the hero and align to the top of the desktop card", async ({ page }, info) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await visitReady(page);
    const categories = (await page.getByTestId("service-categories").boundingBox())!;
    const card = (await page.getByTestId("home-request-card").boundingBox())!;
    const hero = (await page.locator("#top").boundingBox())!;
    const copy = (await page.locator(".hero-slide-copy").boundingBox())!;
    expect(card.y).toBeGreaterThanOrEqual(copy.y + copy.height);
    expect(card.y).toBeLessThanOrEqual(hero.y + hero.height);
    if (info.project.name === "desktop") {
      expect(Math.abs(categories.y - card.y)).toBeLessThanOrEqual(1);
      expect(categories.x + categories.width).toBeLessThan(card.x);
    } else {
      expect(categories.y).toBeGreaterThanOrEqual(card.y + card.height);
      expect(Math.abs(categories.x - card.x)).toBeLessThanOrEqual(1);
    }
    await mkdir("coverage/browser/screenshots", { recursive: true });
    await page.getByTestId("service-strip").screenshot({ path: `coverage/browser/screenshots/${info.project.name}-service-strip.png` });
  });

  test("home cards fit narrow phones, tablets and desktop breakpoints", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await visitReady(page);
    for (const width of [320, 390, 768, 1024, 1600]) {
      await page.setViewportSize({ width, height: 900 });
      for (const testId of ["service-strip", "home-request-card", "service-categories"]) {
        const box = (await page.getByTestId(testId).boundingBox())!;
        expect(box.x, `${testId} left at ${width}`).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width, `${testId} right at ${width}`).toBeLessThanOrEqual(width + 1);
      }
      if (width >= 768) {
        const stage = (await page.getByTestId("tow-stage").boundingBox())!;
        const bubble = (await page.locator(".tow-bubble").first().boundingBox())!;
        expect(bubble.x).toBeGreaterThanOrEqual(stage.x);
        expect(bubble.x + bubble.width).toBeLessThanOrEqual(stage.x + stage.width);
      }
      if (width >= 1024) {
        const card = (await page.getByTestId("home-request-card").boundingBox())!;
        const categories = (await page.getByTestId("service-categories").boundingBox())!;
        expect(Math.abs(card.y - categories.y)).toBeLessThanOrEqual(1);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
    }
  });

  test("seven distinct slogans rotate singly above the truck and repeat", async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await visitReady(page);
    const bubbles = page.locator(".tow-bubble");
    await expect(bubbles).toHaveCount(7);
    expect(await bubbles.allTextContents()).toEqual(towHighlights.map((item) => item.text));
    // Seek the real CSS animations instead of depending on wall-clock screenshot timing.
    for (let slot = 0; slot <= towHighlights.length; slot++) {
      const visible = await bubbles.evaluateAll((items, milliseconds) => {
        for (const item of items) {
          const animation = item.getAnimations()[0];
          animation.pause();
          animation.currentTime = milliseconds;
        }
        return items.filter((item) => Number(getComputedStyle(item).opacity) > 0.9).map((item) => item.textContent);
      }, slot * towHighlightSlotSeconds * 1000 + 700);
      expect(visible).toEqual([towHighlights[slot % towHighlights.length].text]);
    }
  });

  test("both wheels visibly rotate and the existing pause button also pauses truck animations", async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await visitReady(page);
    const wheels = page.locator(".tow-stage .wheel");
    await expect(wheels).toHaveCount(2);
    for (const wheel of await wheels.all()) {
      const positions = await wheel.evaluate((element) => {
        const animation = element.getAnimations()[0];
        const running = animation.playState;
        animation.pause();
        animation.currentTime = 0;
        const first = getComputedStyle(element).transform;
        animation.currentTime = 350;
        const second = getComputedStyle(element).transform;
        animation.play();
        return { running, first, second };
      });
      expect(positions.running).toBe("running");
      expect(positions.first).not.toBe(positions.second);
    }
    await page.getByRole("button", { name: "توقف نمایش خودکار" }).click();
    await expect(page.getByTestId("tow-stage")).toHaveAttribute("data-paused", "true");
    for (const item of await page.locator(".tow-stage .wheel, .tow-stage .tow-bubble, .tow-stage .tow-truck").all()) {
      await expect(item).toHaveCSS("animation-play-state", "paused");
    }
    await page.getByRole("button", { name: "ادامه نمایش معرفی خدمات" }).click();
    await expect(page.getByTestId("tow-stage")).toHaveAttribute("data-paused", "false");
    await expect(wheels.first()).toHaveCSS("animation-play-state", "running");
  });

  test("reduced motion leaves one readable slogan and stationary wheels", async ({ page }) => {
    await page.setViewportSize({ width: 1100, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await visitReady(page);
    await expect(page.locator(".tow-bubble").first()).toHaveCSS("opacity", "1");
    const visible = await page.locator(".tow-bubble").evaluateAll((items) => items.filter((item) => Number(getComputedStyle(item).opacity) > 0.9).length);
    expect(visible).toBe(1);
    for (const wheel of await page.locator(".wheel").all()) await expect(wheel).toHaveCSS("animation-name", "none");
  });
});

test.describe("welcome contact dialog", () => {
  test("appears after a delay, keeps the page usable, supports Escape and is session-limited", async ({ page }, info) => {
    await freezeBeforeVisit(page);
    await visitReady(page);
    const dialog = page.getByTestId("welcome-dialog");
    await expect(dialog).toHaveCount(0);
    await page.clock.fastForward(4000);
    await expect(dialog).toHaveCount(0);
    const focusedBefore = await page.evaluate(() => document.activeElement?.tagName);
    await page.clock.fastForward(1000);
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("role", "dialog");
    await expect(dialog).toHaveAttribute("aria-modal", "false");
    await expect(dialog).toContainText("برای ارتباط سریع با ما تماس بگیرید");
    await expect(dialog.getByRole("link", { name: /تماس سریع/ })).toHaveAttribute("href", "tel:09123022064");
    await expect(dialog.getByRole("link", { name: /تماس سریع/ })).toContainText("09123022064");
    await expect(dialog.getByRole("link", { name: "ادامه برای نصب اپلیکیشن و مراجعه به سایت" })).toHaveAttribute("href", "/app");
    expect(await page.evaluate(() => document.activeElement?.tagName)).toBe(focusedBefore);
    expect(await page.evaluate(() => getComputedStyle(document.body).overflowY)).not.toBe("hidden");
    await page.clock.runFor(400);
    await mkdir("coverage/browser/screenshots", { recursive: true });
    await page.screenshot({ path: `coverage/browser/screenshots/${info.project.name}-welcome.png` });
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    expect(await page.evaluate((key) => sessionStorage.getItem(key), welcomeStorageKey)).toBe("1");
    await page.reload();
    await page.clock.fastForward(6000);
    await expect(dialog).toHaveCount(0);
  });

  test("continue closes the dialog and reaches the existing installation guide", async ({ page }) => {
    await freezeBeforeVisit(page);
    await visitReady(page, "/brands/toyota");
    await page.clock.fastForward(5000);
    const dialog = page.getByTestId("welcome-dialog");
    await expect(dialog).toBeVisible();
    await page.clock.runFor(400);
    await dialog.getByRole("link", { name: "ادامه برای نصب اپلیکیشن و مراجعه به سایت" }).click();
    await expect(page).toHaveURL(/\/app$/);
    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole("button", { name: "افزودن به صفحه اصلی" })).toBeVisible();
    await page.clock.fastForward(6000);
    await expect(dialog).toHaveCount(0);
  });

  test("calling uses the real number and dismisses the message", async ({ page }) => {
    await freezeBeforeVisit(page);
    await visitReady(page);
    await page.clock.fastForward(5000);
    const dialog = page.getByTestId("welcome-dialog");
    await expect(dialog).toBeVisible();
    await page.clock.runFor(400);
    const call = dialog.getByRole("link", { name: /تماس سریع/ });
    await expect(call).toHaveAttribute("href", "tel:09123022064");
    await call.evaluate((link) => link.addEventListener("click", (event) => event.preventDefault(), { once: true }));
    await call.click();
    await expect(dialog).toHaveCount(0);
  });

  test("small dialog stays inside narrow, landscape and desktop viewports", async ({ page }) => {
    await freezeBeforeVisit(page);
    await visitReady(page);
    await page.clock.fastForward(5000);
    const dialog = page.getByTestId("welcome-dialog");
    await expect(dialog).toBeVisible();
    await page.clock.runFor(400);
    for (const [width, height] of [[320, 568], [568, 320], [768, 1024], [1366, 900]]) {
      await page.setViewportSize({ width, height });
      const box = (await dialog.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.y).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
      expect(box.y + box.height).toBeLessThanOrEqual(height + 1);
      expect(await dialog.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(1);
    }
    await dialog.getByRole("button", { name: "بستن پیام خوش‌آمدگویی" }).click();
    await expect(dialog).toHaveCount(0);
  });

  test("typing in the independent request form is not interrupted", async ({ page }) => {
    await freezeBeforeVisit(page);
    await visitReady(page, "/امداد-خودرو-آنلاین");
    await expect(page.locator("#request-status")).toContainText("فعال نیست");
    const vehicle = page.locator("#request-vehicle");
    await vehicle.fill("خودروی تست");
    await page.clock.fastForward(7000);
    await expect(page.getByTestId("welcome-dialog")).toHaveCount(0);
    await expect(vehicle).toBeFocused();
    await expect(vehicle).toHaveValue("خودروی تست");
    await vehicle.evaluate((input) => (input as HTMLInputElement).blur());
    await page.clock.fastForward(1500);
    await expect(page.getByTestId("welcome-dialog")).toBeVisible();
    await expect(vehicle).toHaveValue("خودروی تست");
  });

  test("blocked browser storage does not break the dialog or navigation", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript(() => {
      Object.defineProperty(window, "sessionStorage", { get() { throw new DOMException("Storage disabled for this test", "SecurityError"); } });
    });
    await freezeBeforeVisit(page);
    await visitReady(page);
    await page.clock.fastForward(5000);
    const dialog = page.getByTestId("welcome-dialog");
    await expect(dialog).toBeVisible();
    await page.clock.runFor(400);
    await dialog.getByRole("link", { name: "ادامه برای نصب اپلیکیشن و مراجعه به سایت" }).click();
    await expect(page).toHaveURL(/\/app$/);
    await page.clock.fastForward(6000);
    await expect(dialog).toHaveCount(0);
    expect(errors).toEqual([]);
  });
});
