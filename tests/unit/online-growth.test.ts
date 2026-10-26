import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { customerAppFeatures, fleetAppFeatures } from "../../src/content/app-features";
import { onlineRequestFaqs } from "../../src/components/seo/online-request-guide";

test("separate app features have no fabricated dispatch or tracking promises", () => {
  assert.equal(customerAppFeatures.length, 3);
  assert.equal(fleetAppFeatures.length, 3);
  assert.equal(new Set([...customerAppFeatures, ...fleetAppFeatures].map(f => f.title)).size, 6);
  assert.ok(fleetAppFeatures.some(f => f.description.includes("تأیید مدارک")));
});
test("online FAQs answer real intake questions without duplicate entries", () => {
  assert.equal(onlineRequestFaqs.length, 7);
  assert.equal(new Set(onlineRequestFaqs.map(f => f.question)).size, 7);
  assert.ok(onlineRequestFaqs.some(f => f.answer.includes("نه تعرفه رسمی")));
});
test("header exposes both official app destinations and accessible feature links", async () => {
  const header = await readFile("src/components/home/site-header.tsx", "utf8");
  assert.equal((header.match(/href=\{fleetAppUrl\}/g) ?? []).length, 2);
  assert.equal((header.match(/href="\/app#features"/g) ?? []).length, 2);
  assert.ok(header.includes("<AssistanceMegaMenu"));
  const page = await readFile("src/app/app/page.tsx", "utf8");
  assert.ok(page.includes('id="features"'));
});
