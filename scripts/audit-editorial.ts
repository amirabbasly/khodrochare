import { mkdir, writeFile } from "node:fs/promises";
import { blogPosts, supplementalArticleSections } from "../src/content/blog";
import { normalizeText, prohibitedClaims, similarity } from "../src/lib/editorial-quality";
async function main() {
  const pages = blogPosts.map(p => ({ slug: p.slug, title: p.title, sections: [...p.sections, ...(supplementalArticleSections[p.slug] ?? [])] }));
  const risks = pages.flatMap(p => p.sections.filter(s => prohibitedClaims.test(s.body)).map(s => ({ slug: p.slug, section: s.title, issue: "unsafe_or_unsupported_phrase" })));
  const repeats = new Map<string, Set<string>>();
  for (const p of pages) for (const s of p.sections) { const key = normalizeText(s.body); if (key.length < 200) continue; const set = repeats.get(key) ?? new Set(); set.add(p.slug); repeats.set(key, set); }
  const overlaps = pages.flatMap((p, i) => pages.slice(i + 1).flatMap(other => { const score = similarity(p.sections.map(s => s.body).join(" "), other.sections.map(s => s.body).join(" ")); return score > .65 ? [{ a: p.slug, b: other.slug, textOverlap: score }] : []; }));
  const report = { checkedAt: new Date().toISOString(), articles: pages.length, risks, repeatedParagraphs: [...repeats.entries()].filter(([, slugs]) => slugs.size > 1).map(([text, slugs]) => ({ excerpt: text.slice(0, 90), pages: [...slugs] })), overlaps, note: "Text overlap flags require editorial review; not proof of Google cannibalization or rankings." };
  await mkdir("coverage", { recursive: true }); await writeFile("coverage/editorial-report.json", JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ articles: pages.length, risks, repeatedParagraphs: report.repeatedParagraphs.length, overlaps: overlaps.length }, null, 2));
  if (risks.length) process.exitCode = 1;
}
main().catch(e => { console.error(e); process.exitCode = 1; });
