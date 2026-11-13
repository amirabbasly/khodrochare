import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { validateComment, submitComment, readComments, saveComment } from "../../src/lib/community";
import { normalizeText, similarity, qualityIssues, prohibitedClaims } from "../../src/lib/editorial-quality";
import { suggestReply } from "../../src/lib/community-replies";
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
test("real submissions are consented, deduplicated, private until moderation and durable", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "community-test-"));
  try {
    assert.equal(validateComment({ name: "آزمون", text: "متن آزمایشی بدون رضایت", page: "/تهران" }), undefined);
    assert.equal(validateComment({ name: "آزمون", text: "شماره خصوصی ۰۹۱۲۳۴۵۶۷۸۹", page: "/تهران", consent: true }), undefined);
    assert.equal(validateComment({ name: "آزمون", text: "لینک https://spam.test", page: "/تهران", consent: true }), undefined);
    const data = validateComment({ name: "آزمون", text: "این فقط داده آزمون است و تجربه مشتری نیست.", page: "/تهران", consent: true, rating: 4 })!;
    assert.ok(data); const id = await submitComment(dir, data);
    let rows = await readComments(dir); assert.equal(rows[0].status, "pending"); assert.equal(rows[0].rating, 4);
    await assert.rejects(() => submitComment(dir, data), /duplicate_comment/);
    await saveComment(dir, { ...rows[0], status: "approved", reply: "پاسخ آزمایشی" });
    rows = await readComments(dir); assert.equal(rows[0].id, id); assert.equal(rows[0].status, "approved");
  } finally { await rm(dir, { recursive: true, force: true }); }
});
test("reply suggestions use reviewed FAQ text, never pretend to confirm a dispatch", () => {
  const answer = "خلاصه پاسخ بررسی‌شده";
  assert.equal(suggestReply("هزینه بارگیری خودرو چگونه است؟", [{ question: "هزینه بارگیری چگونه محاسبه می‌شود؟", answer }]), answer);
  assert.ok(suggestReply("سلام", []).includes("تشخیص قطعی"));
});
