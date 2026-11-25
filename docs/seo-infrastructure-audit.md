# Technical SEO infrastructure audit

## Scope and protected surface
Production-mode local HTML audit, not a live-domain or Search Console verification. No homepage markup, section order, CSS, client behavior, navigation or API changes. Root layout changes are metadata-only. Homepage source `src/app/page.tsx` is unchanged in this task.

## Corrections
- Correct Organization JSON-LD sameAs to the supplied official Instagram profile and include the existing official X profile. No fabricated ratings, reviews or product certifications added.
- Align root Open Graph and Twitter descriptions with the default description.
- Give /app an app-specific search title and description covering Android marketplaces and the iPhone web version without implying a native iOS release.
- Update manifest descriptive text; retain IDs, scope, launch URL, icons, shortcuts and display behavior.
- Serve manifest with X-Robots-Tag noindex, follow; this excludes the JSON asset, not the website or app landing page.
- Extend llms.txt with actual customer app, fleet and assistant entry pages. This is discovery documentation, not a Google ranking factor or indexing guarantee.
- Keep existing sitemap and robots implementations: the production crawl validated them; no arbitrary rewrite, wildcard block, synthetic lastmod update or duplicate file added. Actual Next configuration is next.config.ts, not next.config.js.

## Regression coverage
The production audit now additionally checks one server-rendered H1 per indexable page, unique top-level JSON-LD IDs, nonduplicated OG title/description, Persian OG locale, llms.txt content type and app links, manifest availability, noindex response header, locale/scope and actual icon responses.

Validation results:
- Lint: pass.
- Production build: pass.
- Unit tests: 175 passed.
- Production HTML SEO audit: 480 pages checked; 476 intended indexable pages; 483 internal destinations; 107 assets; 53 image variants; 18 invalid paths; 15 legacy redirects. Zero failures.
- Audit checks include unique page titles/descriptions, canonical/OG agreement, robots/noindex policy, sitemap inventory and duplicates, JSON-LD parseability and visible FAQ agreement, image alt attributes, broken internal destinations/fragments, permanent redirects, invalid-route 404 and crawl reachability.
- Local generated detailed report: coverage/seo/production-report.json (ignored generated artifact; regenerate with npm run test:seo after npm run build).

## Performance / real-world limits
Existing first-hero priority/fetchPriority, deferred remaining carousel images, font preloads, image sizing/optimization and static rendering are preserved. No speculative UI or resource-loading changes were made merely to claim a performance gain. No field LCP, INP or CLS measurements were available. Use Search Console Core Web Vitals or CrUX real-user data to verify the actual production experience; local build/crawl success does not establish CWV compliance.

No Google/Bing account action, live deployment verification, external Schema.org/Rich Results validator run, browser visual comparison, indexing request, backlink acquisition or ranking guarantee is claimed. The automated validator covers the local production HTML, not every possible external structured-data rule.

## Final requested checks
- Every same-origin URL extracted from the actual llms.txt production response was fetched and returned HTTP 200; linked landing pages were checked for a rendered H1 and matching canonical.
- All 476 intended indexable pages, including Persian service and city routes, passed unique title/description checks.
- JSON-LD was parsed from production-rendered HTML, with entity type, top-level ID uniqueness, breadcrumb order/name and FAQ visibility checks. This is not a claim of external Google Rich Results certification.
- Homepage page source, globals.css and home components are byte-for-byte unchanged relative to the task baseline; the rendering function in root layout is also unchanged. No visual browser screenshot comparison or real-user performance measurement is claimed.
- Final rerun: lint, 175 unit tests, production build and complete production SEO crawl passed with zero failures.
