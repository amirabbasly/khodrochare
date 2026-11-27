import { mkdir, writeFile } from "node:fs/promises";
import { load } from "cheerio";
import { indexablePaths, nonindexablePaths } from "./lib/route-inventory";
import { absoluteUrl, siteUrl } from "../src/seo/metadata";

const origin = process.argv[2] ?? siteUrl;
const expected = new Set(indexablePaths);
const pathOf = (url: string) => decodeURIComponent(new URL(url).pathname);
const fetchURL = (path: string) => fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(15000) });
async function main() {
  const response = await fetchURL("/sitemap.xml");
  if (response.status !== 200) throw new Error(`Sitemap HTTP ${response.status}`);
  const xml = load(await response.text(), { xmlMode: true });
  const urls = xml("url > loc").map((_, el) => xml(el).text()).get();
  const paths = urls.map(pathOf);
  const duplicates = paths.filter((path, i) => paths.indexOf(path) !== i);
  const missing = [...expected].filter(path => !paths.includes(path));
  const unexpected = paths.filter(path => !expected.has(path));
  const invalidOrigins = urls.filter(url => new URL(url).origin !== siteUrl);
  const results: object[] = [];
  let cursor = 0;
  await Promise.all(Array.from({ length: 5 }, async () => {
    while (cursor < paths.length) {
      const path = paths[cursor++];
      try {
        const res = await fetchURL(encodeURI(path));
        const $ = load(await res.text());
        const robots = $("meta[name='robots'],meta[name='googlebot']").map((_, el) => $(el).attr("content")).get().join(";") + (res.headers.get("x-robots-tag") ?? "");
        results.push({ path, status: res.status, redirect: res.headers.get("location"), noindex: /noindex|none/i.test(robots), canonical: $("link[rel='canonical']").attr("href"), canonicalCorrect: new URL($("link[rel='canonical']").attr("href") ?? "about:blank").href === absoluteUrl(path), intentionallyNonindexable: nonindexablePaths.includes(path), title: $("title").text() });
      } catch (error) { results.push({ path, error: String(error) }); }
    }
  }));
  const report = { origin, source: "direct HTTP; not Google cache or URL Inspection", expectedCount: expected.size, actualCount: urls.length, duplicates, missing, unexpected, invalidOrigins, results, googleSelectedCanonical: "requires GSC", googleSitemapLastRead: "requires GSC" };
  await writeFile("coverage/seo/deployed-audit.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ...report, results: `${results.length} page responses in coverage/seo/deployed-audit.json` }, null, 2));
  const bad = results.some(row => { const r = row as { status?: number; noindex?: boolean; canonicalCorrect?: boolean }; return r.status !== 200 || r.noindex || !r.canonicalCorrect; });
  if (duplicates.length || missing.length || unexpected.length || invalidOrigins.length || bad) process.exitCode = 1;
}
mkdir("coverage/seo", { recursive: true }).then(main).catch(async error => {
  await writeFile("coverage/seo/deployed-audit.json", JSON.stringify({ origin, status: "unverified", error: String(error), note: "Network failure is not evidence of a production site defect." }, null, 2));
  console.error(String(error)); process.exitCode = 1;
});
