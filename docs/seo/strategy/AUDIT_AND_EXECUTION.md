# SEO strategy: audit and staged implementation

## Audit scope and evidence
Baseline: local production build and HTTP HTML crawl, before this task's application edits. 480 pages checked; 476 intended indexable routes; 483 internal destinations; 107 assets; 53 image variants; 18 invalid paths; 15 redirects. Baseline automated failures: 0. URL_KEYWORD_AUDIT.csv is the complete baseline page-by-page inventory (including four deliberately noindex market pages). It contains actual rendered title, description, canonical and proposed intent ownership, not estimated search volumes or ranking positions.

No Search Console, CrUX, backlink-tool account, competitor analytics, live deployment or external Rich Results validation access was used. The absence of technical errors is not evidence of ranking superiority.

## Prioritized findings
| Priority | Finding | Action |
|---|---|---|
| P1 | Home and online hub titles both address online assistance and app download; online hub description emphasizes download, overlapping /app | Narrow online hub to service selection, coverage and cost, retaining app as the conversion destination |
| P1 | No reproducible homepage protection comparison for this task | Capture source hashes and SSR body/link baseline; compare after build; never edit homepage, home components, shared UI or CSS |
| P2 | Full URL-to-intent mapping is not in a single auditable export | Export baseline CSV for every audited URL; assign topic-specific intent instead of forcing main keywords onto every city/article |
| P2 | Unique titles/descriptions do not by themselves prevent semantic cannibalization | Add regression checks for distinct ownership of home, /app, online hub and preserve self canonicals |
| P2 | Existing crawl and schema validation already pass | Retain infrastructure; rerun production audit rather than generating duplicate schemas or changing robots blindly |
| P3 | ETA less than 30 minutes supplied by owner but operational scope unspecified | Record as owner-supplied statement; obtain covered zones, measurement definition, time window, exclusions and logs before publishing as universal promise |

## Keyword and intent architecture
- `/`: brand + comprehensive super-app discovery; online roadside assistance brand hub. Homepage unchanged in this task, including existing title.
- `/امداد-خودرو-آنلاین`: request-oriented service selection; towing, mobile mechanic, battery, cost and coverage; app is the next step, no website request form introduced.
- `/app`: app download, Android marketplaces, iPhone web version, app access and capabilities.
- `/امداد-خودرو`: explanatory roadside assistance guide, not another app-download page.
- `/services/*`: each specific service; `/battery` owns electrical/battery hub intent.
- City and neighborhood routes: service + actual area, access details and relevant coverage; no fictitious branches.
- `/blog/*`: problem-solving/informational long-tail; link back to the related service or hub.
- `/safir`: professional partner membership, not customer roadside request intent.

Related pages stay self-canonical. Do not canonicalize distinct city/service pages to home or merge unrelated intents merely because words overlap. Search Console query-by-page overlap is required to establish actual cannibalization; this audit identifies a risk, not proven traffic loss.

## Internal linking policy implemented
Retain homepage links exactly. Within the online hub, app-install anchors point to /app; service anchors point to actual service URLs; coverage anchors point to Tehran, Karaj and North hubs; pricing links to /pricing. Add an explicit return to the general roadside guide in the hub's supplementary resources without adding footer-wide keyword repetitions. No new doorway pages, bulk AI location content or manufactured partner links.

## Brand evidence
The existing owner-supplied 1000+ active ambassadors and 50000+ successful services are preserved; no new rating schema, employee count or fabricated review added. Necessary safety, transaction and compatibility information remains accurate. No global wording/layout change to shared components is allowed by the homepage protection constraint.

## 90-day measurement plan
1. After actual deployment: inspect /, /app and the online hub in Search Console; verify live canonical and crawl eligibility; submit sitemap if not already registered.
2. Weekly: export query x page x device for the two keyword families. Compare clicks, impressions, CTR and average position with the preceding period; distinguish low-data volatility and seasonality.
3. Weeks 2–4: evaluate whether app-related queries resolve to /app and service-request queries to the online hub. Adjust relevant metadata/content only when evidence supports it.
4. Monthly: inspect Pages coverage and mobile CWV field data; use LCP/INP/CLS evidence before changing resource loading or shared UI. No field improvement claimed from a build alone.
5. Authority: publish reviewed technical guides based on real service cases with permission; acquire legitimate business/industry references. No purchased link schemes, invented testimonials or ranking guarantees.

## Commands / artifacts
- `npm run lint`
- `npm run test:unit`
- `npm run build`
- `npm run test:seo` → ignored `coverage/seo/production-report.json`
- `node scripts/audit-home-preservation.mjs capture` before application edits
- `node scripts/audit-home-preservation.mjs compare` after build → ignored `coverage/seo/home-preservation.json`

The preservation script verifies tracked homepage/shared-component/public-asset source hashes, the root layout render function, normalized SSR body and link destinations. It is not a screenshot diff or an interactive browser test. Browser visual comparison and actual field CWV remain explicitly unverified.

## Final implementation results
- Changed the online hub title, H1 and description to request/service intent rather than a second app-download landing.
- Kept /app's dedicated installation metadata intact.
- Renamed the online hub app subsection around service access and added a semantic link to the general roadside guide.
- Added an intent-ownership unit test and the reusable homepage preservation audit script.
- Final lint/build/unit/production SEO checks passed; 480 pages checked, zero SEO failures.
- Compared 253 protected source files: no changes. Root layout rendering unchanged; SSR homepage body and link destinations unchanged.
- Exact rendered before/after metadata differences are in EXECUTION_RESULTS.json. URL_KEYWORD_AUDIT.csv remains the pre-change baseline intentionally, not a representation of the modified title.
- No screenshot or interactive browser comparison was available; no claim of visual browser testing or measured CWV gain is made. Source/SSR parity is the available preservation evidence.
- Work is local and not pushed as part of this request.
