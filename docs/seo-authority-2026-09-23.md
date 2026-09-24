# SEO authority round — 2026-09-23 (۱ مهر ۱۴۰۵, part 2)

## Goal
Make on-page + E-E-A-T decisively stronger than both competitors so that only
clean backlinks + app deployment remain for rank #1. Homepage untouched.

## What shipped
- **Team identity**: 3 real members in `businessFacts.team` (امیرعباس سلیمانی،
  ابوالفضل سلیمانی، مهدی صالحی) → TeamSection + Person schema now live on /about.
- **Phone unification**: every number site-wide is now 09123022064 (complaint line,
  complaint FAQ/article, contact-form placeholder). Verified zero old numbers.
- **8 depth guides** (`blog-depth-guides.ts`): Peugeot Pars, Samand/Soren, Haima S7,
  Dignity, Fidelity + tow-scam avoidance (linkable trust asset), Tehran–north
  intercity transport, autumn north driving. 46 → **54 posts**, 408 → **416 paths**.
- **Brand clusters**: `brandModelGuides` mapping (IKCO 4, SAIPA 4, Chery 1) rendered
  as a new section on brand pages; validated by unit test.
- **Service depth**: `serviceKnowledge` 7 → **12** (battery, jump-start,
  vehicle-access, pre-trip-check, fuel-delivery added, FAQ-dupe safe).
- **Local depth**: `localServiceGuides` 3 → **6** (/رشت/امداد-خودرو، /ساری/امداد-خودرو،
  /چالوس/یدک-کش with unique 3-paragraph content).
- **Linking**: 8 commercialLinks, 6 relatedArticles additions, pillar-resources now
  links scam + intercity guides (from both pillars), /شمال links 9 north guides,
  /about links /partners + /press.
- **Review kit**: `docs/review-collection.md` (SMS templates, consent, publish flow).
  NO fake reviews added — TestimonialsSection stays hidden until real ones exist.
- **Repair**: fixed a U+FFFD corruption in blog.ts line 112 (region-3 list) and
  re-applied edits lost to parallel same-file writes (services relatedArticles,
  /شمال articles section). Rule going forward: one edit per file per block + grep
  verify, or atomic python scripts.

## Validation (2026-09-23, sandbox)
- `npm run test:unit` → 41/41 pass.
- `npm run typecheck` / `lint` / `build` → clean (run before push).
- `npm run indexing:export` → 416 canonical URLs.
- `src/app/page.tsx` untouched (verified via git diff).

## Post-deploy (owner)
1. Deploy → verify /about (team), /brands/*, new /blog/* URLs, city-service pages.
2. GSC: resubmit sitemap; index the 8 new posts + /about + updated brand pages.
3. Send review SMS batch (review-collection.md) → paste real replies for publishing.
4. Continue partner/media outreach (tracker) — the only remaining ranking lever
   besides the app.
