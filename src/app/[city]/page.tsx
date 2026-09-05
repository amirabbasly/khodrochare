import type { Metadata } from "next";
import { decodeRouteParam } from "@/seo/route-params";
import RoadsideGuide, { metadata as guideMetadata } from "@/components/pages/roadside-guide-page";
import OnlineAssistance, { metadata as onlineMetadata } from "@/components/pages/online-assistance-page";
import NorthCoverage, { metadata as northMetadata } from "@/components/pages/north-coverage-page";
// Next 16's static segment encoding cannot prerender literal non-Latin route folders.
// Use the existing parameterized route; the public Persian URLs remain unchanged.
const guides = {
  "امداد-خودرو": { Page: RoadsideGuide, metadata: guideMetadata },
  "امداد-خودرو-آنلاین": { Page: OnlineAssistance, metadata: onlineMetadata },
  "شمال": { Page: NorthCoverage, metadata: northMetadata },
} as const;
const findGuide = (slug: string) => guides[slug as keyof typeof guides];
import { notFound } from "next/navigation";
import { allCities, findCity, findProvince, northernProvinces } from "@/content/coverage";
import { CityLanding, ProvinceLanding } from "@/components/seo/location-landings";
import { seoMetadata } from "@/seo/metadata";
export const dynamicParams = false;
export function generateStaticParams() { return [...allCities, ...northernProvinces, ...Object.keys(guides).map((slug) => ({ slug }))].map((item) => ({ city: item.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const slug = decodeRouteParam((await params).city); const guide = findGuide(slug); if (guide) return guide.metadata; const city = findCity(slug); const province = findProvince(slug);
  if (city) return seoMetadata({ title: `امداد خودرو ${city.name} | هماهنگی آنلاین و شبانه‌روزی`, description: city.description, path: `/${city.slug}`, image: "/images/support-technician-night.webp" });
  if (province) return seoMetadata({ title: `امداد خودرو ${province.name} | یدک‌کش و خدمات در محل`, description: `امداد خودرو آنلاین ${province.name}؛ شهرهای تحت پوشش، خدمات در محل و حمل خودرو، شرایط مسیر، عوامل هزینه و تماس برای هماهنگی شبانه‌روزی.`, path: `/${province.slug}` });
  notFound();
}
export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const slug = decodeRouteParam((await params).city); const guide = findGuide(slug); if (guide) return <guide.Page />; const city = findCity(slug); if (city) return <CityLanding location={city} />;
  const province = findProvince(slug); if (province) return <ProvinceLanding province={province} />; notFound();
}
