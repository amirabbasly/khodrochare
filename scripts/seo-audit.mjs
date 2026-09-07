#!/usr/bin/env node
/**
 * SEO crawler / auditor for khodrochare.ir
 *
 * Crawls every URL in sitemap.xml (plus every internal link it can find),
 * fetches the rendered HTML and reports concrete, page-level problems:
 * metadata, canonicals, headings, structured data, images, links, weight.
 *
 *   node scripts/seo-audit.mjs                       # audit local prod build (http://127.0.0.1:3000)
 *   node scripts/seo-audit.mjs --base https://khodrochare.ir
 *   node scripts/seo-audit.mjs --json out/seo.json   # machine readable report
 */

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i > -1 && args[i + 1] ? args[i + 1] : fallback;
};

const BASE = getArg("base", process.env.AUDIT_BASE || "http://127.0.0.1:3000").replace(/\/$/, "");
const JSON_OUT = getArg("json", "");
const CONCURRENCY = Number(getArg("concurrency", "6"));
const SITE_ORIGIN = "https://khodrochare.ir";

/** ---- tiny HTML helpers (no dependencies) ---- */
const decodeEntities = (s = "") =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)));

const attr = (tag, name) => {
  const re = new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i");
  const m = tag.match(re);
  return m ? decodeEntities(m[2] ?? m[3] ?? m[4] ?? "") : null;
};

