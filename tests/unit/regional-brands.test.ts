import test from "node:test";
import assert from "node:assert/strict";
import { assistanceRegions, regionalBrandPath } from "../../src/content/assistance-regions";
import { brandProfiles } from "../../src/content/brands";
import { regionalGrowthGuides } from "../../src/content/blog-regional-growth";
import { sectionText } from "../../src/content/editorial-types";
import { indexablePaths } from "../../scripts/lib/route-inventory";
import sitemap from "../../src/app/sitemap";

test("all 36 regional brand pages and three hubs are canonical sitemap destinations", () => {
  const paths = new Set(indexablePaths);
  const entries = new Set(sitemap().map(entry => decodeURIComponent(new URL(entry.url).pathname)));
  assert.equal(assistanceRegions.length * brandProfiles.length, 36);
  for (const region of assistanceRegions) {
    assert.ok(paths.has(`/${region.slug}/brands`));
    for (const brand of brandProfiles) {
      const path = regionalBrandPath(region.slug, brand.slug);
      assert.ok(paths.has(path)); assert.ok(entries.has(path));
    }
    for (const link of [...region.links, ...region.roads]) assert.ok(paths.has(link.href), link.href);
  }
});
test("six new articles have substantial complete bodies and no orphaned references", () => {
  assert.equal(regionalGrowthGuides.length, 6);
  const paths = new Set(indexablePaths);
  for (const post of regionalGrowthGuides) {
    assert.ok(post.sections.map(sectionText).join(" ").split(/\s+/u).length >= 1000, post.slug);
    assert.equal(new Set(post.sections.map(section => section.title)).size, post.sections.length);
    for (const link of post.links ?? []) assert.ok(paths.has(link.href.split("#")[0]), link.href);
    for (const slug of post.relatedSlugs ?? []) assert.ok(paths.has(`/blog/${slug}`));
  }
});
