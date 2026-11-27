import test from "node:test";
import assert from "node:assert/strict";
import { seoMetadata, absoluteUrl } from "../../src/seo/metadata";
import { organizationSchema } from "../../src/seo/schemas";
import manifest from "../../src/app/manifest";
import robots from "../../src/app/robots";
import { GET } from "../../src/app/llms.txt/route";

test("page metadata keeps canonical and social URLs consistent with intentional noindex", () => {
  const metadata = seoMetadata({ title: "نمونه", description: "توضیحات نمونه", path: "/امداد-خودرو-آنلاین" });
  assert.equal(metadata.alternates?.canonical, absoluteUrl("/امداد-خودرو-آنلاین"));
  assert.equal(metadata.openGraph?.url, metadata.alternates?.canonical);
  const hidden = seoMetadata({ title: "موقت", description: "صفحه موقت", path: "/imports", noindex: true });
  assert.equal((hidden.robots as { index: boolean }).index, false);
});
test("organization references supplied official social profiles without fabricated ratings", () => {
  assert.ok(organizationSchema.sameAs.includes("https://www.instagram.com/khodrochare_official/"));
  assert.ok(organizationSchema.sameAs.includes("https://x.com/khodrochare"));
  assert.ok(!("aggregateRating" in organizationSchema));
});
test("crawl and app discovery infrastructure uses real public destinations", async () => {
  assert.equal(robots().sitemap, "https://khodrochare.ir/sitemap.xml");
  assert.equal(manifest().dir, "rtl");
  const response = await GET();
  assert.ok(response.headers.get("content-type")?.includes("text/plain"));
  const text = await response.text();
  for (const path of ["/app", "/safir", "/assistant"]) assert.ok(text.includes(`https://khodrochare.ir${path}`));
});
