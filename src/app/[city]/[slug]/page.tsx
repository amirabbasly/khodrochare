import type { Metadata } from "next";
import { decodeRouteParam } from "@/seo/route-params";
import { notFound } from "next/navigation";
import { allCities, findCity } from "@/content/coverage";
import { findNeighborhood, neighborhoods } from "@/content/neighborhoods";
import { CityServiceLanding, NeighborhoodLanding } from "@/components/seo/location-landings";
import { ExpandedRegionLanding } from "@/components/seo/regional-landing-pages";
import { persianServiceRoutes } from "@/seo/internal-links";
import { seoRegions } from "@/seo/locations";
import { seoMetadata } from "@/seo/metadata";
import { getService } from "@/content/services";
export const dynamicParams = false;
export function generateStaticParams() {
  return [...allCities.flatMap((city) => persianServiceRoutes.map((route) => ({ city: city.slug, slug: route.slug }))), ...Object.values(seoRegions).map((region) => ({ city: region.citySlug, slug: region.slug })), ...neighborhoods.map((area) => ({ city: area.citySlug, slug: area.slug }))];
}
function resolve(citySlug: string, slug: string) {
  const city = findCity(citySlug); if (!city) notFound();
  const route = persianServiceRoutes.find((item) => item.slug === slug);
  const region = Object.values(seoRegions).find((item) => item.slug === slug && item.citySlug === citySlug);
  const neighborhood = findNeighborhood(citySlug, slug);
  if (!route && !region && !neighborhood) notFound();
  return { city, route, region, neighborhood };
}
export async function generateMetadata({ params }: { params: Promise<{ city: string; slug: string }> }): Promise<Metadata> {
  const raw = await params; const citySlug = decodeRouteParam(raw.city); const slug = decodeRouteParam(raw.slug); const { city, route, region, neighborhood } = resolve(citySlug, slug); const path = `/${citySlug}/${slug}`;
  if (route) { const service = getService(route.serviceSlug)!; return seoMetadata({ title: `${route.title} ${city.name} | هزینه و هماهنگی`, description: `${route.title} در ${city.name}؛ اطلاعات لازم برای اعزام، شرایط دسترسی، محدودیت‌های ایمنی و عوامل هزینه با هماهنگی خودرو چاره.`, path, image: service.image }); }
  if (region) return seoMetadata({ title: `امداد خودرو ${region.name} | خدمات و محله‌ها`, description: region.metaDescription, path, image: region.image });
  return seoMetadata({ title: `امداد خودرو ${neighborhood!.name} | یدک‌کش و مکانیک سیار`, description: `امداد خودرو ${neighborhood!.name}؛ راهنمای دسترسی به ${neighborhood!.landmarks.slice(0, 2).join(" و ")}، تعمیر در محل، حمل خودرو و اعلام هزینه پیش از خدمت.`, path });
}
export default async function Page({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const raw = await params; const citySlug = decodeRouteParam(raw.city); const slug = decodeRouteParam(raw.slug); const { city, route, region, neighborhood } = resolve(citySlug, slug);
  if (route) return <CityServiceLanding location={city} route={route} />;
  if (region) return <ExpandedRegionLanding location={city} region={region} />;
  return <NeighborhoodLanding city={city} area={neighborhood!} />;
}
