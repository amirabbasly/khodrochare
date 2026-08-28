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
  if (route) {
    const titles: Record<string, string> = {
      "پنچرگیری-سیار": `پنچرگیری سیار ${location.name} و تعویض لاستیک در محل`,
      "دیاگ-سیار": `دیاگ سیار ${location.name} | عیب‌یابی خودرو در محل`,
      "کارواش-سیار": `کارواش سیار ${location.name} | شست‌وشوی خودرو در محل`,
      "امداد-خودرو": `امداد خودرو آنلاین ${location.name} | اعزام شبانه‌روزی`,
    };
    const descriptions: Record<string, string> = {
      "پنچرگیری-سیار": `درخواست پنچرگیری سیار و تعویض لاستیک در محل ${location.name}؛ هماهنگی شبانه‌روزی، بررسی موقعیت، زمان تقریبی اعزام و عوامل مؤثر بر هزینه.`,
      "دیاگ-سیار": `ثبت درخواست دیاگ سیار ${location.name} برای بررسی چراغ چک، خطاهای ECU و عیب‌یابی اولیه خودرو در محل با هماهنگی شبانه‌روزی.`,
      "کارواش-سیار": `درخواست کارواش سیار ${location.name} برای شست‌وشوی خودرو در محل؛ معرفی خدمات، شرایط محل، عوامل هزینه و نحوه هماهنگی آنلاین.`,
      "یدک-کش": `درخواست یدک کش و حمل خودرو در ${location.name}؛ انتخاب وسیله متناسب، زمان اعزام، عوامل هزینه و هماهنگی آنلاین خودرو چاره.`,
    };
    return seoMetadata({ title: titles[route.slug] ?? `${route.title} ${location.name} | درخواست آنلاین`, description: descriptions[route.slug] ?? `${route.title} در ${location.name} با ثبت درخواست آنلاین خودرو چاره؛ شرح خدمات، مناطق پوشش، زمان اعزام، عوامل مؤثر بر قیمت و پاسخ پرسش‌های رایج.`, path: `/${city}/${slug}`, keywords: [`${route.title} ${location.name}`, `امداد خودرو آنلاین ${location.name}`, `${route.title} در محل`] });
  }
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
