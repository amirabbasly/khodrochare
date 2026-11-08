import test from "node:test";
import assert from "node:assert/strict";
import { sharedArticleImages } from "../../src/content/article-presentation";
import { blogPosts } from "../../src/content/blog";
import { latestHomeArticles } from "../../src/content/home-articles";

test("repeated artwork is suppressed in home cards without mutating archive images", () => {
  const original = blogPosts.map(p => p.image);
  const repeated = sharedArticleImages(blogPosts);
  assert.ok(repeated.has("/images/support-technician-night.webp"));
  for (const card of latestHomeArticles(blogPosts)) {
    const post = blogPosts.find(p => p.slug === card.slug)!;
    assert.equal(card.image, repeated.has(post.image) ? "" : post.image);
  }
  assert.deepEqual(blogPosts.map(p => p.image), original);
});
test("unique illustrations remain eligible and missing input is safe", () => {
  assert.deepEqual([...sharedArticleImages([])], []);
  assert.deepEqual([...sharedArticleImages([{image:"a"},{image:"a"},{image:"b"}])], ["a"]);
});
