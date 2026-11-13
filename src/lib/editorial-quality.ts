/** Conservative publication gates. Passing these checks is not fact verification. */
export function normalizeText(text: string) {
  return text.normalize("NFKC").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\u200c\s]+/g, " ").replace(/[^\p{L}\p{N} ]/gu, "").trim();
}
export function similarity(a: string, b: string) {
  const grams = (s: string) => { const words = normalizeText(s).split(" "); return new Set(words.slice(0, -3).map((_, i) => words.slice(i, i + 4).join(" "))); };
  const x = grams(a), y = grams(b);
  return x.size && y.size ? [...x].filter(v => y.has(v)).length / Math.min(x.size, y.size) : normalizeText(a) === normalizeText(b) ? 1 : 0;
}
export const prohibitedClaims = /اعزام تضمینی|رسیدن تضمینی|کمتر از ۳۰ دقیقه|در خط کندرو بمانید|نزدیک‌ترین پایگاه غرب|مثلث خطر را در شب دورتر/;
export function qualityIssues(post: { title: string; excerpt: string; sections: { title: string; body: string }[]; sources?: { url: string }[]; links?: { href: string }[] }, existing: { title: string; sections: { body: string }[] }[] = [], allowedPaths?: Set<string>) {
  const issues: string[] = [];
  const text = post.sections.map(s => s.body).join(" ");
  if (post.title.length < 15 || post.title.length > 120 || post.excerpt.length < 60 || post.excerpt.length > 320) issues.push("title_or_excerpt_length");
  if (post.sections.length < 3 || text.split(/\s+/u).length < 250) issues.push("insufficient_decision_depth");
  if (prohibitedClaims.test(JSON.stringify(post))) issues.push("unsupported_or_unsafe_claim");
  if (/[<>]/.test(JSON.stringify(post))) issues.push("markup_not_allowed");
  if (new Set(post.sections.map(s => normalizeText(s.title))).size !== post.sections.length) issues.push("duplicate_heading");
  if (post.sections.some((s, i) => post.sections.slice(0, i).some(other => similarity(s.body, other.body) > .8))) issues.push("duplicate_section");
  if (!post.sources?.length || post.sources.some(s => { try { return new URL(s.url).protocol !== "https:"; } catch { return true; } })) issues.push("sources_required");
  if (!post.links?.length || post.links.some(l => !l.href.startsWith("/") || l.href.startsWith("//") || (allowedPaths && !allowedPaths.has(l.href.split("#")[0])))) issues.push("invalid_internal_link");
  if (existing.some(p => normalizeText(p.title) === normalizeText(post.title) || similarity(text, p.sections.map(s => s.body).join(" ")) > .65)) issues.push("duplicate_or_overlapping_intent");
  return [...new Set(issues)];
}
