import test from "node:test";
import assert from "node:assert/strict";
import { northCityDepth } from "../../src/content/north-depth";
import { cityProfiles } from "../../src/content/coverage";
import { roadProfiles } from "../../src/content/roads";
import { blogPosts } from "../../src/content/blog";

const words = (value: string): number =>
  value.split(/\s+/).filter((token) => /[\u0600-\u06FF]/.test(token)).length;

const MAZANDARAN_SLUGS = [
  "چالوس",
  "نوشهر",
  "نور",
  "محمودآباد",
  "بابلسر",
  "بابل",
  "آمل",
  "قائم-شهر",
  "ساری",
  "بهشهر",
  "رامسر",
  "تنکابن",
];

test("north depth covers all 12 Mazandaran cities (round 1)", () => {
  for (const slug of MAZANDARAN_SLUGS) {
    assert.ok(northCityDepth[slug], `missing depth entry: ${slug}`);
  }
});

test("every north city carries 500+ new words across 3 sections and 3 FAQs", () => {
  for (const [slug, depth] of Object.entries(northCityDepth)) {
    assert.equal(depth.sections.length, 3, `${slug}: needs exactly 3 sections`);
    assert.equal(depth.faqs.length, 3, `${slug}: needs exactly 3 FAQs`);
    let total = 0;
    for (const section of depth.sections) {
      const n =
        words(section.title) +
        words(section.body) +
        (section.bullets ?? []).reduce((sum, bullet) => sum + words(bullet), 0);
      total += n;
      assert.ok(n >= 100, `${slug}: thin section (${n}w): ${section.title.slice(0, 30)}`);
    }
    for (const faq of depth.faqs) {
      const n = words(faq.question) + words(faq.answer);
      total += n;
      assert.ok(n >= 40, `${slug}: thin FAQ (${n}w): ${faq.question.slice(0, 30)}`);
    }
    assert.ok(total >= 500, `${slug}: depth shrank to ${total}w`);
  }
});

test("north depth links resolve to real cities, roads and guides", () => {
  const citySlugs = new Set(Object.values(cityProfiles).map((city) => city.slug));
  const roadSlugs = new Set(roadProfiles.map((road) => road.slug));
  const postSlugs = new Set(blogPosts.map((post) => post.slug));
  for (const [slug, depth] of Object.entries(northCityDepth)) {
    assert.ok(
      depth.neighbors.length >= 3 && depth.neighbors.length <= 4,
      `${slug}: needs 3-4 neighbors`,
    );
    for (const item of depth.neighbors) {
      assert.ok(citySlugs.has(item.slug), `${slug}: bad neighbor slug ${item.slug}`);
      assert.notEqual(item.slug, slug, `${slug}: self link as neighbor`);
    }
    assert.equal(depth.guides.length, 2, `${slug}: needs exactly 2 guides`);
    for (const item of depth.guides) {
      assert.ok(postSlugs.has(item.slug), `${slug}: bad guide slug ${item.slug}`);
    }
    for (const item of depth.roads) {
      assert.ok(roadSlugs.has(item.slug), `${slug}: bad road slug ${item.slug}`);
    }
  }
});

test("north depth bodies are unique per city (no copy-paste)", () => {
  const seen = new Set<string>();
  for (const [slug, depth] of Object.entries(northCityDepth)) {
    for (const section of depth.sections) {
      const key = section.body.replace(/\s+/g, " ").slice(0, 120);
      assert.ok(!seen.has(key), `duplicate body prefix in ${slug}: ${section.title.slice(0, 30)}`);
      seen.add(key);
    }
  }
});

test("north depth carries no forbidden marketing claims", () => {
  const texts: string[] = [];
  for (const depth of Object.values(northCityDepth)) {
    for (const section of depth.sections) {
      texts.push(section.title, section.body, ...(section.bullets ?? []));
    }
    for (const faq of depth.faqs) texts.push(faq.question, faq.answer);
  }
  for (const text of texts) {
    assert.ok(!text.includes("�"), "replacement character in north depth content");
    assert.ok(
      !/(?<!قابل[\s‌]|غیرقابل[\s‌])تضمین|اعزام فوری|ارسال فوری|کمتر از ۳۰|زیر ۳۰ دقیقه|نرخ مصوب|رایگان|حمل رایگان/.test(
        text,
      ),
      `forbidden claim: ${text.slice(0, 60)}`,
    );
  }
});
