import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync,existsSync} from "node:fs";

test("app and trust banners use exact supplied previews and genuine image wordmark",()=>{
  for(const name of ["home","services"]) assert.ok(existsSync(`public/images/app-screens/${name}-exact.webp`));
  for(const name of ["khodrochare-wordmark.webp","trust-vehicles.webp"]) assert.ok(existsSync(`public/images/${name}`));
  const code=readFileSync("src/components/home/app-trust-banners.tsx","utf8");
  assert.ok(code.includes('getAppDownload("customer")') && code.includes("release.available"));
  assert.ok(code.includes("customerAppUrl") && code.includes('href="/app#downloads"'));
  assert.ok(!code.includes("bazaar.ir") && !code.includes("app-premium-mockup"));
  assert.ok(code.includes("تصویر ارسالی") && !code.includes("بازسازی نمایشی"));
  assert.ok(code.includes("download-button-art") && existsSync("scripts/prepare-exact-app-previews.mjs"));
  assert.ok(code.includes("trustItems.map") && code.includes('alt="خودرو چاره"'));
  const sections=readFileSync("src/components/home/home-sections.tsx","utf8");
  assert.ok(sections.includes("<AppShowcaseBanner />") && sections.includes("<TrustShowcaseBanner />"));
});
