import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { businessFacts } from "../../src/content/business";

test("footer includes the supplied official seal directly after Myket with origin referrer", () => {
  const url = new URL(businessFacts.trustBadges.enamadUrl);
  assert.equal(url.origin, "https://trustseal.enamad.ir");
  assert.equal(url.searchParams.get("id"), "8810860");
  assert.equal(url.searchParams.get("Code"), "wd7JhqszKASC7UMkfKyIV34pBN1X2RTk");
  const logo = new URL(businessFacts.trustBadges.enamadLogoUrl);
  assert.equal(logo.pathname, "/logo.aspx");
  assert.equal(logo.search, url.search);
  const footer = readFileSync("src/components/site/site-footer.tsx", "utf8");
  assert.match(footer, /myket\.svg[^]*?<\/a><EnamadBadge \/>/);
  assert.ok(!footer.includes('/images/enamad.png'));
  const badge = readFileSync("src/components/site/enamad-badge.tsx", "utf8");
  assert.equal((badge.match(/referrerPolicy="origin"/g) ?? []).length, 2);
  assert.ok(badge.includes('rel="noopener"') && !badge.includes('noreferrer'));
  assert.ok(badge.includes("<img ") && !badge.includes("<Image "));
});

test("seal fallback uses the exact owner-supplied local image", () => {
  const badge = readFileSync("src/components/site/enamad-badge.tsx", "utf8");
  assert.ok(badge.includes("enamad-owner-supplied.png"));
  assert.ok(badge.includes("onError={() => setLoaded(false)}"));
  assert.ok(existsSync("public/images/enamad-owner-supplied.png"));
});
