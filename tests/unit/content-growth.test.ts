import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { indexablePaths } from "../../scripts/lib/route-inventory";
import { blogPosts, supplementalArticleSections } from "../../src/content/blog";
import { newBlogGuides } from "../../src/content/blog-new-guides";
import { blogUpdates } from "../../src/content/blog-updates";
import { sectionText } from "../../src/content/editorial-types";
import { localServiceGuides, serviceKnowledge } from "../../src/content/service-knowledge";
import { services } from "../../src/content/services";
import { tools } from "../../src/content/tools";
import sitemap from "../../src/app/sitemap";
import { absoluteUrl } from "../../src/seo/metadata";
import { articleSchema } from "../../src/seo/schemas";
const paths = new Set(indexablePaths);

test("all 374 previously published paths survive; exactly six guides and four tool URLs are added", async () => {
  const previous = JSON.parse(await readFile(new URL("../fixtures/published-routes-2026-09-06.json", import.meta.url), "utf8")) as string[];
  assert.equal(previous.length, 374); assert.equal(paths.size, 384);
  for (const path of previous) assert.ok(paths.has(path), `lost published path ${path}`);
  assert.equal(newBlogGuides.length, 6); assert.equal(tools.length, 3); assert.ok(paths.has("/tools"));
});
test("eight existing articles are expanded without changing their publication dates", () => {
  assert.equal(Object.keys(blogUpdates).length, 8);
  for (const slug of Object.keys(blogUpdates)) {
    const post = blogPosts.find((item) => item.slug === slug)!;
    assert.equal(post.updatedAtIso, "2026-09-07");
    assert.ok(post.publishedAtIso < post.updatedAtIso);
    assert.equal(supplementalArticleSections[slug], undefined);
    assert.ok(post.sections.map(sectionText).join(" ").split(/\s+/u).length >= 450, slug);
  }
});
test("new and updated articles have distinct sections, useful references and valid table shapes", () => {
  assert.equal(blogPosts.length, 24);
  for (const post of blogPosts.filter((item) => item.updatedAtIso === "2026-09-07")) {
    assert.equal(new Set(post.sections.map((section) => section.title)).size, post.sections.length, post.slug);
    assert.ok(post.sections.length >= 7 && post.sources?.length && post.links?.length, post.slug);
    for (const source of post.sources!) assert.equal(new URL(source.url).protocol, "https:");
    for (const section of post.sections) if (section.table) for (const row of section.table.rows) assert.equal(row.length, section.table.headers.length, post.slug);
    for (const link of post.links!) assert.ok(paths.has(decodeURIComponent(link.href.split("#")[0])), `${post.slug}: ${link.href}`);
    for (const slug of post.relatedSlugs ?? []) assert.ok(blogPosts.some((item) => item.slug === slug), slug);
  }
});
test("service enrichment does not introduce duplicate FAQ questions or missing links", () => {
  assert.equal(Object.keys(serviceKnowledge).length, 7);
  for (const [slug, guide] of Object.entries(serviceKnowledge)) {
    const service = services.find((item) => item.slug === slug)!;
    assert.ok(service); assert.equal(new Set([...service.faqs, ...guide.faqs].map((faq) => faq.question)).size, service.faqs.length + guide.faqs.length);
    for (const link of guide.links) assert.ok(paths.has(link.href.split("#")[0]), link.href);
  }
  assert.equal(Object.keys(localServiceGuides).length, 3);
  for (const [path, guide] of Object.entries(localServiceGuides)) {
    assert.ok(paths.has(path)); assert.ok(guide.paragraphs.length >= 3);
    for (const link of guide.links) assert.ok(paths.has(link.href.split("#")[0]), link.href);
  }
});
test("sitemap dates change only for substantively updated pages and each new URL is canonical", () => {
  const entries = sitemap(); assert.equal(entries.length, 384);
  const byUrl = new Map(entries.map((entry) => [entry.url, entry]));
  for (const tool of tools) assert.ok(byUrl.has(absoluteUrl(`/tools/${tool.slug}`)));
  assert.equal(new Date(byUrl.get(absoluteUrl("/pricing"))!.lastModified!).toISOString().slice(0, 10), "2026-09-07");
  assert.equal(new Date(byUrl.get(absoluteUrl("/تهران/دیاگ-سیار"))!.lastModified!).toISOString().slice(0, 10), "2026-09-07");
  assert.equal(new Date(byUrl.get(absoluteUrl("/رشت/یدک-کش"))!.lastModified!).toISOString().slice(0, 10), "2026-09-05");
});
test("article references in structured data describe the same visible sources", () => {
  const post = newBlogGuides[0];
  const schema = articleSchema({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.image, publishedAt: post.publishedAtIso, modifiedAt: post.updatedAtIso, citations: post.sources });
  assert.deepEqual(schema.citation?.map((item) => item.url), post.sources?.map((item) => item.url));
  assert.equal(schema.datePublished, post.publishedAtIso); assert.equal(schema.dateModified, post.updatedAtIso);
});
