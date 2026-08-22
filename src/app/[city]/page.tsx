import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityLanding } from "@/components/seo/city-pages";
import { seoLocations } from "@/seo/locations";
import { seoMetadata } from "@/seo/metadata";
import { StructuredData } from "@/components/seo/structured-data";
import { serviceSchema } from "@/seo/schemas";

export function generateStaticParams() { return Object.values(seoLocations).map((location) => ({ city: location.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const location = seoLocations[(await params).city as keyof typeof seoLocations];
  if (!location) return {};
  return seoMetadata({ title: `امداد خودرو ${location.name} شبانه‌روزی | درخواست آنلاین خودرو چاره`, description: `ثبت آنلاین امداد خودرو ${location.name} برای یدک‌کش، خودروبر، مکانیک سیار، باتری و امداد در محل؛ بررسی موقعیت، اعلام عوامل هزینه و هماهنگی اعزام.`, path: `/${location.slug}`, keywords: location.keywords });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) { const location = seoLocations[(await params).city as keyof typeof seoLocations]; if (!location) notFound(); return <><StructuredData data={serviceSchema({ name: `امداد خودرو ${location.name}`, description: location.description, path: `/${location.slug}`, area: location.name })} /><CityLanding location={location} /></>; }
