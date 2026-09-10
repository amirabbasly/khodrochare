import { normalizeIranPhone } from "./numbers";
import { requestRegions, serviceOptions } from "../content/service-options";
export { normalizeIranPhone } from "./numbers";
export const allowedRegions = requestRegions;
export const allowedServices = serviceOptions.map((item) => item.value);
export type ServiceRequestPayload = { requestId: string; service: string; region: string; vehicle: string; phone: string; location: string; notes: string; consent: true };
export function validateServiceRequest(value: unknown): ServiceRequestPayload | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const text = (key: string, max: number, min = 0) => typeof input[key] === "string" && input[key].trim().length >= min && input[key].trim().length <= max && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(input[key]) ? input[key].trim() : null;
  const requestId = text("requestId", 36, 36); const service = text("service", 40, 1); const region = text("region", 30, 1);
  const vehicle = text("vehicle", 100, 2); const rawPhone = text("phone", 30, 1); const location = text("location", 600, 8); const notes = text("notes", 1200);
  if (!requestId || !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(requestId) || !service || !allowedServices.includes(service as typeof allowedServices[number]) || !region || !allowedRegions.includes(region as typeof allowedRegions[number]) || !vehicle || !rawPhone || !location || notes === null || input.consent !== true || (input.website !== undefined && input.website !== "")) return null;
  const phone = normalizeIranPhone(rawPhone); if (!/^09\d{9}$/.test(phone)) return null;
  return { requestId, service, region, vehicle, phone, location, notes, consent: true };
}
export function configuredWebhook(value: string | undefined): string | null {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password ? url.href : null; } catch { return null; }
}
/** Do not treat a 200/HTML page or an unacknowledged 202 as a received order. */
export async function deliverServiceRequest(payload: ServiceRequestPayload, url: string, token?: string, fetcher: typeof fetch = fetch): Promise<{ accepted: true; reference: string }> {
  const response = await fetcher(url, { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": payload.requestId, ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(payload), signal: AbortSignal.timeout(10_000), redirect: "error", cache: "no-store" });
  if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) throw new Error("not_accepted");
  const text = await readLimitedBody(response, 8192); const result: unknown = JSON.parse(text);
  if (!result || typeof result !== "object") throw new Error("not_accepted");
  const ack = result as Record<string, unknown>;
  if (ack.accepted !== true || typeof ack.reference !== "string" || !/^[\p{L}\p{N} _./-]{1,80}$/u.test(ack.reference)) throw new Error("not_accepted");
  return { accepted: true, reference: ack.reference };
}
export async function readLimitedBody(message: { body: ReadableStream<Uint8Array> | null }, limit: number): Promise<string> {
  if (!message.body) return ""; const reader = message.body.getReader(); const chunks: Uint8Array[] = []; let size = 0;
  try { while (true) { const { value, done } = await reader.read(); if (done) break; size += value.length; if (size > limit) { await reader.cancel(); throw new Error("body_too_large"); } chunks.push(value); } } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}
