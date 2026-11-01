import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("theme starts light and restores preference before paint without hiding content", async () => {
  const layout = await readFile("src/app/layout.tsx", "utf8");
  assert.ok(layout.includes('data-theme="light"'));
  assert.ok(layout.includes("localStorage.getItem('khodrochare:theme')"));
  assert.ok(layout.includes("suppressHydrationWarning"));
  const control = await readFile("src/components/site/theme-toggle.tsx", "utf8");
  assert.ok(control.includes("aria-pressed={dark}"));
  assert.ok(control.includes('window.addEventListener("storage"'));
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
