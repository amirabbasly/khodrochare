import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "@/components/seo/structured-data";
import { SubpageShell } from "@/components/site/subpage-shell";
import { seoMetadata } from "@/seo/metadata";
import { breadcrumbSchema } from "@/seo/schemas";

export const metadata: Metadata = seoMetadata({
  title: "مناطق تحت پوشش امداد خودرو تهران و کرج | خودرو چاره",
  description: "فهرست مناطق تحت پوشش امداد خودرو آنلاین خودرو چاره در مناطق ۲۲گانه تهران و مناطق فعال کرج و حومه، با پاسخ‌گویی شبانه‌روزی.",
  path: "/coverage",
});

const tehranDistricts = [
  ["منطقه ۱", "نیاوران، تجریش، زعفرانیه، ولنجک و قیطریه"], ["منطقه ۲", "سعادت‌آباد، شهرک غرب، گیشا و مرزداران"],
  ["منطقه ۳", "ونک، میرداماد، قلهک و اختیاریه"], ["منطقه ۴", "تهرانپارس، حکیمیه، لویزان و شمیران‌نو"],
  ["منطقه ۵", "پونک، جنت‌آباد، اکباتان و فردوس"], ["منطقه ۶", "یوسف‌آباد، امیرآباد، فاطمی و میدان ولیعصر"],
  ["منطقه ۷", "سهروردی، عباس‌آباد، نظام‌آباد و مجیدیه"], ["منطقه ۸", "نارمک، هفت‌حوض، فدک و تهرانپارس غربی"],
  ["منطقه ۹", "مهرآباد، استاد معین و شمشیری"], ["منطقه ۱۰", "سلسبیل، بریانک، کارون و هاشمی"],
  ["منطقه ۱۱", "منیریه، امیریه، راه‌آهن و جمهوری"], ["منطقه ۱۲", "بازار، بهارستان، دروازه شمیران و هرندی"],
  ["منطقه ۱۳", "پیروزی، نیروی هوایی، تهران‌نو و سرخه‌حصار"], ["منطقه ۱۴", "دولاب، افسریه، آهنگ و چهارصد دستگاه"],
  ["منطقه ۱۵", "مشیریه، کیانشهر، خاوران و مسعودیه"], ["منطقه ۱۶", "نازی‌آباد، جوادیه، خزانه و یاخچی‌آباد"],
  ["منطقه ۱۷", "امامزاده حسن، یافت‌آباد شرقی و آذری"], ["منطقه ۱۸", "یافت‌آباد، شادآباد، شهرک ولیعصر و تولیددارو"],
  ["منطقه ۱۹", "خانی‌آباد نو، عبدل‌آباد و نعمت‌آباد"], ["منطقه ۲۰", "شهرری، دولت‌آباد، جوانمرد قصاب و حمزه‌آباد"],
  ["منطقه ۲۱", "تهرانسر، وردآورد و شهرک استقلال"], ["منطقه ۲۲", "چیتگر، شهرک گلستان، دریاچه و دهکده المپیک"],
] as const;

const karajAreas = ["مرکز کرج", "عظیمیه", "جهانشهر", "گوهردشت", "مهرشهر", "باغستان", "حصارک", "شاهین‌ویلا", "کیانمهر", "کمالشهر", "محمدشهر", "فردیس", "مشکین‌دشت", "گرمدره"];

export default function CoveragePage() {
  return <SubpageShell>
    <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "مناطق تحت پوشش" }])} />
    <section className="relative overflow-hidden bg-ink text-white"><div className="site-container grid items-center gap-8 py-12 lg:grid-cols-[.9fr_1.1fr]" dir="ltr"><div className="relative min-h-72 overflow-hidden rounded-[1.8rem] border border-white/15"><Image src="/images/facts/active-network.webp" alt="شبکه امداد خودرو در تهران و کرج" fill priority sizes="(min-width:1024px) 45vw,100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" /></div><div dir="rtl"><p className="text-xs font-black text-orange-300">پاسخ‌گویی ۲۴ ساعته، ۷ روز هفته</p><h1 className="mt-4 text-3xl font-black leading-[1.55] md:text-5xl">مناطق تحت پوشش امداد خودرو تهران و کرج</h1><p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">خودرو چاره درخواست‌های امداد در مناطق ۲۲گانه تهران و مناطق فعال کرج و حومه را هماهنگ می‌کند. زمان معمول اعزام کمتر از ۳۰ دقیقه است و با توجه به ترافیک، موقعیت و نوع خدمت اعلام می‌شود.</p></div></div></section>
    <section className="site-container mt-8" dir="rtl"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black text-brand-orange">تهران</p><h2 className="mt-2 text-2xl font-black">مناطق ۲۲گانه تهران</h2></div><Link href="/تهران" className="text-sm font-black text-brand-orange">صفحه امداد خودرو تهران ←</Link></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{tehranDistricts.map(([district, areas]) => <article key={district} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><h3 className="font-black text-ink">{district}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{areas}</p></article>)}</div></section>
    <section className="site-container mt-10 rounded-2xl bg-white p-6 shadow-card md:p-8" dir="rtl"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black text-brand-orange">کرج و حومه</p><h2 className="mt-2 text-2xl font-black">مناطق فعال کرج</h2></div><Link href="/کرج" className="text-sm font-black text-brand-orange">صفحه امداد خودرو کرج ←</Link></div><div className="mt-6 flex flex-wrap gap-2">{karajAreas.map((area) => <span key={area} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700">{area}</span>)}</div><p className="mt-5 text-xs leading-7 text-slate-500">اگر نام محدوده شما در این فهرست نیست، موقعیت را هنگام تماس یا ثبت درخواست اعلام کنید تا امکان اعزام نزدیک‌ترین امدادگر بررسی شود.</p></section>
    <section className="site-container mt-10 rounded-2xl bg-ink p-7 text-center text-white shadow-card" dir="rtl"><h2 className="text-2xl font-black">برای خودرو در تهران یا کرج امداد می‌خواهید؟</h2><p className="mt-3 text-sm leading-8 text-slate-300">درخواست آنلاین را ثبت کنید یا برای هماهنگی فوری با پشتیبانی شبانه‌روزی تماس بگیرید.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/#request" className="inline-flex min-h-12 items-center rounded-lg bg-brand-orange px-6 text-sm font-black text-white">ثبت درخواست آنلاین</Link><a href="tel:09123022064" className="inline-flex min-h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-black" dir="ltr">09123022064</a></div></section>
  </SubpageShell>;
}
