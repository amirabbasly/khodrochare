import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "@/components/seo/structured-data";
import { SubpageShell } from "@/components/site/subpage-shell";
import { seoMetadata } from "@/seo/metadata";
import { breadcrumbSchema } from "@/seo/schemas";

export const metadata: Metadata = seoMetadata({
  title: "مناطق تحت پوشش امداد خودرو تهران و کرج",
  description: "فهرست مناطق تحت پوشش امداد خودرو آنلاین خودرو چاره در مناطق ۲۲گانه تهران و مناطق فعال کرج و حومه، با پاسخ‌گویی شبانه‌روزی.",
  path: "/coverage",
});

const tehranDistricts = [
  ["منطقه ۱", "نیاوران، تجریش، زعفرانیه، ولنجک، قیطریه، فرمانیه، الهیه، جماران، دارآباد و دربند"], ["منطقه ۲", "سعادت‌آباد، شهرک غرب، گیشا، مرزداران، ستارخان، طرشت، توحید و فرحزاد"],
  ["منطقه ۳", "ونک، میرداماد، قلهک، اختیاریه، دروس، پاسداران، جردن و داوودیه"], ["منطقه ۴", "تهرانپارس شرقی، حکیمیه، لویزان، شمیران‌نو، مجیدیه شمالی، قنات‌کوثر، نارمک شمالی و هروی"],
  ["منطقه ۵", "پونک، جنت‌آباد، اکباتان، فردوس، شهران، کن، سازمان برنامه، باغ‌فیض و آپادانا"], ["منطقه ۶", "یوسف‌آباد، امیرآباد، فاطمی، میدان ولیعصر، بهجت‌آباد، ایرانشهر، دانشگاه تهران و پارک لاله"],
  ["منطقه ۷", "سهروردی، عباس‌آباد، نظام‌آباد، مجیدیه جنوبی، خواجه‌نظام، بهار، نیلوفر و دبستان"], ["منطقه ۸", "نارمک، هفت‌حوض، فدک، تهرانپارس غربی، مدائن، دردشت، زرکش و تسلیحات"],
  ["منطقه ۹", "مهرآباد، استاد معین، شمشیری، دکتر هوشیار، سرآسیاب مهرآباد و فتح"], ["منطقه ۱۰", "سلسبیل، بریانک، کارون، هاشمی، زنجان، جیحون، نواب و قصرالدشت"],
  ["منطقه ۱۱", "منیریه، امیریه، راه‌آهن، جمهوری، شیخ هادی، عباسی، مخصوص و میدان حر"], ["منطقه ۱۲", "بازار، بهارستان، دروازه شمیران، هرندی، پامنار، سنگلج، آبشار و امامزاده یحیی"],
  ["منطقه ۱۳", "پیروزی، نیروی هوایی، تهران‌نو، سرخه‌حصار، زاهد گیلانی، صفا، امامت و دماوند"], ["منطقه ۱۴", "دولاب، افسریه، آهنگ، چهارصد دستگاه، شکوفه، ابوذر، پرستار و خاوران"],
  ["منطقه ۱۵", "مشیریه، کیانشهر، خاوران، مسعودیه، افسریه جنوبی، مینابی، شوش و رضویه"], ["منطقه ۱۶", "نازی‌آباد، جوادیه، خزانه، یاخچی‌آباد، باغ آذری، علی‌آباد، تختی و راه‌آهن جنوبی"],
  ["منطقه ۱۷", "امامزاده حسن، یافت‌آباد شرقی، آذری، ابوذر غربی، باغ خزانه، بلورسازی و زمزم"], ["منطقه ۱۸", "یافت‌آباد، شادآباد، شهرک ولیعصر، تولیددارو، خلیج فارس، سعیدآباد و بازار آهن"],
  ["منطقه ۱۹", "خانی‌آباد نو، عبدل‌آباد، نعمت‌آباد، اسفندیاری، شریعتی جنوبی، دولتخواه و بوستان ولایت"], ["منطقه ۲۰", "شهرری، دولت‌آباد، جوانمرد قصاب، حمزه‌آباد، دیلمان، ابن‌بابویه، نفرآباد و علایین"],
  ["منطقه ۲۱", "تهرانسر، وردآورد، شهرک استقلال، شهرک آزادی، ویلاشهر، چیتگر جنوبی و شهرک دانشگاه"], ["منطقه ۲۲", "چیتگر، شهرک گلستان، دریاچه، دهکده المپیک، زیبادشت، کوهک، شهرک راه‌آهن و آبشار تهران"],
] as const;

