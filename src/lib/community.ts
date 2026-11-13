import { randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { normalizeText } from "./editorial-quality";
export type Comment = { id: string; page: string; name: string; text: string; rating?: number; consent: true; createdAt: string; status: "pending" | "approved" | "rejected"; reply?: string; moderatedAt?: string };
export function communityDirectory() {
  const directory = process.env.COMMUNITY_DATA_DIR;
  if (!directory || !path.isAbsolute(directory)) return undefined;
  const resolved = path.resolve(directory), checkout = path.resolve(process.cwd());
  // Never accept storage under the application checkout (especially public/).
  return resolved === checkout || resolved.startsWith(checkout + path.sep) ? undefined : resolved;
}
export function validateComment(input: unknown): Omit<Comment, "id" | "status" | "createdAt"> | undefined {
  if (!input || typeof input !== "object") return;
  const p = input as Record<string, unknown>;
  if (p.consent !== true || typeof p.name !== "string" || typeof p.text !== "string" || typeof p.page !== "string" || p.website) return;
  const name = p.name.trim(), text = p.text.trim();
  if (name.length < 2 || name.length > 60 || text.length < 15 || text.length > 2000 || /[<>]|https?:\/\/|\b\d{8,}\b|[۰-۹]{8,}|[\w.+-]+@[\w.-]+/u.test(name + " " + text)) return;
  if (p.rating !== undefined && (!Number.isInteger(p.rating) || Number(p.rating) < 1 || Number(p.rating) > 5)) return;
  return { name, text, page: p.page, consent: true, ...(p.rating === undefined ? {} : { rating: Number(p.rating) }) };
}
export async function readComments(directory: string): Promise<Comment[]> {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const files = (await readdir(directory)).filter(f => /^[a-f0-9-]{36}\.json$/.test(f));
  // Bounded storage: migrate to a database before exceeding this limit.
  if (files.length > 5000) throw Error("community_capacity");
  return Promise.all(files.map(async f => JSON.parse(await readFile(path.join(directory, f), "utf8")) as Comment));
}
export async function saveComment(directory: string, comment: Comment) {
  if (!/^[a-f0-9-]{36}$/.test(comment.id)) throw Error("invalid_id");
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const file = path.join(directory, `${comment.id}.json`), temp = path.join(directory, `${comment.id}.${randomUUID()}.tmp`);
  await writeFile(temp, JSON.stringify(comment), { mode: 0o600, flag: "wx" }); await rename(temp, file);
}
export async function submitComment(directory: string, data: Omit<Comment, "id" | "status" | "createdAt">) {
  const all = await readComments(directory);
  if (all.length >= 5000) throw Error("community_capacity");
  if (all.some(c => c.page === data.page && normalizeText(c.text) === normalizeText(data.text))) throw Error("duplicate_comment");
  const comment: Comment = { ...data, id: randomUUID(), status: "pending", createdAt: new Date().toISOString() };
  await saveComment(directory, comment); return comment.id;
}
