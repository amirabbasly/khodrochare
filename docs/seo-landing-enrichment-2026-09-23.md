# Landing Enrichment + Final On-Site SEO Lockdown — 2026-09-23 (۱ مهر ۱۴۰۵)

## Goal

Finish the on-site SEO stage: every landing type carries substantive **unique, locally-grounded**
content (not just shared modules), all pages render ≥1000 words, freshness signals are current,
and the full validation suite stays green — without touching the homepage UI.

## What shipped

**New content files (15,069 unique Persian words, all landmark/model/route-grounded):**

| File | Coverage | Content per page |
|---|---|---|
| `src/content/landing-expansion-cities.ts` | 26 cities | 2 paragraphs (traffic rhythm + repair-destination strategy) + 2 FAQs |
| `src/content/landing-expansion-cities.ts` | 234 city×service URLs | 2 parameterized sections (cost factors + coordination process), unique per city×service via `cityServiceExtraSections()` |
| `src/content/landing-expansion-hoods.ts` | 45 neighborhoods | 1 paragraph (parking/access + traffic) + 1 FAQ, citing each hood's own landmarks |
| `src/content/landing-expansion-brands.ts` | 12 brands | 2 sections (common roadside failures + parts/specialist/transport) |
| `src/content/landing-expansion-areas.ts` | 5 roads + 3 provinces + 5 Tehran regions | 2 sections (roads/provinces) or paragraph+FAQ (regions) |

**Render wiring:** `location-landings.tsx` (City/CityService/Neighborhood/Province),
`regional-landing-pages.tsx`, `brands/[slug]/page.tsx`, `roads/[slug]/page.tsx`.
Appended FAQs automatically get FAQPage schema via the shared `Questions` component.

**Freshness:** sitemap `siteUpdatedAt`/`contentUpdatedAt`, `coverageUpdatedAt`, and the
AnswerBox default date all bumped to 2026-09-23 (۱ مهر ۱۴۰۵). Sitemap date test updated
(`/رشت/یدک-کش` → 2026-09-23; growth-overridden pins unchanged).

**Guards:** `tests/unit/landing-expansion.test.ts` — 6 tests: full key coverage for every
city/hood/brand/road/province/region, all 9 service routes in the cost-factor map,
per-URL uniqueness spot-checks, localization assertions, forbidden-claim scan, and a
≥14,000-word corpus floor.

## True-scrape proof (production build, chrome stripped)

| Page | Before | After |
|---|---|---|
| `/` (homepage — untouched) | — | 3315w, serves 200 |
| `/تهران` | 1112 | **1436** |
| `/ساری` | 1081 | **1328** |
| `/تهران/یدک-کش` | 1219 | **1429** |
| `/ساری/دیاگ-سیار` | 1251 | **1453** |
| `/تهران/صادقیه` | 1109 | **1236** |
| `/رشت/گلسار` | 1169 | **1280** |
| `/گیلان` | 1071 | **1224** |
| `/brands/saipa` | 1238 | **1406** |
| `/brands/toyota` | 1210 | **1390** |
| `/roads/chalus` | 1011 | **1212** |
| `/roads/tehran-north` | 994 | **1171** ✅ now ≥1000 |
| `/کرج/مهرشهر` | 1093 | **1189** |
| `/تهران/شمال-تهران` | 895 | **1021** ✅ now ≥1000 |
| `/تهران/مرکز-تهران` | — | **1047** ✅ |

Every landing type now renders ≥1000 words, each with hundreds of unique local words.

## Validation (all green)

- `test:unit` 51/51 · `typecheck` · `lint` · `next build` (419 routes) · `test:seo` 419 pages / 0 failures
- `indexing:export` 419 canonical URLs, unchanged set · no U+FFFD · `llms.txt` verified current
- Homepage: zero files touched (see git stat), serves 200 with identical H1

## What remains (off-site / Search Console only)

1. **Google Search Console:** verify property → submit `sitemap.xml` → request indexing for
   `docs/google-indexing-urls.txt` (priority: `/`, pillars, 26 cities, 9×top city-services) →
   monitor Coverage + Core Web Vitals.
2. **One link-building round:** a single high-quality Persian editorial/PR link (news-style
   outlet like the competitor's Tasnim/rooznamehnews placements) pointing at `/امداد-خودرو`
   or `/`, plus fixing any external profile links (Bale channel already site-linked).
