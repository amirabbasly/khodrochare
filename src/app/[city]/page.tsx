import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExpandedCityLanding } from "@/components/seo/regional-landing-pages";
import { UpcomingCityLanding } from "@/components/seo/neighborhood-pages";
import { seoLocations, seoUpcomingCities } from "@/seo/locations";
import { seoMetadata } from "@/seo/metadata";

export function generateStaticParams() { return [...Object.values(seoLocations), ...Object.values(seoUpcomingCities)].map((location) => ({ city: location.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const city = decodeURIComponent((await params).city);
  const location = Object.values(seoLocations).find((item) => item.slug === city);
  if (location) {
    return seoMetadata({ title: `امداد خودرو ${location.name} شبانه‌روزی | درخواست آنلاین`, description: `ثبت آنلاین امداد خودرو ${location.name} برای یدک‌کش، خودروبر، مکانیک سیار، باتری و امداد در محل؛ مناطق پوشش، زمان اعزام و عوامل هزینه.`, path: `/${location.slug}`, keywords: location.keywords, image: "/images/support-technician-night.webp", imageAlt: `امداد خودرو ${location.name}` });
  }
  const upcoming = Object.values(seoUpcomingCities).find((item) => item.slug === city);
  if (upcoming) {
    return seoMetadata({
      title: `امداد خودرو ${upcoming.name} | به‌زودی در خدمت`,
      description: upcoming.metaDescription,
      path: `/${upcoming.slug}`,
      keywords: [`امداد خودرو ${upcoming.name}`, `یدک کش ${upcoming.name}`, `مکانیک سیار ${upcoming.name}`, "امداد خودرو آنلاین"],
    });
  }
  return {};
}

export default async function CityPage({ params }: { params: Promise<{ city: string }> }) {
  const city = decodeURIComponent((await params).city);
  const location = Object.values(seoLocations).find((item) => item.slug === city);
  if (location) return <ExpandedCityLanding location={location} />;
  const upcoming = Object.values(seoUpcomingCities).find((item) => item.slug === city);
  if (upcoming) return <UpcomingCityLanding city={upcoming} />;
  notFound();
}
