import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { northCityDepth } from "../../src/content/north-depth";
import { northProvinceDepth } from "../../src/content/north-provinces";
import { northFiringLinkRules, northHubLinkRules } from "../../src/content/north-link-rules";
import { round4FiringLinkRules, round5FiringLinkRules } from "../../src/content/north-link-rules";
import { round4Guides } from "../../src/content/blog-round4-guides";
import { round5Guides } from "../../src/content/blog-round5-guides";
import { neighborhoods } from "../../src/content/neighborhoods";
import { brandProfiles } from "../../src/content/brands";
import { services } from "../../src/content/services";
import { cityProfiles, northernProvinces } from "../../src/content/coverage";
import { allCities } from "../../src/content/coverage";
import { northRoadDepth } from "../../src/content/north-roads";
import { northCityServiceDepth } from "../../src/content/north-cityservice";
import { persianServiceRoutes } from "../../src/seo/internal-links";
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

test("round 3: all 5 roads carry 400+ new words across 2 sections and 3 FAQs", () => {
  const roadSlugs = new Set(roadProfiles.map((road) => road.slug));
  assert.equal(Object.keys(northRoadDepth).length, 5);
  for (const [slug, depth] of Object.entries(northRoadDepth)) {
    assert.ok(roadSlugs.has(slug), `bad road slug: ${slug}`);
    assert.equal(depth.sections.length, 2, `${slug}: needs exactly 2 sections`);
    assert.equal(depth.faqs.length, 3, `${slug}: needs exactly 3 FAQs`);
    let total = 0;
    for (const section of depth.sections) {
      const n = words(section.title) + words(section.body);
      total += n;
      assert.ok(n >= 100, `${slug}: thin section (${n}w): ${section.title.slice(0, 30)}`);
    }
    for (const faq of depth.faqs) {
      const n = words(faq.question) + words(faq.answer);
      total += n;
      assert.ok(n >= 40, `${slug}: thin FAQ (${n}w): ${faq.question.slice(0, 30)}`);
    }
    assert.ok(total >= 400, `${slug}: road depth shrank to ${total}w`);
  }
});

test("round 3: money city-service pages carry 300+ unique words on valid routes", () => {
  const paths = Object.keys(northCityServiceDepth);
  assert.equal(paths.length, 16);
  for (const must of [
    "/محمودآباد/یدک-کش",
    "/رشت/پنچرگیری-سیار",
    "/رامسر/مکانیک-سیار",
    "/رودسر/یدک-کش",
    "/تنکابن/مکانیک-سیار",
    "/بابلسر/مکانیک-سیار",
    "/گرگان/مکانیک-سیار",
    "/تهران/یدک-کش",
    "/تهران/مکانیک-سیار",
    "/تهران/پنچرگیری-سیار",
  ]) {
    assert.ok(northCityServiceDepth[must], `missing money page: ${must}`);
  }
  const citySlugs = new Set(allCities.map((city) => city.slug));
  const svcSlugs: Set<string> = new Set(persianServiceRoutes.map((route) => route.slug));
  const seen = new Set<string>();
  for (const [path, depth] of Object.entries(northCityServiceDepth)) {
    const [, city, svc] = path.split("/");
    assert.ok(citySlugs.has(city) && svcSlugs.has(svc), `bad money path: ${path}`);
    assert.equal(depth.sections.length, 2, `${path}: needs exactly 2 sections`);
    assert.equal(depth.faqs.length, 2, `${path}: needs exactly 2 FAQs`);
    let total = 0;
    for (const section of depth.sections) {
      const n = words(section.title) + words(section.body);
      total += n;
      assert.ok(n >= 100, `${path}: thin section (${n}w)`);
      const key = section.body.replace(/\s+/g, " ").slice(0, 120);
      assert.ok(!seen.has(key), `duplicate body prefix: ${path}`);
      seen.add(key);
    }
    for (const faq of depth.faqs) {
      const n = words(faq.question) + words(faq.answer);
      total += n;
      assert.ok(n >= 40, `${path}: thin FAQ (${n}w)`);
    }
    assert.ok(total >= 300, `${path}: depth shrank to ${total}w`);
  }
});

