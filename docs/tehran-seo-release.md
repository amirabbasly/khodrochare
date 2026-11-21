# Tehran on-page SEO release

## Scope and constraints

- Current working branch: `arena/c49e5954-khodrochare`. No commit, push or production deployment performed for this release.
- Preserve the home presentation: no edits to home page/components, global CSS, navigation behavior, hero, review carousel, comparison, banners or app screenshots in this work.
- Primary audited scope: 78 URLs: Tehran hub (1), services (9), regional hubs (5), neighborhoods (32), regional brand directory (1), regional brands (12), directly Tehran-related articles (17), new urban-highways guide (1).
- Supporting changes: road directory and links on Tehran-connected Haraz, Firuzkuh and Tehran–north road pages. Existing northern content and public URLs retained.
- This is not a claim that every article was fully rewritten. Service decisions and hub content were rewritten; existing unique neighborhood scenarios retained while duplicate expansions/FAQ answers were reduced; brand-specific local intake added; editorial intent and destination ownership clarified.

## Intent ownership / cannibalization prevention

| Owner | Intended decision | Not its role |
|---|---|---|
| `/تهران` | Choose service, region and neighborhood | Repeat every repair manual |
| `/تهران/امداد-خودرو` | Unknown breakdown / initial on-site assessment | Compete as another complete Tehran directory |
| `/تهران/یدک-کش` | Select compatible towing and agree route/cost components | Present all flatbed loading details |
| `/تهران/خودروبر` | Full-platform transport, capacity, loading and handover | Duplicate pricing reference |
| `/تهران/مکانیک-سیار` | Repair scope, workshop referral and parts agreement | Treat reading/clearing codes as repair |
| `/تهران/دیاگ-سیار` | Device compatibility, evidence and diagnostic report | Promise certain diagnosis from one code |
| `/تهران/باتری-خودرو` | Test vs boost vs replacement; installation agreement | Repeat the whole national battery/brand reference |
| `/تهران/پنچرگیری-سیار` | Spare wheel, tire/rim damage and safe work area | Promise every tire repair on roadside |
| `/تهران/کارواش-سیار` | Reservation, facilities and scope of cleaning | Imply emergency 24/7 wash availability |
| `/تهران/سوخت-رسانی-اضطراری` | Safe delivery feasibility and fuel/service costs | Diagnose all shutdowns as empty tanks |
| Regions / neighborhoods | Actual access restrictions, local landmarks and scenarios | Invent local offices or live deployment locations |
| Regional brand pages | Model-aware local intake, service routing, destination | Republish complete technical brand reference |
| `/roads/tehran-highways` | Urban highway location and recovery decisions | Target intercity Tehran–north freeway intent |
| `/roads/tehran-north` | Intercity freeway and its access constraints | Be replaced or redirected to the city guide |
| Articles | Checklist / explanation / preparation | Another transactional landing page |

No cross-canonical or redirect between different intents. Self-canonicals and existing URLs preserved. Actual harmful cannibalization still needs exact-query/page history in Search Console; multiple ranking URLs alone do not prove damage.

## Content and semantic changes

- Nine authored service guides with distinct titles, descriptions, scope, four decision paragraphs and two specialist questions each. No generated town/name swapping.
- Twelve authored brand/model intake guides for Tehran; full model guides remain at existing `/brands/...#model-details` destinations.
- Four Tehran hub editorial sections rewritten: night destination acceptance, current access restrictions, actual online request stages, receipts/guarantee conditions. Removed unverified traffic generalizations, old terminology and the claim that a good address halves dispatch time.
- Region content addresses distinct access decisions. Clarified directional service areas are not official municipal boundaries.
- Replaced the 22 repeated regional link cards with an accessible district reference table; five regional owners remain directly linked. Avoided duplicate href-based React keys.
- Neighborhood pages retain their individual access/scenario content. Removed repeated local expansion paragraph on Tehran pages and FAQ answers that copied the same access/scenario verbatim.
- Suppressed the second global FAQ on scoped Tehran landings/articles; page-specific visible FAQ and JSON-LD remain consistent.
- Seventeen article intent records connect explanations to the appropriate service/reference. Two broad article SEO titles now explicitly informational, not another Tehran sales hub.
- Local NAP is sourced from existing business facts and linked to contact/license/editorial pages. No invented branch, coordinates, review score, price, technician qualification or license verification URL.
- New content is server-rendered and adds no client component, library, image or animation.

### Length policy

No universal word count or keyword density quota. Required decisions and evidence determine length. Primary rendered main-text audit measured approximately 429–2049 whitespace-delimited words across the 78 URLs; templates/navigation are included, so these are not article-body-only counts. Brand directory is intentionally shorter. Existing long articles were not padded to meet arbitrary targets. Tests now validate unique coverage and destinations rather than a 100-word minimum for each hub paragraph.

## Technical changes

- Static route `/roads/tehran-highways`, included by the existing route inventory/sitemap pipeline and road directory.
- Tehran service metadata/H1 ownership separated; original canonical URLs preserved.
- Neighborhood visual and structured breadcrumbs include the appropriate region.
- Service schema for Tehran neighborhoods identifies containing city without fabricating business locations.
- Corrected service channel to the actual customer app instead of a local informational anchor.
- Escaped `<` in JSON-LD; script-termination regression test added.
- Disabled speculative prefetch for dense landing link grids; added explicit high fetch priority for subpage hero images.
- Improved orange CTA text contrast in the subpage landing header/final contact only. Home layout untouched. Shared footer/welcome contrast still reported in lab accessibility checks.
- Scoped sitemap modification dates and current release attribution. Historical future-dated content elsewhere was not globally rewritten; no claim of cleaning every historical date in the site.

