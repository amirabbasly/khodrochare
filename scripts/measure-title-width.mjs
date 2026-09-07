#!/usr/bin/env node
/**
 * SERP title-width checker for khodrochare.ir (Persian / RTL).
 *
 * Google truncates <title> by PIXEL WIDTH (roughly 580px on desktop, ~20px font),
 * not by character count, so a "60 character" rule is wrong for Persian text:
 * Persian glyphs are cursive and joined, and the digits/ZWNJ make character
 * counts a poor proxy for width.
 *
 * This tool reads the audit JSON produced by scripts/seo-audit.mjs, measures every
 * title with the real Vazir-Bold metrics (parsed straight out of the TTF: head,
 * hhea, hmtx and cmap tables - no dependencies, no image library), and lists the
 * titles that will be cut off in the search results.
 *
 *   node scripts/seo-audit.mjs --json out/seo-audit.json          # first
 *   node scripts/measure-title-width.mjs                          # then this
 *   node scripts/measure-title-width.mjs --limit 580 --px 20 --all
 *
 * Calibration note: Google renders SERP titles with its own font, so treat the
 * numbers as a close approximation (Vazir Bold is metrically similar in x-height
 * and average advance to the Arabic/Persian UI fonts Google uses). Anything above
 * the limit will almost certainly be truncated; anything well below it will not.
 */

import { readFileSync } from "node:fs";

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i > -1 && args[i + 1] ? args[i + 1] : fallback;
};
const hasFlag = (name) => args.includes(`--${name}`);

const JSON_IN = getArg("json", "out/seo-audit.json");
const FONT_FILE = getArg("font", "public/fonts/Vazir-Bold.ttf");
const PX = Number(getArg("px", "20")); // SERP title font size on desktop
const LIMIT = Number(getArg("limit", "580")); // desktop pixel budget (mobile ~ 420)
const SHOW_ALL = hasFlag("all");

/** Parse the minimum TTF tables needed to compute string advance widths. */
function readTtfMetrics(file) {
  const b = readFileSync(file);
  const numTables = b.readUInt16BE(4);
  const tables = {};
  for (let i = 0; i < numTables; i += 1) {
    const o = 12 + i * 16;
    tables[b.toString("ascii", o, o + 4)] = { off: b.readUInt32BE(o + 8) };
  }
  for (const required of ["head", "hhea", "hmtx", "maxp", "cmap"]) {
    if (!tables[required]) throw new Error(`TTF is missing the "${required}" table: ${file}`);
  }

  const unitsPerEm = b.readUInt16BE(tables.head.off + 18);
  const numHMetrics = b.readUInt16BE(tables.hhea.off + 34);
  const numGlyphs = b.readUInt16BE(tables.maxp.off + 4);

  const adv = new Array(numGlyphs).fill(0);
  for (let i = 0; i < numHMetrics; i += 1) adv[i] = b.readUInt16BE(tables.hmtx.off + i * 4);
  for (let i = numHMetrics; i < numGlyphs; i += 1) adv[i] = adv[numHMetrics - 1] ?? 0;

  // Pick the first Unicode cmap subtable (platform 0, or platform 3 with enc 1/10).
  const cmapOff = tables.cmap.off;
  const subtables = b.readUInt16BE(cmapOff + 2);
  let sub = null;
  for (let i = 0; i < subtables; i += 1) {
    const o = cmapOff + 4 + i * 8;
    const platform = b.readUInt16BE(o);
    const encoding = b.readUInt16BE(o + 2);
    if (platform === 0 || (platform === 3 && (encoding === 1 || encoding === 10))) {
      sub = cmapOff + b.readUInt32BE(o + 4);
      break;
    }
  }
  if (sub === null) throw new Error(`No Unicode cmap subtable in ${file}`);

  const map = new Map();
  const format = b.readUInt16BE(sub);
  if (format === 4) {
    const segX2 = b.readUInt16BE(sub + 6);
    const segCount = segX2 / 2;
    const endO = sub + 14;
    const startO = endO + segX2 + 2;
    const deltaO = startO + segX2;
    const rangeO = deltaO + segX2;
    for (let s = 0; s < segCount; s += 1) {
      const end = b.readUInt16BE(endO + s * 2);
      const start = b.readUInt16BE(startO + s * 2);
      const delta = b.readInt16BE(deltaO + s * 2);
      const ro = b.readUInt16BE(rangeO + s * 2);
      for (let c = start; c <= end && c < 0xffff; c += 1) {
        let g;
        if (ro === 0) {
          g = (c + delta) & 0xffff;
        } else {
          const gi = rangeO + s * 2 + ro + (c - start) * 2;
          g = b.readUInt16BE(gi) || 0;
          if (g) g = (g + delta) & 0xffff;
        }
        if (g && g < numGlyphs) map.set(c, g);
      }
    }
  } else if (format === 12) {
    const groups = b.readUInt32BE(sub + 12);
    for (let i = 0; i < groups; i += 1) {
      const o = sub + 16 + i * 12;
      const start = b.readUInt32BE(o);
      const end = b.readUInt32BE(o + 4);
      const startGlyph = b.readUInt32BE(o + 8);
      for (let c = start; c <= end; c += 1) map.set(c, startGlyph + (c - start));
    }
  } else {
    throw new Error(`Unsupported cmap format ${format} in ${file}`);
  }

  return { unitsPerEm, adv, map, fallback: unitsPerEm * 0.5 };
}

