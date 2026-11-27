import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { load } from "cheerio";
import { withProductionServer } from "./lib/production-server.mjs";
import { roadsideCoordinationCluster } from "../src/content/roadside-coordination-cluster";
import { roadsideDecisionGuides } from "../src/content/roadside-decision-guides";
import { absoluteUrl } from "../src/seo/metadata";
const hub = "/امداد-خودرو-آنلاین";
withProductionServer(async (origin: string) => {
 const rows = [];
 for (const path of [hub, ...roadsideDecisionGuides.map(guide => guide.path)]) {
  const response = await fetch(new URL(encodeURI(path), origin));
  assert.equal(response.status, 200, path);
  const $ = load(await response.text());
  const main = $("main").clone(); main.find("script,style,nav,header,footer").remove();
  const words = main.text().replace(/\s+/gu," ").trim().split(/\s+/u).filter(Boolean).length;
  const links = $("main a[href]").map((_, el) => $(el).attr("href")!).get().filter(href => href.startsWith("/") && !href.startsWith("//"));
  const targetLinks = links.filter(href => decodeURIComponent(href.split("#")[0]) === hub).length;
  assert.equal($("link[rel='canonical']").attr("href"), absoluteUrl(path));
  assert.equal($("main h1").length, 1, path);
  if (roadsideCoordinationCluster.some(guide => guide.path === path)) {
   assert.ok(words >= 500, `${path}: ${words} words`);
   assert.ok($("main h3").length > 0, path);
   assert.ok(targetLinks >= 1, path);
  }
  if (path === hub) assert.ok(words >= 1000 && words <= 1800, `${path}: strategic content ${words} words`);
  rows.push({ path, visibleMainWords: words, mainInternalLinkElements: links.length, uniqueMainInternalDestinations: new Set(links).size, linksToHub: targetLinks, h2: $("main h2").length, h3: $("main h3").length });
 }
 await mkdir("coverage/seo",{recursive:true});
 const report = { scope:"local production HTML, not traffic or rankings", wordCountMethod:"Whitespace-separated main text excluding scripts/styles/nav/header/footer; normalized U+200C remains within a word", rows, totalMainInternalLinkElements:rows.reduce((sum,row)=>sum+row.mainInternalLinkElements,0), totalGuideLinksToHub:rows.filter(row=>row.path!==hub).reduce((sum,row)=>sum+row.linksToHub,0) };
 await writeFile("coverage/seo/cluster-depth.json", JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
}).catch((error: Error) => { console.error(error); process.exitCode=1; });
