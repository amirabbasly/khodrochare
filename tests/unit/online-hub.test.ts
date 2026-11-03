import test from "node:test";
import assert from "node:assert/strict";
import { buildOnlineBrief, onlineContentRelease, onlineHubFaqs, onlinePath, onlineServices } from "../../src/content/online-assistance";
import { blogPosts } from "../../src/content/blog";
import { indexablePaths } from "../../scripts/lib/route-inventory";
import sitemap from "../../src/app/sitemap";

test("local brief preserves entered facts and never labels a draft as a sent order", () => {
  const text = buildOnlineBrief({ service: "battery", location: "کرج", vehicle: "کرولا", symptom: "استارت کند", access: "پارکینگ" });
  for (const value of ["کرج", "کرولا", "استارت کند", "پارکینگ", "برق و باتری"]) assert.ok(text.includes(value));
  const empty = buildOnlineBrief({ service: "invalid", location: "  ", vehicle: "", symptom: "", access: "" });
  assert.match(empty, /نمی‌دانم کدام خدمت/);
  assert.match(empty, /هنگام هماهنگی تکمیل می‌کنم/);
  assert.ok(!text.includes("ثبت شد"));
});

test("hub service paths are indexable and FAQ questions are unique", () => {
  assert.equal(new Set(onlineServices.map(s => s.id)).size, onlineServices.length);
  for (const service of onlineServices) assert.ok(indexablePaths.includes(service.href), service.href);
  assert.equal(new Set(onlineHubFaqs.map(f => f.question)).size, onlineHubFaqs.length);
  assert.ok(onlineHubFaqs.some(f => f.answer.includes("سفارش ثبت" ) || f.answer.includes("ارسال درخواست") || f.answer.includes("به پشتیبانی")));
});

test("online cluster keeps existing canonicals and publication dates while updating only revised pages", () => {
  const entries = sitemap();
  for (const path of [onlinePath, "/app", "/blog/online-roadside-assistance-tehran-karaj-complete-guide", "/blog/online-roadside-assistance-request-guide"]) {
    const entry = entries.find(e => decodeURIComponent(new URL(e.url).pathname) === path)!;
    assert.ok(entry, path);
    assert.equal(new Date(entry.lastModified!).toISOString().slice(0, 10), onlineContentRelease.iso, path);
  }
  const preparation = blogPosts.find(p => p.slug === "online-roadside-assistance-tehran-karaj-complete-guide")!;
  assert.ok(preparation.publishedAtIso < onlineContentRelease.iso);
  assert.ok(preparation.title.startsWith("چک‌لیست"));
  assert.ok(preparation.links?.some(link => link.href === onlinePath));
  assert.equal(blogPosts.length, 67);
});