const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}(\\s[^>]*?)?>`, "gi"))].map((m) => m[0]);

const metas = (html) =>
  [...html.matchAll(/<meta\s[^>]*>/gi)].map((m) => ({
    raw: m[0],
    name: (attr(m[0], "name") || attr(m[0], "property") || "").toLowerCase(),
    content: attr(m[0], "content") || "",
  }));

const metaContent = (html, name) => metas(html).find((m) => m.name === name.toLowerCase())?.content ?? null;

const links = (html) =>
  [...html.matchAll(/<a\s[^>]*>/gi)]
    .map((m) => ({ raw: m[0], href: attr(m[0], "href"), rel: (attr(m[0], "rel") || "").toLowerCase() }))
    .filter((l) => l.href !== null);

const jsonLdBlocks = (html) => {
  const out = [];
  const re = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) {
    const raw = m[1].trim();
    try {
      out.push({ ok: true, data: JSON.parse(raw), raw });
    } catch (e) {
      out.push({ ok: false, error: String(e.message || e), raw });
    }
  }
  return out;
};

const images = (html) =>
  [...html.matchAll(/<img\s[^>]*>/gi)].map((m) => ({
    raw: m[0],
    src: attr(m[0], "src"),
    srcset: attr(m[0], "srcset"),
    alt: attr(m[0], "alt"),
    width: attr(m[0], "width"),
    height: attr(m[0], "height"),
    loading: attr(m[0], "loading"),
    decoding: attr(m[0], "decoding"),
    fetchpriority: attr(m[0], "fetchpriority"),
  }));

/** Visible text extraction, roughly: drop scripts/styles/svg/noscript, strip tags. */
const visibleText = (html) => {
  const body = html.split(/<body[^>]*>/i)[1] ?? html;
  const clean = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ");
  return decodeEntities(clean).replace(/\s+/g, " ").trim();
};

const wordCount = (text) => (text ? text.split(/\s+/).filter((w) => /[^\s]/.test(w)).length : 0);

/** Persian digits + ZWNJ aware character count for SERP length checks. */
const titleLen = (t = "") => [...decodeEntities(t)].length;

const normalise = (u) => {
  try {
    const url = new URL(u, BASE);
    url.hash = "";
    let p = url.pathname;
    // collapse duplicate slashes, drop trailing slash except root
    p = p.replace(/\/{2,}/g, "/");
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    // Crawl key is always relative to BASE (a sitemap URL keeps its production origin,
    // an in-page link may be relative) so the same page is never audited twice.
    return {
      origin: url.origin,
      path: p,
      search: url.search,
      key: `${BASE}${p}${url.search}`,
      siteKey: `${SITE_ORIGIN}${p}${url.search}`,
      localUrl: `${BASE}${p}${url.search}`,
      url,
    };
  } catch {
    return null;
  }
};

/** path -> encoded path, the way it should appear in canonical/sitemap/href */
const encodePath = (p) =>
  p
    .split("/")
    .map((seg) => {
      try {
        return decodeURIComponent(seg)
          .split("")
          .map((c) => (/[A-Za-z0-9\-._~]/.test(c) ? c : encodeURIComponent(c)))
          .join("");
      } catch {
        return seg;
      }
    })
    .join("/");

const sameSite = (n) => n && (n.origin === BASE || n.origin === SITE_ORIGIN);

const issues = [];
const push = (severity, page, code, message, detail) =>
  issues.push({ severity, page, code, message, ...(detail ? { detail } : {}) });

async function get(url, headers) {
  const res = await fetch(url, { redirect: "manual", headers });
  const body = res.status === 200 ? await res.text() : "";
  return { status: res.status, headers: res.headers, body, location: res.headers.get("location") };
}

/** ------------- crawl ------------- */
async function main() {
  const started = Date.now();
  const UA = { "user-agent": "Mozilla/5.0 (compatible; SeoAudit/1.0; +https://khodrochare.ir)" };

  const sitemapRes = await fetch(`${BASE}/sitemap.xml`, { headers: UA });
  const sitemapXml = await sitemapRes.text();
  const sitemapUrls = [...sitemapXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => decodeEntities(m[1].trim()));
  const sitemapLastmod = new Map(
    [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
      const loc = decodeEntities((m[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/) || [])[1] || "");
      const lastmod = (m[1].match(/<lastmod>\s*([^<\s]+)\s*<\/lastmod>/) || [])[1] || null;
      return [loc, lastmod];
    }),
  );

  // robots.txt checks
  const robotsRes = await fetch(`${BASE}/robots.txt`, { headers: UA });
  const robotsTxt = await robotsRes.text();
  const sitemapRefs = [...robotsTxt.matchAll(/^Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (!sitemapRefs.length) push("high", "/robots.txt", "robots-no-sitemap", "robots.txt هیچ ارجاعی به sitemap ندارد");
  sitemapRefs.forEach((ref) => {
    if (!ref.startsWith(SITE_ORIGIN)) push("medium", "/robots.txt", "robots-sitemap-origin", `آدرس sitemap در robots.txt با دامنه اصلی نمی‌خواند: ${ref}`);
  });
  const uaGroups = [...robotsTxt.matchAll(/^User-?[Aa]gent:\s*(.+)$/gm)].map((m) => m[1].trim());
  const starCount = uaGroups.filter((u) => u === "*").length;
  if (starCount > 1) push("low", "/robots.txt", "robots-duplicate-star", `${starCount} گروه مجزا برای User-agent: * تعریف شده (در RFC 9309 تعریف‌نشده است؛ بهتر است یکی شود)`);
  const blockedAi = ["GPTBot", "ClaudeBot", "Google-Extended", "CCBot", "Bytespider", "PerplexityBot", "Applebot-Extended", "Amazonbot", "meta-externalagent"];
  const blockedFound = blockedAi.filter((b) => new RegExp(`User-?agent:\\s*${b}\\b[\\s\\S]{0,80}?Disallow:\\s*/\\s*(\\n|$)`, "i").test(robotsTxt));
  if (blockedFound.length)
    push("info", "/robots.txt", "robots-ai-blocked", `ربات‌های AI مسدود شده‌اند: ${blockedFound.join(", ")} (روی رتبه گوگل اثر ندارد ولی دیده‌شدن در پاسخ‌های AI را محدود می‌کند)`);

  // 404 handling + API headers
  const notFound = await get(`${BASE}/this-page-does-not-exist-xyz`, UA);
  if (notFound.status !== 404) push("high", "/this-page-does-not-exist-xyz", "soft-404", `صفحه ناموجود کد ${notFound.status} برمی‌گرداند (باید 404 باشد)`);
  if (notFound.status === 404 && /noindex/i.test(metaContent(notFound.body, "robots") || "")) {
    // ok
  }
  const apiRes = await fetch(`${BASE}/api/chat`, { method: "OPTIONS", headers: UA, redirect: "manual" }).catch(() => null);
  const apiGet = await fetch(`${BASE}/api/chat`, { headers: UA, redirect: "manual" }).catch(() => null);
  const xrobots = apiGet?.headers.get("x-robots-tag") || apiRes?.headers.get("x-robots-tag") || "";
  if (!/noindex/i.test(xrobots)) push("medium", "/api/chat", "api-no-xrobots", `هدر X-Robots-Tag روی /api تنظیم نشده (دریافتی: "${xrobots || "هیچ"}")`);

  // Crawl: sitemap first, then discovered internal links
  const queue = sitemapUrls.map((u) => normalise(u)).filter(Boolean);
  const seen = new Set(queue.map((q) => q.key));
  const pages = new Map();
  const discovered = [];

  let idx = 0;
  async function worker() {
    while (idx < queue.length) {
      const item = queue[idx++];
      const localUrl = `${BASE}${item.path}${item.search}`;
      let r;
      try {
        r = await get(localUrl, UA);
      } catch (e) {
        push("high", item.path, "fetch-error", `خطا در دریافت صفحه: ${String(e.message || e)}`);
        continue;
      }
      pages.set(item.key, { item, ...r, requestedFromSitemap: sitemapUrls.some((s) => normalise(s)?.key === item.key) });

      if (r.status !== 200) continue;
      // discover internal links
      for (const l of links(r.body)) {
        const n = normalise(l.href.startsWith("http") ? l.href : `${BASE}${l.href.startsWith("/") ? "" : "/"}${l.href}`);
        if (!n || !sameSite(n)) continue;
        if (n.path.startsWith("/_next") || n.path.startsWith("/fonts") || n.path.startsWith("/images") || n.path.startsWith("/icons")) continue;
        if (!seen.has(n.key)) {
          seen.add(n.key);
          discovered.push(n);
          queue.push(n);
        }
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const htmlPages = [...pages.values()].filter((p) => p.status === 200 && /<html/i.test(p.body));

  /** ------------- per-page checks ------------- */
  const titles = new Map();
  const descriptions = new Map();
  const h1s = new Map();
  const bodies = new Map();
  const sentences = new Map();

  for (const p of htmlPages) {
    const path = p.item.path;
    const html = p.body;
    const size = Buffer.byteLength(html, "utf8");

    // status / redirect
    if (p.status >= 300 && p.status < 400) {
      push("info", path, "redirect", `${p.status} → ${p.location}`);
      continue;
    }

    // html lang/dir
    const htmlTag = (html.match(/<html[^>]*>/i) || [""])[0];
    if (!/\slang\s*=/.test(htmlTag)) push("high", path, "no-lang", "تگ <html> صفت lang ندارد");
    if (!/dir\s*=\s*["']?rtl/i.test(htmlTag)) push("medium", path, "no-dir", "تگ <html> صفت dir=rtl ندارد");

    // title
    const title = decodeEntities((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "").trim();
    if (!title) push("high", path, "no-title", "صفحه <title> ندارد");
    else {
      const len = titleLen(title);
      if (len > 65) push("medium", path, "title-long", `عنوان ${len} کاراکتر است (بیش از ~۶۰؛ در SERP برش می‌خورد)`, title);
      if (len < 15) push("low", path, "title-short", `عنوان فقط ${len} کاراکتر است`, title);
      if (titles.has(title)) push("high", path, "title-duplicate", `عنوان تکراری با ${titles.get(title)}`, title);
      else titles.set(title, path);
    }

    // description
    const desc = metaContent(html, "description");
    if (!desc) push("high", path, "no-description", "meta description ندارد");
    else {
      const len = titleLen(desc);
      if (len > 165) push("medium", path, "description-long", `توضیحات متا ${len} کاراکتر است (بیش از ~۱۶۰)`, desc);
      if (len < 50) push("low", path, "description-short", `توضیحات متا فقط ${len} کاراکتر است`, desc);
      if (descriptions.has(desc)) push("high", path, "description-duplicate", `توضیحات متای تکراری با ${descriptions.get(desc)}`, desc);
      else descriptions.set(desc, path);
    }

    // canonical
    const canonicalTag = tags(html, "link").find((t) => /rel\s*=\s*["']?canonical/i.test(t));
    const canonical = canonicalTag ? attr(canonicalTag, "href") : null;
    if (!canonical) push("high", path, "no-canonical", "تگ canonical ندارد");
    else {
      const n = normalise(canonical);
      const selfKey = `${SITE_ORIGIN}${path}`;
      if (n && n.origin !== SITE_ORIGIN) push("high", path, "canonical-origin", `canonical به دامنه دیگر اشاره می‌کند: ${canonical}`);
      else if (n && n.siteKey !== selfKey) push("high", path, "canonical-mismatch", `canonical با آدرس صفحه نمی‌خواند: ${canonical} ≠ ${selfKey}`);
      if (canonical !== encodePath(canonical.replace(SITE_ORIGIN, "")) && /[^\x00-\x7F]/.test(canonical))
        push("medium", path, "canonical-unencoded", `canonical کدگذاری نشده (RFC 3986): ${canonical}`);
    }

    // robots meta
    const robotsMeta = metaContent(html, "robots");
    if (robotsMeta && /noindex/i.test(robotsMeta) && p.requestedFromSitemap)
      push("high", path, "noindex-in-sitemap", `صفحه در sitemap است ولی meta robots آن noindex است (${robotsMeta})`);

    // hreflang
    const hreflangs = tags(html, "link").filter((t) => /hreflang/i.test(t));
    if (hreflangs.length) {
      const selfHreflang = hreflangs.find((t) => attr(t, "hreflang") === "fa-IR");
      if (!selfHreflang) push("low", path, "hreflang-no-self", "hreflang بازگشتی به خودش (fa-IR) ندارد");
      hreflangs.forEach((t) => {
        const href = attr(t, "href") || "";
        const n = normalise(href);
        if (n && n.siteKey !== `${SITE_ORIGIN}${path}`) push("low", path, "hreflang-mismatch", `hreflang="${attr(t, "hreflang")}" به صفحه دیگری اشاره می‌کند: ${href}`);
      });
    }

    // headings
    const heads = [...html.matchAll(/<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
      level: Number(m[1]),
      text: visibleText(m[0]).slice(0, 200),
    }));
    const h1 = heads.filter((h) => h.level === 1);
    if (h1.length === 0) push("high", path, "no-h1", "صفحه H1 ندارد");
    if (h1.length > 1) push("medium", path, "multiple-h1", `${h1.length} تگ H1 در صفحه`, h1.map((h) => h.text).join(" | "));
    if (h1.length) {
      const key = h1.map((h) => h.text).join("|");
      if (h1s.has(key)) push("medium", path, "h1-duplicate", `H1 تکراری با ${h1s.get(key)}`, key);
      else h1s.set(key, path);
    }
    // heading order (skip-level)
    let prev = 0;
    for (const h of heads) {
      if (prev && h.level > prev + 1) push("low", path, "heading-skip", `پرش سطح هدینگ: h${prev} → h${h.level}`, h.text);
      prev = h.level;
    }

    // empty sections: a heading whose body is empty (template/data bug -> no links, no text)
    const emptySections = findEmptySections(html);
    if (emptySections.length)
      push("high", path, "empty-section", `${emptySections.length} بخش با عنوان ولی بدون هیچ محتوا/لینک (احتمال باگ داده یا رندر سمت کلاینت)`, emptySections.join(" | "));

    // footer / global nav presence (internal link equity)
    const footerTag = /<footer[\s\S]*?<\/footer>/i.exec(html);
    const footerLinks = footerTag ? links(footerTag[0]).filter((l) => !/^(tel:|mailto:|#)/.test(l.href ?? "")).length : 0;
    if (!footerTag) push("medium", path, "no-footer", "صفحه هیچ <footer> ندارد");
    else if (footerLinks < 5) push("medium", path, "footer-poor", `فوتر فقط ${footerLinks} لینک داخلی دارد`);

    // Open Graph / Twitter
    const ogTitle = metaContent(html, "og:title");
    const ogDesc = metaContent(html, "og:description");
    const ogUrl = metaContent(html, "og:url");
    const ogImage = metaContent(html, "og:image");
    const ogType = metaContent(html, "og:type");
    const ogSiteName = metaContent(html, "og:site_name");
    const ogLocale = metaContent(html, "og:locale");
    if (!ogTitle) push("medium", path, "no-og-title", "og:title ندارد");
    if (!ogDesc) push("medium", path, "no-og-desc", "og:description ندارد");
    if (!ogSiteName) push("low", path, "no-og-sitename", "og:site_name ندارد");
    if (!ogLocale) push("low", path, "no-og-locale", "og:locale ندارد");
    if (!ogType) push("low", path, "no-og-type", "og:type ندارد");
    if (!ogUrl) push("high", path, "no-og-url", "og:url ندارد");
    else {
      const n = normalise(ogUrl);
      if (!n || n.siteKey !== `${SITE_ORIGIN}${path}`) push("high", path, "og-url-mismatch", `og:url با آدرس صفحه نمی‌خواند: ${ogUrl}`);
    }
    if (!ogImage) push("medium", path, "no-og-image", "og:image ندارد");
    const twitterCard = metaContent(html, "twitter:card");
    if (!twitterCard) push("low", path, "no-twitter-card", "twitter:card ندارد");
    if (!metaContent(html, "twitter:image") && ogImage) push("low", path, "no-twitter-image", "twitter:image ندارد");

    // blog/article specifics
    if (path.startsWith("/blog/") && path !== "/blog") {
      if (ogType !== "article") push("medium", path, "og-type-not-article", `og:type باید article باشد، هست: ${ogType}`);
      if (!metaContent(html, "article:published_time")) push("medium", path, "no-published-time", "article:published_time ندارد");
      if (!metaContent(html, "article:modified_time")) push("low", path, "no-modified-time", "article:modified_time ندارد");
    }

    // images
    const imgs = images(html);
    const noAlt = imgs.filter((i) => i.alt === null);
    if (noAlt.length) push("medium", path, "img-missing-alt", `${noAlt.length} تصویر بدون صفت alt`, noAlt.slice(0, 6).map((i) => i.src).join(" , "));
    // next/image with `fill` renders position:absolute inside a sized parent -> intentional, no CLS risk.
    const noDims = imgs.filter((i) => i.src && !/data:/.test(i.src) && (!i.width || !i.height) && !/data-nimg="fill"/.test(i.raw) && !/class="[^"]*\b(?:w-|h-)/.test(i.raw));
    if (noDims.length) push("low", path, "img-no-dimensions", `${noDims.length} تصویر بدون width/height (ریسک CLS)`, noDims.slice(0, 6).map((i) => i.src).join(" , "));
    const eagerHeavy = imgs.filter((i) => i.loading === "lazy" && (i.fetchpriority === "high" || /priority/i.test(i.raw)));
    if (eagerHeavy.length) push("low", path, "img-conflict-priority", `${eagerHeavy.length} تصویر هم lazy و هم priority دارد`, eagerHeavy.map((i) => i.src).join(" , "));

    // JSON-LD
    const ld = jsonLdBlocks(html);
    if (!ld.length && !path.startsWith("/api")) push("medium", path, "no-jsonld", "هیچ داده ساخت‌یافته‌ای (JSON-LD) در صفحه نیست");
    const ids = new Set();
    const refs = new Set();
    for (const block of ld) {
      if (!block.ok) {
        push("high", path, "jsonld-parse-error", `JSON-LD نامعتبر: ${block.error}`, block.raw.slice(0, 160));
        continue;
      }
      const nodes = Array.isArray(block.data) ? block.data : [block.data];
      for (const node of nodes) collectIds(node, ids, refs);
      const type = node0Type(block.data);
      // type-specific required fields
      if (type === "LocalBusiness" || type === "AutoRepair") {
        const n = firstOfType(block.data, ["LocalBusiness", "AutoRepair", "EmergencyService"]);
        for (const f of ["name", "image", "telephone", "address", "url"]) if (!n[f]) push("high", path, `jsonld-${type}-missing-${f}`, `در اسکیما ${type} فیلد ${f} موجود نیست`);
        if (!n.openingHoursSpecification && !n.openingHours) push("low", path, `jsonld-${type}-missing-hours`, `${type} ساعت کاری ندارد`);
        if (!n.geo && !n.hasMap) push("low", path, `jsonld-${type}-missing-geo`, `${type} مختصات جغرافیایی (geo) ندارد — برای Local Pack مهم است`);
        // NOTE: aggregateRating/review on LocalBusiness is "self-serving"; Google has not
        // shown review stars for LocalBusiness/Organization since Sep 2019, so do NOT add it.
        if (!n.priceRange) push("low", path, `jsonld-${type}-missing-pricerange`, `${type} فیلد priceRange ندارد`);
      }
      if (type === "Article" || type === "BlogPosting") {
        const n = firstOfType(block.data, ["Article", "BlogPosting"]);
        for (const f of ["headline", "image", "datePublished", "author", "publisher"]) if (!n[f]) push("high", path, `jsonld-article-missing-${f}`, `Article فیلد ${f} را ندارد`);
        if (n.headline && titleLen(n.headline) > 110) push("low", path, "jsonld-headline-long", `headline مقاله ${titleLen(n.headline)} کاراکتر است (>110)`);
        if (!n.mainEntityOfPage) push("low", path, "jsonld-article-no-mainentity", "Article فیلد mainEntityOfPage ندارد");
      }
      if (type === "FAQPage") {
        const n = firstOfType(block.data, ["FAQPage"]);
        const qs = (n.mainEntity || []).filter((q) => q["@type"] === "Question");
        if (!qs.length) push("high", path, "jsonld-faq-empty", "FAQPage بدون Question است");
        qs.forEach((q) => {
          if (!q.acceptedAnswer?.text) push("high", path, "jsonld-faq-no-answer", `پاسخ سؤال «${q.name}» خالی است`);
        });
      }
      if (type === "BreadcrumbList") {
        const n = firstOfType(block.data, ["BreadcrumbList"]);
        const items = n.itemListElement || [];
        if (!items.length) push("medium", path, "jsonld-breadcrumb-empty", "BreadcrumbList خالی است");
        items.forEach((it, i) => {
          if (!it.name) push("medium", path, "jsonld-breadcrumb-no-name", `آیتم ${i + 1} breadcrumb نام ندارد`);
          if (i < items.length - 1 && !it.item) push("low", path, "jsonld-breadcrumb-no-item", `آیتم ${i + 1} breadcrumb لینک (item) ندارد`);
        });
      }
      if (type === "Service") {
        const n = firstOfType(block.data, ["Service"]);
        for (const f of ["name", "description", "provider", "areaServed"]) if (!n[f]) push("medium", path, `jsonld-service-missing-${f}`, `Service فیلد ${f} را ندارد`);
        if (!n.offers && !n.availableChannel) push("low", path, "jsonld-service-no-offer", "Service هیچ offers/availableChannel ندارد");
      }
      // Sitelinks SearchBox (WebSite.potentialAction) was retired by Google in Oct 2024 -> no check.
      if (type === "ItemList") {
        const n = firstOfType(block.data, ["ItemList"]);
        if (!n.itemListElement?.length) push("low", path, "jsonld-itemlist-empty", "ItemList خالی است");
      }
      if (type === "Organization" || type === "LocalBusiness") {
        const n = firstOfType(block.data, ["Organization", "LocalBusiness"]);
        if (n.sameAs) {
          const arr = Array.isArray(n.sameAs) ? n.sameAs : [n.sameAs];
          if (!arr.length) push("low", path, "jsonld-sameas-empty", "sameAs خالی است");
        } else push("low", path, "jsonld-no-sameas", "sameAs (پروفایل‌های اجتماعی/ثبت‌شده) ندارد");
      }
    }
    // unresolved @id references (graph breaks)
    refs.forEach((ref) => {
      if (!ids.has(ref) && !ref.startsWith("#")) {
        // reference to another page's fragment is OK only if that page exists in the graph
        push("low", path, "jsonld-dangling-ref", `ارجاع @id به گره تعریف‌نشده: ${ref}`);
      }
    });
    // duplicate @id inside the same page
    const idCounts = new Map();
    for (const block of ld) {
      if (!block.ok) continue;
      collectIdsOnly(block.data, idCounts);
    }
    [...idCounts.entries()].filter(([, c]) => c > 1).forEach(([id, c]) => push("medium", path, "jsonld-duplicate-id", `@id تکراری (${c} بار): ${id}`));

    // body text volume + duplicate content
    const text = visibleText(html);
    bodies.set(path, text);
    const wc = wordCount(text);
    if (wc < 250) push("medium", path, "thin-content", `محتوای متنی قابل‌مشاهده فقط ${wc} کلمه است`, text.slice(0, 160));

    // page weight
    if (size > 300_000) push("low", path, "html-heavy", `HTML صفحه ${(size / 1024).toFixed(0)}KB است`);

    // landmarks / validity
    const mains = tags(html, "main").length;
    if (mains > 1) push("medium", path, "multiple-main", `${mains} تگ <main> در صفحه (HTML نامعتبر برای دسترسی‌پذیری)`);
    if (mains === 0) push("low", path, "no-main", "صفحه تگ <main> ندارد");
    if ((html.match(/<body/gi) || []).length > 1) push("high", path, "multiple-body", "بیش از یک <body> در خروجی HTML");

    // links
    for (const l of links(html)) {
      const href = l.href ?? "";
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#") || href.startsWith("javascript:")) continue;
      const n = normalise(href);
      if (!n) {
        push("medium", path, "link-invalid", `لینک نامعتبر: ${href}`);
        continue;
      }
      if (!sameSite(n)) continue;
      // relative links that will 404
      const target = pages.get(n.key);
      if (target && target.status === 404) push("high", path, "internal-404", `لینک داخلی به صفحه ۴۰۴: ${href}`);
      if (target && target.status >= 300 && target.status < 400 && !/utm|fbclid/.test(n.search))
        push("medium", path, "link-to-redirect", `لینک داخلی مستقیماً به آدرسی می‌رود که ${target.status} ریدایرکت می‌خورد: ${href} → ${target.location}`);
      if (n.search && /utm_|fbclid|gclid/.test(n.search) && !/rel="[^"]*nofollow/.test(l.raw))
        push("low", path, "link-tracking-params", `لینک داخلی با پارامتر ردیابی و بدون rel: ${href}`);
      if (/[^\x00-\x7F]/.test(href) && href !== encodeURI(href)) push("info", path, "link-unencoded", `href کدگذاری‌نشده: ${href}`);
      if (!l.rel.includes("noopener") && /target\s*=\s*["']?_blank/i.test(l.raw) && !sameSite(n))
        push("low", path, "link-no-noopener", `لینک خارجی target=_blank بدون rel=noopener: ${href}`);
    }
    // external link rel audit
    const external = links(html).filter((l) => {
      const n = normalise(l.href ?? "");
      return n && !sameSite(n) && !/^(tel|mailto|javascript|#)/.test(l.href ?? "");
    });
    external.forEach((l) => {
      if (!/nofollow|noopener|noreferrer/.test(l.rel)) push("info", path, "external-no-rel", `لینک خروجی بدون rel: ${l.href}`);
    });

    // anchors without text
    const emptyAnchors = [...html.matchAll(/<a\s[^>]*>([\s\S]*?)<\/a>/gi)].filter((m) => {
      const inner = m[1];
      const text = visibleText(inner).trim();
      const hasImgAlt = /<img[^>]*alt\s*=\s*["'][^"']+["']/i.test(inner);
      const aria = /aria-label\s*=\s*["'][^"']+["']/i.test(m[0]);
      return !text && !hasImgAlt && !aria;
    });
    if (emptyAnchors.length) push("medium", path, "empty-anchor", `${emptyAnchors.length} لینک بدون متن/alt/aria-label (anchor text نامشخص)`, emptyAnchors.slice(0, 5).map((m) => attr(m[0], "href")).join(" , "));

    // viewport + font preload + render-blocking
    if (!metaContent(html, "viewport")) push("high", path, "no-viewport", "meta viewport ندارد (mobile-friendly نیست)");
    const blockingCss = tags(html, "link").filter((t) => /rel\s*=\s*["']?stylesheet/i.test(t));
    if (blockingCss.length > 2) push("low", path, "many-blocking-css", `${blockingCss.length} فایل CSS مسدودکننده رندر`);
    const inlineStyles = (html.match(/<style[\s\S]*?<\/style>/gi) || []).reduce((a, s) => a + Buffer.byteLength(s), 0);
    if (inlineStyles > 400_000) push("low", path, "huge-inline-css", `${(inlineStyles / 1024).toFixed(0)}KB CSS اینلاین در HTML`);

    sentences.set(path, new Set(text.split(/(?<=[.!؟])\s+/).map((x) => x.trim()).filter((x) => x.split(/\s+/).length > 4)));

    p._record = { path, title, titleLen: titleLen(title), desc, descLen: titleLen(desc || ""), canonical, ogUrl, ogImage, h1: h1[0]?.text || "", words: wc, htmlKB: +(size / 1024).toFixed(1), imgs: imgs.length, ldTypes: ld.filter((b) => b.ok).flatMap((b) => (Array.isArray(b.data) ? b.data : [b.data]).map((d) => node0Type(d))).filter(Boolean), lastmod: sitemapLastmod.get([...sitemapLastmod.keys()].find((k) => normalise(k)?.key === `${SITE_ORIGIN}${path}`)) ?? null };
  }

  // how much of each page is boilerplate repeated elsewhere?
  const sentFreq = new Map();
  for (const set of sentences.values()) for (const x of set) sentFreq.set(x, (sentFreq.get(x) || 0) + 1);
  const total = sentences.size || 1;
  for (const p of htmlPages) {
    const set = sentences.get(p.item.path);
    if (!set || !set.size || !p._record) continue;
    let uniq = 0, shared = 0;
    for (const x of set) { const c = sentFreq.get(x) || 0; if (c === 1) uniq++; if (c > total * 0.3) shared++; }
    p._record.uniquePct = Math.round((100 * uniq) / set.size);
    p._record.boilerplatePct = Math.round((100 * shared) / set.size);
    if (p._record.boilerplatePct >= 40)
      push(p._record.boilerplatePct >= 60 ? "high" : "medium", p.item.path, "boilerplate-heavy", `${p._record.boilerplatePct}٪ جمله‌های این صفحه در بیش از ۳۰٪ صفحات دیگر عیناً تکرار شده (فقط ${p._record.uniquePct}٪ منحصربه‌فرد)`);
  }

  /** ------------- asset checks (og image, favicon, manifest) ------------- */
  const localise = (u) => (u.startsWith(SITE_ORIGIN) ? `${BASE}${u.slice(SITE_ORIGIN.length)}` : u.startsWith("http") ? u : `${BASE}${u}`);
  const ogImagesToCheck = new Set();
  for (const p of htmlPages) {
    const og = metaContent(p.body, "og:image");
    if (og) ogImagesToCheck.add(og);
  }
  for (const og of ogImagesToCheck) {
    const u = localise(og);
    let res;
    try {
      res = await fetch(u, { headers: UA });
    } catch {
      push("high", "/og-image", "og-image-unreachable", `og:image قابل دریافت نیست: ${og}`);
      continue;
    }
    if (res.status !== 200) push("high", "/og-image", "og-image-404", `og:image کد ${res.status} می‌دهد: ${og}`);
    const ct = res.headers.get("content-type") || "";
    if (/webp|avif/.test(ct)) push("medium", og, "og-image-format", `og:image با فرمت ${ct} است؛ واتساپ/لینکدین/تلگرام ممکن است پیش‌نمایش ندهند (JPEG/PNG امن‌تر است)`);
    const len = Number(res.headers.get("content-length") || 0);
    if (len > 1_500_000) push("low", og, "og-image-heavy", `حجم og:image ${(len / 1024).toFixed(0)}KB`);
    const ogW = res.headers.get("content-type");
    void ogW;
  }
  // og:image dimensions via a light PNG/JPEG header parse
  for (const og of ogImagesToCheck) {
    const u = localise(og);
    try {
      const buf = Buffer.from(await (await fetch(u, { headers: UA })).arrayBuffer());
      const dim = imageSize(buf);
      if (dim && (dim.width < 600 || dim.height < 315)) push("medium", og, "og-image-small", `ابعاد og:image ${dim.width}×${dim.height} (حداقل توصیه‌شده ۱۲۰۰×۶۳۰)`);
      if (dim && Math.abs(dim.width / dim.height - 1200 / 630) > 0.08) push("low", og, "og-image-ratio", `نسبت ابعاد og:image ${dim.width}×${dim.height} با ۱.۹۱:۱ نمی‌خواند`);
    } catch {}
  }

  for (const asset of ["/favicon.ico", "/apple-touch-icon.png", "/manifest.webmanifest", "/images/og-cover.jpg", "/blog/feed.xml"]) {
    try {
      const res = await fetch(`${BASE}${asset}`, { headers: UA });
      if (res.status !== 200) push("medium", asset, "asset-missing", `${asset} کد ${res.status} می‌دهد`);
    } catch {
      push("medium", asset, "asset-error", `${asset} قابل دریافت نیست`);
    }
  }

  /** ------------- sitemap vs crawl ------------- */
  const sitemapKeys = new Set(sitemapUrls.map((u) => normalise(u)?.siteKey));
  const crawledIndexable = htmlPages.filter((p) => {
    const rm = metaContent(p.body, "robots") || "";
    return p.status === 200 && !/noindex/i.test(rm);
  });
  for (const p of crawledIndexable) {
    const key = `${SITE_ORIGIN}${p.item.path}`;
    if (!sitemapKeys.has(key) && !["/favicon.ico", "/icon.png"].includes(p.item.path))
      push("medium", p.item.path, "not-in-sitemap", "صفحه ایندکس‌شدنی است ولی در sitemap.xml نیست (کشف‌شده از لینک داخلی)");
  }
  for (const u of sitemapUrls) {
    const n = normalise(u);
    if (!n) {
      push("high", "/sitemap.xml", "sitemap-invalid-url", `آدرس نامعتبر در sitemap: ${u}`);
      continue;
    }
    if (n.origin !== SITE_ORIGIN) push("high", "/sitemap.xml", "sitemap-foreign-host", `آدرس خارج از دامنه در sitemap: ${u}`);
    if (u !== encodePath(u.replace(SITE_ORIGIN, "")) && /[^\x00-\x7F]/.test(u)) push("high", "/sitemap.xml", "sitemap-unencoded", `آدرس کدگذاری‌نشده در sitemap: ${u}`);
    const found = pages.get(n.key);
    if (!found) push("medium", "/sitemap.xml", "sitemap-not-crawled", `آدرس sitemap بررسی نشد: ${u}`);
    else if (found.status !== 200) push("high", "/sitemap.xml", "sitemap-bad-status", `آدرس sitemap کد ${found.status} می‌دهد: ${u}`);
    else {
      const rm = metaContent(found.body, "robots") || "";
      if (/noindex/i.test(rm)) push("high", "/sitemap.xml", "sitemap-noindex", `آدرس sitemap صفحه noindex است: ${u}`);
      const canon = tags(found.body, "link").find((t) => /rel\s*=\s*["']?canonical/i.test(t));
      const canonHref = canon ? attr(canon, "href") : null;
      if (canonHref && normalise(canonHref)?.siteKey !== n.siteKey) push("high", "/sitemap.xml", "sitemap-canonical-mismatch", `canonical صفحه (${canonHref}) با آدرس sitemap (${u}) یکی نیست`);
    }
    if (!sitemapLastmod.get(u)) push("low", "/sitemap.xml", "sitemap-no-lastmod", `lastmod ندارد: ${u}`);
  }
  if (new Set(sitemapUrls).size !== sitemapUrls.length) push("high", "/sitemap.xml", "sitemap-duplicates", "آدرس تکراری در sitemap.xml");

  /** ------------- near-duplicate content clusters (doorway risk) ------------- */
  const shingles = new Map();
  for (const [path, text] of bodies) {
    const words = text.split(/\s+/);
    const set = new Set();
    for (let i = 0; i + 11 < words.length; i += 4) set.add(words.slice(i, i + 12).join(" "));
    shingles.set(path, set);
  }
  const paths = [...shingles.keys()];
  const clusters = [];
  for (let i = 0; i < paths.length; i++) {
    for (let j = i + 1; j < paths.length; j++) {
      const a = shingles.get(paths[i]);
      const b = shingles.get(paths[j]);
      if (!a.size || !b.size) continue;
      let inter = 0;
      for (const s of a) if (b.has(s)) inter++;
      const jac = inter / (a.size + b.size - inter);
      if (jac > 0.55) clusters.push({ a: paths[i], b: paths[j], jac: +jac.toFixed(2) });
    }
  }
  clusters
    .sort((x, y) => y.jac - x.jac)
    .slice(0, 40)
    .forEach((c) => push(c.jac > 0.8 ? "high" : "medium", c.a, "near-duplicate", `شباهت محتوایی ${Math.round(c.jac * 100)}٪ با ${c.b} (ریسک doorway page / محتوای تکراری)`));

  /** ------------- orphan pages ------------- */
  const linkedTo = new Map();
  for (const p of htmlPages) {
    for (const l of links(p.body)) {
      const n = normalise(l.href?.startsWith("http") ? l.href : `${BASE}${l.href}`);
      if (!n || !sameSite(n)) continue;
      const key = n.siteKey;
      if (!linkedTo.has(key)) linkedTo.set(key, new Set());
      linkedTo.get(key).add(p.item.path);
    }
  }
  for (const p of crawledIndexable) {
    const key = `${SITE_ORIGIN}${p.item.path}`;
    const inbound = linkedTo.get(key);
    if (!inbound || inbound.size === 0) push("high", p.item.path, "orphan-page", "هیچ لینک داخلی به این صفحه نیست (صفحه یتیم)");
    else if (inbound.size <= 1 && p.item.path !== "/") push("info", p.item.path, "single-inbound", `فقط ۱ لینک داخلی از ${[...inbound][0]}`);
  }

  /** ------------- summary ------------- */
  const order = { high: 0, medium: 1, low: 2, info: 3 };
  issues.sort((a, b) => order[a.severity] - order[b.severity] || a.page.localeCompare(b.page));

  const counts = issues.reduce((acc, i) => ((acc[i.severity] = (acc[i.severity] || 0) + 1), acc), {});
  const byCode = issues.reduce((acc, i) => ((acc[i.code] = (acc[i.code] || 0) + 1), acc), {});

  console.log(`\n=== SEO AUDIT: ${BASE} ===`);
  console.log(`pages crawled: ${pages.size} | html pages: ${htmlPages.length} | sitemap urls: ${sitemapUrls.length} | discovered links: ${discovered.length}`);
  console.log(`duration: ${((Date.now() - started) / 1000).toFixed(1)}s`);
  console.log(`issues: ${issues.length} -> high:${counts.high || 0} medium:${counts.medium || 0} low:${counts.low || 0} info:${counts.info || 0}\n`);

  const groups = new Map();
  for (const i of issues) {
    if (!groups.has(i.code)) groups.set(i.code, []);
    groups.get(i.code).push(i);
  }
  for (const [code, list] of [...groups.entries()].sort((a, b) => order[a[1][0].severity] - order[b[1][0].severity] || b[1].length - a[1].length)) {
    console.log(`[${list[0].severity.toUpperCase()}] ${code} (${byCode[code]}x)`);
    list.slice(0, 12).forEach((i) => console.log(`   ${i.page} — ${i.message}${i.detail ? `\n        detail: ${i.detail}` : ""}`));
    if (list.length > 12) console.log(`   ... +${list.length - 12} more`);
    console.log("");
  }

  // per-page table
  console.log("\n=== PAGE TABLE ===");
  const rows = htmlPages.map((p) => p._record).filter(Boolean).sort((a, b) => a.path.localeCompare(b.path));
  console.log("path | title(len) | desc(len) | words | h1 | ldTypes");
  for (const r of rows) {
    console.log(`${r.path} | ${r.titleLen} | ${r.descLen} | ${r.words} | ${r.h1.slice(0, 40)} | ${[...new Set(r.ldTypes)].join(",")}`);
  }

  if (JSON_OUT) {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    await fs.mkdir(path.dirname(path.resolve(JSON_OUT)), { recursive: true });
    await fs.writeFile(JSON_OUT, JSON.stringify({ base: BASE, generatedAt: new Date().toISOString(), pages: rows, issues }, null, 2));
    console.log(`\nJSON report written to ${JSON_OUT}`);
  }
}

/**
 * Sections whose heading is immediately followed by another heading with nothing in
 * between: no text, no link, no image, no list. This is the classic symptom of a
 * template that renders a heading while its data array is empty (or a client-only
 * component), which silently orphans every page that section was supposed to link to.
 */
function findEmptySections(html) {
  const re = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const found = [];
  let m;
  while ((m = re.exec(html))) found.push({ text: visibleText(m[0]).trim(), start: m.index, end: re.lastIndex });
  const out = [];
  for (let i = 0; i < found.length - 1; i++) {
    const gap = html.slice(found[i].end, found[i + 1].start);
    const hasContent = visibleText(gap).trim().length > 0 || /<(a|img|ul|ol|table|video|iframe)\b/i.test(gap);
    if (!hasContent && found[i].text) out.push(found[i].text);
  }
  return out;
}

function node0Type(node) {
  const n = Array.isArray(node) ? node[0] : node;
  if (!n) return null;
  const t = n["@type"];
  return Array.isArray(t) ? t[0] : t || null;
}
function firstOfType(node, types) {
  const list = Array.isArray(node) ? node : [node];
  for (const n of list) {
    const t = n?.["@type"];
    const arr = Array.isArray(t) ? t : [t];
    if (arr.some((x) => types.includes(x))) return n;
  }
  return list[0] || {};
}
function collectIds(node, ids, refs) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((n) => collectIds(n, ids, refs));
  if (node["@id"] && node["@type"]) ids.add(String(node["@id"]));
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === "object") collectIds(v, ids, refs);
    else if (k !== "@id" && typeof v === "string" && v.includes("#") && v.startsWith("http") && /#(organization|website|webpage|logo|breadcrumb|service|article|itemlist)$/.test(v)) refs.add(v);
  }
}
function collectIdsOnly(node, counts) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((n) => collectIdsOnly(n, counts));
  // A bare { "@id": ... } is a *reference*, not a node definition -> ignore it.
  if (node["@id"] && node["@type"]) counts.set(String(node["@id"]), (counts.get(String(node["@id"])) || 0) + 1);
  for (const [k, v] of Object.entries(node)) if (k !== "@id" && v && typeof v === "object") collectIdsOnly(v, counts);
}
function imageSize(buf) {
  // JPEG
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2;
    while (off < buf.length) {
      if (buf[off] !== 0xff) { off++; continue; }
      const marker = buf[off + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) };
      }
      off += 2 + buf.readUInt16BE(off + 2);
    }
  }
  // PNG
  if (buf.slice(0, 8).toString("hex") === "89504e470d0a1a0a") return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  return null;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
