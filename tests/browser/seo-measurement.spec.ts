import { test, expect } from "@playwright/test";

test("call click is measurable without inventing confirmed requests", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  await page.evaluate(() => {
    document.addEventListener("click", event => {
      const link = (event.target as Element | null)?.closest("a");
      if (link?.getAttribute("href")?.startsWith("tel:")) event.preventDefault();
    }, { capture: true });
  });
  await page.locator('a[href="tel:02182801043"]:visible').first().click();
  const events = await page.evaluate(() => (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer ?? []);
  expect(events.filter(e => e.event === "click_to_call")).toHaveLength(1);
  expect(events.filter(e => e.event === "request_confirmed")).toHaveLength(0);
  const event = events.find(e => e.event === "click_to_call")!;
  expect(event).not.toHaveProperty("phone");
  expect(event).not.toHaveProperty("location");
});

test("public bot directives preserve API exclusion for independent search bots", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const text = await response.text();
  for (const bot of ["YandexBot", "YandexImages", "PerplexityBot", "OAI-SearchBot", "GPTBot"]) {
    const group = text.split(/\n\s*\n/).find(g => g.includes(`User-Agent: ${bot}\n`));
    expect(group, bot).toBeTruthy();
    expect(group).toContain("Disallow: /api/");
  }
});
