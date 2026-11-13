import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { load } from "cheerio";
import { indexablePaths } from "./lib/route-inventory";
import { withProductionServer } from "./lib/production-server.mjs";
import { tehranArticleSlugs } from "../src/content/tehran-seo";
import { absoluteUrl } from "../src/seo/metadata";

const paths = indexablePaths.filter(path => path === "/تهران" || path.startsWith("/تهران/") || path === "/roads/tehran-highways" || (path.startsWith("/blog/") && tehranArticleSlugs.has(path.slice(6))));
withProductionServer(async (origin: string) => {
  const rows = [];
  const failures: string[] = [];
  const titles = new Set<string>();
  for (const path of paths) {
    const response = await fetch(new URL(path, origin));
    const $ = load(await response.text());
    if (response.status !== 200) failures.push(`${path}: HTTP ${response.status}`);
    if ($("main h1").length !== 1) failures.push(`${path}: H1 count`);
    if ($('link[rel="canonical"]').attr("href") !== absoluteUrl(path)) failures.push(`${path}: canonical`);
    const title = $("title").text(); if (titles.has(title)) failures.push(`${path}: duplicate title`); titles.add(title);
    const schemas = $('script[type="application/ld+json"]').map((_, el) => JSON.parse($(el).text())).get();
    const faqs = schemas.filter(schema => schema["@type"] === "FAQPage");
    if (faqs.length > 1) failures.push(`${path}: multiple FAQPage entities`);
    const headingTexts = $("main h2").map((_, el) => $(el).text().trim()).get();
    if (new Set(headingTexts).size !== headingTexts.length) failures.push(`${path}: duplicate H2`);
    const internalLinks = $("main a[href]").map((_, el) => $(el).attr("href")!).get().filter(href => href.startsWith("/"));
    for (const href of internalLinks) if (!indexablePaths.includes(decodeURIComponent(href.split("#")[0]))) failures.push(`${path}: noncanonical/unlisted target ${href}`);
    $("main script,main style").remove();
    rows.push({ path, title, words: $("main").text().trim().split(/\s+/u).length, h2: headingTexts.length, faqEntities: faqs.length, internalLinks: internalLinks.length });
  }
  const report = { scope: paths.length, failures, pages: rows };
  await mkdir("coverage", { recursive: true });
  await writeFile("coverage/tehran-seo-report.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ scope: paths.length, failures, wordRange: [Math.min(...rows.map(row => row.words)), Math.max(...rows.map(row => row.words))] }, null, 2));
  assert.equal(failures.length, 0, failures.join("\n"));
}).catch(error => { console.error(error); process.exitCode = 1; });
