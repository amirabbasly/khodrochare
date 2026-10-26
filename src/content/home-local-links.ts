import { brandProfiles } from "./brands";
import { neighborhoods } from "./neighborhoods";
import { persianServiceRoutes } from "@/seo/internal-links";
import { seoRegions } from "@/seo/locations";

/** A curated directory of existing canonical pages, not generated keyword variants. */
export const homeLocalLinkGroups = [
  { title: "خدمات در محل و حمل خودرو", links: ["تهران", "کرج"].flatMap(city => persianServiceRoutes.map(route => ({ title: `${route.title} ${city}`, href: `/${city}/${route.slug}` }))) },
  { title: "امداد تخصصی بر اساس برند خودرو", links: ["تهران", "کرج"].flatMap(city => brandProfiles.map(brand => ({ title: `${brand.name} ${city}`, href: `/${city}/brands/${brand.slug}` }))) },
  { title: "مناطق و محله‌های تهران و کرج", links: [
    ...Object.values(seoRegions).map(region => ({ title: `امداد ${region.name}`, href: `/${region.citySlug}/${region.slug}` })),
    ...["تهران", "کرج"].flatMap(city => neighborhoods.filter(area => area.citySlug === city).slice(0, 6).map(area => ({ title: `امداد ${area.name}`, href: `/${area.citySlug}/${area.slug}` }))),
  ] },
] as const;
