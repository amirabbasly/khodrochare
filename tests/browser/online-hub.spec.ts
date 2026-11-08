import { test, expect } from "@playwright/test";

test("local brief handles unknown needs and copy failure without sending customer information", async ({ page }) => {
  await page.goto("/امداد-خودرو-آنلاین");
  const posts: string[] = [];
  page.on("request", request => { if (request.method() === "POST") posts.push(request.url()); });
  await page.getByLabel("نیاز اولیه", { exact: true }).selectOption("battery");
  await page.getByLabel("محل توقف و جهت حرکت", { exact: true }).fill("کرج، ورودی پارکینگ");
  await page.getByLabel("مدل، سال و نوع گیربکس", { exact: true }).fill("کرولا اتوماتیک");
  await expect(page.locator("#brief-result")).toHaveValue(/برق و باتری[\s\S]*کرج، ورودی پارکینگ[\s\S]*کرولا اتوماتیک/);
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: () => Promise.reject(new Error("Denied")) } }));
  await page.getByRole("button", { name: "کپی شرح درخواست", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("دستی کپی کنید");
  await expect(page.getByRole("link", { name: "شروع درخواست در اپ مشتریان", exact: true }).last()).toHaveAttribute("href", "https://app.khodrochare.ir/");
  expect(posts).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test("server HTML includes service links and matching FAQ schemas without client execution", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3218/امداد-خودرو-آنلاین");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator('#request a[href="https://app.khodrochare.ir/"]')).toBeAttached();
  await expect(page.locator("#choose-service nav a")).toHaveCount(6);
  const schemas = (await page.locator('script[type="application/ld+json"]').allTextContents()).map(s => JSON.parse(s));
  expect(schemas.some(s => s["@type"] === "Service")).toBe(true);
  const faq = schemas.find(s => s["@type"] === "FAQPage");
  expect(faq.mainEntity).toHaveLength(6);
  for (const item of faq.mainEntity) await expect(page.getByText(item.name, { exact: true })).toBeAttached();
  await context.close();
});
