export type SearchRow = { query: string; page: string; clicks: number; impressions: number; position: number };
export function isBrandQuery(query: string) {
  const normalized = query.normalize("NFKC").toLowerCase().replace(/[\s\u200c\u200f\u200e_-]/g, "");
  return /خودروچاره|khodrochare/.test(normalized);
}
export function summarize(rows: SearchRow[]) {
  for (const row of rows) {
    if (typeof row.query !== "string" || typeof row.page !== "string" || ![row.clicks, row.impressions, row.position].every(Number.isFinite) || row.clicks < 0 || row.impressions < row.clicks || row.position < 0) throw new Error("Invalid search data row");
  }
  const aggregate = (items: SearchRow[]) => {
    const clicks = items.reduce((sum, row) => sum + row.clicks, 0);
    const impressions = items.reduce((sum, row) => sum + row.impressions, 0);
    return { clicks, impressions, ctr: impressions ? clicks / impressions : null, impressionWeightedPosition: impressions ? items.reduce((sum, row) => sum + row.position * row.impressions, 0) / impressions : null, rows: items.length };
  };
  return { brand: aggregate(rows.filter(row => isBrandQuery(row.query))), nonbrand: aggregate(rows.filter(row => !isBrandQuery(row.query))), note: "Totals cover supplied query/page rows only. Anonymized and omitted queries mean these are NOT page-level GSC totals. Average position is reconstructed and impression-weighted." };
}
