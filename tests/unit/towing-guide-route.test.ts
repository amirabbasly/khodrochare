import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { onlineServiceCluster } from "../../src/content/online-service-cluster";
import sitemap from "../../src/app/sitemap";
import { absoluteUrl } from "../../src/seo/metadata";
test("towing coordination guide has an explicit route and a single canonical sitemap entry", () => {
 const path = "/guides/online-towing-destination-coordination";
 assert.ok(existsSync(`src/app${path}/page.tsx`));
 assert.equal(onlineServiceCluster.filter(item => item.path === path).length, 1);
 assert.equal(sitemap().filter(item => item.url === absoluteUrl(path)).length, 1);
 const route = readFileSync(`src/app${path}/page.tsx`, "utf8");
 assert.ok(route.includes("path: guide.path") && route.includes("<DecisionGuidePage"));
});
