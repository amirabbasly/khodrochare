import test from "node:test";
import assert from "node:assert/strict";
import { selectTransport, type TransportInput } from "../../src/lib/transport-selector";
import { guideBreakdown, breakdownFields, type BreakdownInput } from "../../src/lib/breakdown-guide";
import { lookupObd } from "../../src/lib/obd-lookup";
import { obdCodes } from "../../src/content/obd-codes";
import { compareQuotes, quoteTotal } from "../../src/lib/quote-comparison";
import { parseNonNegativeNumber } from "../../src/lib/numbers";

const vehicle: TransportInput = { power: "combustion", gearbox: "manual", drive: "front", wheels: "rolling", clearance: "standard", access: "open", manualAllows: "yes" };
const stopped: BreakdownInput = { emergency: "no", location: "safe", symptom: "no-start" };

test("wheel-lift is only a review candidate when every prerequisite is explicitly met", () => {
  const advice = selectTransport(vehicle);
  assert.equal(advice.kind, "wheel-lift-review");
  assert.match(advice.caution, /مجوز یدک‌کشی/);
  for (const change of [{ power: "electric" }, { power: "hybrid" }, { gearbox: "automatic" }, { drive: "all" }, { manualAllows: "no" }, { manualAllows: "unknown" }, { clearance: "low" }, { wheels: "locked" }] as Partial<TransportInput>[]) {
    assert.notEqual(selectTransport({ ...vehicle, ...change }).kind, "wheel-lift-review");
  }
});
test("unknown vehicle data never silently authorizes wheels-on-ground towing", () => {
  const advice = selectTransport({ power: "unknown", gearbox: "unknown", drive: "unknown", wheels: "unknown", clearance: "unknown", access: "unknown", manualAllows: "unknown" });
  assert.equal(advice.kind, "access-review"); assert.ok(advice.reasons.length >= 4);
  assert.match(advice.caution, /دفترچه همان مدل/);
});
test("locked wheels and garage access preserve separate equipment and access requirements", () => {
  const advice = selectTransport({ ...vehicle, wheels: "locked", access: "garage", clearance: "low" });
  assert.equal(advice.kind, "access-review");
  assert.ok(advice.equipment.some((text) => text.includes("اسکیت")));
  assert.ok(advice.equipment.some((text) => text.includes("پارکینگ")));
  assert.ok(advice.equipment.some((text) => text.includes("کم‌زاویه")));
});
test("transport selection validates every runtime option", () => {
  assert.throws(() => selectTransport({ ...vehicle, power: "anything" } as unknown as TransportInput), /invalid_power/);
  assert.throws(() => selectTransport({} as TransportInput), /invalid_/);
});
test("emergency signs take precedence over every symptom and location", () => {
  for (const [symptom] of breakdownFields.symptom.options) for (const [location] of breakdownFields.location.options) {
    const advice = guideBreakdown({ emergency: "yes", location, symptom });
    assert.equal(advice.priority, "emergency"); assert.equal(advice.servicePath, undefined);
    assert.match(advice.title, /خدمات اضطراری عمومی/);
  }
});
test("unknown danger or unsafe stopping overrides routine repair choices", () => {
  for (const change of [{ emergency: "unknown" }, { location: "traffic" }, { location: "unknown" }] as Partial<BreakdownInput>[]) {
    assert.equal(guideBreakdown({ ...stopped, ...change }).priority, "safety-first");
  }
});
test("oil, braking, overheating and flashing warning signs do not suggest routine driving", () => {
  for (const symptom of ["oil-brake", "overheat", "check-flashing", "collision", "flat-tire"] as const) {
    assert.equal(guideBreakdown({ ...stopped, symptom }).priority, "stop-and-assess");
  }
});
test("routine symptom results remain inspection guidance, not a diagnosis", () => {
  const advice = guideBreakdown(stopped);
  assert.equal(advice.priority, "inspection"); assert.match(advice.title, /بررسی/);
  assert.match(advice.avoid, /بدون تست/);
  assert.throws(() => guideBreakdown({ ...stopped, symptom: "invented" } as unknown as BreakdownInput), /invalid_symptom/);
});
test("OBD lookup normalizes Persian/Arabic digits and case without guessing unknown codes", () => {
  for (const input of ["P0300", "p۰۳۰۰", " p ٠٣٠٠ "]) assert.equal(lookupObd(input).status, "found");
  assert.deepEqual(lookupObd("P0A80"), { status: "unknown", code: "P0A80" });
  assert.deepEqual(lookupObd("U0100"), { status: "unknown", code: "U0100" });
});
test("OBD lookup rejects malformed or oversized input", () => {
  for (const input of ["", "P030", "P03000", "P9999", "<script>", "P0300".repeat(6), "../../../P0300"]) assert.equal(lookupObd(input).status, "invalid");
});
test("all twelve dictionary entries have unique codes, explanatory limits and HTTPS references", () => {
  assert.equal(obdCodes.length, 12); assert.equal(new Set(obdCodes.map((entry) => entry.code)).size, 12);
  for (const entry of obdCodes) {
    assert.match(entry.code, /^P0\d{3}$/); assert.equal(lookupObd(entry.code).status, "found");
    assert.ok(entry.meaning.length > 50 && entry.notProof.length > 40 && entry.ask.length > 40);
    assert.equal(new URL(entry.sourceUrl).protocol, "https:");
  }
});
test("quote comparison adds only supplied amounts and reports ties correctly", () => {
  const first = { quoted: 100000, extras: 30000, discount: 10000 };
  const second = { quoted: 110000, extras: 5000, discount: 0 };
  assert.deepEqual(compareQuotes(first, second, true), { firstTotal: 120000, secondTotal: 115000, difference: 5000, lower: "second" });
  assert.equal(compareQuotes(first, first, true).lower, "equal");
  assert.equal(quoteTotal({ quoted: 0, extras: 0, discount: 0 }), 0);
});
test("quote comparison refuses different scopes and invalid financial values", () => {
  const valid = { quoted: 100000, extras: 0, discount: 0 };
  assert.throws(() => compareQuotes(valid, valid, false), /different_scope/);
  for (const quoted of [-1, NaN, Infinity, 1.5, 1000000001]) assert.throws(() => quoteTotal({ ...valid, quoted }), /invalid_amount/);
  assert.throws(() => quoteTotal({ ...valid, discount: 100001 }), /discount_exceeds_total/);
});
test("numeric parser accepts real groupings but rejects ambiguous separators", () => {
  assert.equal(parseNonNegativeNumber("۱٬۲۳۴٬۵۶۷"), 1234567);
  assert.equal(parseNonNegativeNumber("١,٢٣٤٫٥"), 1234.5);
  assert.equal(parseNonNegativeNumber(" ۰٫۵ "), 0.5);
  for (const input of ["1,5", "12,34", "1,,000", "1٬00", "1e3", "+10", "-10"]) assert.equal(parseNonNegativeNumber(input), null, input);
});
