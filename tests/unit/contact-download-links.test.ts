import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { businessFacts } from "../../src/content/business";
import { customerMyketUrl } from "../../src/content/app-links";
import { organizationSchema } from "../../src/seo/schemas";

test("site contact and structured phone use the new landline consistently",()=>{
 assert.equal(businessFacts.emergencyPhone,"02182801043");
 assert.equal(businessFacts.complaintPhone,"02182801043");
 assert.equal(organizationSchema.telephone,"+982182801043");
 for(const contact of organizationSchema.contactPoint) assert.equal(contact.telephone,"+982182801043");
 function scan(dir:string){for(const entry of readdirSync(dir,{withFileTypes:true})){const file=join(dir,entry.name);if(entry.isDirectory())scan(file);else if(/\.(ts|tsx)$/.test(file))assert.ok(!/09123022064|\+989123022064/.test(readFileSync(file,"utf8")),file);}}
 scan("src");
 for(const file of ["public/offline.html","public/sw.js"]) {const source=readFileSync(file,"utf8");assert.ok(source.includes("02182801043"));assert.ok(!source.includes("09123022064"));}
});
test("customer marketplace and APK destinations are separate and explicit",()=>{
 assert.equal(customerMyketUrl,"https://myket.ir/app/com.khodrochare.app");
 for(const file of ["src/components/site/site-footer.tsx","src/components/site/app-downloads.tsx","src/components/home/app-trust-banners.tsx"])assert.ok(readFileSync(file,"utf8").includes("href={customerMyketUrl}"),file);
 const footer=readFileSync("src/components/site/site-footer.tsx","utf8");assert.ok(footer.includes("/images/social/myket.svg"));assert.ok(!footer.includes("راهنمای دانلود مستقیم"));
 const downloads=readFileSync("src/components/site/app-downloads.tsx","utf8");assert.ok(downloads.includes('app === "customer" &&'));
});
