import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";
import { SeoBreadcrumbs } from "./seo-breadcrumbs";
import { StructuredData } from "./structured-data";
import { breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from "@/seo/schemas";
import { persianServiceRoutes } from "@/seo/internal-links";
import { seoRegions, type SeoLocation, type SeoUpcomingCity } from "@/seo/locations";
import { seoNeighborhoods, type SeoNeighborhood } from "@/seo/neighborhoods";

export function NeighborhoodLanding({ location, neighborhood }: { location: SeoLocation; neighborhood: SeoNeighborhood }) {
  const path = `/${neighborhood.citySlug}/${neighborhood.slug}`;
  const region = neighborhood.regionKey ? seoRegions[neighborhood.regionKey] : undefined;
  const siblings = Object.values(seoNeighborhoods).filter((item) => item.citySlug === neighborhood.citySlug && item.slug !== neighborhood.slug && (item.regionKey === neighborhood.regionKey || (!neighborhood.regionKey && !item.regionKey)));
  const serviceLinks = persianServiceRoutes.filter((route) => ["امداد-خودرو", "یدک-کش", "خودروبر", "مکانیک-سیار", "باتری-خودرو", "پنچرگیری-سیار"].includes(route.slug));
  const title = `امداد خودرو ${neighborhood.name}`;
  return (
    <SubpageShell>
      <StructuredData data={serviceSchema({ name: `${title} ${location.name}`, description: neighborhood.intro[0], path, area: location.name, image: neighborhood.image })} />
      <StructuredData data={webPageSchema({ name: `${title} ${location.name}`, description: neighborhood.metaDescription, path, breadcrumb: true })} />
      <StructuredData data={breadcrumbSchema([
        { name: "صفحه اصلی", path: "/" },
        { name: location.name, path: `/${location.slug}` },
        ...(region ? [{ name: region.name, path: `/${region.citySlug}/${region.slug}` }] : []),
        { name: neighborhood.name },
      ], path)} />
      <StructuredData data={faqSchema([...neighborhood.faqs])} />

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,83,21,.2),transparent_25%),radial-gradient(circle_at_80%_35%,rgba(14,165,233,.2),transparent_30%)]" />
        <div className="site-container relative grid items-center gap-8 py-12 lg:grid-cols-[.9fr_1.1fr] lg:py-16" dir="ltr">
          <div className="relative min-h-64 overflow-hidden rounded-[1.8rem] border border-white/15">
            <Image src={neighborhood.image} alt={`${title} ${location.name}`} fill priority sizes="(min-width:1024px) 48vw,100vw" className="object-cover" />
            <span className="absolute right-4 top-4 rounded-full bg-black/55 px-4 py-2 text-[11px] font-black text-white backdrop-blur">{neighborhood.municipalityZone}</span>
          </div>
          <div dir="rtl">
            <SeoBreadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: location.name, href: `/${location.slug}` }, ...(region ? [{ label: region.name, href: `/${region.citySlug}/${region.slug}` }] : []), { label: neighborhood.name }]} />
            <p className="mt-4 text-xs font-black text-orange-300">امداد محلی {neighborhood.municipalityZone}</p>
            <h1 className="mt-3 text-3xl font-black leading-[1.55] md:text-5xl">{title} {location.name}</h1>
            <p className="mt-5 max-w-xl text-sm leading-8 text-slate-300">{neighborhood.intro[0]}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/#request" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-orange px-6 text-sm font-black text-white shadow-orange"><Icon name="form" size={17} /> ثبت درخواست امداد در {neighborhood.name}</Link>
              <a href="tel:09123022064" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-6 text-sm font-black" dir="ltr"><Icon name="phone" size={17} /> 09123022064</a>
            </div>
          </div>
        </div>
      </section>

      <section className="site-container mt-8 grid gap-4 sm:grid-cols-3" dir="rtl">
        <article className="rounded-2xl bg-white p-5 shadow-card"><strong className="text-lg font-black text-brand-orange">{neighborhood.municipalityZone}</strong><p className="mt-2 text-xs leading-7 text-slate-500">منطقه شهرداری {neighborhood.name}</p></article>
        <article className="rounded-2xl bg-white p-5 shadow-card"><strong className="text-lg font-black text-brand-orange">۲۴ ساعت، ۷ روز هفته</strong><p className="mt-2 text-xs leading-7 text-slate-500">پاسخ‌گویی و بررسی درخواست</p></article>
        <article className="rounded-2xl bg-white p-5 shadow-card"><strong className="text-lg font-black text-brand-orange">اعزام از نزدیک‌ترین پایانه</strong><p className="mt-2 text-xs leading-7 text-slate-500">متناسب با ترافیک و موقعیت</p></article>
      </section>

      <section className="site-container mt-8" dir="rtl">
        <h2 className="text-2xl font-black text-ink">خدمات امداد خودرو در {neighborhood.name}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-500">{neighborhood.intro[1]}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {serviceLinks.map((route) => (
            <Link key={route.slug} href={`/${location.slug}/${route.slug}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-1 hover:border-orange-200 hover:bg-orange-50">
              <h3 className="font-black text-ink">{route.title} {neighborhood.name}</h3>
              <span className="mt-3 inline-flex text-xs font-black text-brand-orange">جزئیات و درخواست ←</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-container mt-8 grid gap-6 lg:grid-cols-2" dir="rtl">
        <article className="rounded-2xl bg-white p-6 shadow-card md:p-8">
          <h2 className="text-2xl font-black text-ink">مسیرها و دسترسی‌های اصلی {neighborhood.name}</h2>
          <ul className="mt-5 grid gap-3">
            {neighborhood.routes.map((route) => <li key={route} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-bold"><Icon name="location" size={18} className="text-brand-orange" />{route}</li>)}
          </ul>
          <h3 className="mt-7 text-lg font-black text-ink">نقاط شناخته‌شده محله</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {neighborhood.landmarks.map((landmark) => <span key={landmark} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700">{landmark}</span>)}
          </div>
        </article>
        <article className="rounded-2xl bg-ink p-6 text-white md:p-8">
          <h2 className="text-xl font-black">نکته مهم دسترسی در {neighborhood.name}</h2>
          <p className="mt-4 text-sm leading-8 text-slate-300">{neighborhood.accessNote}</p>
          <div className="mt-6 rounded-xl bg-white/5 p-4 text-sm leading-7 text-slate-300"><strong className="text-orange-300">نکته اعزام: </strong>{neighborhood.dispatchNote}</div>
          {region ? <Link href={`/${region.citySlug}/${region.slug}`} className="mt-6 inline-flex text-sm font-black text-orange-300">پوشش کامل {region.name} ←</Link> : <Link href={`/${location.slug}`} className="mt-6 inline-flex text-sm font-black text-orange-300">پوشش کامل {location.name} ←</Link>}
        </article>
      </section>

      <section className="site-container mt-8 rounded-2xl bg-white p-6 shadow-card md:p-8" dir="rtl">
        <h2 className="text-2xl font-black text-ink">سؤالات متداول امداد خودرو {neighborhood.name}</h2>
        <div className="mt-5 divide-y divide-slate-100">
          {neighborhood.faqs.map((faq) => <details key={faq.question} className="py-4"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 text-sm leading-8 text-slate-600">{faq.answer}</p></details>)}
        </div>
      </section>

      <section className="site-container mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card" dir="rtl">
        <h2 className="text-xl font-black text-ink">محله‌های هم‌جوار {neighborhood.name}</h2>
        <nav className="mt-4 flex flex-wrap gap-2" aria-label={`محله‌های نزدیک ${neighborhood.name}`}>
          {siblings.map((item) => <Link key={item.slug} href={`/${item.citySlug}/${item.slug}`} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange">امداد خودرو {item.name}</Link>)}
          <Link href={`/${location.slug}`} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange">امداد خودرو {location.name} (همه مناطق) ←</Link>
        </nav>
      </section>

      <section className="site-container mt-8 rounded-2xl bg-ink p-7 text-center text-white shadow-card" dir="rtl">
        <h2 className="text-2xl font-black">خودرو در {neighborhood.name} خراب شده؟</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-slate-300">لوکیشن دقیق، مدل خودرو و نشانه مشکل را ثبت کنید تا نزدیک‌ترین امدادگر آشنا به معابر {neighborhood.name} اعزام شود.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/#request" className="inline-flex min-h-12 items-center rounded-lg bg-brand-orange px-6 text-sm font-black">ثبت درخواست آنلاین</Link>
          <a href="tel:09123022064" className="inline-flex min-h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-black" dir="ltr">09123022064</a>
        </div>
      </section>
    </SubpageShell>
  );
}

export function UpcomingCityLanding({ city }: { city: SeoUpcomingCity }) {
  const path = `/${city.slug}`;
  return (
    <SubpageShell>
      <StructuredData data={webPageSchema({ name: `امداد خودرو ${city.name}`, description: city.metaDescription, path, breadcrumb: true })} />
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: `امداد خودرو ${city.name}` }], path)} />
      <StructuredData data={faqSchema([...city.faqs])} />

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,83,21,.2),transparent_25%),radial-gradient(circle_at_80%_35%,rgba(14,165,233,.2),transparent_30%)]" />
        <div className="site-container relative py-14 md:py-20" dir="rtl">
          <SeoBreadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: `امداد خودرو ${city.name}` }]} />
          <span className="mt-4 inline-flex rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-2 text-xs font-black text-sky-200">فاز دوم توسعه — در حال فعال‌سازی شبکه {city.name}</span>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.55] md:text-5xl">امداد خودرو {city.name}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">{city.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="tel:09123022064" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-orange px-6 text-sm font-black text-white shadow-orange"><Icon name="phone" size={17} /> تماس برای اطلاع از زمان فعال‌سازی</a>
            <Link href="/coverage" className="inline-flex min-h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-black">مناطق فعال فعلی ←</Link>
          </div>
        </div>
      </section>

      <section className="site-container mt-8 grid gap-6 lg:grid-cols-[1.15fr_.85fr]" dir="ltr">
        <article className="rounded-2xl bg-white p-6 shadow-card md:p-8" dir="rtl">
          <h2 className="text-2xl font-black text-ink">خدماتی که در {city.name} راه‌اندازی می‌شود</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {city.plannedServices.map((service) => <li key={service} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-bold"><Icon name="check" size={17} className="text-emerald-600" />{service}</li>)}
          </ul>
          <div className="mt-7 rounded-xl border border-orange-200 bg-orange-50 p-5">
            <h3 className="font-black text-ink">چرا هنوز فعال نشده؟</h3>
            <p className="mt-2 text-sm leading-7 text-amber-950/80">خودرو چاره هر شهر را فقط پس از ارزیابی و تأیید امدادگران محلی فعال می‌کند تا کیفیت خدمت، مانند تهران و کرج، تضمین‌شده باشد. تا پیش از فعال‌سازی رسمی {city.name}، درخواست‌های این شهر به‌صورت مورد و با هماهنگی تلفنی بررسی می‌شود.</p>
          </div>
        </article>
        <aside className="rounded-2xl bg-ink p-6 text-white md:p-8" dir="rtl">
          <h2 className="text-xl font-black">مسیرها و مناطق برنامه‌ریزی‌شده در {city.name}</h2>
          <h3 className="mt-5 text-sm font-black text-orange-300">محورهای اصلی</h3>
          <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-300">
            {city.keyRoutes.map((route) => <li key={route} className="flex items-center gap-2"><Icon name="location" size={15} className="text-orange-300" />{route}</li>)}
          </ul>
          <h3 className="mt-5 text-sm font-black text-orange-300">مناطق داخل شهر</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {city.mainAreas.map((area) => <span key={area} className="rounded-full border border-white/15 px-3 py-2 text-[11px] text-slate-200">{area}</span>)}
          </div>
        </aside>
      </section>

      <section className="site-container mt-8 rounded-2xl bg-white p-6 shadow-card md:p-8" dir="rtl">
        <h2 className="text-2xl font-black text-ink">سؤالات رایج امداد خودرو {city.name}</h2>
        <div className="mt-5 divide-y divide-slate-100">
          {city.faqs.map((faq) => <details key={faq.question} className="py-4"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 text-sm leading-8 text-slate-600">{faq.answer}</p></details>)}
        </div>
      </section>
    </SubpageShell>
  );
}
