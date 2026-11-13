# Content quality, reviewed publication and real community intake

## Delivered scope

- Fixed the bare «شمال» auto-link rule at its source; country links now require «شمال کشور», while «شمال تهران» keeps its own destination.
- Rewrote the identified Tehran districts traffic/base/unsafe-stop paragraphs and FAQ. Qualified additional evacuation instructions across article modules; corrected specific battery, CNG leak, improvised warming and route-order advice found during inspection. These changes are not independent certification of every automotive assertion.
- Removed seven repeated long-body paragraph groups in six scenario articles. Preserved scenario-specific intake, constraints, mistakes, checklists, related links and sources instead of padding to 1,000 words. Tests now check a minimum substantive body and specific decision sections, not an arbitrary 1,000-word marketing quota.
- Added 22 different district intake prompts and linked the existing district table to the five regional guides. Tehranser moved from the district 9 example to district 21. No 22 near-duplicate doorway pages or new branch identities were created. Administrative boundaries still require checking against municipal mapping for exact addresses.
- Simplified service answer wording and removed the redundant west-Tehran access section; retained west-specific decision content.
- Expanded the service process/price/acceptance/warranty explanation on `/rules`, disclosure on `/privacy`, and source/publication policy on `/editorial-policy`.
- Existing home design, visual identity, app destinations, commercial service routes and published URLs retained.

## 1. Reviewed scheduled publishing

`src/content/generated/articles.json` is consumed by the real blog collection: published entries get real static pages, metadata, Article schema, archive presence, sitemap and route inventory through the existing renderers. Empty by default; no fabricated article was seeded.

```sh
npx tsx scripts/content-pipeline.ts draft
npx tsx scripts/content-pipeline.ts check
npx tsx scripts/content-pipeline.ts publish
```

Draft requires server/CI-only `CONTENT_AI_URL` (HTTPS OpenAI-compatible chat-completions endpoint), `CONTENT_AI_KEY`, `CONTENT_AI_MODEL`, `CONTENT_TOPIC`. Never expose these as NEXT_PUBLIC variables. No provider call was made in this implementation session: no configured provider/credential was available.

Draft JSON goes to `content/queue/<slug>.json`, never directly to the public collection. Review actual source pages, technical applicability and claim accuracy. A source URL passing syntax checks does **not** establish that it exists or supports the claim. Add the following envelope only after review:

```json
{
  "post": { "...": "complete BlogPost object" },
  "publishAt": "ISO date/time with timezone",
  "approval": {
    "reviewer": "actual responsible reviewer",
    "reviewedAt": "actual ISO review time",
    "sha256": "digest printed by the check command for that exact post",
    "verifiedSources": ["each reviewed source URL"]
  }
}
```

The illustrative envelope above is documentation, not a usable queue entry. Editing any post field invalidates its approval digest. Gates check depth, repeated headings/sections, normalized text overlap, unsafe phrases, source URLs, date ordering, internal destinations and slug collisions. Overlap thresholds are conservative review aids, not proof of uniqueness or Google intent analysis. Unapproved drafts stay private; malformed/failed items fail closed. Updates are supported for generated articles; existing hand-authored guides require normal source edits, avoiding accidental overwrites.

`.github/workflows/content-publication.yml`:
- 05:23 UTC daily or manual dispatch.
- `CONTENT_PUBLICATION_ENABLED=true` enables publication of reviewed, due items, **after lint/unit/build/SEO checks**. Push target is this session's branch only: `arena/c49e5954-khodrochare`.
- `CONTENT_AI_ENABLED=true` enables scheduled draft generation; configure provider secrets plus model/topic repository variables. Drafts are downloadable private workflow artifacts for source review, not public pages.
- Choose a new topic after using a draft; title/text overlap checks prevent repeatedly publishing the same topic under different slugs.
- GitHub schedules run only when the workflow exists on the repository default branch. Adding the workflow on this working branch does not activate its schedule. Manual dispatch also has GitHub default-branch availability requirements.
- A git push is **not** a deployment. The server's existing deployment/rebuild must run before generated pages become live. No deployment webhook, scheduler activation or secret was invented or configured remotely in this session.

## 2. Real comments, ratings and moderated replies

Implemented `/api/community` and an accessible discussion form on articles, Tehran/local and service pages supported by the API. Disabled unless persistent storage is configured. Disabled state does not pretend to accept comments.

Set in the production process environment:

```text
COMMUNITY_DATA_DIR=/srv/khodrochare-private/community
COMMUNITY_ADMIN_TOKEN=<new long random secret, at least 32 characters>
```

