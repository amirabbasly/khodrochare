import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { businessFacts } from "../../src/content/business";

test("footer includes the official seal in the brand column with origin referrer", () => {
  const url = new URL(businessFacts.trustBadges.enamadUrl);
  assert.equal(url.origin, "https://trustseal.enamad.ir");
  assert.equal(url.searchParams.get("id"), "8810860");
  assert.equal(url.searchParams.get("Code"), "wd7JhqszKASC7UMkfKyIV34pBN1X2RTk");
  const logo = new URL(businessFacts.trustBadges.enamadLogoUrl);
  assert.equal(logo.pathname, "/logo.aspx");
  assert.equal(logo.search, url.search);
  const footer = readFileSync("src/components/site/site-footer.tsx", "utf8");
  assert.ok(footer.indexOf("<EnamadBadge />") < footer.indexOf("groups.map"));
  const socials = footer.split('aria-label="شبکه‌های اجتماعی خودرو چاره"')[1].split("</nav>")[0];
  assert.equal((socials.match(/<a /g) ?? []).length, 4);
  assert.ok(!socials.includes("EnamadBadge"));
  assert.ok(!footer.includes('/images/enamad.png'));
  const badge = readFileSync("src/components/site/enamad-badge.tsx", "utf8");
  assert.equal((badge.match(/referrerPolicy="origin"/g) ?? []).length, 2);
  assert.ok(badge.includes('rel="noopener"') && !badge.includes('noreferrer'));
  assert.ok(badge.includes("<img ") && !badge.includes("<Image "));
});

test("seal fallback uses the exact owner-supplied local image", () => {
  const badge = readFileSync("src/components/site/enamad-badge.tsx", "utf8");
  assert.ok(badge.includes("enamad-transparent.png"));
  assert.ok(badge.includes("onError={() => setLoaded(false)}"));
  assert.ok(existsSync("public/images/enamad-transparent.png"));
});
