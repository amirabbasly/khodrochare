import { readFile, mkdir, writeFile } from "node:fs/promises";

type Observation = { engine: string; observedAt: string; query: string; locale: string; answer: string; citations: string[]; evidence: string; accuracy: "correct" | "incorrect" | "mixed" | "unreviewed"; competitors: string[] };
const engines = ["chatgpt-search", "google-ai-overviews", "google-ai-mode", "copilot", "perplexity", "gemini"];
async function main() {
  const file = process.argv[2]; if (!file) throw Error("Supply a JSON array of actual, manually captured search-enabled answers; no engine API is called");
  const rows: Observation[] = JSON.parse(await readFile(file,"utf8"));
  if(!Array.isArray(rows) || !rows.length) throw Error("Actual observations required; empty is unknown, not zero visibility");
  const seen=new Set<string>();
  for(const row of rows) {
    if(!engines.includes(row.engine) || !Number.isFinite(Date.parse(row.observedAt)) || Date.parse(row.observedAt)>Date.now() || !row.query?.trim() || !row.locale?.trim() || !row.answer?.trim() || !row.evidence?.trim() || !Array.isArray(row.citations) || !Array.isArray(row.competitors) || !["correct","incorrect","mixed","unreviewed"].includes(row.accuracy)) throw Error("Invalid observation: preserve engine, timestamp, locale, answer and evidence reference");
    row.citations.forEach(url=>{if(!["https:","http:"].includes(new URL(url).protocol)) throw Error("Invalid citation URL");});
    const id=[row.engine,row.observedAt,row.query,row.locale].join("\0"); if(seen.has(id)) throw Error("Duplicate observation");seen.add(id);
  }
  const report=engines.map(engine=>{
    const sample=rows.filter(r=>r.engine===engine);
    const linked=sample.filter(r=>r.citations.some(url=>new URL(url).hostname==="khodrochare.ir"));
    return {engine,observations:sample.length,brandMentions:sample.length?sample.filter(r=>/خودرو[\s‌]*چاره|khodrochare/i.test(r.answer)).length:null,citedAnswers:sample.length?linked.length:null,citationFrequency:sample.length?linked.length/sample.length:null,citedURLs:[...new Set(linked.flatMap(r=>r.citations.filter(url=>new URL(url).hostname==="khodrochare.ir")))],accuracyReviewed:sample.filter(r=>r.accuracy!=="unreviewed").length,incorrect:sample.filter(r=>r.accuracy==="incorrect"||r.accuracy==="mixed").length};
  });
  await mkdir("coverage/seo",{recursive:true});await writeFile("coverage/seo/citation-summary.json",JSON.stringify({generatedAt:new Date().toISOString(),source:"manual_observations_not_API",note:"Sample frequency, not total engine visibility. Unobserved engines remain null.",report},null,2));
  console.log(`Validated ${rows.length} actual observations; coverage/seo/citation-summary.json`);
}
main().catch(error=>{console.error(error instanceof Error?error.message:"citation_monitor_failed");process.exitCode=1;});
