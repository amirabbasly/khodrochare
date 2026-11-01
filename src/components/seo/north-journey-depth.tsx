import { northJourneyDepth } from "@/content/north-journey-depth";
import { findCity } from "@/content/coverage";
import { LinkGrid, Section } from "./landing-ui";
export function NorthJourneyDepth({ slug }: { slug: string }) {
  const detail = northJourneyDepth[slug];
  if (!detail) return null;
  return <Section title={detail.title}><p>{detail.body}</p><LinkGrid links={[
    ...detail.next.map(city => ({ title: `راهنمای امداد ${findCity(city)?.name ?? city}`, href: `/${city}` })),
    { title: "روشن‌نشدن خودرو در ویلای شمال", href: "/blog/north-villa-no-start-decision" },
    { title: "حمل از شمال به تهران؛ توافق و تحویل", href: "/blog/north-car-carrier-handover" },
    { title: "مجوزها و روش بررسی هویت خدمت‌دهنده", href: "/licenses" },
  ]} /></Section>;
}
