import { timingSafeEqual, createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { communityDirectory, readComments, saveComment, submitComment, validateComment } from "@/lib/community";
import { createRateLimiter } from "@/lib/rate-limit";
import { readLimitedBody } from "@/lib/service-request";
import { blogPosts } from "@/content/blog";
import { services } from "@/content/services";
import { neighborhoods } from "@/content/neighborhoods";
import { seoRegions } from "@/seo/locations";
import { persianServiceRoutes } from "@/seo/internal-links";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const paths = new Set(["/تهران", "/roads/tehran-highways", ...blogPosts.map(p => `/blog/${p.slug}`), ...services.map(p => `/services/${p.slug}`), ...neighborhoods.map(p => `/${p.citySlug}/${p.slug}`), ...Object.values(seoRegions).map(p => `/${p.citySlug}/${p.slug}`), ...persianServiceRoutes.map(p => `/تهران/${p.slug}`)]);
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" };
const json = (data: object, status = 200) => NextResponse.json(data, { status, headers });
const allow = createRateLimiter({ limit: 4 });
function admin(request: Request) {
  const token = process.env.COMMUNITY_ADMIN_TOKEN;
  const supplied = request.headers.get("authorization") ?? "";
  return Boolean(token && token.length >= 32 && timingSafeEqual(createHash("sha256").update(supplied).digest(), createHash("sha256").update(`Bearer ${token}`).digest()));
}
function sameOrigin(request: Request) {
  try { return new URL(request.headers.get("origin") ?? "").host === request.headers.get("host") && request.headers.get("sec-fetch-site") !== "cross-site"; } catch { return false; }
}
export async function GET(request: Request) {
  const directory = communityDirectory();
  if (!directory) return json({ enabled: false, comments: [] });
  try {
    const url = new URL(request.url), page = url.searchParams.get("page");
    if (url.searchParams.has("moderation")) {
      if (!admin(request)) return json({ error: "unauthorized" }, 401);
      return json({ comments: (await readComments(directory)).filter(c => c.status === "pending").slice(0, 100) });
    }
    if (!page || !paths.has(page)) return json({ enabled: false, comments: [] });
    const comments = (await readComments(directory)).filter(c => c.status === "approved" && c.page === page).sort((a,b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 50).map(c => ({ id: c.id, name: c.name, text: c.text, rating: c.rating, createdAt: c.createdAt, reply: c.reply }));
    return json({ enabled: true, comments });
  } catch { return json({ error: "storage_unavailable" }, 503); }
}
export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "origin_not_allowed" }, 403);
  const directory = communityDirectory(); if (!directory) return json({ error: "unavailable" }, 503);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return json({ error: "json_required" }, 415);
  // Reverse proxy must overwrite X-Real-IP. No raw IP persisted.
  const key = createHash("sha256").update(request.headers.get("x-real-ip") ?? "unknown").digest("hex");
  if (!allow(key)) return json({ error: "rate_limited" }, 429);
  try {
    const input = validateComment(JSON.parse(await readLimitedBody(request, 12000)));
    if (!input || !paths.has(input.page)) return json({ error: "invalid_comment" }, 400);
    const id = await submitComment(directory, input);
    return json({ id, status: "pending" }, 201);
  } catch (error) {
    if (error instanceof Error && error.message === "duplicate_comment") return json({ error: "duplicate_comment" }, 409);
    return json({ error: "not_saved" }, 400);
  }
}
export async function PATCH(request: Request) {
  if (!admin(request)) return json({ error: "unauthorized" }, 401);
  const directory = communityDirectory(); if (!directory) return json({ error: "unavailable" }, 503);
  try {
    const body = JSON.parse(await readLimitedBody(request, 12000));
    if (!["approved", "rejected"].includes(body.status) || (body.reply !== undefined && (typeof body.reply !== "string" || body.reply.length > 2000 || /[<>]|https?:\/\/|\d{8,}/.test(body.reply)))) return json({ error: "invalid_moderation" }, 400);
    const comment = (await readComments(directory)).find(c => c.id === body.id);
    if (!comment) return json({ error: "not_found" }, 404);
    await saveComment(directory, { ...comment, status: body.status, reply: body.reply, moderatedAt: new Date().toISOString() });
    return json({ status: body.status });
  } catch { return json({ error: "moderation_failed" }, 400); }
}
