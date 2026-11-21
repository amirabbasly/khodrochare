import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("theme is dark on the server and does not restore old light preferences", async () => {
  const layout = await readFile("src/app/layout.tsx", "utf8");
  assert.ok(layout.includes('data-theme="dark"'));
  assert.ok(!layout.includes("localStorage.getItem('khodrochare:theme')"));
  const header = await readFile("src/components/home/site-header.tsx", "utf8");
  assert.ok(!header.includes("ThemeToggle"));
});
test("route skeleton is accessible and never delays server content artificially", async () => {
  const skeleton = await readFile("src/app/loading.tsx", "utf8");
  assert.ok(skeleton.includes('role="status"'));
  assert.ok(skeleton.includes('aria-busy="true"'));
  assert.ok(skeleton.includes('aria-hidden="true"'));
  assert.ok(!skeleton.includes("setTimeout"));
});
test("hero retains one high priority image and respects hidden documents", async () => {
  const hero = await readFile("src/components/home/hero-carousel.tsx", "utf8");
  assert.ok(hero.includes("slides.slice(0, loadedSlides)"));
  assert.ok(hero.includes("if (document.hidden) return"));
  assert.ok(hero.includes("<HeroAtmosphere"));
  const css = await readFile("src/app/globals.css", "utf8");
  assert.ok(css.includes(".hero-atmosphere *, .hero-dispatch-card, .skeleton-block::after"));
});
