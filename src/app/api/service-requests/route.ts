import { createHash, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { configuredWebhook, deliverServiceRequest, readLimitedBody, validateServiceRequest } from "@/lib/service-request";
import { createRateLimiter } from "@/lib/rate-limit";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const salt = randomBytes(16).toString("hex"); const allowRequest = createRateLimiter();
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };
const json = (body: object, status = 200) => NextResponse.json(body, { status, headers });
export function GET() { return json({ enabled: Boolean(configuredWebhook(process.env.SERVICE_REQUEST_WEBHOOK_URL)), phone: "09123022064" }); }
export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin"); const host = request.headers.get("host");
  try { if (!origin || new URL(origin).host !== host || request.headers.get("sec-fetch-site") === "cross-site") return json({ error: "origin_not_allowed" }, 403); } catch { return json({ error: "origin_not_allowed" }, 403); }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({ error: "json_required" }, 415);
  // The production reverse proxy must overwrite X-Real-IP (see deploy/nginx).
  const ipKey = createHash("sha256").update(`${salt}:${request.headers.get("x-real-ip") ?? "unknown"}`).digest("hex");
  if (!allowRequest(ipKey)) return NextResponse.json({ error: "too_many_requests" }, { status: 429, headers: { ...headers, "Retry-After": "600" } });
  if (Number(request.headers.get("content-length") ?? 0) > 8192) return json({ error: "body_too_large" }, 413);
  let input: unknown;
  try { input = JSON.parse(await readLimitedBody(request, 8192)); } catch (error) { return json({ error: error instanceof Error && error.message === "body_too_large" ? "body_too_large" : "invalid_json" }, error instanceof Error && error.message === "body_too_large" ? 413 : 400); }
  const payload = validateServiceRequest(input); if (!payload) return json({ error: "invalid_request" }, 400);
  const url = configuredWebhook(process.env.SERVICE_REQUEST_WEBHOOK_URL);
  if (!url) return json({ error: "online_intake_unavailable", phone: "09123022064" }, 503);
  try { const acknowledgment = await deliverServiceRequest(payload, url, process.env.SERVICE_REQUEST_WEBHOOK_TOKEN); return json({ status: "received", reference: acknowledgment.reference }, 201); }
  catch { /* Intentionally do not log customer data, credentials or upstream response bodies. */ return json({ error: "acceptance_not_confirmed", phone: "09123022064" }, 502); }
}
