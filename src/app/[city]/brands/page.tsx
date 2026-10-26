import { notFound } from "next/navigation";
import { assistanceRegions, findAssistanceRegion, regionalBrandPath } from "@/content/assistance-regions";
import { brandProfiles } from "@/content/brands";
import { decodeRouteParam } from "@/seo/route-params";
import { seoMetadata } from "@/seo/metadata";
import { SubpageShell } from "@/components/site/subpage-shell";
import { FinalContact, LandingHeader, LandingSchemas, LinkGrid, Section } from "@/components/seo/landing-ui";
export const dynamicParams = false;
export function generateStaticParams() { return assistanceRegions.map(region => ({ city: region.slug })); }
async function resolve(params: Promise<{ city: string }>) { const region = findAssistanceRegion(decodeRouteParam((await params).city)); if (!region) notFound(); return region; }
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) { const region = await resolve(params); return seoMetadata({ title: `امداد خودرو برندهای ایرانی و خارجی ${region.name}`, description: region.intro, path: `/${region.slug}/brands` }); }
export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const region = await resolve(params); const title = `امداد خودرو برندها در ${region.name}`;
  return <SubpageShell><LandingSchemas path={`/${region.slug}/brands`} title={title} description={region.intro} collection crumbs={[{ name: region.name, path: `/${region.slug}` }]} /><LandingHeader title={title} intro={region.intro} crumbs={[{ label: region.name, href: `/${region.slug}` }, { label: "برندهای خودرو" }]} /><Section title="برند خودرو را انتخاب کنید"><p>راهنمای هر برند شامل عیب‌یابی، باتری، روش حمل و شرایط دسترسی همین منطقه است. خدمات مستقل است و قطعه یا ابزار اختصاصی پیش از اعزام تأیید می‌شود.</p><LinkGrid links={brandProfiles.map(brand => ({ title: `امداد خودرو ${brand.name} ${region.name}`, href: regionalBrandPath(region.slug, brand.slug), description: brand.models.join("، ") }))} /></Section><Section title="دسترسی و مقصد حمل"><p>{region.access}</p><p>{region.handover}</p><LinkGrid links={[...region.links, ...region.roads]} /></Section><FinalContact /></SubpageShell>;
}
