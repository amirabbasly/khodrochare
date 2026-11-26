import test from "node:test";
import assert from "node:assert/strict";
import { roadsideDecisionGuides } from "../../src/content/roadside-decision-guides";
import { indexablePaths } from "../../scripts/lib/route-inventory";
import sitemap from "../../src/app/sitemap";
import { absoluteUrl } from "../../src/seo/metadata";
test("support guides have distinct intents, substantial unique sections and discoverable canonicals", () => {
 assert.equal(new Set(roadsideDecisionGuides.map(g=>g.path)).size,2);
 for(const guide of roadsideDecisionGuides){
  assert.ok(indexablePaths.includes(guide.path));
  assert.equal(sitemap().filter(item=>item.url===absoluteUrl(guide.path)).length,1);
  assert.ok(guide.sections.length>=5 && guide.faqs.length>=3);
  assert.ok(guide.sections.map(s=>s.body).join(' ').length>1800);
  assert.ok(!guide.title.startsWith('امداد خودرو آنلاین'));
 }
});