const metrics = readTtfMetrics(FONT_FILE);

/** Advance width of `text` rendered at `px` pixels, in CSS pixels. */
function textWidth(text, px = PX) {
  let units = 0;
  for (const ch of String(text)) {
    const cp = ch.codePointAt(0);
    if (cp === 0x200c || cp === 0x200d) continue; // ZWNJ / ZWJ: zero advance in Vazir
    const g = metrics.map.get(cp);
    units += g !== undefined ? metrics.adv[g] : metrics.fallback;
  }
  return (units * px) / metrics.unitsPerEm;
}

let report;
try {
  report = JSON.parse(readFileSync(JSON_IN, "utf8"));
} catch (error) {
  console.error(`Cannot read ${JSON_IN} (${error.code || error.message}).`);
  console.error("Run the audit first:\n  node scripts/seo-audit.mjs --json out/seo-audit.json");
  process.exit(1);
}

const rows = (report.pages || [])
  .filter((page) => page.title)
  .map((page) => ({
    path: decodeURIComponent(page.path),
    title: page.title,
    chars: page.title.length,
    width: textWidth(page.title),
  }))
  .sort((a, b) => b.width - a.width);

if (!rows.length) {
  console.error("No pages with titles found in the report.");
  process.exit(1);
}

const over = rows.filter((row) => row.width > LIMIT);
const widths = rows.map((row) => row.width).sort((a, b) => a - b);
const median = widths[Math.floor(widths.length / 2)];

console.log(`font: ${FONT_FILE} @ ${PX}px   desktop budget: ${LIMIT}px   pages: ${rows.length}`);
console.log(`widest: ${Math.round(widths[widths.length - 1])}px   median: ${Math.round(median)}px   narrowest: ${Math.round(widths[0])}px`);
console.log(`\nTitles wider than ${LIMIT}px (will be truncated in the SERP): ${over.length}\n`);

(SHOW_ALL ? rows : over).forEach((row) => {
  const flag = row.width > LIMIT ? "TRUNCATED" : "ok       ";
  console.log(`  ${flag} ${String(Math.round(row.width)).padStart(4)}px  ${String(row.chars).padStart(3)}ch  ${row.path}`);
  if (SHOW_ALL) console.log(`           «${row.title}»`);
});

if (over.length) {
  console.log("\nWorst offenders:\n");
  over.slice(0, 8).forEach((row) => {
    const cut = Math.max(8, Math.round((row.title.length * LIMIT) / row.width));
    console.log(`  ${row.path}\n    فعلی (${Math.round(row.width)}px): ${row.title}`);
    console.log(`    تقریباً تا ${cut} کاراکتر نمایش داده می‌شود: ${row.title.slice(0, cut)}…`);
  });
  console.log("\nMobile budget is roughly 420px; re-run with --limit 420 to see the mobile picture.");
  process.exitCode = 1;
}
