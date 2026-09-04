import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema, webPageSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";
import { services } from "@/content/services";

export const metadata: Metadata = seoMetadata({
  title: "قیمت خدمات امداد خودرو، یدک کش و خودروبر",
  description: "راهنمای عوامل مؤثر بر قیمت امداد خودرو، یدک کش، خودروبر، باتری، پنچرگیری و مکانیک سیار در تهران و کرج.",
  path: "/pricing",
  keywords: ["قیمت امداد خودرو", "هزینه حمل خودرو", "قیمت یدک کش", "قیمت خودروبر"],
});

export default function PricesPage() {
  return <SubpageShell>
    <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "قیمت خدمات" }], "/pricing")} />
    <StructuredData data={webPageSchema({ name: "قیمت خدمات امداد خودرو، یدک کش و خودروبر", description: "عوامل مؤثر بر قیمت امداد خودرو، حمل خودرو و خدمات در محل در تهران و کرج.", path: "/pricing", breadcrumb: true })} />
    <section className="relative overflow-hidden bg-ink text-white"><div className="site-container relative py-14 md:py-20" dir="rtl"><span className="text-xs font-black text-orange-300">قیمت‌گذاری شفاف</span><h1 className="mt-5 text-3xl font-black md:text-5xl">قیمت خدمات امداد خودرو</h1><p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300">هزینه هر خدمت به نوع خودرو، موقعیت، فاصله، تجهیزات و شرایط انجام کار بستگی دارد. اطلاعات سفارش بررسی و مبنای هزینه پیش از شروع خدمت با شما هماهنگ می‌شود.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/blog/car-tow-truck-price-guide" className="rounded-lg bg-brand-orange px-5 py-3 text-sm font-black text-white">راهنمای هزینه حمل خودرو</Link><Link href="/#request" className="rounded-lg border border-white/30 px-5 py-3 text-sm font-black">ثبت درخواست آنلاین</Link></div></div></section>
    <section className="site-container mt-8" dir="rtl"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition hover:-translate-y-1"><div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-brand-orange"><Icon name={service.icon} size={21} /></span><h2 className="font-black">{service.shortTitle}</h2></div><p className="mt-4 text-sm leading-7 text-slate-500">{service.priceNote}</p><span className="mt-4 inline-flex text-xs font-black text-brand-orange">مشاهده جزئیات و ثبت درخواست ←</span></Link>)}</div>
      <div className="mt-8 grid gap-5 md:grid-cols-2"><article className="rounded-2xl border border-orange-200 bg-orange-50 p-6"><h2 className="text-xl font-black">چرا قیمت نهایی ممکن است تغییر کند؟</h2><p className="mt-3 text-sm leading-8 text-amber-950/75">تغییر فاصله، نوع خودرو، نیاز به تجهیزات خاص، توقف، قطعه مصرفی یا انتقال به تعمیرگاه می‌تواند روی هزینه اثر بگذارد. هر خدمت اضافه باید قبل از انجام با کاربر هماهنگ شود.</p></article><article className="rounded-2xl bg-white p-6 shadow-card"><h2 className="text-xl font-black">قیمت خدمات در تهران و کرج</h2><p className="mt-3 text-sm leading-8 text-slate-600">برای بررسی شرایط محلی، زمان اعزام و خدمت مناسب، صفحه شهر و خدمت موردنظر را ببینید.</p><div className="mt-4 flex flex-wrap gap-2"><Link href="/تهران/یدک-کش" className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black">یدک کش تهران</Link><Link href="/کرج/یدک-کش" className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black">یدک کش کرج</Link><Link href="/تهران/مکانیک-سیار" className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black">مکانیک سیار تهران</Link><Link href="/تهران/پنچرگیری-سیار" className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-black">پنچرگیری سیار تهران</Link></div></article></div>
    </section>
  </SubpageShell>;
}
