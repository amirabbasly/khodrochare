import { test, expect } from "@playwright/test";
import { blogPosts } from "../../src/content/blog";
import { latestHomeArticles } from "../../src/content/home-articles";
const cards=latestHomeArticles(blogPosts);
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});
test("home mounts only five recent cards, loads the next five on demand, and retains archive navigation", async ({page}) => {
  await page.goto("/");
  const magazine=page.getByTestId("home-latest-articles");
  await expect(magazine.locator("h3")).toHaveText(cards.slice(0,5).map(card=>card.title));
  await expect(magazine.locator("img")).toHaveCount(5);
  await expect(magazine.getByRole("button",{name:"مقالات قبلی"})).toBeDisabled();
  await magazine.getByRole("button",{name:"مقالات بعدی"}).click();
  await expect(magazine.getByRole("link")).toHaveCount(5);
  await expect(magazine.locator('[aria-hidden="false"] h3')).toHaveText(cards.slice(5,10).map(card=>card.title));
  await expect(magazine.getByRole("button",{name:"مقالات بعدی"})).toBeDisabled();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await magazine.getByRole("button",{name:"مقالات قبلی"}).click();
  await expect(magazine.locator('[aria-hidden="false"] h3')).toHaveText(cards.slice(0,5).map(card=>card.title));
  await expect(page.locator('[aria-labelledby="magazine-title"]').getByRole("link",{name:"موارد بیشتر"})).toHaveAttribute("href","/blog");
});
test("opening home does not prefetch the entire local directory",async({page})=>{
  const prefetched:string[]=[];
  page.on("request",request=>{if(request.headers()["next-router-prefetch"]==="1")prefetched.push(decodeURIComponent(new URL(request.url()).pathname));});
  await page.goto("/");
  const directory=page.getByTestId("home-local-directory");
  await directory.scrollIntoViewIfNeeded();
  await expect(directory.getByRole("link")).toHaveCount(59);
  const localTargets=await directory.locator("a").evaluateAll(elements=>elements.map(element=>element.getAttribute("href")));
  expect(prefetched.filter(path=>localTargets.includes(path))).toHaveLength(0);
});
