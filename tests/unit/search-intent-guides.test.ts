import { onlineContentRelease, onlinePath } from "../../src/content/online-assistance";
import test from "node:test";
import assert from "node:assert/strict";
import { batteryDecisionSections, freewayDecisionSections, intentRelease, northDecisionSections, transportCostSections } from "../../src/content/search-intent-guides";
import { blogPosts } from "../../src/content/blog";
import sitemap from "../../src/app/sitemap";

const targets = ["/امداد-خودرو-آنلاین", "/pricing", "/battery", "/شمال", "/roads/tehran-north"];
const articles = ["car-tow-truck-price-guide", "online-roadside-assistance-request-guide", "car-battery-warning-signs"];

test("decision aids have distinct headings and accessible rectangular tables", () => {
  for (const sections of [transportCostSections, batteryDecisionSections, freewayDecisionSections, northDecisionSections]) {
    assert.equal(new Set(sections.map(s => s.title)).size, sections.length);
    assert.ok(sections.some(s => s.table));
    for (const section of sections) {
      assert.ok(section.body.length > 180, section.title);
      if (section.table) {
        assert.ok(section.table.caption);
        assert.ok(section.table.headers.length >= 2);
        for (const row of section.table.rows) assert.equal(row.length, section.table.headers.length);
      }
    }
  }
  assert.match(transportCostSections[1].title, /مثال آموزشی، نه نرخ/);
});

test("only the five revised landing targets receive the intent release sitemap date", () => {
  const entries = sitemap();
  for (const path of targets) {
    const entry = entries.find(e => decodeURIComponent(new URL(e.url).pathname) === path);
    assert.ok(entry, path);
    assert.equal(new Date(entry.lastModified!).toISOString().slice(0, 10), path === onlinePath ? onlineContentRelease.iso : intentRelease.iso, path);
  }
  const unchanged = entries.find(e => new URL(e.url).pathname === "/roads/haraz")!;
  assert.notEqual(new Date(unchanged.lastModified!).toISOString().slice(0, 10), intentRelease.iso);
});

test("the three revised articles retain published dates, dates agree with sitemap, and add decision tables", () => {
  const entries = sitemap();
  for (const slug of articles) {
    const post = blogPosts.find(p => p.slug === slug)!;
    const expectedDate = slug === "online-roadside-assistance-request-guide" ? onlineContentRelease.iso : intentRelease.iso;
    assert.equal(post.updatedAtIso, expectedDate, slug);
    assert.ok(post.publishedAtIso < post.updatedAtIso);
    assert.ok(post.sections.some(s => s.table));
    assert.ok(post.links?.length);
    const entry = entries.find(e => new URL(e.url).pathname === `/blog/${slug}`)!;
    assert.equal(new Date(entry.lastModified!).toISOString().slice(0, 10), expectedDate);
  }
  assert.ok(blogPosts.length >= 67);
});
