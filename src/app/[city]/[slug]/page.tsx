import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityServiceLanding, RegionLanding } from "@/components/seo/city-pages";
import { persianServiceRoutes } from "@/seo/internal-links";
import { seoLocations, seoRegions } from "@/seo/locations";
import { seoMetadata } from "@/seo/metadata";

const paramsList = [...Object.values(seoLocations).flatMap((location) => persianServiceRoutes.map((route) => ({ city: location.slug, slug: route.slug }))), ...Object.values(seoRegions).map((region) => ({ city: region.citySlug, slug: region.slug }))];
export function generateStaticParams() { return paramsList; }

export async function generateMetadata({ params }: { params: Promise<{ city: string; slug: string }> }): Promise<Metadata> {
  const rawParams = await params;
  const city = decodeURIComponent(rawParams.city);
  const slug = decodeURIComponent(rawParams.slug);
  const location = Object.values(seoLocations).find((item) => item.slug === city);
  const route = persianServiceRoutes.find((item) => item.slug === slug);
  const region = Object.values(seoRegions).find((item) => item.slug === slug);
  if (!location) return {};
  if (route) return seoMetadata({ title: `${route.title} ${location.name} | اعزام آنلاین`, description: `${route.title} در ${location.name}. شرح خدمت، شرایط هماهنگی و ثبت درخواست آنلاین خودرو چاره.`, path: `/${city}/${slug}` });
  if (region) return seoMetadata({ title: `${region.name} | امداد خودرو ${location.name}`, description: region.description, path: `/${city}/${slug}`, noindex: true });
  return {};
}

export default async function CitySlugPage({ params }: { params: Promise<{ city: string; slug: string }> }) {
  const rawParams = await params;
  const city = decodeURIComponent(rawParams.city);
  const slug = decodeURIComponent(rawParams.slug);
  const location = Object.values(seoLocations).find((item) => item.slug === city);
  const route = persianServiceRoutes.find((item) => item.slug === slug);
  const region = Object.values(seoRegions).find((item) => item.slug === slug);
  if (!location) notFound();
  if (route) return <CityServiceLanding location={location} route={route} />;
  if (region) return <RegionLanding location={location} region={region} />;
  notFound();
}
