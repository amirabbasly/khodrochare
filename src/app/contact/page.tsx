import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
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
    <section className="site-container mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4" dir="rtl"><a href={`tel:${businessFacts.emergencyPhone}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1"><Icon name="phone" size={26} className="text-brand-orange" /><h2 className="mt-4 font-black">تماس فوری امداد</h2><p className="mt-2 text-sm text-slate-500" dir="ltr">{businessFacts.emergencyPhone}</p></a><a href={`tel:${businessFacts.complaintPhone}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1"><Icon name="shield" size={26} className="text-brand-orange" /><h2 className="mt-4 font-black">رسیدگی به شکایات</h2><p className="mt-2 text-sm text-slate-500" dir="ltr">{businessFacts.complaintPhone}</p></a><a href="mailto:info@khodrochare.ir" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1"><Icon name="mail" size={26} className="text-brand-orange" /><h2 className="mt-4 font-black">ایمیل پشتیبانی</h2><p className="mt-2 text-sm text-slate-500">info@khodrochare.ir</p></a><Link href="/coverage" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1"><Icon name="map" size={26} className="text-brand-orange" /><h2 className="mt-4 font-black">محدوده فعالیت</h2><p className="mt-2 text-sm leading-7 text-slate-500">همه مناطق تهران و کرج، از جمله اسلامشهر</p></Link></section>
    <section className="site-container mt-8 rounded-2xl bg-white p-7 shadow-card" dir="rtl"><h2 className="text-2xl font-black">هنگام تماس چه اطلاعاتی آماده کنیم؟</h2><p className="mt-3 text-sm leading-8 text-slate-600">مدل خودرو، موقعیت فعلی، شرح کوتاه مشکل، امکان حرکت خودرو و شماره تماس در دسترس را اعلام کنید. اعزام معمولاً کمتر از ۳۰ دقیقه انجام می‌شود، اما زمان دقیق به ترافیک، موقعیت و نوع خدمت بستگی دارد.</p></section>
  </SubpageShell>;
}