const karajZones = [
  ["مرکز کرج", "میدان شهدا، چهارراه طالقانی، هفت‌تیر، مصباح، فروغی، قلمستان و برغان"],
  ["عظیمیه و شمال‌شرق", "عظیمیه، حسن‌آباد، اسلام‌آباد، حصار بالا، حصار پایین و بلوار چمران"],
  ["گوهردشت و شمال‌غرب", "گوهردشت (رجایی‌شهر)، باغستان شرقی و غربی، شاهین‌ویلا، بهارستان، آسمان و اشتراکی"],
  ["جهانشهر و محدوده مرکزی", "جهانشهر، حاجی‌آباد، کوی کارمندان شمالی و جنوبی، اصفهانی‌ها، کسری و کوی مدرس"],
  ["گلشهر و غرب کرج", "گلشهر، حصارک بالا و پایین، دهقان‌ویلا، شهرک اوج، شهرک ولیعصر و شهرک وحدت"],
  ["مهرشهر و جنوب‌غرب", "مهرشهر فازهای ۱ تا ۵، حسین‌آباد، آق‌تپه، کیانمهر، شهرک زنبق و شهرک بعثت"],
  ["شرق کرج", "کلاک بالا و پایین، خلج‌آباد، حصار، گرمدره، شهرک جهان‌نما و شهرک خاتم"],
  ["محمدشهر، ماهدشت و کمالشهر", "محمدشهر، ماهدشت، کمالشهر، خرمدشت، جعفرآباد، ولدآباد و شهرک صنعتی بهارستان"],
  ["فردیس و جنوب‌شرق", "فردیس، مشکین‌دشت، شهرک ناز، رزکان نو، منظریه، شهرک وحدت و مسیرهای متصل به ملارد"],
] as const;

