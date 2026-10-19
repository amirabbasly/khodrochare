import test from "node:test";
import assert from "node:assert/strict";
import { blogPosts } from "../../src/content/blog";
import { latestHomeArticles, HOME_ARTICLE_LIMIT } from "../../src/content/home-articles";
import nextConfig from "../../next.config";

test("home shows ten newest publications and never mutates the complete article archive", () => {
  const original = blogPosts.map(post => post.slug);
  const cards = latestHomeArticles(blogPosts);
  assert.equal(cards.length, HOME_ARTICLE_LIMIT);
  const expected = [...blogPosts].sort((a,b) => b.publishedAtIso.localeCompare(a.publishedAtIso) || a.slug.localeCompare(b.slug)).slice(0,10);
  assert.deepEqual(cards.map(card => card.slug), expected.map(post => post.slug));
  assert.deepEqual(blogPosts.map(post => post.slug), original);
  for (const card of cards) assert.deepEqual(Object.keys(card).sort(), ["slug", "title", "excerpt", "category", "readTime", "image"].sort());
  assert.ok(Buffer.byteLength(JSON.stringify(cards)) < 10000);
});
test("an old guide with a new edit date cannot jump ahead of a newer publication", () => {
  const base=blogPosts[0];
  const result=latestHomeArticles([{...base,slug:"old",publishedAtIso:"2026-01-01",updatedAtIso:"2026-10-19"},{...base,slug:"new",publishedAtIso:"2026-10-18"}]);
  assert.deepEqual(result.map(post => post.slug),["new","old"]);
  assert.deepEqual(latestHomeArticles([]),[]);
});
test("on-demand image negotiation uses WebP, not CPU-intensive AVIF", () => {
  assert.deepEqual(nextConfig.images?.formats,["image/webp"]);
});

test("lightweight menu metadata exactly matches canonical brand and regional profiles", async () => {
  const { navigationBrands, navigationRegions, regionalBrandPath } = await import("../../src/content/home-navigation");
  const { brandProfiles } = await import("../../src/content/brands");
  const { assistanceRegions } = await import("../../src/content/assistance-regions");
  assert.deepEqual(navigationBrands, brandProfiles.map(({slug,name,latin})=>({slug,name,latin})));
  assert.deepEqual(navigationRegions, assistanceRegions.map(({slug,name})=>({slug,name})));
  assert.equal(regionalBrandPath("شمال","toyota"),"/شمال/brands/toyota");
});
