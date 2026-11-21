# Content-only revision: online roadside-assistance cluster

## Scope and intent
Primary commercial intent belongs to `/امداد-خودرو-آنلاین`: select a service and start the actual customer-app flow. Preparation and follow-up articles keep their own informational intents and link to the existing hub. No extra keyword-variant URLs were created. This is a focused editorial revision, not a claim that every regional/brand page or all 67 articles have been rewritten or independently reviewed by a mechanic.

Revised content:
- Online hub: introduction, answer, existing three-step process, six service descriptions, cost explanation, coverage/access, identity/terms, follow-up and six FAQs.
- `/blog/online-roadside-assistance-tehran-karaj-complete-guide`: preparation copy and snippet.
- `/blog/online-roadside-assistance-request-guide`: snippet, position-change explanation and clearer hypothetical-scenario label (not fabricated customer case studies).
- `/app`: existing customer-feature description.
- Existing specialist content on seven services: roadside-assistance, tow-truck, flatbed-carrier, mobile-mechanic, battery-replacement, jump-start, flat-tire. Rewrote both base and supplementary paragraphs, and corrected selected overconfident FAQs. Other service sections and articles are not represented as comprehensively audited.

Editorial principles: symptoms before guessed parts; model-specific transport/jump-start constraints; itemised costs and agreement before additional work; precise access instead of city name alone; distinguish account entry, receipt and dispatch; no invented SLA, stock, guarantee, free cancellation or tracking feature. No new rating/review claims. Preserve existing links and source references; no unverified expert attribution.

## Design and technical contract
No CSS, typography, images, UI behaviour, navigation destinations, routes or canonical changes. The online JSX tag sequence and class/id/href/src/style/dir/aria/data attributes were AST-compared to the published baseline and matched. Global CSS, root layout, feedback, header and app showcase are byte-identical. Text wrapping and natural section heights can change with the new copy; pixel-identical text geometry is not claimed.

The online release now uses the actual revision date 2026-10-17 (25 Mehr 1405), propagated to the hub, app and two revised articles by the existing sitemap rules. The seven revised services have a narrowly scoped lastModified override. Publication dates are preserved; unrelated future-dated content was not mass-retimestamped.

## Validation
- Lint and production build passed.
- 140 unit tests passed, including distinct article intents, preserved counts/URLs and service modification dates.
- 18 targeted desktop/mobile browser scenarios passed: hub actions, brief tool, SSR service links and FAQ schema, decision tables, app/header links and unchanged comparison/app/feedback design contracts.
- Production SEO audit: 478 pages checked, 474 expected indexable; all indexable pages reachable; zero failures. This is local production QA, not Google index coverage or a ranking measurement.
- No production deployment, Search Console submission, backlink purchase or authority/ranking guarantee.

## Search Console runbook after deployment
1. Use the verified property for the correct domain; prefer a DNS-verified Domain property if setting up from scratch. Submit/check `https://khodrochare.ir/sitemap.xml`; do not repeatedly remove/re-add a successful sitemap.
2. Inspect the online hub and run Test live URL. Check availability, indexability and rendered content; inspect the indexed Google-selected canonical when available. Request indexing once after deployment, then inspect the two companion articles and priority service pages. Repeated requests do not accelerate crawling.
3. Export a baseline under Performance > Search results: Web, page filter for the hub; clicks, impressions, CTR and average position. Compare 28 days with previous 28 days and segment mobile. For this change, compare the first complete post-deployment period; consider seasonality.
4. Separately filter queries containing `امداد خودرو آنلاین` and `امداد آنلاین`, and check Pages. Multiple ranking pages are not automatically cannibalisation; investigate whether informational pages repeatedly displace the service landing for commercial queries. Do not canonicalise distinct articles to the hub merely to consolidate keywords.
5. Review Page indexing by reason. Intentional noindex market placeholders, redirects and genuinely missing pages are not all errors to force-index. Investigate accidental blocking/noindex, wrong canonical, server failures and excluded priority pages. Do not use Removals as an indexing fix.
6. Check Mobile Core Web Vitals and Manual actions/Security issues. Insufficient field data is not proof of good speed. Links report is useful but incomplete and does not provide a DA score.
7. Track legitimate independent citations, relevant editorial links and real customer evidence. Avoid bulk links, PBNs, guaranteed DA packages and paid links that pass ranking credit; qualify paid placements appropriately.

Official references checked for the handoff:
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://support.google.com/webmasters/answer/7576553?hl=en
- https://support.google.com/webmasters/answer/9205520?hl=en
