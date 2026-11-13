import { test, expect } from "@playwright/test";
import { blogPosts } from "../../src/content/blog";
import { latestHomeArticles } from "../../src/content/home-articles";
const cards=latestHomeArticles(blogPosts);
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});
test("home mounts only five recent cards, loads the next five on demand, and retains archive navigation", async ({page, isMobile}) => {
  await page.goto("/");
  const magazine=page.getByTestId("home-latest-articles");
  await expect(magazine.locator("h3")).toHaveText(cards.slice(0,5).map(card=>card.title));
  await expect(magazine.locator("img")).toHaveCount(cards.slice(0,5).filter(card => card.image).length);
  await expect(magazine.getByRole("button",{name:"مقالات قبلی"})).toBeDisabled();
  await magazine.getByRole("button",{name:"مقالات بعدی"}).click();
  await expect(magazine).toHaveAttribute("data-active-article",isMobile ? "1" : "5");
  if (isMobile) {
    await magazine.getByRole("button",{name:"صفحه 2 مقالات"}).click();
    await expect(magazine).toHaveAttribute("data-active-article","5");
    await magazine.getByRole("link").last().scrollIntoViewIfNeeded();
    await expect(magazine).toHaveAttribute("data-active-article","9");
  }
  await expect(magazine.getByRole("link")).toHaveCount(10);
  await expect(magazine.getByRole("button",{name:"مقالات بعدی"})).toBeDisabled();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await magazine.getByRole("button",{name:"صفحه 1 مقالات"}).click();
  await expect(magazine).toHaveAttribute("data-active-article","0");
  await expect(magazine.getByRole("button",{name:"مقالات قبلی"})).toBeDisabled();
  await expect(page.locator('[aria-labelledby="magazine-title"]').getByRole("link",{name:"موارد بیشتر"})).toHaveAttribute("href","/blog");
});
test("opening home does not prefetch the entire local directory",async({page})=>{
  const prefetched:string[]=[];
  page.on("request",request=>{if(request.headers()["next-router-prefetch"]==="1")prefetched.push(decodeURIComponent(new URL(request.url()).pathname));});
  await page.goto("/");
  await page.locator(".coverage-seo-directory > summary").click();
  const directory=page.getByTestId("home-local-directory");
  await directory.scrollIntoViewIfNeeded();
  await expect(directory.getByRole("link")).toHaveCount(59);
  const localTargets=await directory.locator("a").evaluateAll(elements=>elements.map(element=>element.getAttribute("href")));
  expect(prefetched.filter(path=>localTargets.includes(path))).toHaveLength(0);
});
