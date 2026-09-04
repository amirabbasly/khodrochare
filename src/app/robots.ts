import type { MetadataRoute } from "next";
import { siteUrl } from "@/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // API routes hold no indexable content; the rest of the site is fully crawlable.
        disallow: ["/api/"],
      },
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Googlebot-Image", allow: ["/images/", "/icons/", "/_next/image"] },
      { userAgent: "Bingbot", allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
