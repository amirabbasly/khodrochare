import type { MetadataRoute } from "next";
import { siteUrl } from "@/seo/metadata";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search access and AI-assistant access are intentionally open: brand
      // visibility inside AI answers (GEO) needs GPTBot / Google-Extended /
      // ClaudeBot / CCBot / Bytespider to read public pages. API exclusion is
      // repeated in explicit groups, because robots.txt groups do not inherit
      // the wildcard. NOTE: Cloudflare "AI Crawl Control" injects its own
      // managed blocks above these rules; review it in the Cloudflare panel or
      // these allows have no effect for the blocked AI crawlers.
      ...["*", "Googlebot", "Googlebot-Image", "Bingbot", "OAI-SearchBot", "Claude-SearchBot", "GPTBot", "Google-Extended", "ClaudeBot", "CCBot", "Bytespider"].map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
