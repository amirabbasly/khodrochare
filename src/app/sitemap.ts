import { assistanceRegions, regionalBrandPath } from "@/content/assistance-regions";
import { tools, toolsUpdatedAt } from "@/content/tools";
import { growthUpdatedAt, growthUpdatedPaths } from "@/content/growth-updates";
import type { MetadataRoute } from "next";
import { allCities, northernProvinces, coverageUpdatedAt } from "@/content/coverage";
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
const siteUpdatedAt = new Date("2026-09-23T00:00:00.000Z");
const contentUpdatedAt = new Date("2026-09-23T00:00:00.000Z");
const appContentUpdatedAt = new Date("2026-10-20T00:00:00.000Z");
const staticPageUpdatedAt = new Date("2026-08-27T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/battery"), lastModified: appContentUpdatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/"), lastModified: siteUpdatedAt, changeFrequency: "daily", priority: 1, images: [absoluteUrl("/images/hero-roadside.webp")] },
    { url: absoluteUrl("/services"), lastModified: contentUpdatedAt, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/coverage"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: contentUpdatedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/rules"), lastModified: staticPageUpdatedAt, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/app"), lastModified: appContentUpdatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/assistant"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/pricing"), lastModified: siteUpdatedAt, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/partners"), lastModified: new Date("2026-09-23T00:00:00.000Z"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/press"), lastModified: new Date("2026-09-23T00:00:00.000Z"), changeFrequency: "monthly", priority: 0.5 },
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
    "/امداد-خودرو", "/امداد-خودرو-آنلاین", "/شمال", "/brands", "/roads", "/editorial-policy", "/privacy", "/licenses",
    ...northernProvinces.map((province) => `/${province.slug}`),
    ...brandProfiles.map((brand) => `/brands/${brand.slug}`),
    ...neighborhoods.map((area) => `/${area.citySlug}/${area.slug}`),
    ...roadProfiles.map((road) => `/roads/${road.slug}`),
  ].map((path) => ({ url: absoluteUrl(path), lastModified: new Date(`${coverageUpdatedAt}T00:00:00.000Z`) }));
  const toolPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/tools"), lastModified: new Date(toolsUpdatedAt) },
    ...tools.map((tool) => ({ url: absoluteUrl(`/tools/${tool.slug}`), lastModified: new Date(toolsUpdatedAt), images: [absoluteUrl(tool.image)] })),
  ];
  const regionalPages = assistanceRegions.flatMap(region => [
    { url: absoluteUrl(`/${region.slug}/brands`), lastModified: new Date("2026-10-18") },
    ...brandProfiles.map(brand => ({ url: absoluteUrl(regionalBrandPath(region.slug, brand.slug)), lastModified: new Date("2026-10-18") })),
  ]);
  const regionallyUpdatedPaths = new Set([
    "/licenses", ...northernProvinces.map(province => `/${province.slug}`), ...roadProfiles.map(road => `/roads/${road.slug}`), "/شمال", "/brands", ...brandProfiles.map(brand => `/brands/${brand.slug}`), ...allCities.map(city => `/${city.slug}`),
  ]);
  const revised = new Set(["/", "/privacy", "/app", "/about", "/licenses", "/partners", "/امداد-خودرو-آنلاین", ...brandProfiles.map(b => `/brands/${b.slug}`), ...roadProfiles.map(r => `/roads/${r.slug}`), ...assistanceRegions.flatMap(r => brandProfiles.map(b => regionalBrandPath(r.slug,b.slug)))]);
  return [...regionalPages, ...pages, ...cityPages, ...regionPages, ...servicePages, ...postPages, ...newPages, ...toolPages].map((page) =>
    revised.has(decodeURIComponent(new URL(page.url).pathname)) ? { ...page, lastModified: appContentUpdatedAt } : regionallyUpdatedPaths.has(decodeURIComponent(new URL(page.url).pathname)) ? { ...page, lastModified: new Date("2026-10-18") } : growthUpdatedPaths.has(decodeURIComponent(new URL(page.url).pathname)) ? { ...page, lastModified: new Date(growthUpdatedAt) } : page,
  );
}
