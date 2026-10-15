import test from "node:test";
import assert from "node:assert/strict";
import { allCities, northernProvinces } from "../../src/content/coverage";
import { neighborhoods } from "../../src/content/neighborhoods";
import { brandProfiles } from "../../src/content/brands";
import { roadProfiles } from "../../src/content/roads";
import { seoRegions } from "../../src/seo/locations";
import { persianServiceRoutes } from "../../src/seo/internal-links";
import {
  cityLandingExpansion,
  cityServiceExtraSections,
  serviceCostFactors,
} from "../../src/content/landing-expansion-cities";
import { hoodLandingExpansion } from "../../src/content/landing-expansion-hoods";
import { brandLandingExpansion } from "../../src/content/landing-expansion-brands";
import {
  provinceLandingExpansion,
  regionLandingExpansion,
  roadLandingExpansion,
} from "../../src/content/landing-expansion-areas";

const words = (value: string): number =>
  value.split(/\s+/).filter((token) => /[\u0600-\u06FF]/.test(token)).length;

test("every city has landing expansion with two substantial paragraphs and two FAQs", () => {
  assert.equal(allCities.length, 26);
  for (const city of allCities) {
    const extra = cityLandingExpansion[city.slug];
    assert.ok(extra, `missing city expansion: ${city.slug}`);
    assert.equal(extra.paragraphs.length, 2, city.slug);
    for (const paragraph of extra.paragraphs) {
      assert.ok(words(paragraph) >= 60, `${city.slug}: thin paragraph (${words(paragraph)}w)`);
      assert.ok(paragraph.includes(city.name), `${city.slug}: paragraph not localized`);
    }
    assert.equal(extra.faqs.length, 2, city.slug);
    for (const faq of extra.faqs) {
      assert.ok(faq.question.length > 15 && words(faq.answer) >= 25, `${city.slug}: thin FAQ`);
    }
  }
});

test("every neighborhood has a localized expansion paragraph and FAQ", () => {
  assert.equal(neighborhoods.length, 45);
  for (const area of neighborhoods) {
    const key = `${area.citySlug}/${area.slug}`;
    const extra = hoodLandingExpansion[key];
    assert.ok(extra, `missing hood expansion: ${key}`);
    assert.ok(words(extra.paragraph) >= 50, `${key}: thin paragraph (${words(extra.paragraph)}w)`);
    assert.ok(
      extra.paragraph.includes(area.name) || area.landmarks.some((mark) => extra.paragraph.includes(mark.split(" ")[0])),
      `${key}: paragraph not localized`,
    );
    assert.ok(words(extra.faq.answer) >= 20, `${key}: thin FAQ answer`);
  }
});

test("brands, roads, provinces and regions all have expansion content", () => {
  assert.equal(brandProfiles.length, 12);
  for (const brand of brandProfiles) {
    const extra = brandLandingExpansion[brand.slug];
    assert.ok(extra, `missing brand expansion: ${brand.slug}`);
    assert.equal(extra.sections.length, 2, brand.slug);
    for (const section of extra.sections) {
      assert.ok(words(section.body) >= 55, `${brand.slug}: thin section (${words(section.body)}w)`);
    }
  }
  assert.equal(roadProfiles.length, 5);
  for (const road of roadProfiles) {
    const extra = roadLandingExpansion[road.slug];
    assert.ok(extra, `missing road expansion: ${road.slug}`);
    assert.equal(extra.sections.length, 2, road.slug);
    for (const section of extra.sections) {
      assert.ok(words(section.body) >= 55, `${road.slug}: thin section`);
    }
  }
  assert.equal(northernProvinces.length, 3);
  for (const province of northernProvinces) {
    const extra = provinceLandingExpansion[province.slug];
    assert.ok(extra, `missing province expansion: ${province.slug}`);
    assert.equal(extra.sections.length, 2, province.slug);
    for (const section of extra.sections) {
      assert.ok(words(section.body) >= 55, `${province.slug}: thin section`);
    }
  }
  const regions = Object.values(seoRegions);
  assert.equal(regions.length, 5);
  for (const region of regions) {
    const extra = regionLandingExpansion[region.slug];
    assert.ok(extra, `missing region expansion: ${region.slug}`);
    assert.ok(words(extra.paragraph) >= 80, `${region.slug}: thin paragraph`);
    assert.ok(words(extra.faq.answer) >= 15, `${region.slug}: thin FAQ answer`);
  }
});

