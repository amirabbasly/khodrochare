import { blogContentUpdatedAtIso, blogPosts } from "@/content/blog";
import { siteUrl } from "@/seo/metadata";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] as string);
}

export const dynamic = "force-static";

export function GET() {
  const updatedAt = new Date(blogPosts[0]?.updatedAtIso ?? blogContentUpdatedAtIso).toUTCString();
  const items = blogPosts
    .map((post) => {
      const url = `${siteUrl}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
      <pubDate>${new Date(post.publishedAtIso).toUTCString()}</pubDate>
      <enclosure url="${siteUrl}${encodeURI(post.image)}" type="image/webp" />
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>مجله خودرو چاره</title>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>راهنمای امداد خودرو، حمل خودرو، مکانیک سیار و نگهداری خودرو در تهران و کرج</description>
    <language>fa-IR</language>
    <lastBuildDate>${updatedAt}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
