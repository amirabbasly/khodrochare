import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("scroll reveal observes actual viewport intersections and streamed content", () => {
  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  assert.ok(pkg.dependencies.aos);
  const component = readFileSync("src/components/site/scroll-animations.tsx", "utf8");
  for (const text of ["IntersectionObserver", "MutationObserver", "getBoundingClientRect()", "observer.disconnect()", "prefers-reduced-motion", "mutations.disconnect()", "aos-init", "aos-animate"]) assert.ok(component.includes(text), text);
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
