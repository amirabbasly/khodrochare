import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tools, toolsUpdatedAt } from "@/content/tools";
import { obdCodes } from "@/content/obd-codes";
import { SubpageShell } from "@/components/site/subpage-shell";
import { AnswerBox, FinalContact, LandingHeader, LandingSchemas, LinkGrid, Questions, Section } from "@/components/seo/landing-ui";
import { EditorialDetails, SourceList } from "@/components/seo/editorial-content";
import { BreakdownGuide, ObdLookup, TransportSelector } from "@/components/tools/tools-workspace";
import { StructuredData } from "@/components/seo/structured-data";
import { seoMetadata, absoluteUrl, siteUrl } from "@/seo/metadata";
export const dynamicParams = false;
export function generateStaticParams() { return tools.map((tool) => ({ slug: tool.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const selected = tools.find((item) => item.slug === slug);
  if (!selected) notFound();
  return seoMetadata({ title: selected.title, description: selected.description, path: `/tools/${selected.slug}`, image: selected.image });
}
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) notFound();
  const path = `/tools/${tool.slug}`;
  return <SubpageShell><LandingSchemas path={path} title={tool.title} description={tool.description} crumbs={[{ name: "ابزارهای امداد خودرو", path: "/tools" }]} /><StructuredData data={{ "@context": "https://schema.org", "@type": "WebApplication", "@id": `${absoluteUrl(path)}#tool`, name: tool.title, description: tool.description, url: absoluteUrl(path), applicationCategory: "UtilitiesApplication", operatingSystem: "Any", browserRequirements: "Requires JavaScript for interactive results", inLanguage: "fa-IR", isAccessibleForFree: true, dateModified: toolsUpdatedAt, provider: { "@id": `${siteUrl}/#organization` } }} /><LandingHeader primaryAction={{ label: "استفاده از ابزار", href: "#tool" }} title={tool.title} intro={tool.description} image={tool.image} crumbs={[{ label: "ابزارهای امداد خودرو", href: "/tools" }, { label: tool.title }]} /><AnswerBox updatedAt={{ iso: toolsUpdatedAt, label: "۱۶ شهریور ۱۴۰۵" }}><p>{tool.summary}</p></AnswerBox><Section id="tool" title="استفاده از ابزار">{tool.slug === "transport-selector" ? <TransportSelector /> : tool.slug === "breakdown-guide" ? <BreakdownGuide /> : <ObdLookup />}<p className="text-xs leading-7">پردازش انتخاب‌ها در همین مرورگر انجام می‌شود؛ نام، شماره همراه یا نشانی دقیق لازم نیست. خروجی نه سفارش است و نه تأیید ایمنی خودرو.</p></Section>{tool.sections.map((section) => <Section key={section.title} title={section.title}><p>{section.body}</p><EditorialDetails section={section} /></Section>)}{tool.slug === "obd-code" && <Section title="فهرست ۱۲ کد عمومی در این ابزار"><p>شرح‌ها حتی بدون اجرای ابزار قابل خواندن‌اند. این فهرست کاملِ کدهای همه خودروها نیست و هیچ قطعه‌ای را صرفاً بر اساس شماره خطا معیوب اعلام نمی‌کند.</p><div className="divide-y divide-slate-200">{obdCodes.map((entry) => <details key={entry.code} id={`code-${entry.code.toLowerCase()}`} className="scroll-mt-24 py-4"><summary className="cursor-pointer font-black text-ink"><bdi>{entry.code}</bdi> — {entry.title}</summary><p className="mt-3">{entry.meaning}</p><p className="mt-2">{entry.notProof}</p><p className="mt-2">{entry.ask}</p><a href={entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center font-bold text-brand-orange underline">منبع تعریف {entry.code}</a></details>)}</div></Section>}<Questions items={tool.faqs} /><Section title="ابزار و راهنمای مرتبط"><LinkGrid links={[...tool.links, { title: "همه ابزارهای امداد خودرو", href: "/tools" }]} /><SourceList sources={tool.sources} /></Section><FinalContact /></SubpageShell>;
}
