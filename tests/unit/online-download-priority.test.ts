import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("online hub renders downloads first while preserving its H1, request tools and service links", () => {
  const page = readFileSync("src/components/pages/online-assistance-page.tsx", "utf8");
  assert.ok(page.indexOf("<AppShowcaseBanner />") < page.indexOf("<LandingHeader"));
  assert.equal((page.match(/<AppShowcaseBanner \/>/g) ?? []).length, 1);
  for (const text of ["<OnlineRequestBrief />", "<Questions", "<LandingSchemas", 'id="online-triage"', 'id="request-cost"', 'id="online-coverage"']) assert.ok(page.includes(text));
  assert.ok(!page.includes("<ServiceRequestForm"));
});
