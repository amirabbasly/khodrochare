import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {serviceFeedback} from "../../src/content/reviews";
test("home feedback uses existing verbatim owner-supplied records, without invented ratings or identities",()=>{
 assert.equal(serviceFeedback.length,30);
 const source=readFileSync("src/components/home/home-feedback.tsx","utf8");
 assert.ok(source.includes('import {serviceFeedback} from "@/content/reviews"'));
 assert.ok(source.includes("{feedback.text}")&&source.includes("{feedback.city}")&&source.includes("{feedback.service}"));
 assert.ok(!source.includes("aggregateRating")&&!source.includes("rating:")&&!source.includes("★"));
 const page=readFileSync("src/app/page.tsx","utf8");assert.ok(page.includes("<HomeFeedback />")&&!page.includes("ProductsSection"));
 const sections=readFileSync("src/components/home/home-sections.tsx","utf8");assert.ok(!sections.includes("فروشگاه قطعات منتخب")&&!sections.includes("StoreStats"));
});
