import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";
import { getService, services } from "@/content/services";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { persianServiceRoutes } from "@/seo/internal-links";

const relatedArticles: Record<string, { title: string; slug: string }[]> = {
  "roadside-assistance": [{ title: "امداد خودرو آنلاین چگونه کار می‌کند؟", slug: "online-roadside-assistance-request-guide" }, { title: "وقتی خودرو در بزرگراه خاموش می‌شود چه کنیم؟", slug: "what-to-do-when-car-stops-on-highway" }, { title: "مناطق تحت پوشش امداد خودرو تهران و کرج", slug: "car-assistance-coverage-tehran-karaj" }],
  "tow-truck": [{ title: "یدک‌کش خودرو اتوماتیک و حمل با کفی", slug: "automatic-car-towing-guide" }, { title: "راهنمای یدک‌کشی ایمن", slug: "safe-towing-guide" }, { title: "هزینه حمل خودرو با یدک‌کش در تهران و کرج", slug: "car-tow-truck-price-guide" }],
  "flatbed-carrier": [{ title: "یدک‌کش خودرو اتوماتیک و حمل با کفی", slug: "automatic-car-towing-guide" }, { title: "هزینه حمل خودرو با یدک‌کش و خودروبر", slug: "car-tow-truck-price-guide" }, { title: "راهنمای یدک‌کشی ایمن", slug: "safe-towing-guide" }],
  "mobile-mechanic": [{ title: "مکانیک سیار چه تعمیراتی در محل انجام می‌دهد؟", slug: "mobile-mechanic-repairs-at-location" }, { title: "جوش آوردن خودرو در مسیر", slug: "car-overheating-roadside-guide" }, { title: "چک‌لیست انتخاب مکانیک سیار", slug: "mobile-mechanic-checklist" }],
  "battery-replacement": [{ title: "نشانه‌های خرابی باتری خودرو", slug: "car-battery-warning-signs" }, { title: "باتری خودرو در محل تهران و کرج", slug: "mobile-battery-replacement-tehran-karaj" }],
  "jump-start": [{ title: "نشانه‌های خرابی باتری خودرو", slug: "car-battery-warning-signs" }],
  "mobile-carwash": [{ title: "راهنمای انتخاب کارواش سیار", slug: "mobile-carwash-guide" }],
  "flat-tire": [{ title: "راهنمای پنچری و امداد کنار جاده", slug: "flat-tire-roadside-assistance" }],
  "mobile-diagnostics": [{ title: "چراغ چک روشن شده؛ چه زمانی به دیاگ سیار نیاز داریم؟", slug: "mobile-diagnostics-check-engine-guide" }],
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const titleOverrides: Record<string, string> = { "tow-truck": "یدک کش تهران و کرج", "flatbed-carrier": "خودروبر تهران و کرج", "mobile-mechanic": "مکانیک سیار تهران و کرج", "flat-tire": "پنچرگیری سیار و تعویض لاستیک در محل تهران و کرج", "mobile-diagnostics": "دیاگ سیار تهران و کرج | عیب‌یابی خودرو در محل", "mobile-carwash": "کارواش سیار تهران و کرج | شست‌وشوی خودرو در محل" };
  const seoTitle = titleOverrides[service.slug] ?? service.title;
  return seoMetadata({ title: seoTitle, description: `${service.summary} پوشش تهران و کرج، عوامل مؤثر بر قیمت، زمان اعزام و ثبت درخواست آنلاین.`, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const articles = relatedArticles[service.slug] ?? [{ title: "مناطق تحت پوشش امداد خودرو تهران و کرج", slug: "car-assistance-coverage-tehran-karaj" }];
  const cityRoute = persianServiceRoutes.find((route) => route.serviceSlug === service.slug);
  return (
    <SubpageShell>
      <StructuredData data={serviceSchema({ name: service.title, description: service.description, path: `/services/${service.slug}`, area: "تهران و کرج" })} />
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "خدمات", path: "/services" }, { name: service.title }])} />
      <StructuredData data={faqSchema(service.faqs)} />
      <section className="relative overflow-hidden bg-[#071a2e] text-white">
        <div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(circle at 12% 20%,${service.accent},transparent 28%)` }} />
        <div className="site-container relative grid items-center gap-10 py-12 lg:grid-cols-[.9fr_1.1fr] lg:py-20" dir="ltr">
          <div className="relative min-h-72 overflow-hidden rounded-[1.8rem] border border-white/15 shadow-2xl lg:min-h-[460px]"><Image src={service.image} alt={service.title} fill priority sizes="(min-width:1024px) 48vw,100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-white/15 bg-black/35 p-4 text-xs backdrop-blur-md"><span>زمان تقریبی اعزام</span><strong className="text-orange-300">{service.eta}</strong></div></div>
          <div className="text-right" dir="rtl"><SeoBreadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: "خدمات", href: "/services" }, { label: service.title }]} /><p className="mt-6 text-xs font-black text-slate-300">{service.eyebrow}</p><h1 className="mt-3 text-3xl font-black leading-[1.5] md:text-5xl">{{ "tow-truck": "یدک کش تهران و کرج", "flatbed-carrier": "خودروبر تهران و کرج", "mobile-mechanic": "مکانیک سیار تهران و کرج", "flat-tire": "پنچرگیری سیار و تعویض لاستیک در محل تهران و کرج", "mobile-diagnostics": "دیاگ سیار تهران و کرج", "mobile-carwash": "کارواش سیار تهران و کرج" }[service.slug] ?? service.title}</h1><p className="mt-5 max-w-xl text-sm leading-8 text-slate-300">{service.description}</p><div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-4 text-xs leading-7 text-slate-200"><strong className="text-white">مبنای هزینه: </strong>{service.priceNote}</div><div className="mt-6 flex flex-wrap gap-3"><Link href="/#request" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-orange px-6 text-sm font-black shadow-orange"><Icon name="form" size={18}/> ثبت درخواست</Link><a href="tel:09123022064" className="inline-flex min-h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-black" dir="ltr">09123022064</a></div></div>
        </div>
      </section>
      <section className="site-container mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]" dir="ltr">
        <article className="rounded-2xl bg-white p-6 shadow-card md:p-8" dir="rtl"><h2 className="text-2xl font-black">این خدمت شامل چیست؟</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{service.features.map((feature) => <div key={feature} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-bold"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Icon name="check" size={16}/></span>{feature}</div>)}</div><h2 className="mt-9 text-2xl font-black">مناسب چه موقعیت‌هایی است؟</h2><div className="mt-5 flex flex-wrap gap-2">{service.suitableFor.map((item) => <span key={item} className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600">{item}</span>)}</div></article>
        <aside className="rounded-2xl bg-ink p-6 text-white shadow-card" dir="rtl"><p className="text-xs font-black text-orange-300">فرآیند انجام خدمت</p><div className="mt-6 space-y-6">{service.process.map((step,index) => <div key={step.title} className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-sm font-black text-orange-300">{(index+1).toLocaleString("fa-IR")}</span><div><h3 className="font-black">{step.title}</h3><p className="mt-2 text-xs leading-6 text-slate-300">{step.body}</p></div></div>)}</div></aside>
      </section>
      <section className="site-container mt-8 rounded-2xl bg-white p-6 shadow-card md:p-8"><h2 className="text-2xl font-black">پرسش‌های متداول</h2><div className="mt-6 divide-y divide-slate-100">{service.faqs.map((faq) => <details key={faq.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black"><span>{faq.question}</span><span className="text-xl text-brand-orange transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-4xl text-sm leading-8 text-slate-600">{faq.answer}</p></details>)}</div></section>
      <section className="site-container mt-8 grid gap-5 lg:grid-cols-2" dir="rtl"><article className="rounded-2xl bg-white p-6 shadow-card md:p-8"><h2 className="text-2xl font-black">مناطق پوشش و زمان اعزام</h2><p className="mt-4 text-sm leading-8 text-slate-600">این خدمت در تهران و کرج و محدوده‌های قابل هماهنگی ارائه می‌شود. زمان اعزام ثابت نیست و به لوکیشن، ترافیک، ساعت درخواست، نوع خودرو و فاصله نزدیک‌ترین متخصص بستگی دارد؛ زمان تقریبی پس از بررسی موقعیت اعلام می‌شود.</p><div className="mt-5 flex flex-wrap gap-3">{cityRoute ? <><Link href={`/تهران/${cityRoute.slug}`} className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-black">{service.shortTitle} تهران</Link><Link href={`/کرج/${cityRoute.slug}`} className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-black">{service.shortTitle} کرج</Link></> : <><Link href="/تهران" className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-black">پوشش تهران</Link><Link href="/کرج" className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-black">پوشش کرج</Link></>}</div></article><article className="rounded-2xl bg-white p-6 shadow-card md:p-8"><h2 className="text-2xl font-black">راهنماهای مرتبط</h2><p className="mt-3 text-sm leading-8 text-slate-600">پیش از درخواست، راهنمای ایمنی، انتخاب خدمت و عوامل هزینه را بخوانید.</p><div className="mt-5 grid gap-3">{articles.map((article) => <Link key={article.slug} href={`/blog/${article.slug}`} className="rounded-xl border border-slate-200 p-4 text-sm font-black transition hover:border-orange-200 hover:text-brand-orange">{article.title} ←</Link>)}</div></article></section>
      <section className="site-container mt-8 rounded-2xl bg-ink p-7 text-center text-white shadow-card" dir="rtl"><h2 className="text-2xl font-black">برای اعزام {service.shortTitle} آماده‌اید؟</h2><p className="mt-3 text-sm leading-8 text-slate-300">موقعیت، مدل خودرو و شرح کوتاه مشکل را ثبت کنید یا برای هماهنگی فوری تماس بگیرید.</p><div className="mt-5 flex flex-wrap justify-center gap-3"><Link href="/#request" className="inline-flex min-h-12 items-center rounded-lg bg-brand-orange px-6 text-sm font-black">ثبت درخواست آنلاین</Link><a href="tel:09123022064" className="inline-flex min-h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-black" dir="ltr">09123022064</a></div></section>
      <section className="site-container mt-8 rounded-2xl border border-red-200 bg-red-50 p-6"><div className="flex gap-4"><Icon name="shield" className="shrink-0 text-red-600"/><div><h2 className="font-black text-red-900">اول ایمنی، بعد درخواست خدمت</h2><p className="mt-2 text-xs leading-7 text-red-900/70">در تصادف، آتش‌سوزی، نشت سوخت، مصدومیت یا توقف در محل پرخطر، ابتدا با پلیس و خدمات اضطراری تماس بگیرید و از خودرو فاصله امن داشته باشید.</p></div></div></section>
    </SubpageShell>
  );
}
