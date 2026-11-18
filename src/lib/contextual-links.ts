import { serviceContextRules } from "@/content/contextual-service-links";
export type TextPart = { text: string; href?: string };
const basePath = (href: string) => href.split(/[?#]/)[0];
const word = /[\p{L}\p{N}\u200c]/u;
/** A bounded, destination-deduplicated link plan. Caller owns the shared paragraph budget. */
export function contextualParts(text: string, currentPath: string, used = new Set<string>(), limit = 6): TextPart[] {
  const parts: TextPart[] = [];
  let remaining = text;
  while (remaining && used.size < limit) {
    const matches = serviceContextRules.flatMap(rule => {
      if (basePath(rule.href) === basePath(currentPath) || used.has(basePath(rule.href))) return [];
      let index = remaining.indexOf(rule.phrase);
      while (index >= 0) {
        const before = remaining[index - 1];
        const after = remaining[index + rule.phrase.length];
        if ((!before || !word.test(before)) && (!after || !word.test(after))) return [{ ...rule, index }];
        index = remaining.indexOf(rule.phrase, index + 1);
      }
      return [];
    }).sort((a,b) => a.index - b.index || b.phrase.length - a.phrase.length);
    const match = matches[0];
    if (!match) break;
    if (match.index) parts.push({ text: remaining.slice(0, match.index) });
    parts.push({ text: match.phrase, href: match.href });
    used.add(basePath(match.href));
    remaining = remaining.slice(match.index + match.phrase.length);
  }
  if (remaining) parts.push({ text: remaining });
  return parts;
}