Create the private directory outside the checkout and public web root, owned by the app process, with mode 0700. Back up it separately and keep it across builds/restarts. Never commit it. Absolute checkout-internal paths are rejected. This implementation is for a **single Node server with persistent disk**, not ephemeral/serverless replicas; use a shared database/central rate limiting before scaling out. Per-process request limits are not a distributed anti-spam system. Configure the trusted reverse proxy to overwrite `X-Real-IP` (do not forward arbitrary client values).

- Submission: explicit consent, bounded streamed JSON body, exact allowed page, same-origin check, honeypot, length/URL/contact-data screening, rate limiting, normalized duplicate screening, private `pending` storage.
- No invented names/reviews/orders or aggregateRating schema. A user-selected rating is not proof of a completed order. Negative ratings receive the same pending workflow.
- Only approved public fields are returned. Moderator listing/status changes require bearer authentication; no admin token reaches browser code. Atomic writes avoid partially-written public records. Concurrent duplicate submissions across processes are not guaranteed to be serialized; stay single-instance or migrate storage.
- Comments render as escaped text; no user HTML.
- Retrieval-only suggested replies use existing FAQ answers or a cautious fallback. They are suggestions, not automatically published technical diagnoses.

Run on the host with the same storage environment:

```sh
npx tsx scripts/moderate-community.ts list
npx tsx scripts/moderate-community.ts suggest ACTUAL_ID
npx tsx scripts/moderate-community.ts approve ACTUAL_ID 'reviewed response text'
npx tsx scripts/moderate-community.ts reject ACTUAL_ID
npx tsx scripts/moderate-community.ts delete ACTUAL_ID
```

The management interface is CLI/authenticated API, not a graphical admin dashboard. Review tone, relevance, privacy and factual claims; never auto-approve solely because sentiment is positive. Honor correction/deletion requests through the contact channel. Define an organizational retention period and moderation owner before activation; none was invented in code.

## 3. Monitoring

```sh
npx tsx scripts/audit-editorial.ts
npx tsx scripts/search-monitor.ts current.csv previous.csv
```

The first scans all blog main/supplemental body sections for the configured risky phrases, exact repeated long bodies (200+ normalized characters) and high 4-word-shingle overlap. It does not check all possible factual mistakes, FAQ reuse, backlinks or semantic paraphrases. CI now runs this audit and queue checks.

The second accepts a query+page Search Console/API export with headers `query,page,clicks,impressions,position`; use equal date windows and identical country/device/search-type filters. Standard single-dimension Pages or Queries CSV alone is not sufficient. Output `coverage/search-monitor.json` flags position losses, queries appearing on multiple pages and impression/position opportunities. These are review signals, not automatic reasons to merge or delete pages. Real GSC data was unavailable; only synthetic CSV parsing/flagging was tested. No real rank declines or CTR gains are claimed.

## Executed validation

- ESLint and 154 unit tests passed.
- Production build passed; production SEO checked 479 routes, including 475 indexable pages: zero failures; all indexable destinations reachable.
- All 78 existing Tehran-scope URLs passed canonical, single-H1, title, JSON-LD/FAQ, heading and internal-target checks against the production build.
- Article audit: 67 articles; zero matches for the configured risk phrases, zero exact repeated long-body groups after cleanup, zero pairs above the configured text-overlap threshold. This is **not** a 100% quality/factual score.
- 20 desktop/mobile Playwright tests passed: discussion flow, Tehran pages, server-rendering, contextual links, carousel and home regressions. Full browser suite was not rerun.
- Actual local HTTP tests passed for consent, cross-origin rejection, unauthenticated moderation rejection, duplicate submission, pending privacy, approval and public-field filtering. All fixture records removed.
- Publication integration passed: no approval => no publication; wrong digest => failure; future schedule => no early publication; valid approval => real collection update; second publication => idempotent. Synthetic fixture restored/removed before final build.
- CSV fixture: one simulated decline, one multi-page-query review, one opportunity; not site performance data.
- Fresh local mobile Lighthouse: Tehran performance 92 / SEO 100 / accessibility 96; tow 93/100/96; urban highways 93/100/96. LCP 3.218/3.216/3.148 seconds; CLS 0. No claim of live CWV improvement: these lab LCP values still exceed 2.5 seconds. Production CDN/cache and field measurements remain necessary.

## Remaining operational work / honest boundaries

Deploy this branch; configure private durable storage and moderation ownership; configure provider credentials, factual review responsibility and scheduling. Run real Search Console/CrUX monitoring and validate business evidence (fleet counts, ETA distribution, guarantees, licenses) before promoting operational claims. Backlink authority, independently verified operations and ranking/conversion superiority over competitors were not measured or manufactured. No promise of under-30-minute arrival was added.