test("city-service templates cover all service routes and localize per URL", () => {
  assert.equal(persianServiceRoutes.length, 9);
  for (const route of persianServiceRoutes) {
    assert.ok(serviceCostFactors[route.slug], `missing cost factor line: ${route.slug}`);
  }
  const tehran = allCities.find((city) => city.slug === "تهران")!;
  const sari = allCities.find((city) => city.slug === "ساری")!;
  const route = persianServiceRoutes[0];
  const a = cityServiceExtraSections(tehran, route);
  const b = cityServiceExtraSections(sari, route);
  assert.equal(a.length, 2);
  assert.equal(b.length, 2);
  for (const section of [...a, ...b]) {
    assert.ok(section.title.length > 10 && words(section.body) >= 80, "thin city-service section");
  }
  assert.ok(a[0].body.includes("تهران") && b[0].body.includes("ساری"));
  assert.notEqual(a[0].body, b[0].body);
  const other = cityServiceExtraSections(tehran, persianServiceRoutes[1]);
  assert.notEqual(a[0].body, other[0].body);
});

test("landing expansions carry no forbidden marketing claims", () => {
  const texts: string[] = [];
  for (const extra of Object.values(cityLandingExpansion)) {
    texts.push(...extra.paragraphs, ...extra.faqs.flatMap((faq) => [faq.question, faq.answer]));
  }
  for (const extra of Object.values(hoodLandingExpansion)) {
    texts.push(extra.paragraph, extra.faq.question, extra.faq.answer);
  }
  for (const extra of Object.values(brandLandingExpansion)) {
    texts.push(...extra.sections.flatMap((section) => [section.title, section.body]));
  }
  for (const extra of Object.values(roadLandingExpansion)) {
    texts.push(...extra.sections.flatMap((section) => [section.title, section.body]));
  }
  for (const extra of Object.values(provinceLandingExpansion)) {
    texts.push(...extra.sections.flatMap((section) => [section.title, section.body]));
  }
  for (const extra of Object.values(regionLandingExpansion)) {
    texts.push(extra.paragraph, extra.faq.question, extra.faq.answer);
  }
  assert.ok(texts.length > 200, `expected 200+ expansion texts, got ${texts.length}`);
  for (const text of texts) {
    assert.ok(!text.includes("�"), "replacement character in expansion");
    assert.ok(!/(?<!قابل[\s‌]|غیرقابل[\s‌])تضمین|اعزام فوری|ارسال فوری|کمتر از ۳۰|زیر ۳۰ دقیقه|نرخ مصوب/.test(text), `forbidden claim: ${text.slice(0, 60)}`);
  }
});

test("landing expansion corpus stays above 14000 unique words", () => {
  const texts: string[] = [];
  for (const extra of Object.values(cityLandingExpansion)) {
    texts.push(...extra.paragraphs, ...extra.faqs.flatMap((faq) => [faq.question, faq.answer]));
  }
  for (const extra of Object.values(hoodLandingExpansion)) {
    texts.push(extra.paragraph, extra.faq.question, extra.faq.answer);
  }
  for (const extra of Object.values(brandLandingExpansion)) {
    texts.push(...extra.sections.flatMap((section) => [section.title, section.body]));
  }
  for (const extra of Object.values(roadLandingExpansion)) {
    texts.push(...extra.sections.flatMap((section) => [section.title, section.body]));
  }
  for (const extra of Object.values(provinceLandingExpansion)) {
    texts.push(...extra.sections.flatMap((section) => [section.title, section.body]));
  }
  for (const extra of Object.values(regionLandingExpansion)) {
    texts.push(extra.paragraph, extra.faq.question, extra.faq.answer);
  }
  const total = texts.reduce((sum, text) => sum + words(text), 0);
  assert.ok(total >= 14000, `expansion corpus shrank to ${total}w`);
});