test("round 3: stabilization wiring and exact-phrase FAQs are live", async () => {
  const roadsPage = await readFile("src/app/roads/[slug]/page.tsx", "utf8");
  assert.ok(roadsPage.includes("<NorthRoadDepthSections slug={road.slug} />"));
  assert.ok(roadsPage.includes("...northRoadDepthFaqs(road.slug)"));
  const landings = await readFile("src/components/seo/location-landings.tsx", "utf8");
  assert.ok(landings.includes("<NorthCityServiceDepthSections path={path} />"));
  assert.ok(landings.includes("...northCityServiceDepthFaqs(path)"));
  const north = await readFile("src/components/pages/north-coverage-page.tsx", "utf8");
  assert.ok(north.includes("شماره امداد خودرو شمال چند است؟"));
  const pricing = await readFile("src/app/pricing/page.tsx", "utf8");
  assert.ok(pricing.includes("محاسبه هزینه حمل خودرو با کفی چگونه انجام می‌شود؟"));
  const knowledge = await readFile("src/content/service-knowledge.ts", "utf8");
  assert.ok(knowledge.includes("تعمیرکار سیار همان مکانیک سیار است؟"));
  const tehranNorth = northRoadDepth["tehran-north"];
  assert.ok(
    tehranNorth.faqs.some((faq) => faq.question.includes("امداد خودرو آزادراه تهران شمال")),
    "missing exact-query FAQ for the dancing tehran-north keyword",
  );
  assert.ok(
    tehranNorth.sections.some(
      (section) => section.body.includes("آزادراه تهران–شمال") && section.body.includes("تهران شمال"),
    ),
    "tehran-north depth must carry both query variants",
  );
});

test("round 3: new road and city-service depth carries no forbidden claims", () => {
  const texts: string[] = [];
  for (const depth of [...Object.values(northRoadDepth), ...Object.values(northCityServiceDepth)]) {
    for (const section of depth.sections) texts.push(section.title, section.body);
    for (const faq of depth.faqs) texts.push(faq.question, faq.answer);
  }
  for (const text of texts) {
    assert.ok(!text.includes("\ufffd"), "replacement character in round-3 content");
    assert.ok(
      !/(?<!قابل[\s‌]|غیرقابل[\s‌])تضمین|اعزام فوری|ارسال فوری|کمتر از ۳۰|زیر ۳۰ دقیقه|نرخ مصوب|رایگان|حمل رایگان/.test(
        text,
      ),
      `forbidden claim: ${text.slice(0, 60)}`,
    );
  }
});

