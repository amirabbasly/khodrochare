import test from "node:test";
import assert from "node:assert/strict";
import { calculateQuote, type QuoteInput } from "../../src/lib/pricing";
import { normalizeDigits, parseNonNegativeNumber } from "../../src/lib/numbers";
const input: QuoteInput = { base: 100000, distance: 10, includedKm: 2, perKm: 20000, waitingMinutes: 10, perMinute: 1000, parts: 50000, extras: 15000, discount: 5000 };
test("calculator adds only user-provided rates with no location multiplier", () => {
  const result = calculateQuote(input);
  assert.equal(result.billableKm, 8); assert.equal(result.subtotal, 335000); assert.equal(result.total, 330000);
});
test("distance within the base allowance has no additional charge", () => {
  const result = calculateQuote({ ...input, distance: 1 });
  assert.equal(result.billableKm, 0); assert.equal(result.transport, 0);
});
test("negative values, NaN, unbounded amounts and excessive discounts are rejected", () => {
  for (const key of Object.keys(input) as (keyof QuoteInput)[]) {
    for (const value of [-1, NaN, Infinity, 1e20]) assert.throws(() => calculateQuote({ ...input, [key]: value }));
  }
  assert.throws(() => calculateQuote({ ...input, discount: 999999999 }));
  assert.throws(() => calculateQuote({ ...input, distance: 10001 }));
  assert.throws(() => calculateQuote({ ...input, base: 2.5 }));
});
test("Persian and Arabic digits are accepted; partial or negative numbers are not", () => {
  assert.equal(normalizeDigits("۱۲٣٤"), "1234");
  assert.equal(parseNonNegativeNumber("۱۲۵٬۰۰۰"), 125000);
  assert.equal(parseNonNegativeNumber("٢٫٥"), 2.5);
  for (const value of ["", "-2", "2a", "Infinity", "1e6"]) assert.equal(parseNonNegativeNumber(value), null);
});
test("fractional kilometres round charges to whole toman", () => {
  assert.equal(calculateQuote({ ...input, includedKm: 0, distance: 1.25, perKm: 3 }).transport, 4);
});
