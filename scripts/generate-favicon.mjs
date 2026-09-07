#!/usr/bin/env node
/**
 * Builds a real multi-size `public/favicon.ico` from the PNG favicons that already
 * exist in the repo.
 *
 * `/favicon.ico` used to answer with a 308 redirect to `/favicon-32x32.png`. That
 * works in browsers, but plenty of crawlers, feed readers, log parsers and legacy
 * clients request `/favicon.ico` exactly once and do not follow redirects, so they
 * recorded a broken site icon (audit code `asset-error`). An ICO container may hold
 * PNG payloads directly (Windows Vista and later), so no image encoder is needed.
 *
 *   node scripts/generate-favicon.mjs
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SOURCES = ["public/favicon-32x32.png", "public/favicon-64x64.png"];
const OUT = "public/favicon.ico";

/** Reads width/height out of the PNG IHDR chunk. */
function pngSize(buffer) {
  if (buffer.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") throw new Error("not a PNG");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

const entries = [];
for (const source of SOURCES) {
  if (!existsSync(source)) {
    console.warn(`skipping missing source: ${source}`);
    continue;
  }
  const data = readFileSync(source);
  entries.push({ ...pngSize(data), data });
}

if (!entries.length) {
  console.error("No favicon sources found; nothing written.");
  process.exit(1);
}

const headerSize = 6 + entries.length * 16;
const out = Buffer.alloc(headerSize + entries.reduce((sum, e) => sum + e.data.length, 0));

// ICONDIR
out.writeUInt16LE(0, 0); // reserved
out.writeUInt16LE(1, 2); // type: icon
out.writeUInt16LE(entries.length, 4);

let offset = headerSize;
entries.forEach((entry, index) => {
  const at = 6 + index * 16;
  out.writeUInt8(entry.width >= 256 ? 0 : entry.width, at); // 0 means 256
  out.writeUInt8(entry.height >= 256 ? 0 : entry.height, at + 1);
  out.writeUInt8(0, at + 2); // palette colours
  out.writeUInt8(0, at + 3); // reserved
  out.writeUInt16LE(1, at + 4); // colour planes
  out.writeUInt16LE(32, at + 6); // bits per pixel
  out.writeUInt32LE(entry.data.length, at + 8);
  out.writeUInt32LE(offset, at + 12);
  entry.data.copy(out, offset);
  offset += entry.data.length;
});

writeFileSync(OUT, out);
console.log(`${OUT}: ${entries.map((e) => `${e.width}x${e.height}`).join(" + ")} (${(out.length / 1024).toFixed(1)}KB)`);
