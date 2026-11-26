import test from "node:test";
import assert from "node:assert/strict";
import { isBrandQuery, summarize } from "../../scripts/lib/search-baseline";
test("brand matching normalizes Persian whitespace and Latin spelling", () => {
 for (const query of ["خودرو چاره", "خودروچاره", "خودرو‌چاره", "Khodro Chare"]) assert.ok(isBrandQuery(query));
 assert.ok(!isBrandQuery("امداد خودرو آنلاین"));
});
test("baseline uses sums and impression-weighted position, not averages of CTRs", () => {
 const result = summarize([{ query:"خودرو چاره",page:"/",clicks:2,impressions:10,position:2 },{ query:"خودروچاره",page:"/",clicks:3,impressions:90,position:10 }]);
 assert.equal(result.brand.ctr,.05); assert.equal(result.brand.impressionWeightedPosition,9.2);
 assert.equal(result.nonbrand.ctr,null);
 assert.throws(()=>summarize([{ query:"test",page:"/",clicks:11,impressions:10,position:2 }]));
});