export default function CoveragePage() {
  return <SubpageShell>
    <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "مناطق تحت پوشش" }])} />
    <section className="relative overflow-hidden bg-ink text-white"><div className="site-container grid items-center gap-8 py-12 lg:grid-cols-[.9fr_1.1fr]" dir="ltr"><div className="relative min-h-72 overflow-hidden rounded-[1.8rem] border border-white/15"><Image src="/images/support-technician-night.webp" alt="امدادگر شبانه‌روزی خودرو چاره در تهران و کرج" fill priority quality={76} sizes="(min-width:1024px) 45vw,100vw" className="object-cover object-[28%_center]" /><div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" /></div><div dir="rtl"><p className="text-xs font-black text-orange-300">پاسخ‌گویی ۲۴ ساعته، ۷ روز هفته</p><h1 className="mt-4 text-3xl font-black leading-[1.55] md:text-5xl">مناطق تحت پوشش امداد خودرو تهران و کرج</h1><p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">خودرو چاره درخواست خدمات خودرو را در مناطق ۲۲گانه تهران و محدوده‌های فعال کرج و حومه هماهنگ می‌کند. علاوه بر امداد در محل، یدک‌کش و خودروبر، امکان درخواست مکانیک سیار، باتری، پنچرگیری، سوخت‌رسانی و کارواش سیار نیز فراهم است. زمان اعزام امداد به ترافیک، موقعیت و نوع خدمت بستگی دارد.</p><nav className="mt-6 flex flex-wrap gap-2" aria-label="خدمات قابل درخواست در مناطق تحت پوشش"><Link href="/services/roadside-assistance" className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold transition hover:border-orange-300">امداد در محل</Link><Link href="/services/tow-truck" className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold transition hover:border-orange-300">یدک‌کش و خودروبر</Link><Link href="/services/mobile-mechanic" className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold transition hover:border-orange-300">مکانیک سیار</Link><Link href="/services/mobile-carwash" className="rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold transition hover:border-orange-300">کارواش سیار</Link></nav></div></div></section>
    <section className="site-container mt-8" dir="rtl"><div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#071a2e] shadow-card"><div className="grid items-center lg:grid-cols-[1.35fr_.65fr]" dir="ltr"><div className="relative min-h-[340px] sm:min-h-[460px]"><Image src="/images/coverage-iran-glass-v2.webp" alt="نقشه ایران و محدوده فعال امداد خودرو در تهران و کرج" fill loading="lazy" quality={70} sizes="(min-width:1024px) 68vw,100vw" className="object-cover" /></div><div className="p-6 text-white md:p-8" dir="rtl"><p className="text-xs font-black text-emerald-300">نقشه محدوده عملیاتی</p><h2 className="mt-3 text-2xl font-black">تهران و کرج، محدوده فعال فعلی</h2><p className="mt-4 text-sm leading-8 text-slate-300">این نقشه نمای کلی محدوده فعالیت خودرو چاره در ایران است. پوشش فعلی روی تهران، کرج و محدوده‌های پیرامونی قابل هماهنگی متمرکز است.</p><div className="mt-5 flex flex-wrap gap-2"><span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-200">تهران · فعال</span><span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-2 text-xs font-black text-emerald-200">کرج · فعال</span></div></div></div></div></section>
    <section className="site-container mt-8" dir="rtl"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black text-brand-orange">تهران</p><h2 className="mt-2 text-2xl font-black">مناطق ۲۲گانه تهران</h2></div><Link href="/تهران" className="text-sm font-black text-brand-orange">صفحه امداد خودرو تهران ←</Link></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{tehranDistricts.map(([district, areas]) => <article key={district} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><h3 className="font-black text-ink">{district}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{areas}</p></article>)}</div></section>
    <section className="site-container mt-10 rounded-2xl bg-white p-6 shadow-card md:p-8" dir="rtl"><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-black text-brand-orange">کرج و حومه</p><h2 className="mt-2 text-2xl font-black">مناطق و محله‌های تحت پوشش کرج</h2></div><Link href="/کرج" className="text-sm font-black text-brand-orange">صفحه امداد خودرو کرج ←</Link></div><div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{karajZones.map(([zone, areas]) => <article key={zone} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-black text-ink">{zone}</h3><p className="mt-2 text-xs leading-7 text-slate-600">{areas}</p></article>)}</div><p className="mt-5 text-xs leading-7 text-slate-500">فهرست بالا برای پیدا کردن سریع محدوده است و به معنی ساخت صفحه جداگانه برای هر محله نیست. اگر نام محل شما دیده نمی‌شود، موقعیت دقیق را اعلام کنید تا امکان اعزام بررسی شود.</p></section>
    <section className="site-container mt-10 rounded-2xl bg-ink p-7 text-center text-white shadow-card" dir="rtl"><h2 className="text-2xl font-black">برای خودرو در تهران یا کرج امداد می‌خواهید؟</h2><p className="mt-3 text-sm leading-8 text-slate-300">درخواست آنلاین را ثبت کنید یا برای هماهنگی فوری با پشتیبانی شبانه‌روزی تماس بگیرید.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/#request" className="inline-flex min-h-12 items-center rounded-lg bg-brand-orange px-6 text-sm font-black text-white">ثبت درخواست آنلاین</Link><a href="tel:09123022064" className="inline-flex min-h-12 items-center rounded-lg border border-white/30 px-6 text-sm font-black" dir="ltr">09123022064</a></div></section>
  </SubpageShell>;
}
