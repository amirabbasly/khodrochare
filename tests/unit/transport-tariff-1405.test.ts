import test from "node:test";
import assert from "node:assert/strict";
import { transportTariffRows, transportTariffSections } from "../../src/content/transport-tariff-1405";
import { blogPosts } from "../../src/content/blog";

test("1405 transport prices match the supplied image, not the conflicting page text", () => {
  assert.deepEqual(transportTariffRows.slice(0, 4).map(r => [r.towBase, r.towKm, r.flatbedBase, r.flatbedKm]), [
    [1600000, 60000, 2000000, 75000], [2000000, 75000, 2800000, 100000],
    [2600000, 85000, 4000000, 120000], [3000000, 100000, 5000000, 145000],
  ]);
  assert.equal(transportTariffRows[4].flatbedBase, null);
  assert.equal(transportTariffRows[5].towBase, null);
  const conditions = transportTariffSections[1].table!.rows;
  assert.deepEqual(conditions.slice(0, 3).map(r => r[1]), ["۲۰ درصد", "۲۰ درصد", "۲۰ درصد"]);
  assert.equal(conditions[1][0], "ساعت ۱۲ شب تا ۶ صبح");
  assert.equal(conditions[4][1], "۶۰۰٬۰۰۰ تومان");
});

test("tariff examples are arithmetically correct and article uses the shared table", () => {
  const row = transportTariffRows[0];
  assert.equal(row.towBase + 10 * row.towKm, 2200000);
  assert.equal((row.towBase + 10 * row.towKm) * 1.2, 2640000);
  assert.equal(row.flatbedBase + 10 * row.flatbedKm, 2750000);
  assert.equal((row.flatbedBase + 10 * row.flatbedKm) * 1.2, 3300000);
  const post = blogPosts.find(p => p.slug === "car-tow-truck-price-guide")!;
  assert.ok(post.sections.includes(transportTariffSections[0]));
  for (const section of transportTariffSections) for (const cells of section.table!.rows) assert.equal(cells.length, section.table!.headers.length);
});
