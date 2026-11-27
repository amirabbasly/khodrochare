import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { roadsideCoordinationCluster } from "../../src/content/roadside-coordination-cluster";
import { roadsideDecisionGuides } from "../../src/content/roadside-decision-guides";
test("new coordination guides have independent intent and at least 500 original content words", () => {
 assert.equal(roadsideCoordinationCluster.length,2);
 for(const key of ['path','title','description'] as const) assert.equal(new Set(roadsideDecisionGuides.map(g=>g[key])).size,roadsideDecisionGuides.length);
 for(const guide of roadsideCoordinationCluster){
  const content=[guide.title,guide.description,...guide.sections.flatMap(s=>[s.title,s.body,...(s.subsections??[]).flatMap(sub=>[sub.title,sub.body]),...(s.bullets??[])]),...guide.faqs.flatMap(f=>[f.question,f.answer])].join(' ');
  assert.ok(content.split(/\s+/u).filter(Boolean).length>=500,guide.path);
  assert.ok(guide.sections.some(s=>s.subsections?.length));
  assert.ok(existsSync(`src/app${guide.path}/page.tsx`));
 }
});
