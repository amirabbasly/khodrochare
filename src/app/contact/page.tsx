import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { businessFacts } from "@/content/business";
import { breadcrumbSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";

export const metadata: Metadata = seoMetadata({ title: "تماس با خودرو چاره | پشتیبانی شبانه‌روزی", description: "تماس شبانه‌روزی با خودرو چاره برای درخواست امداد خودرو در تهران و کرج، پیگیری خدمت و رسیدگی به شکایات.", path: "/contact" });

export default function ContactPage() {
  return <SubpageShell>
    <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "تماس با ما" }])} />
    <section className="relative overflow-hidden bg-ink text-white"><div className="site-container relative py-14 md:py-20"><span className="text-xs font-black text-orange-300">پشتیبانی ۲۴ ساعته خودرو چاره</span><h1 className="mt-5 text-3xl font-black md:text-5xl">تماس با خودرو چاره</h1><p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">برای ثبت درخواست امداد، پیگیری خدمت یا دریافت راهنمایی، در تمام ساعات شبانه‌روز و هفت روز هفته با ما در ارتباط باشید.</p></div></section>
    <section className="site-container mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4" dir="rtl">{[[`tel:${businessFacts.emergencyPhone}`, "/images/facts/fast-dispatch.webp", "اعزام امداد خودرو", "تماس فوری امداد", businessFacts.emergencyPhone], [`tel:${businessFacts.complaintPhone}`, "/images/facts/support-24h.webp", "پشتیبانی خودرو چاره", "رسیدگی به شکایات", businessFacts.complaintPhone], ["mailto:info@khodrochare.ir", "/images/facts/experienced-mechanic.webp", "پشتیبانی خدمات خودرو", "ایمیل پشتیبانی", "info@khodrochare.ir"]].map(([href, image, alt, title, value]) => <a key={href} href={href} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1"><div className="relative h-32"><Image src={image} alt={alt} fill sizes="(min-width:1024px) 25vw,(min-width:768px) 50vw,100vw" className="object-cover" /></div><div className="p-5"><h2 className="font-black">{title}</h2><p className="mt-2 text-sm text-slate-500" dir="ltr">{value}</p></div></a>)}<Link href="/coverage" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1"><div className="relative h-32"><Image src="/images/facts/active-network.webp" alt="مناطق تحت پوشش خودرو چاره" fill sizes="(min-width:1024px) 25vw,(min-width:768px) 50vw,100vw" className="object-cover" /></div><div className="p-5"><h2 className="font-black">محدوده فعالیت</h2><p className="mt-2 text-sm leading-7 text-slate-500">مناطق ۲۲گانه تهران و مناطق فعال کرج و حومه</p></div></Link></section>
    <section className="site-container mt-8 rounded-2xl bg-white p-7 shadow-card" dir="rtl"><h2 className="text-2xl font-black">هنگام تماس چه اطلاعاتی آماده کنیم؟</h2><p className="mt-3 text-sm leading-8 text-slate-600">مدل خودرو، موقعیت فعلی، شرح کوتاه مشکل، امکان حرکت خودرو و شماره تماس در دسترس را اعلام کنید. اعزام معمولاً کمتر از ۳۰ دقیقه انجام می‌شود، اما زمان دقیق به ترافیک، موقعیت و نوع خدمت بستگی دارد.</p></section>
  </SubpageShell>;
}
