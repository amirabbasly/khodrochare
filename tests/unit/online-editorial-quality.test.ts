import test from "node:test";
import assert from "node:assert/strict";
import { onlineContentRelease, onlineHubFaqs, onlineServices } from "../../src/content/online-assistance";
import { onlinePreparationSections } from "../../src/content/online-preparation-guide";
import { serviceKnowledge, serviceKnowledgeRevision } from "../../src/content/service-knowledge";
import { blogPosts } from "../../src/content/blog";
import sitemap from "../../src/app/sitemap";

test("online editorial update retains distinct preparation and follow-up intents", () => {
  const preparation = blogPosts.find(p => p.slug === "online-roadside-assistance-tehran-karaj-complete-guide")!;
  const followup = blogPosts.find(p => p.slug === "online-roadside-assistance-request-guide")!;
  assert.match(preparation.title, /چک‌لیست/);
  assert.match(followup.title, /پیگیری/);
  for (const post of [preparation, followup]) {
    assert.equal(post.updatedAtIso, onlineContentRelease.iso);
    assert.ok(post.links?.some(link => link.href.startsWith("/امداد-خودرو-آنلاین")));
    assert.ok(post.sections.some(section => section.table));
  }
  assert.equal(onlinePreparationSections.length, 7);
  assert.equal(onlineServices.length, 6);
  assert.equal(onlineHubFaqs.length, 6);
  assert.equal(blogPosts.length, 67);
});

test("revised services have actionable non-identical copy and truthful modification dates", () => {
  const entries = sitemap();
  const paragraphs = new Set<string>();
  for (const slug of serviceKnowledgeRevision.slugs) {
    const content = serviceKnowledge[slug];
    assert.ok(content.paragraphs.length >= 5, slug);
    for (const paragraph of content.paragraphs) {
      assert.ok(paragraph.length > 120, slug);
      assert.ok(!paragraphs.has(paragraph), slug);
      paragraphs.add(paragraph);
    }
    assert.equal(new Set(content.faqs.map(faq => faq.question)).size, content.faqs.length);
    const entry = entries.find(item => new URL(item.url).pathname === `/services/${slug}`)!;
    assert.equal(new Date(entry.lastModified!).toISOString().slice(0, 10), serviceKnowledgeRevision.iso);
  }
  assert.ok(!serviceKnowledge["tow-truck"].paragraphs.join(" ").includes("فرم مستقل سایت وضعیت پذیرش"));
  assert.ok(!serviceKnowledge["jump-start"].paragraphs.join(" ").includes("خودروی کمکی را چند دقیقه روشن نگه دارید"));
});
