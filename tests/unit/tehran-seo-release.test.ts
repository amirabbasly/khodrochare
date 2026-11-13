import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { StructuredData } from "../../src/components/seo/structured-data";
import { tehranArticleSlugs, tehranHighways, tehranRegionDecisions, tehranRevision, tehranServiceGuides, tehranServicePath } from "../../src/content/tehran-seo";
import { tehranArticleIntents } from "../../src/content/tehran-article-intents";
import { tehranBrandIntake } from "../../src/content/tehran-brand-intake";
import { brandProfiles } from "../../src/content/brands";
import { persianServiceRoutes } from "../../src/seo/internal-links";
import { indexablePaths } from "../../scripts/lib/route-inventory";
import { roadProfiles } from "../../src/content/roads";
import { seoRegions } from "../../src/seo/locations";
import { serviceSchema } from "../../src/seo/schemas";
import sitemap from "../../src/app/sitemap";
import { absoluteUrl } from "../../src/seo/metadata";

const paths = new Set(indexablePaths);
test("all nine Tehran service intents have unique titles, decisions, FAQs and valid non-self links", () => {
  assert.deepEqual(Object.keys(tehranServiceGuides).sort(), persianServiceRoutes.map(r => r.serviceSlug).sort());
  const paragraphs: string[] = []; const titles = new Set<string>();
  for (const [slug, guide] of Object.entries(tehranServiceGuides)) {
    titles.add(guide.title); assert.ok(guide.description.length > 60 && guide.description.length < 170);
    assert.equal(guide.sections.length, 2); assert.ok(guide.intent.length > 60);
    for (const section of guide.sections) { assert.ok(section.title); assert.equal(section.paragraphs.length, 2); paragraphs.push(...section.paragraphs); }
    assert.equal(guide.faqs.length, 2);
    for (const link of guide.links) { assert.ok(paths.has(link.href.split("#")[0]), link.href); assert.notEqual(link.href, tehranServicePath(slug)); }
  }
  assert.equal(titles.size, 9); assert.equal(new Set(paragraphs).size, paragraphs.length);
  assert.ok(!/نرخ مصوب|کمتر از ۳۰ دقیقه|۱۰۰٪|بهترین امداد/.test(JSON.stringify(tehranServiceGuides)));
});
test("each Tehran brand has different model-aware intake, not just swapped brand names", () => {
  assert.deepEqual(Object.keys(tehranBrandIntake).sort(), brandProfiles.map(b => b.slug).sort());
  assert.equal(new Set(Object.values(tehranBrandIntake).map(item => item.question)).size, 12);
  for (const item of Object.values(tehranBrandIntake)) { assert.ok(item.reason.length > 100); assert.ok(paths.has(tehranServicePath(item.service))); }
});
test("all five local regions and 17 editorial intents link to canonical existing owners", () => {
  assert.deepEqual(Object.keys(tehranRegionDecisions).sort(), Object.values(seoRegions).map(r => r.slug).sort());
  for (const guide of Object.values(tehranRegionDecisions)) for (const link of guide.links) assert.ok(paths.has(link.href), link.href);
  assert.deepEqual(Object.keys(tehranArticleIntents).sort(), [...tehranArticleSlugs].sort());
  for (const [slug, intent] of Object.entries(tehranArticleIntents)) { assert.ok(paths.has(`/blog/${slug}`)); assert.ok(paths.has(intent.href)); }
});
test("urban highway intent is separate from Tehran–north and is discoverable in sitemap", () => {
  assert.ok(roadProfiles.some(r => r.slug === "tehran-highways")); assert.equal(tehranHighways.length, 6);
  const entry = sitemap().find(item => item.url === absoluteUrl("/roads/tehran-highways"));
  assert.equal(new Date(entry!.lastModified!).toISOString().slice(0, 10), tehranRevision.iso);
  for (const entry of sitemap().filter(item => decodeURIComponent(new URL(item.url).pathname).startsWith("/تهران"))) assert.equal(new Date(entry.lastModified!).toISOString().slice(0, 10), tehranRevision.iso);
});
test("structured JSON cannot terminate its script and service channel is the real app", () => {
  const value = { name: "</script><script>alert(1)</script>" };
  const markup = renderToStaticMarkup(createElement(StructuredData, { data: value }));
  assert.equal((markup.match(/<script/g) ?? []).length, 1);
  assert.ok(markup.includes("\\u003c"));
  assert.deepEqual(JSON.parse(markup.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, "")), value);
  assert.equal(serviceSchema({ name: "امداد تهران", description: "تست", path: "/تهران", area: "تهران" }).availableChannel.serviceUrl, "https://app.khodrochare.ir/");
});
test("home presentation modules never mount the Tehran content release", async () => {
  for (const file of ["src/app/page.tsx", "src/components/home/home-sections.tsx", "src/components/home/home-ui.tsx", "src/app/globals.css"]) {
    const source = await readFile(file, "utf8"); assert.ok(!/TehranHubDecision|TehranServiceDepth|tehran-depth|tehran-seo/.test(source), file);
  }
});
