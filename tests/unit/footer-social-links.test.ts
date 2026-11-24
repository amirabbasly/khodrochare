import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

test("footer points to the supplied Instagram and X profiles with accessible external links", () => {
  const footer = readFileSync("src/components/site/site-footer.tsx", "utf8");
  for (const url of ["https://www.instagram.com/khodrochare_official/", "https://x.com/khodrochare"]) {
    const link = footer.match(new RegExp(`<a href="${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[^>]*>`))?.[0];
    assert.ok(link);
    assert.ok(link.includes('target="_blank"'));
    assert.ok(link.includes('rel="me noopener noreferrer"'));
    assert.ok(link.includes('aria-label="'));
  }
  assert.ok(!footer.includes('href="https://www.instagram.com/khodrochare"'));
  assert.ok(existsSync("public/images/social/x.svg"));
});
