import { readFile, mkdir, writeFile } from "node:fs/promises";
// CSV with quoted fields/newlines; one row per query+page exported from your search data.
export function parseCsv(text: string) {
  const rows: string[][] = []; let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) { const c = text[i]; if (c === '"') { if (quoted && text[i + 1] === '"') { cell += '"'; i++; } else quoted = !quoted; } else if (c === "," && !quoted) { row.push(cell); cell = ""; } else if (c === "\n" && !quoted) { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; } else cell += c; }
  if (quoted) throw Error("Unclosed CSV quote"); if (cell || row.length) { row.push(cell.replace(/\r$/, "")); rows.push(row); } return rows;
}
async function load(file: string) {
  const [headers, ...rows] = parseCsv(await readFile(file, "utf8"));
  if (!["query", "page", "clicks", "impressions", "position"].every(k => headers.includes(k))) throw Error("Required headers: query,page,clicks,impressions,position");
  return rows.filter(r => r.some(Boolean)).map(r => { const get = (k: string) => r[headers.indexOf(k)]; const record = { query: get("query"), page: get("page"), clicks: Number(get("clicks")), impressions: Number(get("impressions")), position: Number(get("position")) }; if (![record.clicks, record.impressions, record.position].every(Number.isFinite)) throw Error("Invalid numeric metric"); return record; });
}
async function main() {
  const [currentFile, previousFile] = process.argv.slice(2); if (!currentFile || !previousFile) throw Error("Provide current.csv previous.csv with equal periods and identical country/device/search-type filters. No data is fetched or invented.");
  const current = await load(currentFile), previous = await load(previousFile);
  const prior = new Map(previous.map(r => [`${r.query}\0${r.page}`, r]));
  const declines = current.flatMap(r => { const p = prior.get(`${r.query}\0${r.page}`); return p && p.impressions >= 30 && r.position - p.position >= 3 ? [{ ...r, previousPosition: p.position, positionLoss: r.position - p.position }] : []; });
  const queryPages = new Map<string, Set<string>>(); for (const r of current) if (r.impressions >= 30) { const pages = queryPages.get(r.query) ?? new Set(); pages.add(r.page); queryPages.set(r.query, pages); }
  const report = { generatedAt: new Date().toISOString(), declines, intentReview: [...queryPages.entries()].filter(([,p]) => p.size > 1).map(([query,pages]) => ({ query, pages: [...pages] })), opportunities: current.filter(r => r.impressions >= 100 && r.position >= 4 && r.position <= 20), note: "Multiple URLs per query is a review signal, not proof of cannibalization. Confirm equal periods, filters and intent before changes." };
  await mkdir("coverage", { recursive: true }); await writeFile("coverage/search-monitor.json", JSON.stringify(report, null, 2)); console.log(`Rows: ${current.length}; declines: ${declines.length}; intent reviews: ${report.intentReview.length}; opportunities: ${report.opportunities.length}`);
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
