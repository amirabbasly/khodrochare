import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { brandProfiles } from "../../src/content/brands";
import { roadProfiles } from "../../src/content/roads";
import { roadDispatchDepth } from "../../src/content/road-dispatch-depth";
import { brandModelDepth } from "../../src/content/brand-model-depth";
import { northJourneyDepth } from "../../src/content/north-journey-depth";
import { indexablePaths } from "../../scripts/lib/route-inventory";
import sitemap from "../../src/app/sitemap";
import { absoluteUrl } from "../../src/seo/metadata";
const paths = new Set(indexablePaths);
test("all 12 brands have distinct model-level dispatch guidance", () => {
  assert.deepEqual(Object.keys(brandModelDepth).sort(), brandProfiles.map(b => b.slug).sort());
  const texts: string[] = [];
  for (const brand of brandProfiles) {
    const groups = brandModelDepth[brand.slug];
    assert.ok(groups.length >= 3, brand.slug);
    for (const group of groups) { assert.ok(group.models.length > 3); assert.ok(group.guidance.split(/\s+/).length >= 40, group.models); texts.push(group.guidance); }
  }
  assert.equal(new Set(texts).size, texts.length);
  const toyota = brandModelDepth.toyota.map(group => group.models).join(" ");
  for (const model of ["کرولا", "کمری", "راوفور", "پرادو", "لندکروزر", "پریوس", "هایلوکس"]) assert.ok(toyota.includes(model));
});
test("all five roads have unique practical sections and only canonical existing link targets", () => {
  assert.deepEqual(Object.keys(roadDispatchDepth).sort(), roadProfiles.map(r => r.slug).sort());
  const bodies: string[] = [];
  for (const detail of Object.values(roadDispatchDepth)) {
    assert.equal(detail.sections.length, 3);
    for (const section of detail.sections) { assert.ok(section.body.split(/\s+/).length >= 65, section.title); bodies.push(section.body); }
    for (const link of detail.links) assert.ok(paths.has(link.href), link.href);
  }
  assert.equal(new Set(bodies).size, bodies.length);
});
test("six northern cities and three provinces receive local journey content with valid neighbors", () => {
  assert.equal(Object.keys(northJourneyDepth).length, 9);
  for (const [slug, detail] of Object.entries(northJourneyDepth)) {
    assert.ok(paths.has(`/${slug}`)); assert.ok(detail.body.split(/\s+/).length >= 95, slug);
    for (const city of detail.next) assert.ok(paths.has(`/${city}`), city);
  }
});
test("license page is discoverable and does not invent verification credentials", async () => {
  assert.ok(paths.has("/licenses"));
  assert.ok(sitemap().some(page => page.url === absoluteUrl("/licenses")));
  const source = await readFile("src/app/licenses/page.tsx", "utf8");
  assert.ok(source.includes("طبق اطلاعات اعلام‌شده مجموعه"));
  assert.ok(source.includes("businessFacts.legalName"));
  assert.ok(source.includes("businessFacts.managingDirector"));
  assert.ok(!source.includes("<Image") && !source.includes("<img"));
  assert.ok(!source.includes("hasCredential"));
  const footer = await readFile("src/components/site/site-footer.tsx", "utf8");
  assert.ok(footer.includes('"/licenses"'));
});
