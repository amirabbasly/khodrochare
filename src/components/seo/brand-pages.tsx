import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";
import { SeoBreadcrumbs } from "./seo-breadcrumbs";
import { StructuredData } from "./structured-data";
import { breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from "@/seo/schemas";
import { seoLocations } from "@/seo/locations";
import { persianServiceRoutes } from "@/seo/internal-links";
import { getService } from "@/content/services";
import { carBrands, type BrandDefinition } from "@/content/brands";

function BrandCta({ brand }: { brand: BrandDefinition }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Link href="/#request" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-orange px-6 text-sm font-black text-white shadow-orange"><Icon name="form" size={17} /> ثبت درخواست امداد {brand.name}</Link>
      <a href="tel:09123022064" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-6 text-sm font-black" dir="ltr"><Icon name="phone" size={17} /> 09123022064</a>
    </div>
  );
}

export function BrandLanding({ brand }: { brand: BrandDefinition }) {
  const path = `/brands/${brand.slug}`;
  const recommended = brand.recommendedServices.map((slug) => getService(slug)).filter(Boolean);
  const otherBrands = carBrands.filter((item) => item.slug !== brand.slug);
  const cities = Object.values(seoLocations);
  return (
    <SubpageShell>
      <StructuredData data={serviceSchema({ name: `امداد خودرو ${brand.name}`, description: brand.intro[0], path, area: "تهران و کرج", image: brand.image })} />
      <StructuredData data={webPageSchema({ name: `امداد خودرو ${brand.name} در تهران و کرج`, description: brand.summary, path, breadcrumb: true })} />
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "امداد خودرو بر اساس برند", path: "/brands" }, { name: brand.name }], path)} />
      <StructuredData data={faqSchema(brand.faqs)} />

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,83,21,.2),transparent_25%),radial-gradient(circle_at_80%_35%,rgba(14,165,233,.2),transparent_30%)]" />
        <div className="site-container relative grid items-center gap-8 py-12 lg:grid-cols-[.9fr_1.1fr] lg:py-16" dir="ltr">
          <div className="relative min-h-64 overflow-hidden rounded-[1.8rem] border border-white/15">
            <Image src={brand.image} alt={`امداد خودرو ${brand.name} در تهران و کرج`} fill priority sizes="(min-width:1024px) 48vw,100vw" className="object-cover" />
            <span className="absolute right-4 top-4 rounded-full bg-black/55 px-4 py-2 text-[11px] font-black text-white backdrop-blur">{brand.origin}</span>
          </div>
          <div dir="rtl">
            <SeoBreadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: "برندها", href: "/brands" }, { label: brand.name }]} />
            <p className="mt-4 text-xs font-black text-orange-300">امداد تخصصی خودروهای {brand.name}{brand.latinName ? ` (${brand.latinName})` : ""}</p>
            <h1 className="mt-3 text-3xl font-black leading-[1.55] md:text-5xl">امداد خودرو {brand.name} در تهران و کرج</h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-slate-300">{brand.summary} خدمات یدک‌کش، خودروبر، مکانیک سیار، باتری و امداد در محل به‌صورت آنلاین و شبانه‌روزی قابل ثبت است.</p>
            <div className="mt-7"><BrandCta brand={brand} /></div>
          </div>
        </div>
      </section>

      <section className="site-container mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]" dir="rtl">
        <article className="rounded-2xl bg-white p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-black text-ink">امداد و حمل خودروهای {brand.name}</h2>
          {brand.intro.map((paragraph) => <p key={paragraph.slice(0, 32)} className="mt-4 text-sm leading-8 text-slate-600">{paragraph}</p>)}
          <h3 className="mt-7 text-lg font-black text-ink">مدل‌های تحت پوشش {brand.name}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {brand.models.map((model) => <span key={model} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">{model}</span>)}
          </div>
        </article>
        <aside className="rounded-2xl bg-ink p-6 text-white md:p-8">
          <h2 className="text-xl font-black">حمل {brand.name}: یدک‌کش یا کفی؟</h2>
          <p className="mt-4 text-sm leading-8 text-slate-300">{brand.carrierNote}</p>
          <div className="mt-6 grid gap-3">
            <Link href="/services/flatbed-carrier" className="rounded-xl border border-white/15 bg-white/5 p-4 transition hover:border-orange-300/60"><strong className="block text-sm">خودروبر و حمل با کفی</strong><span className="mt-1 block text-xs text-slate-300">انتخاب امن برای اتوماتیک و شاسی‌بلند ←</span></Link>
            <Link href="/cost-calculator" className="rounded-xl border border-white/15 bg-white/5 p-4 transition hover:border-orange-300/60"><strong className="block text-sm">محاسبه آنلاین هزینه امداد</strong><span className="mt-1 block text-xs text-slate-300">برآورد تقریبی قبل از ثبت درخواست ←</span></Link>
          </div>
        </aside>
      </section>

      <section className="site-container mt-8 rounded-2xl bg-white p-6 shadow-card md:p-8" dir="rtl">
        <h2 className="text-2xl font-black text-ink">خرابی‌های شایع {brand.name} که در محل رفع می‌شود</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {brand.commonIssues.map((issue) => (
            <article key={issue.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
              <h3 className="flex items-start gap-2 font-black text-ink"><Icon name="check" size={18} className="mt-1 shrink-0 text-emerald-600" />{issue.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{issue.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-container mt-8" dir="rtl">
        <h2 className="text-2xl font-black text-ink">خدمات امداد خودرو {brand.name}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-500">خدمت مناسب خودروی {brand.name} را انتخاب کنید؛ هر صفحه شامل شرح خدمت، موارد استفاده، مراحل درخواست و عوامل مؤثر بر قیمت است.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recommended.map((service) => service && (
          <Link key={service.slug} href={`/services/${service.slug}`} className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-brand-orange"><Icon name={service.icon} size={22} /></span>
            <span><strong className="block font-black text-ink">{service.title}</strong><span className="mt-2 block text-xs leading-6 text-slate-500">{service.summary}</span><span className="mt-3 inline-flex text-xs font-black text-brand-orange">جزئیات و ثبت درخواست ←</span></span>
          </Link>
          ))}
        </div>
      </section>

      <section className="site-container mt-8 grid gap-6 lg:grid-cols-2" dir="rtl">
        <article className="rounded-2xl bg-white p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-black text-ink">امداد {brand.name} بر اساس شهر</h2>
          <p className="mt-3 text-sm leading-8 text-slate-600">پوشش فعال خودرو چاره برای خودروهای {brand.name} در تهران و کرج است. برای مشاهده خدمات هر شهر، مسیر اعزام و مناطق تحت پوشش، صفحه شهر خود را انتخاب کنید.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {cities.map((city) => <Link key={city.slug} href={`/${city.slug}`} className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-black text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange">امداد خودرو {brand.name} {city.name} ←</Link>)}
            <Link href="/coverage" className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-black text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange">همه مناطق تحت پوشش</Link>
          </div>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-black text-ink">خدمات محلی {brand.name}</h2>
          <p className="mt-3 text-sm leading-8 text-slate-600">پرتقاضاترین خدمات محلی برای خودروهای {brand.name} در تهران و کرج:</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {cities.flatMap((city) => persianServiceRoutes.filter((route) => ["امداد-خودرو", "یدک-کش", "خودروبر"].includes(route.slug)).map((route) => (
              <Link key={`${city.slug}-${route.slug}`} href={`/${city.slug}/${route.slug}`} className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-black text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange">{route.title} {city.name} ←</Link>
            )))}
          </div>
        </article>
      </section>

      <section className="site-container mt-8 rounded-2xl bg-white p-6 shadow-card md:p-8" dir="rtl">
        <h2 className="text-2xl font-black text-ink">پرسش‌های رایج امداد خودرو {brand.name}</h2>
        <div className="mt-5 divide-y divide-slate-100">
          {brand.faqs.map((faq) => <details key={faq.question} className="py-4"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 text-sm leading-8 text-slate-600">{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="site-container mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card" dir="rtl">
        <h2 className="text-xl font-black text-ink">امداد برندهای دیگر</h2>
        <nav className="mt-4 flex flex-wrap gap-2" aria-label="امداد خودرو برندهای دیگر">
          {otherBrands.map((item) => <Link key={item.slug} href={`/brands/${item.slug}`} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange">امداد خودرو {item.name}</Link>)}
        </nav>
      </section>

      <section className="site-container mt-8 rounded-2xl bg-ink p-7 text-center text-white shadow-card" dir="rtl">
        <h2 className="text-2xl font-black">امداد خودرو {brand.name}، همین حالا در راه</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-slate-300">مدل خودرو، نشانه مشکل و موقعیت را ثبت کنید تا نزدیک‌ترین متخصص آشنا به خودروهای {brand.name} هماهنگ شود.</p>
        <div className="mt-5 flex justify-center"><BrandCta brand={brand} /></div>
      </section>
    </SubpageShell>
  );
}
