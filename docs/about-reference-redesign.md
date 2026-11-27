# About and team reference redesign

Reference reviewed: https://mdotcar.com/aboutus/ (both content chunks).

/about follows the reference's section order: introduction + visual, figures, selectable journey, mission/vision controls, team, identity/licenses, cooperation. All prose is original Khodrochare content. Reference images, names, license badges, partner logos and dated company milestones were not copied or attributed to Khodrochare. Existing owner-confirmed legal entity, director, contact and service geography remain. The journey describes areas of work without invented founding dates or historical claims. Existing visuals are explanatory illustrations, not employee portraits.

Retained AboutPage, breadcrumb and Person markup and internal service/region/app/license/contact links. Media/press link remains discoverable. No fake rating schema. Figures reuse the existing owner-supplied homepage counters. App-entry CTA routes to /app.

/team retains the same real names and explicitly empty photo slots, now with scoped navy/orange styling. Director portrait stacks before text below 768px. Team grid is three columns on desktop, two on tablets, one below 480px, with wrapping and natural card heights. Removed old white/teal overrides instead of adding conflicting overrides.

Validation: lint; production build; 163 unit tests; 10 Playwright desktop/mobile checks (journey/mission controls, PWA policy, section composition, team palette and overflow at 320/390/768/1024/1366px); production SEO audit: zero failures, all 476 indexable routes discoverable. Visual screenshots inspected for /about desktop and /team mobile. Official team photos still need to be supplied.
