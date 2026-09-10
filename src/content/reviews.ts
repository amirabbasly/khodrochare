export type CustomerReview = {
  /** Customer first name + initial only, e.g. "علی م." — never full identity without consent. */
  name: string;
  service: string;
  city: string;
  /** ISO date, e.g. "2026-08-20". */
  dateIso: string;
  /** Persian display date, e.g. "۲۹ مرداد ۱۴۰۵". */
  dateLabel: string;
  /** 1–5. Only the real score the customer gave. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** The customer's own words. Never invent or paraphrase into marketing copy. */
  text: string;
};

/**
 * REAL customer reviews only. Empty = testimonials section is hidden everywhere.
 *
 * How to enable:
 * 1. Collect genuine post-service feedback (SMS form, call, Google Business Profile).
 * 2. Add entries below with exact consent for first-name publication.
 * 3. Keep every review visible on the page that carries its Review JSON-LD
 *    (the SEO audit fails pages whose structured data is not visible).
 *
 * Do NOT add AggregateRating until there are 5+ real reviews; when you do,
 * update the `unsupported ratings` assertion in scripts/check-production-seo.ts
 * and re-run the full audit — fake ratings risk a Google manual action.
 */
export const customerReviews: readonly CustomerReview[] = [];
