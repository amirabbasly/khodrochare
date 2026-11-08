import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("AOS is a runtime dependency and initializes after streaming layout becomes visible", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.ok(pkg.dependencies.aos);
  const component = readFileSync("src/components/site/scroll-animations.tsx", "utf8");
  for (const text of ['import("aos")', "aos.init(", "aos.refreshHard()", "getBoundingClientRect().height", "initialised", "prefers-reduced-motion", "disposed"]) assert.ok(component.includes(text), text);
  assert.ok(readFileSync("src/app/layout.tsx", "utf8").includes("<ScrollAnimations />"));
});

test("compact city copy belongs to controls and map observation targets geography, not heading", () => {
  const source = readFileSync("src/components/home/coverage-explorer.tsx", "utf8");
  assert.ok(!source.includes('className="coverage-selection"'));
  assert.ok(source.indexOf('className="coverage-inline-summary"') < source.indexOf('className="coverage-map-column"'));
  assert.ok(source.includes('querySelector(".coverage-map-geography")'));
  assert.ok(source.includes('observer.observe(map)'));
  assert.ok(source.includes('entered ? "on" : "waiting"'));
});
