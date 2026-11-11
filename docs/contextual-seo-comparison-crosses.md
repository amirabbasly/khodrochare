# Contextual SEO links and comparison crosses

## Requested comparison change
Replaced the text in the two alternative-provider columns with ten red × marks. Each mark has the accessible name «شرایط این ارائه‌دهنده تأیید نشده است». The existing conditions disclosure now explains that × means not independently confirmed, not proof that all other providers lack the service. Preserved five commitments, four-column reference layout and dark theme. Source data remains available but is not rendered in alternative cells.

## Competitive review and scope
Revisited https://emdadyar24.com/toyota/, https://emdadto.com/app/ and the live Khodrochare tow-truck page. Competitor Toyota content emphasises models, intake information and independent service; the form at Emdadto exposes name/phone/service before account entry (submission/GPS not tested). Khodrochare already has detailed technical guidance. The practical changes here prioritise useful next steps and contextual internal links rather than copying claims, inventing dispatch functionality or adding more keyword variants. No SERP rank/backlink/CWV measurement or guarantee of first position was made.

## Editorial changes
- Rewrote both base and supplementary knowledge paragraphs for the five services not covered in the previous seven-service revision: mobile-carwash, mobile-diagnostics, vehicle-access, pre-trip-check, fuel-delivery. Existing section and paragraph counts retained.
- Removed overconfident timing, seasonal, safety and operational assumptions in selected service FAQs. Clarified model-specific constraints, inspection scope, costs and what must be confirmed before action.
- All 12 service knowledge sections now display the actual revision date used in their existing sitemap override. No mass date refresh of other pages or new URLs/canonicals.
- Not a claim that all 474 indexable pages or all 67 articles were individually rewritten or mechanically verified.

## Internal linking
- New server-rendered inline links within existing service/local knowledge paragraphs, brand explanations, city/service/province explanations and decision sections (battery, price, north, selected road and brand guides).
- Curated destinations only; Persian-aware word boundaries; longest-match selection; no self-links; each destination once within a shared group of paragraphs; maximum six linked destinations per group. No new all-to-all sitewide directory, section or keyword-variant pages. Newly added inline links use prefetch=false and no client-side linking script.
- Existing article auto-linking now deduplicates destinations instead of anchor phrases, excludes the current article and preserves the 18-destination ceiling. Cost queries point to pricing; request queries point to the online hub, while general guidance retains the general pillar.
- Measured built SSR output: **420 new marked inline link instances on 248 pages, zero self-links**. This excludes existing blog contextual links and existing link grids. These are link instances, not 420 unique destinations or proven ranking gains.

## Homepage design contract
Homepage sections, images, layout and navigation remain unchanged except the requested comparison marks and its disclosure. Added only scoped .comparison-cross CSS. Replaced the feedback footer's pre-existing internal HTML anchor with Next Link (same text/classes/appearance, prefetch=false) to satisfy lint; no feedback redesign.

## Verification
- Production build and lint passed; 143 unit tests passed.
- All 18 targeted desktop/mobile browser scenarios passed: ten accessible crosses, contextual link presence/self exclusion, layout overflow, comparison, feedback/app screens, online flow and SSR FAQ links.
- Final production SEO audit: 478 pages checked / 474 expected indexable, all reachable, zero failures.
- Unit tests cover existing/indexable curated destinations, Persian boundaries, unchanged text, budget, deduplication and self exclusion. The former test requiring 11 phrases to link the generic pillar was adjusted to nine and explicit assertions for the corrected pricing/online destinations.
- Logs /home/user/seo-links-*.log and built-link measurement /home/user/seo-links-measured.json are outside Git. No production deployment or Google submission performed.
