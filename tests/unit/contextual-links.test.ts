import test from "node:test";
import assert from "node:assert/strict";
import { contextualParts } from "../../src/lib/contextual-links";
import { serviceContextRules } from "../../src/content/contextual-service-links";
import { indexablePaths } from "../../scripts/lib/route-inventory";

test("all curated contextual destinations exist and are indexable", () => {
  for (const rule of serviceContextRules) assert.ok(indexablePaths.includes(rule.href), rule.href);
});
test("inline link plan preserves text, excludes self and deduplicates destinations", () => {
  const text = "امداد خودرو آنلاین و درخواست آنلاین؛ مکانیک سیار برای تعمیر در محل و تعویض باتری.";
  const parts = contextualParts(text, "/services/battery-replacement");
  assert.equal(parts.map(p => p.text).join(""), text);
  const hrefs = parts.flatMap(p => p.href ? [p.href] : []);
  assert.equal(new Set(hrefs).size, hrefs.length);
  assert.ok(!hrefs.includes("/services/battery-replacement"));
  assert.ok(hrefs.includes("/امداد-خودرو-آنلاین"));
});
test("Persian boundaries and shared paragraph budget prevent link stuffing", () => {
  assert.ok(contextualParts("پنچرگیری‌ها و کارواش سیارمان", "/").every(p => !p.href));
  const used = new Set<string>();
  contextualParts("مکانیک سیار و تعویض باتری", "/", used, 1);
  const second = contextualParts("هزینه حمل و امداد خودرو آنلاین", "/", used, 1);
  assert.equal(used.size, 1);
  assert.ok(second.every(p => !p.href));
});
