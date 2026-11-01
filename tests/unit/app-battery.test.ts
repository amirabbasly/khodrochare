import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { brandProfiles } from "../../src/content/brands";
import { batteryBrandNotes, batteryFaqs } from "../../src/content/battery";
import { businessFacts } from "../../src/content/business";
import { customerAppUrl, fleetAppUrl } from "../../src/content/app-links";
import { indexablePaths } from "../../scripts/lib/route-inventory";
import sitemap from "../../src/app/sitemap";

test("app destinations are separate HTTPS origins without personal-data parameters", () => {
  assert.equal(customerAppUrl, "https://app.khodrochare.ir/");
  assert.equal(fleetAppUrl, "https://safir.khodrochare.ir/");
  for (const url of [customerAppUrl, fleetAppUrl]) assert.equal(new URL(url).search, "");
});
test("battery hub is canonical and covers all brands with distinct compatibility notes", () => {
  assert.ok(indexablePaths.includes("/battery"));
  assert.ok(sitemap().some(p => p.url === "https://khodrochare.ir/battery"));
  assert.deepEqual(Object.keys(batteryBrandNotes).sort(), brandProfiles.map(b => b.slug).sort());
  assert.equal(new Set(Object.values(batteryBrandNotes)).size, 12);
  assert.ok(batteryBrandNotes["iran-khodro"].includes("تارا"));
  assert.equal(batteryFaqs.length, 5);
});
test("regional brand pages delegate model depth rather than repeating the full guide", async () => {
  const regional=await readFile("src/app/[city]/brands/[brand]/page.tsx","utf8");
  assert.ok(!regional.includes("BrandModelDepth"));
  for (const text of ["region.access","region.response","region.handover","/battery#battery-"]) assert.ok(regional.includes(text));
  const general=await readFile("src/app/brands/[slug]/page.tsx","utf8");
  assert.ok(general.includes("<BrandModelDepth"));
  assert.ok(!general.includes("brandLandingExpansion"));
});
test("road template renders one editorial depth layer instead of three", async () => {
  const source=await readFile("src/app/roads/[slug]/page.tsx","utf8");
  assert.ok(source.includes("<NorthRoadDepthSections"));
  assert.ok(!source.includes("roadLandingExpansion") && !source.includes("<RoadDispatchDepth"));
});
test("registered identity matches supplied facts; online page has no disabled marketing form", async () => {
  assert.equal(businessFacts.legalName,"پیشرو امدادگران هوانیروز");
  assert.equal(businessFacts.managingDirector,"علیرضا سلیمانی");
  const source=await readFile("src/components/pages/online-assistance-page.tsx","utf8");
  assert.ok(source.includes("<AppEntry"));
  assert.ok(!source.includes("ServiceRequestForm"));
});
