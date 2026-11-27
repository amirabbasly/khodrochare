import type { MetadataRoute } from "next";
import { siteUrl } from "@/seo/metadata";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search crawling and model-training permissions are independent policies.
      // Preserve existing training permissions until the owner decides otherwise.
      // These public crawl directives do not authenticate bots or bypass CDN/WAF.
      // Repeat API exclusion in each explicit group; robots is not access control.
      ...["*", "Googlebot", "Googlebot-Image", "Bingbot", "YandexBot", "YandexImages", "PerplexityBot", "OAI-SearchBot", "Claude-SearchBot", "GPTBot", "Google-Extended", "ClaudeBot", "CCBot", "Bytespider"].map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
