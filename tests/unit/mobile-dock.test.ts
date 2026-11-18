import test from "node:test";
import assert from "node:assert/strict";
import {existsSync,readFileSync} from "node:fs";
import {nonindexablePaths,indexablePaths} from "../../scripts/lib/route-inventory";
import {navLinks} from "../../src/components/home/home-content";
test("new market navigation and temporary routes are honest and excluded from indexing",()=>{
 assert.ok(!navLinks.some(item=>(item.href as string)==="/امداد-خودرو"));
 for(const path of ["/friday-market","/car-market","/imports"]){
  assert.ok(nonindexablePaths.includes(path));assert.ok(!indexablePaths.includes(path));
  assert.ok(readFileSync(`src/app${path}/page.tsx`,"utf8").includes("noindex:true"));
 }
 const placeholder=readFileSync("src/components/site/market-placeholder.tsx","utf8");assert.ok(placeholder.includes("ثبت آگهی یا انجام معامله در این صفحه فعال نیست"));
});
test("mobile dock has four custom image assets, active state and safe-area clearance",()=>{
 const dock=readFileSync("src/components/site/mobile-bottom-nav.tsx","utf8");
 for(const name of ["parts","cars","imports","partners"])assert.ok(existsSync(`public/images/navigation/${name}.webp`));
 assert.ok(dock.includes("aria-current=")&&dock.includes("prefetch={false}"));assert.ok(!dock.includes("<Icon")&&!dock.includes("<svg"));
 assert.ok(readFileSync("src/app/layout.tsx","utf8").includes("<MobileBottomNav />"));
 const css=readFileSync("src/app/globals.css","utf8");assert.ok(css.includes("env(safe-area-inset-bottom,0px)")&&css.includes(".floating-support { bottom:calc(100px"));
});
