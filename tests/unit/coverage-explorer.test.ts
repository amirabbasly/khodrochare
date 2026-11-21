import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { allCities } from "../../src/content/coverage";
import { coverageNetworkAverage, mapServices, mapRegions, normalizeCitySearch } from "../../src/content/coverage-explorer";
import { indexablePaths } from "../../scripts/lib/route-inventory";

test("map city and service selections only point to existing canonical routes", () => {
  const paths = new Set(indexablePaths);
  for (const city of allCities) {
    assert.ok(paths.has(`/${city.slug}`));
    assert.ok(mapRegions.some(region => region.name === city.province));
    for (const service of mapServices) assert.ok(paths.has(`/${city.slug}/${service.local}`), `${city.slug}/${service.local}`);
  }
  for (const region of mapRegions) assert.ok(allCities.some(city => city.slug === region.city));
});
test("business averages stay averages and Persian city search normalizes Arabic forms", () => {
  assert.deepEqual(coverageNetworkAverage.map(item => item.value), [30,3,5,1]);
  assert.equal(normalizeCitySearch("بندر-انزلی"), normalizeCitySearch("بندر انزلی"));
  assert.equal(normalizeCitySearch("كرج"), normalizeCitySearch("کرج"));
  assert.equal(normalizeCitySearch("قائم‌شهر"), normalizeCitySearch("قائم شهر"));
});
test("one explorer replaces both old placements while preserving directory and coordination content", () => {
  const page = readFileSync("src/app/page.tsx", "utf8");
  assert.equal((page.match(/<SeoServiceHub \/>/g) ?? []).length, 1);
  assert.ok(!page.includes("<CoverageSection"));
  const home = readFileSync("src/components/home/home-sections.tsx", "utf8");
  for (const text of ["<SeoServiceDirectory", "<CoverageProcess", "homeLocalLinkGroups.map", "processSteps.map", "home-north-hub"]) assert.ok(home.includes(text), text);
  const map = readFileSync("src/components/home/coverage-explorer.tsx", "utf8");
  assert.ok(map.includes("{children}"));
  assert.ok(!map.includes("geolocation"));
  assert.ok(!map.includes("fetch("));
  assert.ok(readFileSync("public/images/coverage-map-LICENSE.txt", "utf8").includes("MIT License"));
});
