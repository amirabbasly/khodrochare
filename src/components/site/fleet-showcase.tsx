import Link from "next/link";
import Image from "next/image";


export function FleetShowcase() {
  return <section className="site-container mt-10" dir="rtl" aria-labelledby="fleet-showcase-title">
    <div className="grid items-center gap-10 overflow-hidden rounded-3xl border border-white/20 bg-[linear-gradient(120deg,#0B2D6B,#091a38)] p-6 text-white md:grid-cols-[.8fr_1.2fr] md:p-10">
      <div className="mx-auto w-full max-w-xs rounded-[36px] border-2 border-slate-500 bg-[#040b19] p-5 shadow-2xl">
        <div className="mx-auto mb-5 h-1 w-14 rounded-full bg-slate-500" />
        <Image src="/images/khodrochare-brand-wordmark-dark.webp" alt="خودرو چاره" width={240} height={80} className="mx-auto h-16 w-auto object-contain" />
        <p className="mt-5 text-center text-lg font-black">همراه سفیران خودرو چاره</p>
        <ul className="mt-6 grid gap-3 text-sm">{["ثبت‌نام و بررسی مدارک", "انتخاب محدوده و نوع فعالیت", "بررسی فرصت‌های همکاری", "هماهنگی خدمت و پیگیری"].map((item, i) => <li key={item} className="rounded-xl border border-white/15 bg-white/5 p-3"><span className="ml-3 text-orange-300">{(i + 1).toLocaleString("fa-IR")}</span>{item}</li>)}</ul>
        <p className="mt-5 text-center text-[10px] text-slate-400">نمای معرفی مسیر همکاری؛ تصویر محیط واقعی اپ نیست</p>
      </div>
      <div><p className="text-xs font-bold text-orange-300">مهارت شما، فرصت همکاری بیشتر</p><h2 id="fleet-showcase-title" className="mt-4 text-2xl font-black leading-loose md:text-3xl">اپلیکیشن سفیران خودرو چاره؛ مسیر کسب درآمد از خدمات خودرو</h2><p className="mt-5 text-sm leading-8 text-slate-200">اگر امدادگر، مکانیک سیار یا مالک یدک‌کش و خودروبر هستید، از مسیر اختصاصی سفیران برای معرفی توانایی و محدوده فعالیت خود اقدام کنید. فرصت‌های متناسب با تجهیزات و ظرفیت شما پس از بررسی شرایط همکاری پیگیری می‌شوند.</p><Link href="/app" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-brand-orange px-6 text-sm font-black text-white">ثبت نام و ورود سفیران خودرو چاره</Link><p className="mt-4 text-xs leading-7 text-slate-300">درآمد ثابت یا تعداد مشخص مأموریت تضمین نمی‌شود؛ تقاضای منطقه، زمان فعالیت، هزینه سوخت و استهلاک و شرایط تسویه بر درآمد خالص مؤثرند.</p></div>
    </div>
  </section>;
}
