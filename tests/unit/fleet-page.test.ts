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
test("fleet onboarding points to the fleet origin and has installation instructions", async () => {
  const page = await readFile("src/app/safir/page.tsx", "utf8");
  assert.ok(page.includes('href={fleetAppUrl} data-app-entry="fleet"'));
  for (const keyword of ["Android", "iPhone", "Safari", "Add to Home Screen", "APK"]) assert.ok(page.includes(keyword));
  for (const file of ["src/app/app/page.tsx", "src/app/partners/page.tsx", "src/components/site/site-footer.tsx"]) {
    assert.ok((await readFile(file, "utf8")).includes('"/safir"'), file);
  }
});