test("round 4: twelve exact-query rules fire on valid money pages", () => {
  assert.equal(round4FiringLinkRules.length, 12);
  const citySlugs = new Set(Object.values(cityProfiles).map((city) => city.slug));
  const provinceSlugs = new Set(northernProvinces.map((province) => province.slug));
  const roadSlugs = new Set(roadProfiles.map((road) => `/roads/${road.slug}`));
  const svcSlugs: Set<string> = new Set(persianServiceRoutes.map((route) => route.slug));
  const cityServicePaths = new Set(
    allCities.flatMap((city) => [...svcSlugs].map((svc) => `/${city.slug}/${svc}`)),
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
  assert.ok(corpus.length >= 58, "blog corpus shrank");
  for (const rule of round4FiringLinkRules) {
    const slug = rule.href.slice(1);
    const valid =
      citySlugs.has(slug) ||
      provinceSlugs.has(slug) ||
      roadSlugs.has(rule.href) ||
      cityServicePaths.has(rule.href) ||
      rule.href === "/شمال" ||
      rule.href === "/pricing" ||
      rule.href === "/services/mobile-mechanic";
    assert.ok(valid, `bad round-4 href: ${rule.href}`);
    const hits = corpus.filter((text) => text.includes(rule.phrase)).length;
    assert.ok(hits >= 1, `dead round-4 rule (no post contains it): ${rule.phrase}`);
  }
});

test("round 4: four guides registered with supplementals and money links", () => {
  assert.equal(round4Guides.length, 4);
  const slugs = new Set(blogPosts.map((post) => post.slug));
  for (const post of round4Guides) {
    assert.ok(slugs.has(post.slug), `not registered: ${post.slug}`);
    assert.ok((supplementalArticleSections[post.slug] ?? []).length >= 2, `${post.slug}: supplemental`);
    assert.ok((post.links ?? []).length >= 5, `${post.slug}: needs 5 money links`);
  }
});

test("round 4: online and Tehran depth wiring is live", async () => {
  const online = await readFile("src/components/pages/online-assistance-page.tsx", "utf8");
  assert.ok(online.includes("امداد خودرو آنلاین در تهران؛ ترافیک، نشانی و ساعت"));
  assert.ok(online.includes("امداد خودرو آنلاین در شمال؛ محور، اقامتگاه و آنتن"));
  assert.ok(online.includes("هزینه درخواست آنلاین با تلفنی فرق دارد؟"));
  const { tehranHubSections, tehranHubFaqs } = await import("../../src/content/tehran-hub-expansion");
  assert.ok(tehranHubSections.some((s) => s.title.includes("کی آنلاین، کی تماس؟")));
  assert.ok(tehranHubFaqs.some((f) => f.question.includes("شماره امداد خودرو تهران")));
});

test("round 5: twelve exact-query rules fire on valid money pages", () => {
  assert.equal(round5FiringLinkRules.length, 12);
  const citySlugs = new Set(Object.values(cityProfiles).map((city) => city.slug));
  const provinceSlugs = new Set(northernProvinces.map((province) => province.slug));
  const roadSlugs = new Set(roadProfiles.map((road) => `/roads/${road.slug}`));
  const svcSlugs: Set<string> = new Set(persianServiceRoutes.map((route) => route.slug));
  const cityServicePaths = new Set(
    allCities.flatMap((city) => [...svcSlugs].map((svc) => `/${city.slug}/${svc}`)),
  );
  const servicePaths = new Set(services.map((service) => `/services/${service.slug}`));
  const brandPaths = new Set(brandProfiles.map((brand) => `/brands/${brand.slug}`));
  const neighborhoodPaths = new Set(neighborhoods.map((area) => `/${area.citySlug}/${area.slug}`));
  const corpus = blogPosts.map((post) =>
    [
      post.title,
      post.excerpt,
      ...post.sections.map((section) => sectionText(section)),
      ...(supplementalArticleSections[post.slug] ?? []).map((section) => sectionText(section)),
      ...(post.faqs ?? []).map((faq) => `${faq.question} ${faq.answer}`),
    ].join("\n"),
  );
  for (const rule of round5FiringLinkRules) {
    const slug = rule.href.slice(1);
    const valid =
      citySlugs.has(slug) ||
      provinceSlugs.has(slug) ||
      roadSlugs.has(rule.href) ||
      cityServicePaths.has(rule.href) ||
      servicePaths.has(rule.href) ||
      brandPaths.has(rule.href) ||
      neighborhoodPaths.has(rule.href) ||
      rule.href === "/شمال" ||
      rule.href === "/pricing";
    assert.ok(valid, `bad round-5 href: ${rule.href}`);
    const hits = corpus.filter((text) => text.includes(rule.phrase)).length;
    assert.ok(hits >= 1, `dead round-5 rule (no post contains it): ${rule.phrase}`);
  }
});

test("round 5: one concerns guide registered with supplementals and money links", () => {
  assert.equal(round5Guides.length, 1);
  const slugs = new Set(blogPosts.map((post) => post.slug));
  for (const post of round5Guides) {
    assert.ok(slugs.has(post.slug), `not registered: ${post.slug}`);
    assert.ok((supplementalArticleSections[post.slug] ?? []).length >= 2, `${post.slug}: supplemental`);
    assert.ok((post.links ?? []).length >= 5, `${post.slug}: needs 5 money links`);
  }
});

test("round 5: honesty and exact-match wiring is live", async () => {
  const highlights = await readFile("src/content/home-highlights.ts", "utf8");
  for (const honest of ["هماهنگی حمل تا تعمیرگاه", "اعلام شفاف هزینه پیش از خدمت", "بازدید و عیب‌یابی پیش از تعمیر"]) assert.ok(highlights.includes(honest), honest);
  for (const retired of ["حمل تا تعمیرگاه رایگان", "تضمین کمترین قیمت", "تضمین بالاترین کیفیت"]) assert.ok(!highlights.includes(retired), retired);
  const { metaDescriptionOverrides } = await import("../../src/seo/meta-overrides");
  for (const path of ["/محمودآباد/یدک-کش", "/رشت/پنچرگیری-سیار", "/رامسر/مکانیک-سیار", "/تهران/یدک-کش", "/رودسر/یدک-کش", "/تنکابن/مکانیک-سیار"]) assert.ok((metaDescriptionOverrides[path] ?? "").length > 40, path);
  const roadsPage = await readFile("src/app/roads/[slug]/page.tsx", "utf8");
  assert.ok(roadsPage.includes("امداد خودرو آزادراه تهران شمال"));
  assert.ok(roadsPage.includes("امداد خودرو کندوان و جاده چالوس"));
  const citySlugPage = await readFile("src/app/[city]/[slug]/page.tsx", "utf8");
  assert.ok(citySlugPage.includes("metaDescriptionOverrides[path]"));
  const knowledge = await readFile("src/content/service-knowledge.ts", "utf8");
  assert.ok(knowledge.includes("هزینه پنچرگیری سیار در محل چگونه حساب می‌شود؟"));
  assert.ok(knowledge.includes("اگر تعمیر در محل ممکن نشود چه اتفاقی می‌افتد؟"));
  const brands = await readFile("src/content/brands.ts", "utf8");
  assert.ok(brands.includes("اگر چراغ چک دنا یا تارا روشن شده"));
  const hoods = await readFile("src/content/neighborhoods.ts", "utf8");
  assert.ok(hoods.includes("اگر امداد خودرو آنلاین نیاوران می‌خواهید"));
  assert.ok(hoods.includes("برای امداد خودرو گیشا، شماره خیابان فرعی"));
});
