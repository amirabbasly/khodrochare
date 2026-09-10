import type { MetadataRoute } from "next";
import { siteUrl } from "@/seo/metadata";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Search access and training access are independent. Repeat API exclusion in
      // explicit groups, because robots.txt groups do not inherit the wildcard.
      ...["*", "Googlebot", "Googlebot-Image", "Bingbot", "OAI-SearchBot", "Claude-SearchBot"].map((userAgent) => ({ userAgent, allow: "/", disallow: ["/api/"] })),
      { userAgent: ["GPTBot", "Google-Extended", "ClaudeBot", "CCBot", "Bytespider"], disallow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
