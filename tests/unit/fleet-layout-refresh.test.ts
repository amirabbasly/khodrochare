import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("home statistics match the latest owner figures and hero note is removed", () => {
  const stats = readFileSync("src/components/home/hero-stats.tsx", "utf8");
  assert.ok(stats.includes("value: 50000"));
  assert.ok(stats.includes("value: 1000"));
  assert.ok(stats.includes("value: 4.8"));
  for (const page of ["app", "safir"]) {
    const code = readFileSync(`src/app/${page}/page.tsx`, "utf8");
    assert.ok(!code.includes("بر اساس اعلام مجموعه؛ آمار زنده نیست"));
    assert.ok(code.includes('className="super-app-hero"'));
    assert.ok(code.includes("showGeneralFaq={false}"));
  }
});

test("about and team have orange secondary navigation entries on desktop and mobile", () => {
  const header = readFileSync("src/components/home/site-header.tsx", "utf8");
  for (const route of ["about", "team"]) {
    const links = header.split("\n").filter(line => line.includes(`href="/${route}"`));
    assert.equal(links.length, 2);
    for (const link of links) assert.ok(link.includes("bg-brand-orange"));
  }
});
