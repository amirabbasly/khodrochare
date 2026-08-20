import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";
import { services } from "@/content/services";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema } from "@/seo/schemas";

export const metadata: Metadata = {
  title: "خدمات امداد خودرو و خودرو در محل",
  description: "فهرست خدمات خودرو چاره در تهران و کرج؛ امداد در محل، کارواش سیار، باتری، پنچری، خودروبر، یدک‌کش، مکانیک و خدمات تکمیلی خودرو.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <SubpageShell>
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "خدمات" }])} />
      <section className="site-container pb-8 pt-12 text-center md:pt-16">
        <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black text-brand-orange">خدمات خودرو در تهران و کرج</span>
        <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-[1.55] md:text-5xl">هر مشکل خودرو، یک مسیر روشن برای حل‌شدن</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-500">خدمت موردنیاز را انتخاب کنید، جزئیات و شرایط را بخوانید و برای اعزام متخصص یا هماهنگی خدمت در محل درخواست بفرستید.</p>
      </section>
      <section className="site-container grid gap-4 pb-4 md:grid-cols-2 xl:grid-cols-3" aria-label="فهرست خدمات خودرو">
        {services.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,30,48,.15)]">
            <div className="relative h-52 overflow-hidden"><Image src={service.image} alt={`${service.title} خودرو چاره`} fill sizes="(min-width:1280px) 33vw,(min-width:768px) 50vw,100vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" /><span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-ink shadow-lg"><Icon name={service.icon} size={22} /></span></div>
            <div className="p-5"><p className="text-[10px] font-black text-brand-orange">{service.eyebrow}</p><h2 className="mt-2 text-xl font-black">{service.shortTitle}</h2><p className="mt-3 min-h-14 text-xs leading-7 text-slate-500">{service.summary}</p><div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs"><span className="text-slate-400">{service.eta}</span><strong className="text-brand-orange">جزئیات خدمت ←</strong></div></div>
          </Link>
        ))}
      </section>
      <section className="site-container mt-12 grid gap-8 rounded-2xl bg-white p-7 shadow-card md:p-10" dir="rtl">
        <div><h2 className="text-2xl font-black md:text-3xl">خدمات امداد خودرو و خدمات خودرو در محل در تهران و کرج</h2><p className="mt-4 text-sm leading-8 text-slate-600">خودرو چاره مسیر دریافت کمک را از لحظه اعلام مشکل کوتاه می‌کند: شرح نشانه‌ها، انتخاب نوع خدمت، ثبت موقعیت و هماهنگی هزینه پیش از شروع. این ساختار برای زمان‌هایی طراحی شده که خودرو در خیابان، پارکینگ، محل کار یا مسیر متوقف شده و تصمیم سریع لازم است.</p><p className="mt-3 text-sm leading-8 text-slate-600">از کارواش سیار و سرویس‌های دوره‌ای تا باتری به باتری، تعویض لاستیک، مکانیک سیار، خودروبر کفی و یدک‌کش، هر صفحه توضیح می‌دهد خدمت برای چه موقعیتی مناسب است و چه زمانی باید خودرو به تعمیرگاه منتقل شود.</p></div>
        <div><h2 className="text-xl font-black">راهنمای انتخاب خدمت مناسب</h2><ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-600 md:grid-cols-2"><li className="rounded-xl bg-slate-50 p-4">اگر خودرو روشن نمی‌شود، ابتدا باتری، امداد در محل یا دیاگ سیار را بررسی کنید.</li><li className="rounded-xl bg-slate-50 p-4">اگر خودرو نباید حرکت کند، کفی و خودروبر یا یدک‌کش گزینه ایمن‌تری است.</li><li className="rounded-xl bg-slate-50 p-4">برای پنچری و کم‌بادشدن لاستیک، ادامه رانندگی نکنید و خدمت پنچری سیار بگیرید.</li><li className="rounded-xl bg-slate-50 p-4">در شرایط تصادف، ابتدا محل را ایمن کنید و سپس برای انتقال خودرو درخواست ثبت کنید.</li></ul></div>
        <div className="border-t border-slate-100 pt-6"><h2 className="text-xl font-black">پوشش و هماهنگی امداد</h2><p className="mt-3 text-sm leading-8 text-slate-600">تمرکز عملیاتی فعلی خودرو چاره تهران و کرج است. زمان اعزام، نوع متخصص و هزینه به موقعیت، نوع خودرو و خدمت انتخاب‌شده بستگی دارد و پیش از شروع کار با شما هماهنگ می‌شود.</p><Link href="/coverage" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-ink px-5 text-sm font-black text-white">دیدن محدوده پوشش</Link></div>
      </section>
    </SubpageShell>
  );
}
