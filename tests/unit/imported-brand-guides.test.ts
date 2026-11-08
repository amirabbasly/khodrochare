import test from "node:test";
import assert from "node:assert/strict";
import { importedBrandGuides, importedBrandUpdatedAt } from "../../src/content/imported-brand-guides";
import { findBrand } from "../../src/content/brands";
import sitemap from "../../src/app/sitemap";

test("eight existing imported brands get distinct decision aids and dated canonical entries", () => {
  const entries = sitemap();
  assert.equal(Object.keys(importedBrandGuides).length, 8);
  const questions = new Set<string>();
  for (const [slug, guide] of Object.entries(importedBrandGuides)) {
    assert.ok(findBrand(slug), slug);
    assert.ok(!questions.has(guide.faq.question)); questions.add(guide.faq.question);
    assert.equal(new Set(guide.sections.map(s => s.title)).size, guide.sections.length);
    assert.ok(guide.sections.some(s => s.table));
    for (const section of guide.sections) {
      assert.ok(section.body.length > 200);
      for (const row of section.table?.rows ?? []) assert.equal(row.length, section.table!.headers.length);
    }
    const entry = entries.find(e => new URL(e.url).pathname === `/brands/${slug}`)!;
    assert.equal(new Date(entry.lastModified!).toISOString().slice(0, 10), importedBrandUpdatedAt.iso);
  }
  const unchanged = entries.find(e => new URL(e.url).pathname === "/brands/saipa")!;
  assert.notEqual(new Date(unchanged.lastModified!).toISOString().slice(0, 10), importedBrandUpdatedAt.iso);
});
