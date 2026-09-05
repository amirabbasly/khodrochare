import test from "node:test";
import assert from "node:assert/strict";
import { configuredWebhook, deliverServiceRequest, normalizeIranPhone, readLimitedBody, validateServiceRequest } from "../../src/lib/service-request";
import { createRateLimiter } from "../../src/lib/rate-limit";
const request = { requestId: "00000000-0000-4000-8000-000000000001", service: "tow-truck", region: "گیلان", vehicle: "خودروی آزمون", phone: "۰۹۱۲۰۰۰۰۰۰۰", location: "نشانی آزمایشی محلی؛ بدون اعزام واقعی", notes: "داده مصنوعی آزمون", consent: true };
test("validation normalizes Iranian mobile numbers and returns only permitted fields", () => {
  const result = validateServiceRequest({ ...request, admin: true, destination: "https://example.invalid" });
  assert.ok(result); assert.equal(result.phone, "09120000000"); assert.ok(!("admin" in result)); assert.ok(!("destination" in result));
  assert.equal(normalizeIranPhone("+98 (912) 000-0000"), "09120000000");
});
test("invalid, oversized, missing-consent and bot submissions cannot be accepted", () => {
  for (const invalid of [null, [], {}, { ...request, phone: "123" }, { ...request, consent: false }, { ...request, website: "spam" }, { ...request, service: "not-real" }, { ...request, region: "outside-coverage" }, { ...request, location: "x".repeat(601) }, { ...request, requestId: "bad" }]) assert.equal(validateServiceRequest(invalid), null);
});
test("unconfigured, insecure or malformed webhook URLs cannot enable intake", () => {
  for (const url of [undefined, "", "bad", "http://example.com", "https://user:secret@example.com"]) assert.equal(configuredWebhook(url), null);
  assert.equal(configuredWebhook("https://example.invalid/intake"), "https://example.invalid/intake");
});
test("only an explicit accepted JSON acknowledgment counts; idempotency key is forwarded", async () => {
  const payload = validateServiceRequest(request)!;
  const calls: RequestInit[] = [];
  const fetcher: typeof fetch = async (_url, options) => { calls.push(options!); return Response.json({ accepted: true, reference: "LOCAL-TEST-001" }, { status: 201 }); };
  const ack = await deliverServiceRequest(payload, "https://example.invalid/intake", "test-token", fetcher);
  assert.deepEqual(ack, { accepted: true, reference: "LOCAL-TEST-001" });
  assert.equal(new Headers(calls[0].headers).get("Idempotency-Key"), request.requestId);
  assert.equal(new Headers(calls[0].headers).get("Authorization"), "Bearer test-token");
  assert.equal(calls[0].redirect, "error"); assert.ok(calls[0].signal);
  await deliverServiceRequest(payload, "https://example.invalid/intake", undefined, fetcher);
  assert.equal(new Headers(calls[1].headers).get("Idempotency-Key"), request.requestId);
});
test("200 HTML, missing acknowledgment, invalid reference and upstream failure are not success", async () => {
  for (const response of [new Response("ok"), Response.json({ accepted: false }), Response.json({ accepted: true }), Response.json({ accepted: true, reference: "<script>" }), Response.json({ accepted: true, reference: "TEST" }, { status: 500 })]) {
    await assert.rejects(deliverServiceRequest(validateServiceRequest(request)!, "https://example.invalid", undefined, async () => response));
  }
  await assert.rejects(deliverServiceRequest(validateServiceRequest(request)!, "https://example.invalid", undefined, async () => { throw new Error("network error"); }));
});
test("streaming body size is bounded even without Content-Length", async () => {
  assert.equal(await readLimitedBody(new Response("سلام"), 20), "سلام");
  await assert.rejects(readLimitedBody(new Response("x".repeat(100)), 10));
});
test("bounded limiter expires and fails closed at capacity", () => {
  const allow = createRateLimiter({ limit: 2, windowMs: 100, capacity: 1 });
  assert.equal(allow("a", 0), true); assert.equal(allow("a", 1), true); assert.equal(allow("a", 2), false);
  assert.equal(allow("b", 3), false); assert.equal(allow("b", 101), true);
});
