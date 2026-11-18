import { mkdir, writeFile } from "node:fs/promises";
import { load } from "cheerio";
import { withProductionServer } from "./lib/production-server.mjs";
import { indexablePaths, nonindexablePaths, invalidPaths } from "./lib/route-inventory";
import { legacyRedirects } from "../src/seo/redirects";
import { absoluteUrl, siteUrl } from "../src/seo/metadata";

const csv = (rows: unknown[][]) => "\ufeff" + rows.map(row => row.map(v => `"${String(v ?? "").replaceAll('"', '""')}"`).join(",")).join("\n") + "\n";
async function audit(origin: string) {
  const paths = [...new Set([...indexablePaths, ...nonindexablePaths, ...invalidPaths, ...Object.keys(legacyRedirects)])];
  const records: Record<string, unknown>[] = [];
  const graph = new Map<string, Set<string>>();
  const xml = load(await (await fetch(`${origin}/sitemap.xml`)).text(), { xmlMode: true });
  const modified = new Map<string, string>();
  xml("url").each((_, el) => { modified.set(decodeURIComponent(new URL(xml(el).find("loc").text()).pathname), xml(el).find("lastmod").text()); });
  let next = 0;
  await Promise.all(Array.from({ length: 5 }, async () => {
    while (next < paths.length) {
      const path = paths[next++];
      const response = await fetch(new URL(encodeURI(path), origin), { redirect: "manual", signal: AbortSignal.timeout(30000) });
      const html = await response.text(), $ = load(html);
      const robots = $("meta[name=robots]").attr("content") ?? "";
      const canonical = $("link[rel=canonical]").attr("href") ?? "";
      const links = new Set<string>();
      $("a[href]").each((_, el) => { try { const u = new URL($(el).attr("href")!, absoluteUrl(path)); if (u.origin === siteUrl) links.add(decodeURIComponent(u.pathname)); } catch { /* malformed links are caught by test:seo */ } });
      graph.set(path, links);
      const schemas: string[] = [];
      $("script[type='application/ld+json']").each((_,el) => { try { const v=JSON.parse($(el).text()); const items = Array.isArray(v) ? v : v["@graph"] ?? [v]; for (const item of items) schemas.push(...[item["@type"]].flat().filter(Boolean)); } catch { schemas.push("INVALID_JSON"); } });
      records.push({ path, url:absoluteUrl(path), status:response.status, technicalClass: response.status >= 300 && response.status < 400 ? "Redirected" : response.status===404 ? "404" : response.status===410 ? "410" : /noindex/.test(robots) ? "Noindex" : canonical && new URL(canonical).href !== absoluteUrl(path) ? "Canonicalized" : response.status===200 ? "Indexable" : "Review", title:$("title").text(), h1:$("h1").text(), canonical, robots, redirect:response.headers.get("location")??"", sitemap:modified.has(path), lastmod:modified.get(path)??"", dateReview:modified.get(path) && modified.get(path)! > "2026-10-17T23:59:59Z" ? "later_than_audit_reference_date" : "", schema:[...new Set(schemas)].join(";"), htmlCharacters:$("main").text().replace(/\s+/g," ").trim().length, indexStatus:"unknown_requires_webmaster", evidence:"local_production_build" });
    }
  }));
  const depth = new Map([["/",0]]), queue=["/"];
  for(let i=0;i<queue.length;i++) for(const to of graph.get(queue[i])??[]) if(!depth.has(to)&&graph.has(to)){depth.set(to,depth.get(queue[i])!+1);queue.push(to);}
  const inbound = new Map<string, number>();
  for(const [from,targets] of graph) for(const to of targets) if(to!==from) inbound.set(to,(inbound.get(to)??0)+1);
  records.sort((a,b)=>String(a.path).localeCompare(String(b.path)));
  for(const row of records){ row.crawlDepth=depth.get(String(row.path))??"unreachable_from_home"; row.internalInboundPages=inbound.get(String(row.path))??0; }
  const headers=Object.keys(records[0]);
  await mkdir("docs/seo",{recursive:true}); await mkdir("coverage/seo",{recursive:true});
  await writeFile("docs/seo/SEO_URL_INVENTORY.csv",csv([headers,...records.map(row=>headers.map(k=>row[k]))]));
  await writeFile("coverage/seo/url-inventory.json",JSON.stringify({ referenceDate:"2026-10-17",generatedAt:new Date().toISOString(),environment:"local",records },null,2));
  const summary={total:records.length,indexable:records.filter(r=>r.technicalClass==="Indexable").length,noindex:records.filter(r=>r.technicalClass==="Noindex").length,redirects:records.filter(r=>r.technicalClass==="Redirected").length,notFound:records.filter(r=>r.technicalClass==="404").length,unreachableIndexable:records.filter(r=>r.technicalClass==="Indexable"&&r.crawlDepth==="unreachable_from_home").length,dateReviewCount:records.filter(r=>r.dateReview).length};
  await writeFile("coverage/seo/inventory-summary.json",JSON.stringify(summary,null,2)); console.log(summary);
}
withProductionServer(audit).catch(e=>{console.error(e);process.exitCode=1;});
