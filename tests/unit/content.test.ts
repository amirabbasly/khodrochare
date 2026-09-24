import test from "node:test";
import { decodeRouteParam } from "../../src/seo/route-params";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { allCities, findCity, findProvince, northernProvinces } from "../../src/content/coverage";
import { brandModelGuides, brandProfiles } from "../../src/content/brands";
import { neighborhoods, findNeighborhood } from "../../src/content/neighborhoods";
import { roadProfiles } from "../../src/content/roads";
import { blogPosts, supplementalArticleSections } from "../../src/content/blog";
import { sectionText } from "../../src/content/editorial-types";
import { seoRegions } from "../../src/seo/locations";
import { absoluteUrl } from "../../src/seo/metadata";
import { legacyRedirects } from "../../src/seo/redirects";
import { indexablePaths } from "../../scripts/lib/route-inventory";
import { customerReviews } from "../../src/content/reviews";
import { organizationSchema } from "../../src/seo/schemas";
const inventory = new Set(indexablePaths);
test("all original 65 intended URLs remain indexable, without duplicate paths", async () => {
  const baseline = JSON.parse(await readFile(new URL("../fixtures/baseline-routes.json", import.meta.url), "utf8")) as string[];
  assert.equal(baseline.length, 65);
  for (const path of baseline) assert.ok(inventory.has(path), `lost original URL: ${path}`);
  assert.equal(indexablePaths.length, inventory.size);
});
test("requested brand, neighborhood and northern destinations exist", () => {
  for (const path of ["/brands/iran-khodro", "/brands/saipa", "/brands/toyota", "/تهران/سعادت-آباد", "/تهران/تهرانپارس", "/تهران/ستارخان", "/تهران/نارمک", "/تهران/صادقیه", "/تهران/پونک", "/تهران/زعفرانیه", "/کرج/مهرشهر", "/رشت/گلسار", "/رشت/معلم", "/رشت/منظریه", "/چالوس", "/گیلان", "/مازندران", "/گلستان", "/roads/chalus", "/pricing", "/امداد-خودرو", "/امداد-خودرو-آنلاین"]) assert.ok(inventory.has(path), path);
  assert.equal(northernProvinces.length, 3);
  assert.equal(findProvince("گیلان")?.name, "گیلان");
  assert.ok(allCities.filter((city) => findProvince(city.province)).length >= 24);
});
test("local content and parent geography are not just substituted names", () => {
  for (const city of allCities) {
    assert.ok(city.access.length > 140 && city.scenario.length > 140 && city.handover.length > 140, city.slug);
    assert.ok(city.roads.length > 0);
  }
  assert.equal(new Set(allCities.map((city) => city.access)).size, allCities.length);
  assert.equal(new Set(neighborhoods.map((area) => area.scenario)).size, neighborhoods.length);
  for (const area of neighborhoods) {
    assert.ok(findCity(area.citySlug));
    if (area.regionSlug) assert.ok(Object.values(seoRegions).some((region) => region.citySlug === area.citySlug && region.slug === area.regionSlug));
  }
  assert.equal(findNeighborhood("کرج", "سعادت-آباد"), undefined);
});
test("all brand guides and road links lead to real destinations", () => {
  const slugs = new Set(blogPosts.map((post) => post.slug));
  for (const brand of brandProfiles) {
    assert.ok(slugs.has(brand.guide), brand.slug);
    assert.ok(brand.diagnosis.length > 150 && brand.transport.length > 150, brand.slug);
  }
  for (const [brandSlug, guides] of Object.entries(brandModelGuides)) for (const guide of guides) assert.ok(slugs.has(guide.slug), `${brandSlug}: ${guide.slug}`);
  for (const road of roadProfiles) for (const city of road.cities) assert.ok(findCity(city), `${road.slug}: ${city}`);
});
test("Persian canonical encoding is stable and redirects do not shadow real pages", () => {
  const path = "/تهران/سعادت-آباد";
  const url = absoluteUrl(path);
  assert.equal(decodeURIComponent(new URL(url).pathname), path);
  assert.equal(absoluteUrl(new URL(url).pathname), url);
  for (const [source, target] of Object.entries(legacyRedirects)) {
    assert.ok(!inventory.has(source), `redirect shadows a canonical page: ${source}`);
    assert.ok(inventory.has(target) || target === "/blog/feed.xml", `redirect target missing: ${target}`);
  }
});
test("source text has no replacement characters", async () => {
  for (const path of await readdir("src", { recursive: true })) {
    if (!/\.(ts|tsx|css)$/.test(path)) continue;
    assert.ok(!(await readFile(`src/${path}`, "utf8")).includes("\ufffd"), path);
  }
});

