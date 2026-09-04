import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddToHomeButton } from "@/components/home/add-to-home-button";
import { Icon, PlatformLogo } from "@/components/home/home-ui";
import { QrCode } from "@/components/home/home-illustrations";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema, webPageSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";

export const metadata: Metadata = seoMetadata({
  title: "اپلیکیشن امداد خودرو و خدمات خودرو در محل",
  description: "اپلیکیشن و نسخه وب (PWA) خودرو چاره برای ثبت درخواست امداد خودرو، پیگیری خدمت، مشاهده هزینه پیش از اعزام و استفاده از دستیار هوشمند در تهران و کرج.",
  path: "/app",
  keywords: ["اپلیکیشن امداد خودرو", "نصب اپلیکیشن خودرو چاره", "اپلیکیشن یدک کش", "امداد خودرو آنلاین"],
  image: "/images/app-premium-mockup.webp",
});

const benefits = [
  ["location", "تمرکز روی اعزام درست", "مسیر محصول از انتخاب مشکل و موقعیت شروع می‌شود تا درخواست به خدمت مناسب برسد؛ نه اینکه همه قابلیت‌ها یک‌جا جلوی چشم شما فریاد زده شوند."],
  ["tag", "قیمت قبل از حرکت", "نوع خدمت، مسیر و شرایط خودرو مبنای هماهنگی هزینه است تا قبل از شروع، تصویر روشن‌تری از سفارش داشته باشید."],
  ["shield", "امدادگر و مسیر قابل پیگیری", "اطلاعات خدمت، زمان هماهنگی و پشتیبانی در یک مسیر منظم قرار می‌گیرد تا در لحظه فشار، بدانید قدم بعدی چیست."],
  ["bot", "هوش مصنوعی برای تریاژ اولیه", "دستیار با پرسش‌های مرحله‌ای به شناخت اولیه مشکل کمک می‌کند؛ تشخیص قطعی و تعمیر همچنان با متخصص انجام می‌شود."],
  ["clock", "وب و PWA بدون اجبار نصب", "در موقعیت اضطراری از نسخه وب درخواست بدهید و بعد از تجربه موفق، خودرو چاره را به صفحه اصلی اضافه کنید."],
  ["car", "خدمات متصل به سفر خودرو", "امداد، کارواش، باتری، تعمیرات سبک و فروشگاه در ادامه یک سفر مشتری قرار می‌گیرند، نه به شکل چند سرویس پراکنده."],
];

export default function AppPage() {
  return <SubpageShell>
    <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "اپلیکیشن خودرو چاره" }], "/app")} />
    <StructuredData data={webPageSchema({ name: "اپلیکیشن امداد خودرو خودرو چاره", description: "معرفی اپلیکیشن و نسخه وب خودرو چاره برای ثبت و پیگیری درخواست امداد خودرو در تهران و کرج.", path: "/app", breadcrumb: true })} />
    <section className="relative overflow-hidden bg-[#071a2e] text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,83,21,.2),transparent_25%),radial-gradient(circle_at_75%_55%,rgba(14,165,233,.2),transparent_30%)]" /><div className="site-container relative grid items-center gap-8 py-12 lg:grid-cols-[.9fr_1.1fr] lg:py-20" dir="ltr"><div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-white/5 lg:min-h-[590px]"><Image src="/images/app-premium-mockup.webp" alt="نمای اپلیکیشن خودرو چاره" fill priority sizes="(min-width:1024px) 48vw,100vw" className="object-contain p-2" /></div><div className="text-right" dir="rtl"><span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-200">نسخه وب، Android و iOS</span><h1 className="mt-6 text-3xl font-black leading-[1.55] md:text-5xl">وقتی خودرو متوقف می‌شود، مسیر کمک باید ساده باشد</h1><p className="mt-5 max-w-xl text-sm leading-8 text-slate-300">اپ خودرو چاره برای این ساخته می‌شود که انتخاب مشکل، موقعیت، قیمت و هماهنگی خدمت را در یک مسیر کوتاه جمع کند. نصب اجباری نیست؛ اول نجات، بعد تجربه کامل‌تر اپلیکیشن.</p><div className="mt-7 flex flex-wrap items-center gap-6 rounded-xl border border-white/10 bg-white/5 p-4"><PlatformLogo platform="android" /><PlatformLogo platform="ios" /><PlatformLogo platform="pwa" /></div><div className="mt-6 max-w-md rounded-2xl bg-white/10 p-4"><strong className="text-sm">خودرو چاره را به صفحه اصلی اضافه کنید</strong><p className="mt-2 text-xs leading-6 text-slate-300">بدون نیاز به دانلود، همیشه در دسترس؛ نسخه وب را مثل یک اپلیکیشن روی صفحه اصلی باز کنید.</p><AddToHomeButton /></div></div></div></section>
    <section className="site-container -mt-6 relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{benefits.map(([icon, title, body]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-brand-orange"><Icon name={icon} size={22} /></span><h2 className="mt-4 font-black">{title}</h2><p className="mt-2 text-xs leading-7 text-slate-500">{body}</p></article>)}</section>
    <section className="site-container mt-10 grid items-center gap-6 rounded-2xl bg-white p-6 shadow-card md:grid-cols-[1fr_auto] md:p-9" dir="ltr"><div className="text-right" dir="rtl"><span className="text-xs font-black text-brand-orange">شروع سریع بدون مانع</span><h2 className="mt-3 text-2xl font-black">درخواست امداد را به نصب اپ گره نمی‌زنیم</h2><p className="mt-3 max-w-2xl text-sm leading-8 text-slate-500">کاربر ممکن است کنار خیابان یا اتوبان باشد و فرصت دانلود نداشته باشد. نسخه وب/PWA باید اجازه دهد شماره، مشکل و موقعیت ثبت شود؛ نصب اپلیکیشن برای درخواست‌های بعدی ارزش بیشتری پیدا می‌کند.</p></div><QrCode /></section>
    <section className="site-container mt-10 rounded-2xl bg-ink p-7 text-white md:p-10"><div className="max-w-3xl"><span className="text-xs font-black text-orange-300">مزیت محصول</span><h2 className="mt-3 text-2xl font-black md:text-3xl">شبکه اعزام، قهرمان اصلی خودرو چاره است</h2><p className="mt-4 text-sm leading-8 text-slate-300">هوش مصنوعی، فروشگاه و محتوای آموزشی زمانی ارزشمند می‌شوند که محصول بتواند درخواست درست را به امدادگر مناسب برساند. هدف اپلیکیشن، ساخت تجربه‌ای شفاف برای انتخاب نوع امداد، اعلام موقعیت، هماهنگی هزینه و پیگیری تا پایان خدمت است؛ با تمرکز مرحله اول روی تراکم و کیفیت شبکه تهران و کرج.</p><Link href="/#request" className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-brand-orange px-6 text-sm font-black shadow-orange">ثبت درخواست از وب</Link></div></section>
  </SubpageShell>;
}
