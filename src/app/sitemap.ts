import type { MetadataRoute } from "next";
import { blogPosts } from "@/content/blog";
import { services } from "@/content/services";
import { persianServiceRoutes } from "@/seo/internal-links";
import { seoLocations } from "@/seo/locations";

const baseUrl = "https://khodrochare.ir";
const lastModified = new Date("2026-08-27T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/coverage`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/rules`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/app`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/assistant`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];

  const cityPages: MetadataRoute.Sitemap = Object.values(seoLocations).flatMap((location) => [
    { url: `${baseUrl}/${location.slug}`, lastModified, changeFrequency: "weekly" as const, priority: 0.9 },
    ...persianServiceRoutes.map((route) => ({ url: `${baseUrl}/${location.slug}/${route.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
  ]);

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({ url: `${baseUrl}/services/${service.slug}`, lastModified, changeFrequency: "monthly" as const, priority: 0.7 }));
  const postPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.publishedAtIso), changeFrequency: "monthly" as const, priority: 0.7 }));

  return [...pages, ...cityPages, ...servicePages, ...postPages];
}
