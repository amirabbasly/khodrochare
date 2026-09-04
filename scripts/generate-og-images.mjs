import { readFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

/**
 * Generates 1200x630 JPEG social-preview images for every artwork referenced as an
 * Open Graph image. JPEG is used because several messengers (WhatsApp, LinkedIn,
 * some Iranian clients) still fail to render WebP link previews.
 *
 * Usage: npm run og:images
 */

const root = process.cwd();
const sources = [
  "src/content/services.ts",
  "src/content/blog.ts",
  "src/seo/locations.ts",
  "src/content/brands.ts",
];
const extraImages = [
  "/images/hero-roadside.webp",
  "/images/support-technician-night.webp",
  "/images/app-premium-mockup.webp",
  "/images/coverage-iran-glass-v2.webp",
  "/images/khodrochare-3d-logo.webp",
];

const found = new Set(extraImages);
for (const source of sources) {
  const content = await readFile(path.join(root, source), "utf8");
  for (const match of content.matchAll(/"(\/images\/[^"]+\.(?:webp|png|jpg))"/g)) found.add(match[1]);
}

const outDir = path.join(root, "public/images/og");
await mkdir(outDir, { recursive: true });

let created = 0;
for (const image of [...found].sort()) {
  const input = path.join(root, "public", image.replace(/^\//, ""));
  const output = path.join(outDir, `${path.basename(image).replace(/\.[^.]+$/, "")}.jpg`);
  try {
    await sharp(input).resize(1200, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 80, mozjpeg: true }).toFile(output);
    created += 1;
  } catch (error) {
    console.warn(`skipped ${image}: ${error.message}`);
  }
}

console.log(`generated ${created} Open Graph images in public/images/og (${(await readdir(outDir)).length} files total)`);
