import { test, expect } from "@playwright/test";
import { blogPosts } from "../../src/content/blog";
import { sharedArticleImages } from "../../src/content/article-presentation";

test.beforeEach(async ({page}) => {
  await page.addInitScript(() => sessionStorage.setItem("khodrochare:welcome-seen:v2", "1"));
});
test("archive keeps its image layout while shared artwork is absent from article reading view", async ({page}) => {
  await page.goto("/blog");
  await expect(page.locator('main img[src*="%2Fimages%2F"]')).not.toHaveCount(0);
  const shared = sharedArticleImages(blogPosts);
  const post = blogPosts.find(p => shared.has(p.image))!;
  await page.goto(`/blog/${post.slug}`);
  await expect(page.locator("h1")).toHaveText(post.title);
  await expect(page.locator("[data-article-illustration]")).toHaveCount(0);
  await expect(page.getByRole("navigation", {name:"فهرست مطالب مقاله"})).toBeVisible();
  const first = page.getByRole("navigation", {name:"فهرست مطالب مقاله"}).getByRole("link").first();
  await first.click();
  await expect(page).toHaveURL(/#section-1$/);
  await expect(page.locator("#section-1 h2")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth+1)).toBe(true);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /https:\/\/khodrochare.ir\/images\//);
});
