import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("about reference structure keeps business identity and original service links", () => {
  const page = readFileSync("src/app/about/page.tsx", "utf8");
  for (const marker of ["AboutPage", "<HeroStats />", "<AboutStory />", "<TeamShowcase />", "about-license-title", "about-partners-title", 'href="/app"', 'href="/licenses"', 'href="/شمال"', 'href="/تهران"', 'href="/کرج"', "businessFacts.legalName"]) assert.ok(page.includes(marker), marker);
  assert.ok(!page.includes("mdotcar") && !page.includes("<FeedbackWall"));
  const story = readFileSync("src/components/site/about-story.tsx", "utf8");
  assert.ok(story.includes("aria-pressed") && story.includes("aria-controls"));
  assert.ok(!/۱۴۰[۰-۵]|140[0-5]/.test(story), "No invented dated company milestones");
});

test("team uses scoped navy/orange styling and fluid breakpoints", () => {
  const css = readFileSync("src/app/globals.css", "utf8");
  assert.ok(!css.includes("#22264c") && !css.includes(".team-showcase article{background:#fff"));
  assert.ok(css.includes(".team-showcase .team-members{grid-template-columns:repeat(3"));
  assert.ok(css.includes("@media(max-width:479px){.team-showcase .team-members{grid-template-columns:minmax(0,1fr)"));
  const team = readFileSync("src/components/site/team-showcase.tsx", "utf8");
  assert.ok(team.includes("تصویر رسمی هنوز منتشر نشده است"));
});
