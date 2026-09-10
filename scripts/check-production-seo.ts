import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { load } from "cheerio";
import { withProductionServer } from "./lib/production-server.mjs";
import { indexablePaths, nonindexablePaths, invalidPaths } from "./lib/route-inventory";
import { legacyRedirects } from "../src/seo/redirects";
import { absoluteUrl, siteUrl } from "../src/seo/metadata";
import nextConfig from "../next.config";

const expected = new Set(indexablePaths);
const failures: string[] = [];
const assertions = (condition: unknown, message: string) => { if (!condition) failures.push(message); };
const plain = (text: string) => text.replace(/\s+/g, " ").trim();
const pathOf = (url: string) => decodeURIComponent(new URL(url, siteUrl).pathname);
const internal = (value: string, from = "/") => {
  try { const url = new URL(value, absoluteUrl(from)); return url.origin === siteUrl ? url : null; } catch { return null; }
};
type PageResult = { path: string; status: number; title: string; description: string; canonical: string; ids: Set<string>; links: string[]; characters: number };
async function pool<T>(items: readonly T[], work: (item: T) => Promise<void>, concurrency = 6) {
  let index = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => { while (index < items.length) await work(items[index++]); }));
}
async function audit(origin: string) {
  const started = Date.now(); const pages = new Map<string, PageResult>();
  const assetURLs = new Set<string>(); const optimizedImages = new Map<string, string>(); const anchors: { source: string; target: string; hash: string }[] = [];
  const request = (path: string, method = "GET", options: RequestInit = {}) => fetch(new URL(path, origin), { redirect: "manual", signal: AbortSignal.timeout(30000), ...options, method, headers: { "User-Agent": "Googlebot", ...options.headers } });
  const sitemapResponse = await request("/sitemap.xml"); assert.equal(sitemapResponse.status, 200);
  const xml = load(await sitemapResponse.text(), { xmlMode: true });
  const sitemapURLs = xml("url > loc").map((_i, element) => xml(element).text()).get();
  assert.equal(sitemapURLs.length, expected.size, "sitemap count differs from intended route inventory");
  assert.equal(new Set(sitemapURLs).size, sitemapURLs.length, "duplicate sitemap URLs");
  assert.deepEqual(new Set(sitemapURLs.map(pathOf)), expected, "sitemap omits or adds unintended pages");
  for (const url of sitemapURLs) {
    assert.equal(new URL(url).origin, siteUrl); assert.equal(url, absoluteUrl(pathOf(url)), `canonical encoding: ${url}`);
  }
  xml("url > lastmod").each((_i, node) => {
    const date = Date.parse(xml(node).text()); assertions(Number.isFinite(date) && date <= Date.now() + 86400000, "invalid/future sitemap lastmod");
  });
  function recordAsset(raw: string | undefined, pagePath: string) {
    if (!raw) return;
    const url = internal(raw, pagePath); if (!url) return;
    if (url.pathname === "/_next/image") {
      const source = url.searchParams.get("url"); const width = Number(url.searchParams.get("w")); const quality = Number(url.searchParams.get("q"));
      const widths = [...(nextConfig.images?.deviceSizes ?? []), ...(nextConfig.images?.imageSizes ?? [])];
      assertions(widths.includes(width), `${pagePath}: unsupported image width ${width}`);
      assertions((nextConfig.images?.qualities ?? []).includes(quality), `${pagePath}: unsupported image quality ${quality}`);
      if (source) { recordAsset(source, pagePath); optimizedImages.set(`${source}:${quality}`, url.pathname + url.search); }
    } else assetURLs.add(url.pathname + url.search);
  }
  await pool([...indexablePaths, ...nonindexablePaths], async (pagePath) => {
    try {
      const response = await request(encodeURI(pagePath)); const html = await response.text(); const $ = load(html);
      const indexable = expected.has(pagePath); const title = plain($("title").text()); const description = $("meta[name='description']").attr("content") ?? "";
      const canonical = $("link[rel='canonical']").attr("href") ?? "";
      assertions(response.status === 200, `${pagePath}: HTTP ${response.status}, expected 200`);
      assertions(response.headers.get("content-type")?.includes("text/html"), `${pagePath}: not HTML`);
      assertions($("h1").length === 1, `${pagePath}: ${$("h1").length} H1 elements`);
      assertions($("html").attr("lang")?.startsWith("fa") && $("html").attr("dir") === "rtl", `${pagePath}: missing Persian/RTL`);
      assertions(title.length > 5 && $("title").length === 1, `${pagePath}: missing/duplicate title`);
      assertions(description.length > 20 && $("meta[name='description']").length === 1, `${pagePath}: missing/duplicate description`);
      assertions($("link[rel='canonical']").length === 1 && Boolean(canonical) && new URL(canonical).href === absoluteUrl(pagePath), `${pagePath}: incorrect canonical ${canonical}`);
      const robots = $("meta[name='robots'],meta[name='googlebot']").map((_i, node) => $(node).attr("content")).get().join(";") + (response.headers.get("x-robots-tag") ?? "");
      assertions(indexable ? !/noindex|none/i.test(robots) : /noindex/i.test(robots), `${pagePath}: incorrect robots ${robots}`);
      assertions($("meta[property='og:url']").attr("content") === canonical, `${pagePath}: OG URL/canonical mismatch`);
      for (const key of ["og:title", "og:description", "og:image"]) assertions(Boolean($("meta[property='" + key + "']").attr("content")), `${pagePath}: missing ${key}`);
      assertions($("meta[name='twitter:card']").attr("content") === "summary_large_image", `${pagePath}: missing Twitter card`);
      recordAsset($("meta[property='og:image']").attr("content"), pagePath);
      const schemas: Record<string, unknown>[] = [];
      $("script[type='application/ld+json']").each((_i, node) => {
        try { const value = JSON.parse($(node).text()); schemas.push(...(Array.isArray(value) ? value : value["@graph"] ?? [value])); }
        catch { failures.push(`${pagePath}: invalid JSON-LD`); }
      });
      assertions(schemas.length >= 2, `${pagePath}: no entity/page structured data`);
      assertions(!schemas.some((schema) => schema["@type"] === "AggregateRating" || schema.numberOfEmployees), `${pagePath}: unsupported ratings/employees`);
      const ids = new Set($("[id]").map((_i, node) => $(node).attr("id")!).get()); const links: string[] = [];
      $("a[href]").each((_i, node) => {
        const href = $(node).attr("href")!; const url = internal(href, pagePath); if (!url) return;
        const path = pathOf(url.href); links.push(path);
        if (url.hash) { try { anchors.push({ source: pagePath, target: path, hash: decodeURIComponent(url.hash.slice(1)) }); } catch { failures.push(`${pagePath}: invalid anchor`); } }
      });
      assertions($("a[href='https://ble.ir/join/G627cQxSZD']").length > 0, `${pagePath}: missing required Bale channel`);
      $("a[href*='ble.ir']").each((_i, node) => assertions($(node).attr("href") === "https://ble.ir/join/G627cQxSZD", `${pagePath}: old Bale link`));
      $("img").each((_i, node) => { assertions($(node).attr("alt") !== undefined, `${pagePath}: image without alt`); recordAsset($(node).attr("src"), pagePath); });
      $("script[src]").each((_i, node) => recordAsset($(node).attr("src"), pagePath));
      $("link[rel='stylesheet'],link[rel='preload'],link[rel='icon'],link[rel='apple-touch-icon'],link[rel='manifest']").each((_i, node) => recordAsset($(node).attr("href"), pagePath));
      $("[srcset],link[imagesrcset]").each((_i, node) => { for (const candidate of ($(node).attr("srcset") ?? $(node).attr("imagesrcset") ?? "").split(",")) recordAsset(candidate.trim().split(/\s+/)[0], pagePath); });
      $("script,style,template").remove(); const visibleText = plain($("body").text()); const mainText = plain($("main").text());
      assertions(!visibleText.includes("\ufffd"), `${pagePath}: invalid Unicode text`);
      if (indexable) assertions(mainText.length > 250, `${pagePath}: empty/thin main content`);
      assertions(!/اعزام معمولاً (?:کمتر از|زیر) ۳۰|زمان معمول.*کمتر از نیم ساعت/.test(visibleText), `${pagePath}: stale unsupported ETA`);
      for (const schema of schemas) if (schema["@type"] === "FAQPage") {
        for (const question of (schema.mainEntity ?? []) as { name: string; acceptedAnswer?: { text: string } }[]) {
          assertions(visibleText.includes(plain(question.name)), `${pagePath}: invisible FAQ question`);
          assertions(visibleText.includes(plain(question.acceptedAnswer?.text ?? "")), `${pagePath}: invisible FAQ answer`);
        }
      }
      pages.set(pagePath, { path: pagePath, status: response.status, title, description, canonical, ids, links, characters: mainText.length });
    } catch (error) { failures.push(`${pagePath}: ${(error as Error).message}`); }
  });
  const titleOwners = new Map<string, string>(); const descriptionOwners = new Map<string, string>();
  for (const page of pages.values()) {
    if (!expected.has(page.path)) continue;
    for (const [value, owners, label] of [[page.title, titleOwners, "title"], [page.description, descriptionOwners, "description"]] as const) {
      assertions(!owners.has(value), `${page.path}: duplicate ${label} with ${owners.get(value)}`); owners.set(value, page.path);
    }
  }
  const destinations = new Set([...pages.values()].flatMap((page) => page.links));
  await pool([...destinations].filter((path) => !pages.has(path)), async (path) => {
    try { const response = await request(encodeURI(path)); assertions(response.status === 200, `linked destination ${path}: HTTP ${response.status}`);
      assertions(!response.headers.get("content-type")?.includes("text/html"), `unlisted HTML page linked: ${path}`); await response.body?.cancel();
    } catch (error) { failures.push(`linked destination ${path}: ${(error as Error).message}`); }
  });
  for (const anchor of anchors) assertions(pages.get(anchor.target)?.ids.has(anchor.hash), `${anchor.source}: missing anchor ${anchor.target}#${anchor.hash}`);
  const reachable = new Set(["/"]); const queue = ["/"];
  while (queue.length) for (const path of pages.get(queue.shift()!)?.links ?? []) if (pages.has(path) && !reachable.has(path)) { reachable.add(path); queue.push(path); }
  for (const path of expected) assertions(reachable.has(path), `orphan page: ${path}`);
  let assetsChecked = 0;
  await pool([...assetURLs], async (path) => {
    try {
      const response = await request(path); assetsChecked++;
      assertions(response.status === 200, `asset ${path}: HTTP ${response.status}`);
      if (path.endsWith(".css")) {
        const css = await response.text();
        for (const match of css.matchAll(/url\(["']?([^\s)'";]+)["']?\)/g)) {
          const url = internal(match[1], path); if (url && !assetURLs.has(url.pathname + url.search)) { assetURLs.add(url.pathname + url.search); const font = await request(url.pathname + url.search, "HEAD"); assetsChecked++; assertions(font.status === 200, `CSS asset ${url.pathname}: HTTP ${font.status}`); }
        }
      } else await response.body?.cancel();
    } catch (error) { failures.push(`asset ${path}: ${(error as Error).message}`); }
  }, 8);
  await pool([...optimizedImages.values()], async (path) => {
    try { const response = await request(path, "GET", { headers: { Accept: "image/webp" } }); assertions(response.status === 200 && response.headers.get("content-type")?.startsWith("image/"), `optimized image ${path}: HTTP ${response.status}`); await response.body?.cancel(); }
    catch (error) { failures.push(`optimized image ${path}: ${(error as Error).message}`); }
  }, 3);
  await pool(invalidPaths, async (path) => {
    const response = await request(encodeURI(path)); const html = await response.text();
    assertions(response.status === 404, `${path}: invalid route returned ${response.status}, not 404`);
    assertions(/noindex/i.test(html) || /noindex/i.test(response.headers.get("x-robots-tag") ?? ""), `${path}: invalid page not noindex`);
  });
  for (const [source, destination] of Object.entries(legacyRedirects)) {
    const response = await request(`${encodeURI(source)}?source=seo-check`); const location = response.headers.get("location");
    assertions([301, 308].includes(response.status), `${source}: missing permanent redirect (${response.status})`);
    if (location) { const target = new URL(location, origin); assertions(pathOf(target.href) === destination && target.searchParams.get("source") === "seo-check", `${source}: wrong redirect target ${location}`);
      const result = await request(target.pathname + target.search); assertions(result.status === 200, `${source}: redirect ends at ${result.status}`); await result.body?.cancel(); }
    else failures.push(`${source}: missing Location`);
  }
  const robotsResponse = await request("/robots.txt"); const robots = await robotsResponse.text();
  assertions(robotsResponse.status === 200 && robots.includes(`${siteUrl}/sitemap.xml`), "robots/sitemap declaration");
  for (const bot of ["*", "Googlebot", "Bingbot", "OAI-SearchBot", "Claude-SearchBot"]) {
    const escaped = bot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assertions(new RegExp(`User-Agent: ${escaped}\\nAllow: /\\nDisallow: /api/`, "i").test(robots), `robots: missing search/API policy for ${bot}`);
  }
  for (const bot of ["GPTBot", "Google-Extended", "ClaudeBot"]) assertions(robots.includes(`User-Agent: ${bot}`), `robots: missing training policy for ${bot}`);
  const availability = await request("/api/service-requests"); assertions((await availability.json()).enabled === false, "test server must not send real requests");
  assertions(availability.headers.get("cache-control")?.includes("no-store"), "request availability must not be cached");
  const post = (body: unknown, originHeader = origin, contentType = "application/json") => request("/api/service-requests", "POST", { headers: { Origin: originHeader, "Content-Type": contentType }, body: JSON.stringify(body) });
  assertions((await post({}, "https://untrusted.invalid")).status === 403, "cross-origin request accepted");
  assertions((await post({}, origin, "text/plain")).status === 415, "wrong content type accepted");
  assertions((await post({})).status === 400, "invalid request accepted");
  const disabled = await post({ requestId: "00000000-0000-4000-8000-000000000001", service: "tow-truck", region: "گیلان", vehicle: "خودروی آزمون", phone: "09120000000", location: "نشانی مصنوعی محلی برای آزمون؛ نه درخواست اعزام", notes: "", consent: true });
  assertions(disabled.status === 503 && (await disabled.json()).error === "online_intake_unavailable", "disabled intake must not fake success");
  assertions((await request("/api/service-requests", "DELETE")).status === 405, "unsupported API method accepted");
  const report = { timestamp: new Date().toISOString(), origin, productionBuild: true, expectedIndexablePages: expected.size, pagesChecked: pages.size, internalDestinations: destinations.size, assetsChecked, optimizedImageVariants: optimizedImages.size, invalidRoutesChecked: invalidPaths.length, legacyRedirectsChecked: Object.keys(legacyRedirects).length, allIndexablePagesReachable: [...expected].every((path) => reachable.has(path)), durationSeconds: Math.round((Date.now() - started) / 1000), failures, pages: [...pages.values()].map(({ ids, links, ...page }) => ({ ...page, anchors: ids.size, outgoingLinks: new Set(links).size })) };
  await mkdir("coverage/seo", { recursive: true }); await writeFile("coverage/seo/production-report.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ...report, failureCount: failures.length, failures: failures.slice(0, 40), pages: undefined }, null, 2));
  assert.equal(failures.length, 0, `${failures.length} checks failed; see coverage/seo/production-report.json`);
}
withProductionServer(audit).catch((error: Error) => { console.error(error); process.exitCode = 1; });
