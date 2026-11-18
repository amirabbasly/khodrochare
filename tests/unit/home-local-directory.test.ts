import test from "node:test";
import assert from "node:assert/strict";
import { homeLocalLinkGroups } from "../../src/content/home-local-links";
import { indexablePaths } from "../../scripts/lib/route-inventory";

test("expanded home directory contains 59 unique existing canonical pages", () => {
  const links = homeLocalLinkGroups.flatMap(group => group.links);
  const paths = new Set(indexablePaths);
  assert.equal(links.length, 59);
  assert.equal(new Set(links.map(link => link.href)).size, links.length);
  for (const link of links) assert.ok(paths.has(link.href), link.href);
  for (const city of ["تهران", "کرج"]) {
    assert.equal(links.filter(link => link.href.startsWith(`/${city}/brands/`)).length, 12);
  }
});
