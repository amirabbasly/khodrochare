import test from "node:test";
import { decodeRouteParam } from "../../src/seo/route-params";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { allCities, findCity, findProvince, northernProvinces } from "../../src/content/coverage";
import { brandProfiles } from "../../src/content/brands";
import { neighborhoods, findNeighborhood } from "../../src/content/neighborhoods";
import { roadProfiles } from "../../src/content/roads";
import { blogPosts } from "../../src/content/blog";
import { seoRegions } from "../../src/seo/locations";
import { absoluteUrl } from "../../src/seo/metadata";
import { legacyRedirects } from "../../src/seo/redirects";
import { indexablePaths } from "../../scripts/lib/route-inventory";
const inventory = new Set(indexablePaths);
test("all original 65 intended URLs remain indexable, without duplicate paths", async () => {
  const baseline = JSON.parse(await readFile(new URL("../fixtures/baseline-routes.json", import.meta.url), "utf8")) as string[];
  assert.equal(baseline.length, 65);
  for (const path of baseline) assert.ok(inventory.has(path), `lost original URL: ${path}`);
  assert.equal(indexablePaths.length, inventory.size);
});
test("requested brand, neighborhood and northern destinations exist", () => {
  for (const path of ["/brands/iran-khodro", "/brands/saipa", "/brands/toyota", "/تهران/سعادت-آباد", "/تهران/تهرانپارس", "/تهران/ستارخان", "/تهران/نارمک", "/تهران/صادقیه", "/تهران/پونک", "/تهران/زعفرانیه", "/کرج/مهرشهر", "/چالوس", "/گیلان", "/مازندران", "/گلستان", "/roads/chalus", "/pricing", "/امداد-خودرو", "/امداد-خودرو-آنلاین"]) assert.ok(inventory.has(path), path);
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
