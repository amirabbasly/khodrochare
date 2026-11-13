import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { blogPosts, type BlogPost } from "../src/content/blog";
import { indexablePaths } from "./lib/route-inventory";
import { qualityIssues } from "../src/lib/editorial-quality";

type Entry = { post: BlogPost; publishAt: string; approval?: { reviewer: string; reviewedAt: string; sha256: string; verifiedSources: string[] } };
const digest = (p: BlogPost) => createHash("sha256").update(JSON.stringify(p)).digest("hex");
async function main() {
  const mode = process.argv[2] ?? "check";
  if (!["check", "publish", "draft"].includes(mode)) throw Error("Use check, publish or draft");
  await mkdir("content/queue", { recursive: true });
  if (mode === "draft") {
    // Credentials are server-side only. Never feed user comments or personal data to the model.
    const endpoint = process.env.CONTENT_AI_URL, key = process.env.CONTENT_AI_KEY, model = process.env.CONTENT_AI_MODEL;
    const topic = process.env.CONTENT_TOPIC;
    if (!endpoint || !key || !model || !topic || new URL(endpoint).protocol !== "https:") throw Error("Configure CONTENT_AI_URL/KEY/MODEL and CONTENT_TOPIC");
    const response = await fetch(endpoint, { method: "POST", signal: AbortSignal.timeout(90000), headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` }, body: JSON.stringify({ model, temperature: .3, messages: [{ role: "system", content: "یک پیش‌نویس فارسی BlogPost به صورت JSON خالص بنویس: slug انگلیسی، title، excerpt، category، readTime، publishedAt، publishedAtIso، image=/images/hero-roadside.webp، sections آرایه title/body، sources آرایه title/url، links آرایه title/href. حداقل سه بخش تصمیم‌محور. نام مشتری، تجربه، قیمت، زمان اعزام، شعبه و آمار نساز. توصیه ایمنی مشروط باشد. منابع پیشنهادی باید توسط ویراستار بررسی شوند. با موضوعات موجود صفحه هم‌پوشان نساز." }, { role: "user", content: JSON.stringify({ topic, existingTitles: blogPosts.map(p => p.title), allowedLinks: indexablePaths.filter(p => !p.startsWith("/blog/")) }) }] }) });
    if (!response.ok) throw Error(`Provider HTTP ${response.status}`);
    const body = await response.json();
    const post = JSON.parse(body.choices[0].message.content) as BlogPost;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) throw Error("Invalid slug");
    await writeFile(`content/queue/${post.slug}.json`, JSON.stringify({ post, publishAt: new Date().toISOString() }, null, 2), { flag: "wx" });
    console.log("Draft saved; source and technical review required. Nothing published."); return;
  }
  const published = JSON.parse(await readFile("src/content/generated/articles.json", "utf8")) as BlogPost[];
  let changed = false;
  for (const file of (await readdir("content/queue")).filter(f => f.endsWith(".json")).sort()) {
    const entry = JSON.parse(await readFile(`content/queue/${file}`, "utf8")) as Entry;
    const p = entry.post;
    if (!p || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || !Array.isArray(p.sections)) throw Error(`${file}: malformed post`);
    if (published.some(v => v.slug === p.slug && digest(v) === digest(p))) continue;
    const issues = qualityIssues(p, [...blogPosts, ...published].filter(v => v.slug !== p.slug), new Set(indexablePaths));
    if (!Number.isFinite(Date.parse(entry.publishAt)) || !Number.isFinite(Date.parse(p.publishedAtIso)) || Date.parse(p.publishedAtIso) > Date.parse(entry.publishAt)) issues.push("invalid_publication_dates");
    if (blogPosts.some(v => v.slug === p.slug) && !published.some(v => v.slug === p.slug)) issues.push("existing_editorial_slug");
    if (issues.length) throw Error(`${file}: ${issues.join(", ")}`);
    console.log(`${file}: quality checks passed; digest=${digest(p)}`);
    if (mode !== "publish" || Date.parse(entry.publishAt) > Date.now()) continue;
    const a = entry.approval;
    if (!a) { console.log(`${file}: awaiting factual review; not published`); continue; }
    if (!a?.reviewer.trim() || !Number.isFinite(Date.parse(a.reviewedAt)) || Date.parse(a.reviewedAt) > Date.now() || a.sha256 !== digest(p) || !p.sources?.every(s => a.verifiedSources.includes(s.url))) throw Error(`${file}: approval/source verification required for this exact content`);
    const index = published.findIndex(v => v.slug === p.slug);
    if (index >= 0) published[index] = p; else published.push(p);
    changed = true;
  }
  if (changed) { const target = "src/content/generated/articles.json"; await writeFile(`${target}.tmp`, JSON.stringify(published, null, 2) + "\n"); await (await import("node:fs/promises")).rename(`${target}.tmp`, target); }
}
main().catch(error => { console.error(error instanceof Error ? error.message : "pipeline_failed"); process.exitCode = 1; });