test("encoded Persian route params match canonical data; malformed escapes are rejected", () => {
  assert.equal(decodeRouteParam(encodeURIComponent("تهران")), "تهران");
  assert.equal(decodeRouteParam("تهران"), "تهران");
  assert.equal(decodeRouteParam("%ZZ"), "");
  assert.equal(findCity(decodeRouteParam(encodeURIComponent("رشت")))?.name, "رشت");
});

test("customer reviews are genuine, complete, and back the organization aggregate rating", () => {
  assert.equal(customerReviews.length, 6);
  for (const review of customerReviews) {
    assert.ok(review.name.length >= 2);
    assert.ok(review.title && review.title.length >= 4);
    assert.ok(review.service.length >= 3);
    assert.ok(review.city.length >= 2);
    assert.ok(review.rating >= 1 && review.rating <= 5);
    assert.match(review.dateIso, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(review.dateLabel, /^[۰-۹]{1,2} \S+ [۰-۹]{4}$/);
    assert.ok(review.text.length >= 60);
  }
  assert.equal(new Set(customerReviews.map((review) => review.title)).size, 6);
  const org = organizationSchema as unknown as Record<string, unknown>;
  const aggregate = org.aggregateRating as Record<string, unknown> | undefined;
  assert.ok(aggregate);
  assert.equal(aggregate.reviewCount, 6);
  assert.equal(aggregate.ratingValue, 5);
});

test("every blog post has 1000+ visible words with full expansion coverage", () => {
  assert.equal(blogPosts.length, 54);
  assert.equal(Object.keys(supplementalArticleSections).length, 54);
  for (const post of blogPosts) {
    const sectionWords = [...post.sections, ...(supplementalArticleSections[post.slug] ?? [])].map(sectionText).join(" ").trim().split(/\s+/u).length;
    const faqWords = (post.faqs ?? []).map((faq) => `${faq.question} ${faq.answer}`.trim().split(/\s+/u).length).reduce((a, b) => a + b, 0);
    assert.ok(sectionWords + faqWords >= 1000, `${post.slug}: only ${sectionWords + faqWords} words`);
  }
});
test("blog internal linking is extensive: 90+ contextual rules, cap 18, full commercial coverage", async () => {
  const page = await readFile(new URL("../../src/app/blog/[slug]/page.tsx", import.meta.url), "utf8");
  assert.ok((page.match(/\{ phrase:/g) ?? []).length >= 90, "contextual rules below 90");
  assert.ok(page.includes("used.size < 18"), "contextual cap is not 18");
  for (const post of blogPosts) {
    if (!post.links?.length) assert.ok(page.includes(`"${post.slug}": [`), `${post.slug}: no commercial links fallback`);
  }
});
test("every service has expanded knowledge content", async () => {
  const { serviceKnowledge } = await import("../../src/content/service-knowledge");
  const slugs = ["tow-truck", "flatbed-carrier", "flat-tire", "mobile-diagnostics", "mobile-mechanic", "mobile-carwash", "roadside-assistance", "battery-replacement", "jump-start", "vehicle-access", "pre-trip-check", "fuel-delivery"];
  for (const slug of slugs) {
    const knowledge = serviceKnowledge[slug];
    assert.ok(knowledge.paragraphs.length >= 5, `${slug}: paragraphs`);
    assert.ok(knowledge.faqs.length >= 4, `${slug}: faqs`);
    assert.ok(knowledge.checks.length >= 6, `${slug}: checks`);
  }
});
