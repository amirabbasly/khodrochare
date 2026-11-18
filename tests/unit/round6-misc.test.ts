import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { serviceFeedback } from "../../src/content/reviews";

test("round 6: thirty display-only service feedbacks ship verbatim without identities", () => {
  assert.equal(serviceFeedback.length, 30);
  for (const fb of serviceFeedback) {
    assert.ok(!("name" in fb) && !("rating" in fb) && !("dateIso" in fb), "feedback must stay identity-free");
    assert.ok(fb.city.length >= 2 && fb.service.length >= 3 && fb.text.length >= 40);
  }
  const cities = new Set(serviceFeedback.map((fb) => fb.city));
  assert.ok(cities.has("تهران، نیاوران") && cities.has("رشت") && cities.has("آستارا"));
});

test("round 6: hero truck reads as driving via road + travel motion", async () => {
  const css = await readFile("src/app/globals.css", "utf8");
  assert.ok(css.includes("tow-road-move"), "road animation missing");
  assert.ok(css.includes("translate(9px,-1px)") && css.includes("tow-speed"), "travel sway missing");
  assert.ok(css.includes('[data-paused="true"]'), "pause switch must survive");
});

test("round 6: feedback wall is exported and wired into a page", async () => {
  const trust = await readFile("src/components/site/trust-sections.tsx", "utf8");
  assert.ok(trust.includes("export function FeedbackWall"), "wall not exported");
  const walk = async (dir: string): Promise<string[]> => {
    const out: string[] = [];
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, e.name);
      if (e.isDirectory()) out.push(...(await walk(p)));
      else if (e.name.endsWith(".tsx")) out.push(p);
    }
    return out;
  };
  let wired = false;
  for (const f of await walk("src/app")) {
    if ((await readFile(f, "utf8")).includes("<FeedbackWall")) { wired = true; break; }
  }
  assert.ok(wired, "FeedbackWall not wired into any page");
});
