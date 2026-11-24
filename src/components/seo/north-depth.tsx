import { NorthJourneyDepth } from "./north-journey-depth";
import { northCityDepth } from "@/content/north-depth";
import { northRoadDepth } from "@/content/north-roads";
import { northCityServiceDepth } from "@/content/north-cityservice";
import { northProvinceDepth } from "@/content/north-provinces";
import type { LandingFaq } from "@/content/landing-expansion-cities";
import { LinkGrid, Section, type ContentLink } from "./landing-ui";

export function northDepthFaqs(slug: string): LandingFaq[] {
  return northCityDepth[slug]?.faqs ?? [];
}

export function NorthDepthSections({ slug }: { slug: string }) {
  const depth = northCityDepth[slug];
  if (!depth) return null;
  return (
    <>
      {depth.sections.map((item) => (
        <Section key={item.title} title={item.title}>
          <p>{item.body}</p>
          {(item.bullets ?? []).length > 0 && (
            <ul className="grid list-inside list-disc gap-2">
              {(item.bullets ?? []).map((bullet) => (
                <li key={bullet.slice(0, 24)}>{bullet}</li>
              ))}
            </ul>
          )}
        </Section>
      ))}
      <NorthJourneyDepth slug={slug} />
    </>
  );
}

export function NorthDepthLinkGrid({ slug, cityName }: { slug: string; cityName: string }) {
  const depth = northCityDepth[slug];
  if (!depth) return null;
  const links: ContentLink[] = [
    ...depth.neighbors.map((item) => ({ title: `امداد خودرو ${item.name}`, href: `/${item.slug}` })),
    ...depth.roads.map((item) => ({ title: `امداد خودرو ${item.name}`, href: `/roads/${item.slug}` })),
    ...depth.guides.map((item) => ({ title: item.name, href: `/blog/${item.slug}` })),
  ];
  if (links.length === 0) return null;
  return (
    <Section title={`شهرهای همسایه، محورها و راهنماهای مرتبط با ${cityName}`}>
      <LinkGrid links={links} label={`پیوندهای مرتبط ${cityName}`} />
    </Section>
  );
}

export function northProvinceDepthFaqs(slug: string): LandingFaq[] {
  return northProvinceDepth[slug]?.faqs ?? [];
}

export function NorthProvinceDepthSections({ slug }: { slug: string }) {
  const depth = northProvinceDepth[slug];
  if (!depth) return null;
  return (
    <>
      {depth.sections.map((item) => (
        <Section key={item.title} title={item.title}>
          <p>{item.body}</p>
          {(item.bullets ?? []).length > 0 && (
            <ul className="grid list-inside list-disc gap-2">
              {(item.bullets ?? []).map((bullet) => (
                <li key={bullet.slice(0, 24)}>{bullet}</li>
              ))}
            </ul>
          )}
        </Section>
      ))}
      <NorthJourneyDepth slug={slug} />
    </>
  );
}

export function northRoadDepthFaqs(slug: string): LandingFaq[] {
  return northRoadDepth[slug]?.faqs ?? [];
}

export function NorthRoadDepthSections({ slug }: { slug: string }) {
  const depth = northRoadDepth[slug];
  if (!depth) return null;
  return (
    <>
      {depth.sections.map((item) => (
        <Section key={item.title} title={item.title}>
          <p>{item.body}</p>
        </Section>
      ))}
    </>
  );
}

export function northCityServiceDepthFaqs(path: string): LandingFaq[] {
  return northCityServiceDepth[path]?.faqs ?? [];
}

export function NorthCityServiceDepthSections({ path }: { path: string }) {
  const depth = northCityServiceDepth[path];
  if (!depth) return null;
  return (
    <>
      {depth.sections.map((item) => (
        <Section key={item.title} title={item.title}>
          <p>{item.body}</p>
        </Section>
      ))}
    </>
  );
}
