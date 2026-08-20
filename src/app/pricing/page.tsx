import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";
import { services } from "@/content/services";

export const metadata: Metadata = seoMetadata({ title: "قیمت خدمات امداد خودرو و خودرو در محل", description: "راهنمای قیمت خدمات خودرو چاره؛ امداد خودرو، یدک‌کش، خودروبر، باتری، پنچری و مکانیک سیار در تهران و کرج.", path: "/قیمت-خدمات" });

export default function PricesPage() {
  return <SubpageShell><StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "قیمت خدمات" }])} /><section className="relative overflow-hidden bg-ink text-white"><div className="site-container relative py-14 md:py-20"><span className="text-xs font-black text-orange-300">قیمت‌گذاری شفاف</span><h1 className="mt-5 text-3xl font-black md:text-5xl">قیمت خدمات امداد خودرو</h1><p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">هزینه هر خدمت به نوع خودرو، موقعیت، فاصله، تجهیزات و شرایط انجام کار بستگی دارد. مبنای هزینه پیش از شروع خدمت با شما هماهنگ می‌شود.</p></div></section><section className="site-container mt-8" dir="rtl"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-brand-orange"><Icon name={service.icon} size={21} /></span><h2 className="font-black">{service.shortTitle}</h2></div><p className="mt-4 text-sm leading-7 text-slate-500">{service.priceNote}</p><span className="mt-4 inline-flex text-xs font-black text-brand-orange">مشاهده جزئیات و ثبت درخواست ←</span></Link>)}</div><div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6"><h2 className="text-xl font-black">چرا قیمت نهایی ممکن است تغییر کند؟</h2><p className="mt-3 text-sm leading-8 text-amber-950/75">تغییر فاصله، نوع خودرو، نیاز به تجهیزات خاص، توقف، قطعه مصرفی یا انتقال به تعمیرگاه می‌تواند روی هزینه اثر بگذارد. هر خدمت اضافه باید قبل از انجام با کاربر هماهنگ شود.</p></div></section></SubpageShell>;
}
