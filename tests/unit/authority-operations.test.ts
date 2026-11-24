import test from "node:test";
import assert from "node:assert/strict";
import { normalizeText, similarity, qualityIssues, prohibitedClaims } from "../../src/lib/editorial-quality";
import { northFiringLinkRules } from "../../src/content/north-link-rules";
import { blogPosts, supplementalArticleSections } from "../../src/content/blog";
import { districtIntake } from "../../src/content/tehran-district-intake";
test("direction words cannot link to the north-country hub", () => {
  assert.ok(!northFiringLinkRules.some(r => r.phrase === "شمال"));
  assert.ok(northFiringLinkRules.some(r => r.phrase === "شمال کشور" && r.href === "/شمال"));
});
test("all article bodies exclude identified unsafe and unsupported phrases", () => {
  for (const post of blogPosts) for (const s of [...post.sections, ...(supplementalArticleSections[post.slug] ?? [])]) assert.ok(!prohibitedClaims.test(s.body), `${post.slug}: ${s.title}`);
  assert.equal(districtIntake.length, 22); assert.equal(new Set(districtIntake).size, 22);
});
test("publication rejects duplication, unsafe claims, missing sources and invalid links", () => {
  assert.equal(normalizeText("ماشين‌ يك"), normalizeText("ماشین یک"));
  assert.equal(similarity("یک دو سه چهار پنج", "یک دو سه چهار پنج"), 1);
  const issues = qualityIssues({ title: "عنوان کوتاه", excerpt: "ناقص", sections: [{ title: "تست", body: "اعزام تضمینی" }], links: [{ href: "//evil.test" }] });
  for (const code of ["unsupported_or_unsafe_claim", "sources_required", "invalid_internal_link", "insufficient_decision_depth"]) assert.ok(issues.includes(code));
});
