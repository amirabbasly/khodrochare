export const indexNowOrigin = "https://khodrochare.ir";
export type UrlChange = { url: string; changedAt: string; type: "updated" | "added" | "deleted" };
export function validateChanges(input: unknown, now = Date.now()): UrlChange[] {
  if (!Array.isArray(input) || !input.length || input.length > 10000) throw Error("Expected 1–10000 explicitly changed URLs");
  const unique = new Map<string, UrlChange>();
  for (const value of input) {
    if (!value || typeof value.url !== "string") throw Error("Invalid change");
    const url = new URL(value.url);
    if (url.origin !== indexNowOrigin || url.username || url.password || url.search || url.hash || /%(?:2f|5c)/i.test(url.pathname)) throw Error("Canonical same-origin public URLs only");
    const path = decodeURIComponent(url.pathname);
    if (/^\/(?:api|admin|account|downloads|_next)(?:\/|$)/.test(path)) throw Error("Private/non-content URL");
    if (!["added", "updated", "deleted"].includes(value.type) || !Number.isFinite(Date.parse(value.changedAt)) || Date.parse(value.changedAt) > now) throw Error("Invalid change type/date");
    unique.set(url.href, { url: url.href, changedAt: new Date(value.changedAt).toISOString(), type: value.type });
  }
  return [...unique.values()];
}
export function pendingChanges(changes: UrlChange[], sent: Record<string, { changedAt: string; sentAt: string }>, now = Date.now()) {
  return changes.filter(c => !sent[c.url] || (Date.parse(c.changedAt) > Date.parse(sent[c.url].changedAt) && now - Date.parse(sent[c.url].sentAt) >= 86400000));
}
export function validateKey(key: string | undefined) {
  if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) throw Error("Configure INDEXNOW_KEY (8–128 allowed characters)");
  return key;
}
