import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { assistanceComparison, requestJourney } from "../../src/content/home-service-promise";

test("request journey has four distinct local photographs and no invented dispatch SLA", () => {
  assert.equal(requestJourney.length,4);
  assert.equal(new Set(requestJourney.map(step=>step.image)).size,4);
  requestJourney.forEach(step=>assert.ok(existsSync(`public${step.image}`)));
  assert.ok(requestJourney.some(step=>step.description.includes("ترافیک")));
  assert.ok(requestJourney.some(step=>step.description.includes("تأیید شما")));
});

test("comparison keeps all five business commitments without blanket competitor accusations", () => {
  assert.equal(assistanceComparison.length,5);
  const promises=assistanceComparison.map(row=>row.promise).join(" ");
  for(const phrase of ["تعرفه اتحادیه","واردات عمده","بازگشت وجه","تضمین کامل","مدرک صادرشده از سوی خود شرکت"]) assert.ok(promises.includes(phrase));
  for(const row of assistanceComparison) {
    assert.match(row.company,/استعلام|بررسی|بخوانید/);
    assert.match(row.independent,/توافق|بررسی|ثبت/);
  }
});

test("home replaces only the requested sections and keeps the coverage and assistant routes", () => {
  const page=readFileSync("src/app/page.tsx","utf8");
  assert.ok(page.includes("<RequestJourneySection />") && page.includes("<AssistanceComparisonSection />"));
  assert.ok(!page.includes("<ChatSection />") && !page.includes("<MiniServices />") && !page.includes("<BusinessFactsSection />"));
  assert.ok(page.includes("<SeoServiceHub />") && existsSync("src/app/assistant/page.tsx"));
  const slider=readFileSync("src/components/home/blog-slider.tsx","utf8");
  assert.ok(slider.includes("posts.slice(0, mountedCount)") && slider.includes("onScroll=") && slider.includes("scrollTo("));
});
