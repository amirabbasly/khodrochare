import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { businessFacts } from "@/content/business";
import { breadcrumbSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";

export const metadata: Metadata = seoMetadata({
  title: "درباره خودرو چاره | بیش از ۱۵ سال تجربه امداد خودرو",
  description: "خودرو چاره با پشتوانه بیش از ۱۵ سال تجربه تیم اجرایی و شبکه حدود ۱۰۰ امدادگر، خدمات شبانه‌روزی خودرو را در همه مناطق تهران و کرج ارائه می‌کند.",
  path: "/about",
});

const facts = [
  ["بیش از ۱۵ سال", "پیشینه فعالیت تیم اجرایی در خدمات خودرو"],
  ["حدود ۱۰۰ امدادگر", "شبکه فعال برای هماهنگی خدمات"],
  ["۲۴ ساعت، ۷ روز هفته", "پاسخ‌گویی شبانه‌روزی بدون تعطیلی"],
] as const;

export default function AboutPage() {
  return <SubpageShell>
    <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "درباره خودرو چاره" }])} />
    <section className="relative overflow-hidden bg-ink text-white"><div className="site-container relative py-14 md:py-20"><span className="text-xs font-black text-orange-300">درباره خودرو چاره</span><h1 className="mt-5 max-w-4xl text-3xl font-black leading-[1.55] md:text-5xl">نوآوری در راهبری خدمات خودرو با پشتوانه تجربه عملی</h1><p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300">خودرو چاره با تکیه بر بیش از ۱۵ سال پیشینه فعالیت تیم اجرایی در این حوزه شکل گرفته است تا مسیر میان راننده، مشکل خودرو و متخصص مناسب را کوتاه‌تر، شفاف‌تر و آنلاین کند.</p></div></section>
    <section className="site-container mt-8 grid gap-4 md:grid-cols-3" dir="rtl">{facts.map(([value, label]) => <article key={value} className="rounded-2xl bg-white p-6 shadow-card"><strong className="text-xl font-black text-brand-orange">{value}</strong><p className="mt-3 text-sm leading-7 text-slate-500">{label}</p></article>)}</section>
    <section className="site-container mt-8 grid gap-5 md:grid-cols-3" dir="rtl"><article className="rounded-2xl bg-white p-6 shadow-card"><Icon name="location" size={26} className="text-brand-orange" /><h2 className="mt-4 font-black">پوشش کامل عملیاتی</h2><p className="mt-3 text-sm leading-7 text-slate-500">همه مناطق تهران و کرج، از جمله اسلامشهر، در محدوده فعالیت اعلام‌شده خودرو چاره قرار دارند.</p></article><article className="rounded-2xl bg-white p-6 shadow-card"><Icon name="clock" size={26} className="text-brand-orange" /><h2 className="mt-4 font-black">اعزام معمولاً زیر ۳۰ دقیقه</h2><p className="mt-3 text-sm leading-7 text-slate-500">زمان دقیق به موقعیت، ترافیک، نوع خدمت و نزدیک‌ترین امدادگر آماده بستگی دارد.</p></article><article className="rounded-2xl bg-white p-6 shadow-card"><Icon name="shield" size={26} className="text-brand-orange" /><h2 className="mt-4 font-black">مسیر مشخص رسیدگی</h2><p className="mt-3 text-sm leading-7 text-slate-500">برای پیگیری کیفیت خدمت یا ثبت شکایت، تماس مستقیم با پشتیبانی رسیدگی در دسترس است.</p></article></section>
    <section className="site-container mt-8 rounded-2xl bg-white p-7 shadow-card" dir="rtl"><h2 className="text-2xl font-black">خدمات قابل ارائه در محل</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{businessFacts.services.map((service) => <div key={service} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 text-sm font-bold"><Icon name="check" size={17} className="text-emerald-600" />{service}</div>)}</div><Link href="/services" className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand-orange px-5 text-sm font-black text-white">مشاهده جزئیات خدمات</Link></section>
  </SubpageShell>;
}
