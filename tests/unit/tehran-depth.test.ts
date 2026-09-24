import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { seoRegions } from "../../src/seo/locations";
import {
  pillarEmdadFaqs,
  pillarEmdadSections,
} from "../../src/content/pillar-emdad-expansion";
import {
  tehranDistricts,
  tehranHubFaqs,
  tehranHubSections,
} from "../../src/content/tehran-hub-expansion";

const words = (value: string): number =>
  value.split(/\s+/).filter((token) => /[\u0600-\u06FF]/.test(token)).length;

test("national pillar carries five substantial new sections and six FAQs", () => {
  assert.equal(pillarEmdadSections.length, 5);
  let total = 0;
  for (const section of pillarEmdadSections) {
    const n =
      words(section.title) + words(section.body) + (section.bullets ?? []).reduce((sum, bullet) => sum + words(bullet), 0);
    total += n;
    assert.ok(n >= 120, `thin pillar section (${n}w): ${section.title.slice(0, 30)}`);
  }
  assert.equal(pillarEmdadFaqs.length, 6);
  for (const faq of pillarEmdadFaqs) {
    const n = words(faq.question) + words(faq.answer);
    total += n;
    assert.ok(n >= 30, `thin pillar FAQ (${n}w): ${faq.question.slice(0, 30)}`);
  }
  assert.ok(total >= 1100, `pillar expansion shrank to ${total}w`);
});

test("Tehran hub covers all 22 districts mapped to valid region pages", () => {
  assert.equal(tehranDistricts.length, 22);
  const labels = new Set(tehranDistricts.map((item) => item.district));
  assert.equal(labels.size, 22);
  const regionSlugs = new Set(Object.values(seoRegions).map((region) => region.slug));
  assert.equal(regionSlugs.size, 5);
  const used = new Set<string>();
  for (const item of tehranDistricts) {
    assert.ok(regionSlugs.has(item.regionSlug), `invalid region: ${item.regionSlug}`);
    assert.ok(item.hoods.split("،").length >= 2, `district ${item.district}: needs 2+ hoods`);
    used.add(item.regionSlug);
  }
  assert.equal(used.size, 5);
});

test("Tehran night/plan sections and FAQs meet minimum substance", () => {
  assert.equal(tehranHubSections.length, 2);
  for (const section of tehranHubSections) {
    assert.ok(words(section.body) >= 100, `thin hub section: ${section.title.slice(0, 30)}`);
  }
  assert.equal(tehranHubFaqs.length, 2);
  for (const faq of tehranHubFaqs) {
    assert.ok(words(faq.answer) >= 25, `thin hub FAQ: ${faq.question.slice(0, 30)}`);
  }
});

test("pillar inbound links: 106+ contextual rules plus static guide links", async () => {
  const blogPage = await readFile("src/app/blog/[slug]/page.tsx", "utf8");
  const rules = blogPage.match(/\{ phrase:/g) ?? [];
  assert.ok(rules.length >= 106, `contextual rules below 106: ${rules.length}`);
  const pillarRules = blogPage.match(/\{ phrase: "[^"]+", href: "\/امداد-خودرو" \}/g) ?? [];
  assert.ok(pillarRules.length >= 11, `pillar-bound rules below 11: ${pillarRules.length}`);
  const landings = await readFile("src/components/seo/location-landings.tsx", "utf8");
  const landingsLinks = landings.match(/راهنمای جامع امداد خودرو/g) ?? [];
  assert.ok(landingsLinks.length >= 3, "city-service/hood/province grids must link the pillar");
  for (const file of [
    "src/app/brands/[slug]/page.tsx",
    "src/app/roads/[slug]/page.tsx",
    "src/app/services/[slug]/page.tsx",
  ]) {
    const body = await readFile(file, "utf8");
    assert.ok(body.includes("راهنمای جامع امداد خودرو"), `${file} must link the pillar`);
  }
});

test("new depth content carries no forbidden marketing claims", () => {
  const texts: string[] = [];
  for (const section of pillarEmdadSections) {
    texts.push(section.title, section.body, ...(section.bullets ?? []));
  }
  for (const faq of pillarEmdadFaqs) texts.push(faq.question, faq.answer);
  for (const section of tehranHubSections) texts.push(section.title, section.body);
  for (const faq of tehranHubFaqs) texts.push(faq.question, faq.answer);
  for (const item of tehranDistricts) texts.push(item.hoods);
  for (const text of texts) {
    assert.ok(!text.includes("�"), "replacement character in depth content");
    assert.ok(
      !/(?<!قابل[\s‌]|غیرقابل[\s‌])تضمین|اعزام فوری|ارسال فوری|کمتر از ۳۰|زیر ۳۰ دقیقه|نرخ مصوب|رایگان|حمل رایگان/.test(text),
      `forbidden claim: ${text.slice(0, 60)}`,
    );
  }
});
