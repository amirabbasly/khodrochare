import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fleetBenefits } from "../../src/content/fleet";
import { indexablePaths } from "../../scripts/lib/route-inventory";
import sitemap from "../../src/app/sitemap";

test("fleet landing has a canonical discoverable route and all announced benefits", () => {
  assert.ok(indexablePaths.includes("/safir"));
  assert.ok(sitemap().some(p => p.url === "https://khodrochare.ir/safir"));
  assert.equal(fleetBenefits.length, 7);
  for (const keyword of ["مأموریت", "امکانات", "کف قیمت", "کارت امدادگری", "آرم و علائم", "بیمه", "بیشتر"]) {
    assert.ok(fleetBenefits.some(b => b.title.includes(keyword)), keyword);
  }
  assert.equal(new Set(fleetBenefits.map(b => b.title)).size, 7);
  const text = fleetBenefits.map(b => b.description).join(" ");
  assert.ok(text.includes("ضوابط") && text.includes("مدارک"));
  assert.ok(!text.includes("بالاترین اعتبار"));
});
test("fleet landing shares app layout and uses its own PWA and supplied screenshot", async () => {
  const page = await readFile("src/app/safir/page.tsx", "utf8");
  assert.ok(page.includes("<AppShowcaseBanner fleet />"));
  assert.ok(page.includes('href={fleetAppUrl} data-pwa-entry'));
  assert.ok(page.includes("fleet-hand-phone.webp"));
  assert.ok(!page.includes("customer-home-20261121"));
  const banner = await readFile("src/components/home/app-trust-banners.tsx", "utf8");
  assert.ok(banner.includes("fleet-home-20261121.webp"));
  assert.ok(banner.includes('fleet ? getAppDownload("fleet")'));
  assert.ok(banner.includes("!fleet && <><a href={customerMyketUrl}"));
});
