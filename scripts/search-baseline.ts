import { readFile, writeFile, mkdir } from "node:fs/promises";
import { summarize, type SearchRow } from "./lib/search-baseline";
type Period = { start: string; end: string; filters: Record<string, string>; rows: SearchRow[] };
async function main() {
  const [currentFile, previousFile] = process.argv.slice(2);
  if (!currentFile) throw new Error("Usage: npx tsx scripts/search-baseline.ts current.json [previous.json]; supply real GSC query/page rows and matching filters.");
  const current: Period = JSON.parse(await readFile(currentFile, "utf8"));
  const days = (p: Period) => (Date.parse(p.end) - Date.parse(p.start)) / 86400000 + 1;
  if (days(current) !== 28 || !current.filters || !Array.isArray(current.rows)) throw new Error("Expected a 28-day inclusive period, filters and rows");
  const result: Record<string, unknown> = { current: { start: current.start, end: current.end, filters: current.filters, ...summarize(current.rows) } };
  if (previousFile) {
    const previous: Period = JSON.parse(await readFile(previousFile, "utf8"));
    const filters = (p: Period) => JSON.stringify(Object.entries(p.filters ?? {}).sort(([a], [b]) => a.localeCompare(b)));
    if (days(previous) !== 28 || filters(current) !== filters(previous) || Date.parse(previous.end) >= Date.parse(current.start)) throw new Error("Comparison requires non-overlapping 28-day periods and identical filters");
    result.previous = { start: previous.start, end: previous.end, ...summarize(previous.rows) };
  }
  await mkdir("coverage/seo", { recursive: true });
  await writeFile("coverage/seo/search-baseline.json", JSON.stringify(result, null, 2));
  console.log("Wrote coverage/seo/search-baseline.json; no account data fetched or submitted.");
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
