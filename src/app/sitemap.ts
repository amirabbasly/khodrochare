import type { MetadataRoute } from "next";
import { blogContentUpdatedAtIso, blogPosts } from "@/content/blog";
import { services } from "@/content/services";
import { persianServiceRoutes } from "@/seo/internal-links";
import { seoLocations, seoRegions } from "@/seo/locations";

const baseUrl = "https://khodrochare.ir";
const siteUpdatedAt = new Date("2026-09-01T00:00:00.000Z");
const contentUpdatedAt = new Date("2026-08-28T00:00:00.000Z");
const staticPageUpdatedAt = new Date("2026-08-27T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: siteUpdatedAt, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: contentUpdatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/coverage`, lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: contentUpdatedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/rules`, lastModified: staticPageUpdatedAt, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/app`, lastModified: staticPageUpdatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/assistant`, lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/pricing`, lastModified: staticPageUpdatedAt, changeFrequency: "monthly", priority: 0.8 },
  ];

  const cityPages: MetadataRoute.Sitemap = Object.values(seoLocations).flatMap((location) => [
    { url: `${baseUrl}/${location.slug}`, lastModified: siteUpdatedAt, changeFrequency: "weekly" as const, priority: 0.9 },
    ...persianServiceRoutes.map((route) => ({ url: `${baseUrl}/${location.slug}/${route.slug}`, lastModified: contentUpdatedAt, changeFrequency: "monthly" as const, priority: 0.8 })),
  ]);
  const regionPages: MetadataRoute.Sitemap = Object.values(seoRegions).map((region) => ({ url: `${baseUrl}/${region.citySlug}/${region.slug}`, lastModified: contentUpdatedAt, changeFrequency: "monthly" as const, priority: 0.8 }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({ url: `${baseUrl}/services/${service.slug}`, lastModified: contentUpdatedAt, changeFrequency: "monthly" as const, priority: 0.7 }));
  const postPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.updatedAtIso ?? blogContentUpdatedAtIso), changeFrequency: "monthly" as const, priority: 0.7 }));

  return [...pages, ...cityPages, ...regionPages, ...servicePages, ...postPages];
}
