import type { MetadataRoute } from "next";
import { northernProvinces, coverageUpdatedAt } from "@/content/coverage";
import { neighborhoods } from "@/content/neighborhoods";
import { brandProfiles } from "@/content/brands";
import { roadProfiles } from "@/content/roads";
import { blogContentUpdatedAtIso, blogPosts } from "@/content/blog";
import { services } from "@/content/services";
import { persianServiceRoutes } from "@/seo/internal-links";
import { seoLocations, seoRegions } from "@/seo/locations";
import { absoluteUrl } from "@/seo/metadata";

/**
 * Persian slugs must be percent-encoded (RFC 3986) inside sitemap.xml, otherwise the
 * URLs do not match the canonical tags Next.js renders and crawlers may treat them
 * as separate (or invalid) locations. `absoluteUrl()` handles the encoding.
 */
const siteUpdatedAt = new Date("2026-09-05T00:00:00.000Z");
const contentUpdatedAt = new Date("2026-09-05T00:00:00.000Z");
const staticPageUpdatedAt = new Date("2026-08-27T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: siteUpdatedAt, changeFrequency: "daily", priority: 1, images: [absoluteUrl("/images/hero-roadside.webp")] },
    { url: absoluteUrl("/services"), lastModified: contentUpdatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/coverage"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: contentUpdatedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/rules"), lastModified: staticPageUpdatedAt, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/app"), lastModified: staticPageUpdatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/assistant"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/pricing"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.8 },
  ];

  const cityPages: MetadataRoute.Sitemap = Object.values(seoLocations).flatMap((location) => [
    {
      url: absoluteUrl(`/${location.slug}`),
      lastModified: siteUpdatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [absoluteUrl("/images/support-technician-night.webp")],
    },
    ...persianServiceRoutes.map((route) => {
      const service = services.find((item) => item.slug === route.serviceSlug);
      return {
        url: absoluteUrl(`/${location.slug}/${route.slug}`),
        lastModified: contentUpdatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        ...(service ? { images: [absoluteUrl(service.image)] } : {}),
      };
    }),
  ]);

  const regionPages: MetadataRoute.Sitemap = Object.values(seoRegions).map((region) => ({
    url: absoluteUrl(`/${region.citySlug}/${region.slug}`),
    lastModified: contentUpdatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [absoluteUrl(region.image)],
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: contentUpdatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [absoluteUrl(service.image)],
  }));

  const postPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAtIso ?? post.publishedAtIso ?? blogContentUpdatedAtIso),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [absoluteUrl(post.image)],
  }));

  const newPages = [
    "/امداد-خودرو", "/امداد-خودرو-آنلاین", "/شمال", "/brands", "/roads", "/editorial-policy", "/privacy",
    ...northernProvinces.map((province) => `/${province.slug}`),
    ...brandProfiles.map((brand) => `/brands/${brand.slug}`),
    ...neighborhoods.map((area) => `/${area.citySlug}/${area.slug}`),
    ...roadProfiles.map((road) => `/roads/${road.slug}`),
  ].map((path) => ({ url: absoluteUrl(path), lastModified: new Date(`${coverageUpdatedAt}T00:00:00.000Z`) }));
  return [...pages, ...cityPages, ...regionPages, ...servicePages, ...postPages, ...newPages];
}
