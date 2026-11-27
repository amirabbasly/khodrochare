import test from "node:test";
import assert from "node:assert/strict";
import { onlineServiceCluster } from "../../src/content/online-service-cluster";
import { roadsideDecisionGuides } from "../../src/content/roadside-decision-guides";
import { readFileSync } from "node:fs";
test("cluster expands task-specific intents with H3 content, FAQs and unique metadata", () => {
 assert.equal(onlineServiceCluster.length,3);
 for(const field of ['path','title','description'] as const) assert.equal(new Set(roadsideDecisionGuides.map(g=>g[field])).size,roadsideDecisionGuides.length);
 for(const guide of onlineServiceCluster){
  assert.ok(guide.sections.length>=5 && guide.faqs.length>=3);
  assert.ok(guide.sections.some(section=>section.subsections?.length));
  assert.ok(!guide.title.startsWith('امداد خودرو آنلاین'));
 }
 const renderer=readFileSync('src/components/seo/decision-guide-page.tsx','utf8');
 assert.ok(renderer.includes('<h3') && renderer.includes('href: "/امداد-خودرو-آنلاین"'));
 const hub=readFileSync('src/components/pages/online-assistance-page.tsx','utf8');
 assert.ok(hub.includes('onlineServiceCluster.map'));
});
