import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityLanding } from "@/components/seo/city-pages";
import { seoLocations } from "@/seo/locations";
import { seoMetadata } from "@/seo/metadata";

export function generateStaticParams() { return Object.values(seoLocations).map((location) => ({ city: location.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const location = seoLocations[(await params).city as keyof typeof seoLocations];
  if (!location) return {};
  return seoMetadata({ title: `امداد خودرو ${location.name} | امداد خودرو آنلاین`, description: `${location.description} ثبت درخواست آنلاین امداد خودرو در ${location.name}.`, path: `/${location.slug}`, keywords: location.keywords });
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) { const location = seoLocations[(await params).city as keyof typeof seoLocations]; if (!location) notFound(); return <CityLanding location={location} />; }
