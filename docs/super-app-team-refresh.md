# Super-app, fleet, team and refresh update

- Secondary desktop/mobile header links, in RTL order: /app (سوپر اپلیکیشن خودرو چاره), /safir (ثبت نام سفیران خودرو چاره), /about (درباره ما). Other secondary buttons removed; primary SEO navigation retained.
- Footer Myket icon follows Instagram; footer direct-download guide removed. APK controls remain on the download page and only enable for a real release.
- Customer banner reused on /app with supplied exact screenshots; Myket and Android marks distinguish the destinations. PWA subtitle: نسخه IOS. No native iOS package is implied; installation instructions explain Safari/PWA.
- Customer feature descriptions are owner-supplied product information, not a test of live account functionality. AI guidance is not a replacement for physical diagnosis. No unsupported first-in-market, all-model coverage or sub-1% error guarantee is published. Such claims require a dated, reproducible evaluation identifying models, test data, error metric and limitations.
- /safir includes its own introduction panel, registration flow and income factors, without guaranteed earnings. Panel is explicitly an explanatory graphic, not an invented screenshot of the fleet app. Real fleet screenshots are still needed for an exact phone preview.
- /team has reference-inspired director feature and member cards, using existing business names and roles. No reference-photo faces, invented personnel or stock portraits were used. Official individual photos must be supplied to replace the explicitly labeled empty portraits. The /about team section reuses the layout.
- Welcome message now uses only a document-lifetime guard: refresh resets it, client-side navigation does not. Delay, input-focus/visibility guards, dismissal and non-blocking accessibility remain.
- Added /team to sitemap and route inventory. Kept Person structured data and added the current screenshot OG derivative.

Validation: lint, production build, 159 unit tests, 12 focused desktop/mobile browser tests, production SEO audit (476 indexable routes, zero failures). Browser tests cover refreshed welcome, three secondary links, customer/fleet/team content, footer icons and overflow.