## Competitive review

Freshly retrieved competitor samples:
- https://emdadyar24.com/
- https://emdadyar24.com/services/
- https://emdadyar24.com/toyota/
- https://emdadyar24.com/blog/emdad-khodro-hemmat-highway/
- https://emdadyar24.com/blog/emdad-khodro-mantaghe2-tehran-local/
- https://emdadyar24.com/sitemap_index.xml

Competitor strengths: explicit Tehran positioning, region/highway articles, brand/model clusters, pricing examples, external press reference. Its full domain was not crawled or benchmarked; the existence of a press link is not proof of ranking power or service quality.

Controlled improvements verified here: dedicated differentiated service owners, non-repeated local content, contextual model-to-service routing, separate urban/freeway intents, single FAQ entity on audited pages, working server-rendered links, canonical/metadata consistency, local graph without fictitious branches, automated route/asset/schema tests.

Not a defensible claim: superiority on all rival pages, measured faster production performance than the rival, proven better rankings/conversion, or that backlinks are now the only remaining gap. Rival has a broader named-brand set in its reviewed navigation, and granular local/highway material; real operational evidence, verified license details, service guarantees, field CWV and conversion measurement remain important.

## Validation

- `npm run lint`: passed.
- `npm run test:unit`: 149 passed (includes six release tests).
- `npm run build`: passed, static routes generated.
- `npm run test:seo`: 479 checked, 475 expected indexable, zero failures; canonical, robots, metadata, JSON-LD parsing/visible FAQs, internal destinations/anchors, assets, redirects, 404/noindex, reachability.
- `npx tsx scripts/audit-tehran-seo.ts`: 78 scoped pages, zero failures; one H1, distinct titles/H2s, no multiple FAQPage entities, canonical local destinations.
- Target Playwright desktop/mobile suites: 18 passed, including new route without JavaScript, page breadcrumbs/intake, FAQ interaction, overflow and existing home glass/carousel/comparison regressions.
- Reports and traces: ignored `coverage/`; run logs outside repo under `/home/user/tehran-*`.

### Local mobile Lighthouse (one run per page after image priority/contrast changes)

| Page | Performance | Lighthouse SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---:|
| `/تهران` | 92 | 100 | 3.11s | 0 | 128.5ms |
| `/تهران/یدک-کش` | 100 | 100 | 1.07s | 0 | 42ms |
| `/roads/tehran-highways` | 100 | 100 | 1.07s | 0 | 44ms |

Accessibility 96 in each sample; shared footer/welcome contrast findings remain. Hub LCP is above the 2.5s good threshold in this sample; do not describe all CWV as green. Simulated local measurements are variable and not CrUX, INP, a production baseline comparison, or evidence of ranking superiority. New server-only sections add no JS. Large-scale shared client/CSS refactors were not made under the home-preservation constraint.

Optional reproduction (do not persist optional tools in package manifest):
```sh
npm install --no-save --package-lock=false lighthouse @sparticuz/chromium
CHROME_PATH=/path/to/chromium node scripts/audit-tehran-performance.mjs
```
This sandbox additionally needed `LD_LIBRARY_PATH=/tmp/al2023/lib`; that path is environment-specific, not a production requirement.

## Deployment and Search Console

Changes are saved in the current workspace, NOT pushed. A server-side `git pull` alone will not retrieve them until the current branch's changes are committed/pushed or transferred through the release workflow.

1. Review and transfer/publish this working branch through your normal release process; preserve environment/secrets and installed app downloads.
2. In the deployed checkout: `npm ci`, `npm run lint`, `npm run test:unit`, `npm run build`.
3. Restart the existing Next process/container using its real configured service name. Do not guess a PM2/systemd name. Prefer an atomic release/rollback workflow.
4. If sitemap/HTML is cached, invalidate only those affected cached responses as appropriate. No wholesale image purge needed.
5. Check home appearance and app/tel links, then new route, Tehran, a service, a neighborhood, and a brand. Verify HTTP 200, index/follow and self-canonical in raw HTML. Invalid routes still 404.
6. Submit/retain `https://khodrochare.ir/sitemap.xml` in the correct Search Console property.
7. Inspect new `https://khodrochare.ir/roads/tehran-highways` → Test live URL → confirm crawl/index permission and canonical → Request indexing.
8. Request recrawl for a small priority set: `/تهران`, `/تهران/امداد-خودرو`, `/تهران/یدک-کش`, `/تهران/خودروبر`, `/تهران/مکانیک-سیار`, `/تهران/دیاگ-سیار`, `/تهران/باتری-خودرو`. Use sitemap for remaining changes; requests do not guarantee indexing/ranking and repeated submissions do not accelerate it.
9. Full scope list: `docs/tehran-indexing-urls.txt` (78). New-only: `docs/tehran-new-urls.txt` (1). Site-wide list: `docs/google-indexing-urls.txt` (475).
10. Record deployment date. Compare equal 28-day windows, query/page/device separately, and exact query for Tehran vs north Tehran vs northern-country queries. Track phone/app clicks and actual leads separately; ranking alone is not conversion.
11. Check field CWV over its rolling collection window. Do not treat Lighthouse SEO 100 as Google quality/ranking score or lab TBT as INP.

No Search Console action, production deployment, purchase of links, new review, or real order submission performed.
