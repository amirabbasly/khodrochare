import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityServiceLanding } from "@/components/seo/city-pages";
import { ExpandedRegionLanding } from "@/components/seo/regional-landing-pages";
import { persianServiceRoutes } from "@/seo/internal-links";
import { seoLocations, seoRegions } from "@/seo/locations";
import { seoMetadata } from "@/seo/metadata";
import { getService } from "@/content/services";

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
    const service = getService(route.serviceSlug);
    return seoMetadata({
      title: titles[route.slug] ?? `${route.title} ${location.name} | درخواست آنلاین`,
      description: descriptions[route.slug] ?? `${route.title} در ${location.name} با ثبت درخواست آنلاین خودرو چاره؛ شرح خدمات، مناطق پوشش، زمان اعزام و عوامل مؤثر بر قیمت.`,
      path: `/${city}/${slug}`,
      keywords: [`${route.title} ${location.name}`, `امداد خودرو آنلاین ${location.name}`, `${route.title} در محل`],
      ...(service ? { image: service.image, imageAlt: `${route.title} در ${location.name}` } : {}),
    });
  }
  if (region) return seoMetadata({ title: `امداد خودرو ${region.name} شبانه‌روزی | درخواست آنلاین`, description: region.metaDescription, path: `/${city}/${slug}`, keywords: [`امداد خودرو ${region.name}`, `یدک کش ${region.name}`, `مکانیک سیار ${region.name}`], image: region.image, imageAlt: `امداد خودرو ${region.name}` });
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
  if (region) return <ExpandedRegionLanding location={location} region={region} />;
  notFound();
}
