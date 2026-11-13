import assert from "node:assert/strict";
import { readFile, writeFile, rm } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
// Integration fixture only; never leave synthetic content in the published tree.
async function main() {
  const target = "src/content/generated/articles.json", queue = "content/queue/integration-fixture.json";
  const before = await readFile(target, "utf8");
  const post = { slug: "integration-fixture-not-customer-content", title: "راهنمای آزمایشی چرخه انتشار؛ داده تست نه واقعیت", excerpt: "این متن فقط برای آزمون کنترل انتشار و صف تأیید است و نباید در نسخه نهایی سایت منتشر یا به عنوان تجربه واقعی معرفی شود.", category: "آزمون", readTime: "۳ دقیقه", publishedAt: "آزمون", publishedAtIso: "2026-01-01", image: "/images/hero-roadside.webp", sections: [1,2,3].map(n => ({ title: `بخش آزمایشی ${n}`, body: Array.from({length:100}, (_,i) => `آزمایش${n}واژه${i}`).join(" ") })), sources: [{ title: "منبع آزمایش", url: "https://www.nhtsa.gov/vehicle-safety/tires" }], links: [{ title: "تهران", href: "/تهران" }] };
  const run = (mode: string) => spawnSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/content-pipeline.ts", mode], { encoding: "utf8" });
  try {
    const entry: Record<string, unknown> = { post, publishAt: "2026-01-01" };
    await writeFile(queue, JSON.stringify(entry));
    assert.equal(run("check").status, 0);
    assert.equal(run("publish").status, 0); assert.equal(await readFile(target, "utf8"), before, "unreviewed draft published");
    entry.approval = { reviewer: "integration-test-not-a-person", reviewedAt: "2026-01-01", sha256: "wrong", verifiedSources: post.sources.map(s => s.url) };
    await writeFile(queue, JSON.stringify(entry)); assert.notEqual(run("publish").status, 0);
    (entry.approval as Record<string, unknown>).sha256 = createHash("sha256").update(JSON.stringify(post)).digest("hex");
    entry.publishAt = "2099-01-01"; await writeFile(queue, JSON.stringify(entry)); assert.equal(run("publish").status, 0); assert.equal(await readFile(target, "utf8"), before);
    entry.publishAt = "2026-01-01"; await writeFile(queue, JSON.stringify(entry)); const published = run("publish"); assert.equal(published.status, 0, published.stderr); assert.ok(JSON.parse(await readFile(target, "utf8")).some((p: { slug: string }) => p.slug === post.slug));
    assert.equal(run("publish").status, 0, "publication must be idempotent");
    console.log("Publication integration passed: checks, review required, digest tamper, schedule, publication, idempotency. Fixture removed.");
  } finally { await writeFile(target, before); await rm(queue, { force: true }); }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
