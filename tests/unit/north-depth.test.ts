import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { northCityDepth } from "../../src/content/north-depth";
import { northProvinceDepth } from "../../src/content/north-provinces";
import { northFiringLinkRules, northHubLinkRules } from "../../src/content/north-link-rules";
import { cityProfiles, northernProvinces } from "../../src/content/coverage";
import { roadProfiles } from "../../src/content/roads";
import { blogPosts, supplementalArticleSections } from "../../src/content/blog";
import { sectionText } from "../../src/content/editorial-types";
import { seoRegions } from "../../src/seo/locations";

const words = (value: string): number =>
  value.split(/\s+/).filter((token) => /[\u0600-\u06FF]/.test(token)).length;

const NORTH_SLUGS = [
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
  "رشت",
  "بندر-انزلی",
  "لاهیجان",
  "لنگرود",
  "رودسر",
  "آستارا",
  "تالش",
  "فومن",
  "گرگان",
  "گنبد-کاووس",
  "بندر-ترکمن",
  "علی-آباد-کتول",
];

const PROVINCE_SLUGS = ["گیلان", "مازندران", "گلستان"];

test("north depth covers all 24 northern cities (rounds 1+2)", () => {
  assert.equal(NORTH_SLUGS.length, 24);
  for (const slug of NORTH_SLUGS) {
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
  for (const depth of Object.values(northProvinceDepth)) {
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

test("province hubs carry 500+ new words across 3 sections and 3 FAQs", () => {
  for (const slug of PROVINCE_SLUGS) {
    const depth = northProvinceDepth[slug];
    assert.ok(depth, `missing province depth: ${slug}`);
    assert.equal(depth.sections.length, 3, `${slug}: needs exactly 3 sections`);
    assert.equal(depth.faqs.length, 3, `${slug}: needs exactly 3 FAQs`);
    let total = 0;
    for (const section of depth.sections) {
      const n =
        words(section.title) +
        words(section.body) +
        (section.bullets ?? []).reduce((sum, bullet) => sum + words(bullet), 0);
      total += n;
      assert.ok(n >= 100, `${slug}: thin section (${n}w)`);
    }
    for (const faq of depth.faqs) {
      const n = words(faq.question) + words(faq.answer);
      total += n;
      assert.ok(n >= 40, `${slug}: thin FAQ (${n}w)`);
    }
    assert.ok(total >= 500, `${slug}: depth shrank to ${total}w`);
  }
});

test("north hub rules cover every city and province missing one in the page", async () => {
  assert.equal(northHubLinkRules.length, 24);
  const page = await readFile("src/app/blog/[slug]/page.tsx", "utf8");
  const citySlugs = new Set(Object.values(cityProfiles).map((city) => city.slug));
  const provinceSlugs = new Set(northernProvinces.map((province) => province.slug));
  const phrases = new Set<string>();
  for (const rule of northHubLinkRules) {
    assert.ok(!phrases.has(rule.phrase), `duplicate hub phrase: ${rule.phrase}`);
    phrases.add(rule.phrase);
    const slug = rule.href.slice(1);
    assert.ok(citySlugs.has(slug) || provinceSlugs.has(slug), `bad hub href: ${rule.href}`);
    assert.ok(
      !page.includes(`{ phrase: "${rule.phrase}"`),
      `hub phrase already in page (move it out): ${rule.phrase}`,
    );
  }
  for (const slug of [...NORTH_SLUGS, ...PROVINCE_SLUGS]) {
    const inPage = page.includes(`href: "/${slug}" })`) || page.includes(`href: "/${slug}" },`);
    const inData = northHubLinkRules.some((rule) => rule.href === `/${slug}`);
    assert.ok(inPage || inData, `no hub rule for /${slug}`);
  }
});

test("every firing rule phrase exists in at least one rendered post", () => {
  assert.ok(northFiringLinkRules.length >= 20, "firing rules shrank");
  const citySlugs = new Set(Object.values(cityProfiles).map((city) => city.slug));
  const provinceSlugs = new Set(northernProvinces.map((province) => province.slug));
  const roadSlugs = new Set(roadProfiles.map((road) => `/roads/${road.slug}`));
  const regionPaths = new Set(
    Object.values(seoRegions).map((region) => `/${region.citySlug}/${region.slug}`),
  );
  const corpus = blogPosts.map((post) =>
    [
      post.title,
      post.excerpt,
      ...post.sections.map((section) => sectionText(section)),
      ...(supplementalArticleSections[post.slug] ?? []).map((section) => sectionText(section)),
      ...(post.faqs ?? []).map((faq) => `${faq.question} ${faq.answer}`),
    ].join("\n"),
  );
  assert.ok(corpus.length >= 54, "blog corpus shrank");
  for (const rule of northFiringLinkRules) {
    const slug = rule.href.slice(1);
    const valid =
      citySlugs.has(slug) ||
      provinceSlugs.has(slug) ||
      roadSlugs.has(rule.href) ||
      regionPaths.has(rule.href) ||
      rule.href === "/شمال";
    assert.ok(valid, `bad firing href: ${rule.href}`);
    const hits = corpus.filter((text) => text.includes(rule.phrase)).length;
    assert.ok(hits >= 1, `dead rule (no post contains it): ${rule.phrase}`);
  }
});

test("north commercial strengthening is present in live link channels", async () => {
  const page = await readFile("src/app/blog/[slug]/page.tsx", "utf8");
  for (const needle of [
    '{ title: "مکانیک سیار رشت", href: "/رشت/مکانیک-سیار" }',
    '{ title: "پنچرگیری رشت", href: "/رشت/پنچرگیری-سیار" }',
    '{ title: "باتری خودرو رشت", href: "/رشت/باتری-خودرو" }',
    '{ title: "دیاگ سیار ساری", href: "/ساری/دیاگ-سیار" }',
    '{ title: "حمل خودرو چالوس", href: "/چالوس/خودروبر" }',
    '{ title: "یدک کش شمال", href: "/شمال" }',
  ]) {
    assert.ok(page.includes(needle), `missing commercial link: ${needle.slice(0, 40)}`);
  }
  const northGuides = await readFile("src/content/blog-north-guides.ts", "utf8");
  for (const needle of [
    '{ title: "یدک‌کش رشت", href: "/رشت/یدک-کش" }',
    '{ title: "یدک‌کش ساری", href: "/ساری/یدک-کش" }',
    '{ title: "یدک‌کش چالوس", href: "/چالوس/یدک-کش" }',
    '{ title: "یدک‌کش آمل", href: "/آمل/یدک-کش" }',
    '{ title: "امداد خودرو بهشهر", href: "/بهشهر" }',
  ]) {
    assert.ok(northGuides.includes(needle), `missing post link: ${needle.slice(0, 40)}`);
  }
});
