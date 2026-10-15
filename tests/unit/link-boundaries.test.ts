import test from "node:test";
import assert from "node:assert/strict";
import { findBoundedMatch } from "../../src/seo/link-boundaries";

test("link matcher rejects phrases nested inside longer Persian words (live bugs 2026-10-14)", () => {
  assert.equal(findBoundedMatch("برق، باتری، پنچری و بررسی اولیه در محل انجام می‌شوند.", "چری"), -1);
  assert.equal(findBoundedMatch("تهران، کرج و سه استان شمالی با همین شماره.", "شمال"), -1);
});

test("link matcher still fires on standalone words and punctuation boundaries", () => {
  assert.equal(findBoundedMatch("شمال کشور", "شمال"), 0);
  assert.equal(findBoundedMatch("خودروی چری مدل جدید", "چری"), 7);
  assert.equal(findBoundedMatch("(شمال)", "شمال"), 1);
  assert.equal(findBoundedMatch("به شمال، سفر کنید.", "شمال"), 3);
});

test("link matcher skips a nested occurrence and takes a later clean one", () => {
  assert.equal(findBoundedMatch("شمالی و شمال", "شمال"), 8);
});

test("link matcher handles ZWNJ phrases and edges", () => {
  assert.equal(findBoundedMatch("یدک‌کش تهران", "یدک‌کش"), 0);
  assert.equal(findBoundedMatch("تهران", "تهران"), 0);
  assert.equal(findBoundedMatch("متن", ""), -1);
});
