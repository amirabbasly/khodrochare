/** Per-process abuse guard, not a distributed limiter. No raw IPs or form data stored here. */
export function createRateLimiter({ limit = 10, windowMs = 600_000, capacity = 10_000 } = {}) {
  const entries = new Map<string, { count: number; expires: number }>();
  return (key: string, now = Date.now()) => {
    for (const [id, entry] of entries) if (entry.expires <= now) entries.delete(id);
    const entry = entries.get(key);
    if (entry && entry.count >= limit) return false;
    if (!entry && entries.size >= capacity) return false;
    entries.set(key, { count: (entry?.count ?? 0) + 1, expires: entry?.expires ?? now + windowMs }); return true;
  };
}
