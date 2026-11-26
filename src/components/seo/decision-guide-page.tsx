import Link from "next/link";
import { SubpageShell } from "@/components/site/subpage-shell";
import { LandingHeader, LandingSchemas, LinkGrid, Questions, Section } from "./landing-ui";
import { StructuredData } from "./structured-data";
import { siteUrl } from "@/seo/metadata";
import { providerGuide, invoiceGuide, type DecisionGuide } from "@/content/roadside-decision-guides";

export function DecisionGuidePage({ guide, article = false }: { guide: DecisionGuide; article?: boolean }) {
  return <SubpageShell showGeneralFaq={false}>
    <LandingSchemas path={guide.path} title={guide.title} description={guide.description} crumbs={[{ name: "مجله خودرو چاره", path: "/blog" }]} />
    {article && <StructuredData data={{ "@context": "https://schema.org", "@type": "Article", "@id": `${siteUrl}${guide.path}#article`, headline: guide.title, description: guide.description, inLanguage: "fa-IR", mainEntityOfPage: { "@id": `${siteUrl}${guide.path}#webpage` }, author: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` }, image: `${siteUrl}/images/og-cover.jpg` }} />}
    <LandingHeader title={guide.title} intro={guide.description} crumbs={[{ label: "مجله", href: "/blog" }, { label: guide.title }]} primaryAction={{ label: "امداد خودرو آنلاین", href: "/امداد-خودرو-آنلاین" }} />
    {guide.sections.map(section => <Section key={section.title} title={section.title}><p>{section.body}</p>{section.bullets && <ul className="list-inside list-disc space-y-2">{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</Section>)}
    <Questions items={guide.faqs} />
    <Section title="خدمات و راهنماهای مرتبط"><LinkGrid links={[
      { title: "انتخاب خدمت و امداد خودرو آنلاین", href: "/امداد-خودرو-آنلاین" },
      { title: "نصب اپلیکیشن امداد خودرو", href: "/app" },
      { title: "هزینه خدمات و نرخ‌نامه حمل", href: "/pricing" },
      { title: "یدک‌کش و حمل خودرو", href: "/services/tow-truck" },
      { title: guide.path === providerGuide.path ? invoiceGuide.title : providerGuide.title, href: guide.path === providerGuide.path ? invoiceGuide.path : providerGuide.path },
      { title: "هویت مجموعه و مجوزها", href: "/licenses" },
    ]} /><p>راهنمای عملی خودرو چاره برای استفاده آگاهانه از خدمات؛ شرایط هر خدمت از توافق و اسناد همان خدمت مشخص می‌شود. برای هماهنگی یا پیگیری، <Link href="/contact" className="font-bold text-brand-orange underline">با پشتیبانی خودرو چاره در ارتباط باشید</Link>.</p></Section>
  </SubpageShell>;
}
