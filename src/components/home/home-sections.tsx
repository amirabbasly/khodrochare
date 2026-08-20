import Image from "next/image";
import Link from "next/link";
import {
  brands,
  miniServices,
  processSteps,
  products,
  serviceTiles,
  trustItems,
} from "./home-content";
import { QrCode } from "./home-illustrations";
import { blogPosts } from "@/content/blog";
import { BrandLogo, BrandMark, ButtonLink, Icon, PlatformLogo, SectionTitle } from "./home-ui";
import { AiChat } from "./ai-chat";
import { AddToHomeButton } from "./add-to-home-button";
import { HeroCarousel } from "./hero-carousel";
// The site-wide header and footer live in shared site components.

export function HeroSection() {
  return <HeroCarousel />;
}

export function ServiceStrip() {
  const servicePaths = ["/services/tow-truck", "/services/jump-start", "/services/mobile-carwash", "/store"];
  return (
    <section className="site-container relative z-20 -mt-5 lg:-mt-[120px]" aria-label="درخواست و دسته‌بندی خدمات" data-aos="fade-up">
      <div className="grid items-end gap-3 lg:grid-cols-[1fr_400px]" dir="ltr">
        <div className="order-2 grid grid-cols-2 rounded-xl border border-slate-200 bg-white p-2 shadow-card md:grid-cols-4 lg:order-1" dir="rtl">
          {serviceTiles.map((item, index) => (
            <a
              href={servicePaths[index]}
              key={item.title}
              className={`group flex min-h-28 flex-col items-center justify-center gap-3 rounded-lg p-3 text-center transition hover:bg-orange-50 ${index ? "md:border-r md:border-slate-200" : ""}`}
              data-aos="zoom-in"
              data-aos-delay={index * 60}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition group-hover:border-orange-200 group-hover:text-brand-orange"><Icon name={item.icon} /></span>
              <span className="text-sm font-black text-ink">{item.title}</span>
            </a>
          ))}
        </div>
        <RequestForm />
      </div>
    </section>
  );
}

function RequestForm() {
  return (
    <form id="request" className="order-1 w-full rounded-xl bg-white p-4 text-ink shadow-2xl lg:order-2" dir="rtl" aria-label="فرم درخواست خدمت">
      <div className="flex items-center justify-between"><h2 className="text-sm font-black">درخواست خدمت</h2><Icon name="form" size={18} className="text-brand-orange" /></div>
      <div className="mt-3 grid gap-2">
        <label className="sr-only" htmlFor="service">نوع خدمت</label>
        <select id="service" defaultValue="" className="form-control"><option value="" disabled>نوع خدمت را انتخاب کنید</option><option>امداد و یدک‌کش</option><option>کارواش سیار</option><option>مکانیک سیار</option><option>باتری و برق</option></select>
        <label className="sr-only" htmlFor="vehicle">نوع خودرو</label>
        <select id="vehicle" defaultValue="" className="form-control"><option value="" disabled>نوع خودرو را انتخاب کنید</option><option>سواری</option><option>شاسی‌بلند</option><option>وانت</option></select>
        <label className="sr-only" htmlFor="address">موقعیت فعلی</label>
        <input id="address" className="form-control" placeholder="مکان شما کجاست؟" autoComplete="street-address" />
        <button type="submit" className="min-h-11 rounded-lg bg-brand-orange text-xs font-black text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange">ثبت درخواست</button>
      </div>
    </form>
  );
}

export function FeatureBanners() {
  return (
    <section id="services" className="section-shell grid gap-3 lg:grid-cols-2" data-aos="fade-up">
      <div data-aos="fade-left"><ServiceBanner href="/services/tow-truck" image="/images/service-tow.webp" title="امداد خودرو و یدک‌کش" desc="امداد سریع در محل، حمل ایمن خودرو و پشتیبانی تا رسیدن به مقصد" /></div>
      <div data-aos="fade-right"><ServiceBanner href="/services/mobile-carwash" image="/images/service-carwash.webp" title="کارواش سیار" desc="شست‌وشوی حرفه‌ای خودرو در محل با تجهیزات کامل و مواد استاندارد" /></div>
    </section>
  );
}

function ServiceBanner({ href, image, title, desc }: { href: string; image: string; title: string; desc: string }) {
  return (
    <article className="relative min-h-48 overflow-hidden rounded-xl bg-ink text-white shadow-card">
      <Image src={image} alt={title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-right" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/72 to-transparent" />
      <div className="relative flex min-h-48 w-[56%] flex-col justify-center p-5" dir="rtl">
        <h2 className="text-xl font-black md:text-2xl">{title}</h2>
        <p className="mt-2 text-xs leading-6 text-slate-200">{desc}</p>
            <Link href={href} className="mt-4 inline-flex min-h-10 w-fit items-center gap-2 rounded-lg border border-white/45 px-4 text-xs font-bold">جزئیات خدمت <span aria-hidden="true">←</span></Link>
      </div>
    </article>
  );
}

export function MiniServices() {
  const servicePaths = ["/services/jump-start", "/services/mobile-mechanic", "/store"];
  return (
    <section className="section-shell grid gap-3 md:grid-cols-3" data-aos="fade-up">
      {miniServices.map((item, index) => (
        <article key={item.title} className="grid min-h-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:grid-cols-[.9fr_1.1fr] md:grid-cols-1 xl:grid-cols-[.9fr_1.1fr]" dir="ltr" data-aos="fade-up" data-aos-delay={index * 80}>
          <div className="flex flex-col justify-center p-4" dir="rtl">
            <h2 className="text-xl font-black text-ink">{item.title}</h2>
            <p className="mt-2 text-xs leading-6 text-slate-600">{item.desc}</p>
            <Link href={servicePaths[index]} className="mt-3 inline-flex min-h-9 w-fit items-center rounded-md border border-brand-orange px-3 text-[11px] font-bold text-brand-orange">مشاهده جزئیات</Link>
          </div>
          <div className="relative min-h-44 overflow-hidden bg-slate-100">
            <Image src={item.image} alt={item.title} fill sizes="(min-width: 1280px) 18vw, (min-width: 768px) 33vw, 55vw" className="object-cover" style={{ objectPosition: item.position }} />
          </div>
        </article>
      ))}
    </section>
  );
}

export function ChatSection() {
  return (
    <section id="assistant" className="section-shell relative isolate overflow-hidden rounded-xl border-2 border-cyan-500/45 bg-[#03172b] text-white shadow-card" data-aos="fade-up">
      <Image src="/images/assistant-bg.webp" alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div className="absolute inset-0 -z-10 bg-[#03172b]/25" />
      <div className="px-5 pt-6"><SectionTitle light title="دستیار هوشمند خودرو چاره" desc="مشکل خودرو را بگویید تا دستیار هوشمند، راهکار مناسب و نزدیک‌ترین متخصص را پیشنهاد کند" /><Link href="/assistant" className="mx-auto mt-4 flex min-h-10 w-fit items-center rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-4 text-xs font-black text-cyan-100">ورود به صفحه کامل دستیار</Link></div>
      <div className="grid gap-4 p-4 pt-5 lg:grid-cols-2" dir="ltr">
        <div dir="rtl"><AiChat embedded /></div>
        <VoicePanel />
      </div>
      <div className="grid border-t border-white/10 md:grid-cols-3">
        {[["user", "اتصال به متخصص مناسب"], ["spark", "پیشنهاد راه‌حل فوری"], ["engine", "تشخیص اولیه مشکل"]].map(([icon, title]) => (
          <div key={title} className="flex min-h-20 items-center justify-center gap-3 border-white/10 p-4 md:border-r first:md:border-0"><Icon name={icon} className="text-cyan-300" /><span className="text-xs font-bold">{title}</span></div>
        ))}
      </div>
      <p className="border-t border-white/10 py-2 text-center text-[10px] text-slate-400">حریم خصوصی شما برای خودرو چاره مهم است و مکالمات با امنیت کامل پردازش می‌شوند.</p>
    </section>
  );
}

function VoicePanel() {
  return (
    <div className="rounded-xl border border-cyan-400/30 bg-[#061526]/88 p-5 text-center" dir="rtl">
      <div className="mx-auto flex h-14 max-w-xs items-center justify-center gap-1" aria-hidden="true">{[18, 28, 42, 62, 36, 24, 50, 70, 40, 25, 16].map((height, index) => <span key={index} className={`w-1 rounded-full ${index < 6 ? "bg-cyan-400" : "bg-orange-500"}`} style={{ height }} />)}</div>
      <div className="relative mx-auto flex h-44 w-44 items-center justify-center"><div className="voice-ring absolute inset-0 rounded-full border border-cyan-400/30" /><div className="voice-ring voice-ring-delay absolute inset-6 rounded-full border border-orange-400/30" /><span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle,#1e9bd1,#08304f)] shadow-[0_0_50px_rgba(24,180,225,.45)]"><Icon name="mic" size={42} /></span></div>
      <p className="text-xs text-slate-300">در حال شنیدن...</p>
      <button className="mt-5 min-h-11 rounded-lg bg-brand-orange px-7 text-sm font-black">برای توضیح مشکل صحبت کنید</button>
    </div>
  );
}

export function AppSection() {
  return (
    <section id="app" className="section-shell overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-card md:p-8" data-aos="fade-up">
      <div className="grid items-center gap-8 lg:grid-cols-[.82fr_1.18fr]" dir="ltr">
        <div dir="rtl">
          <h2 className="text-2xl font-black text-ink md:text-3xl">اپلیکیشن اختصاصی خودرو چاره</h2>
          <p className="mt-3 text-sm leading-7 text-slate-500">تمام خدمات خودرو، دستیار هوشمند و پیگیری زنده همیشه همراه شما</p>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[["location", "پیگیری زنده"], ["chat", "دستیار هوشمند"], ["clock", "سوابق خدمات"]].map(([icon, title], index) => <div key={title} className="rounded-lg border border-slate-200 p-3 text-center" data-aos="zoom-in" data-aos-delay={index * 80}><Icon name={icon} size={22} className="mx-auto text-slate-600" /><p className="mt-2 text-[10px] font-bold">{title}</p></div>)}
          </div>
          <div className="mt-5 grid gap-2"><ButtonLink href="/app">صفحه کامل اپلیکیشن</ButtonLink><Link href="/app" className="inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-400 text-sm font-bold text-slate-700">راهنمای نصب نسخه وب</Link></div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-bold text-slate-600" dir="ltr"><PlatformLogo platform="android" /><PlatformLogo platform="ios" /><PlatformLogo platform="pwa" /></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm"><QrCode /><div><strong className="text-sm text-ink">اسکن و نصب سریع</strong><p className="mt-1 text-[10px] leading-5 text-slate-500">دوربین موبایل را روی کد بگیرید</p></div></div>
            <div className="flex items-start gap-3 rounded-xl bg-ink p-4 text-white"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white/20 text-3xl font-black text-brand-orange">+</span><div className="min-w-0 flex-1"><strong className="text-sm">خودرو چاره را به صفحه اصلی اضافه کنید</strong><p className="mt-2 text-[10px] text-slate-300">بدون نیاز به دانلود، همیشه در دسترس</p><AddToHomeButton /></div></div>
          </div>
        </div>
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_50%,#fff_40%,#eef3f6_100%)] sm:min-h-[500px]" data-aos="fade-right">
          <Image src="/images/app-premium-mockup.webp" alt="دموی اپلیکیشن خودرو چاره شامل درخواست خدمت، رهگیری امدادگر و دستیار هوشمند" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-contain object-center p-1 sm:p-3" />
        </div>
      </div>
    </section>
  );
}

export function CoverageSection() {
  return (
    <section id="coverage" className="section-shell overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card" data-aos="fade-up">
      <div className="grid lg:grid-cols-[.92fr_1.08fr]" dir="ltr">
        <div className="grid min-h-64 gap-3 border-slate-200 bg-slate-50 p-3 min-[460px]:grid-cols-[1.3fr_.7fr] lg:border-r" dir="ltr">
          <div className="relative min-h-60 overflow-hidden rounded-xl border-slate-200 bg-[#071a2e] sm:border-r"><Image src="/images/coverage-iran-glass-v2.webp" alt="نقشه سه‌بعدی محدوده پوشش خودرو چاره در ایران" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" /><span className="absolute right-[34%] top-[38%] rounded-full border border-emerald-300/60 bg-emerald-400/20 px-2 py-1 text-[9px] font-black text-white">تهران و کرج فعال</span><span className="absolute bottom-3 right-3 rounded-lg bg-ink/70 px-3 py-2 text-[9px] text-slate-200 backdrop-blur-sm">سایر شهرها در صف فعال‌سازی</span></div>
          <aside className="flex flex-col justify-center rounded-xl border border-slate-200 bg-white p-4 text-right shadow-[0_14px_35px_rgba(15,30,48,.16)]" dir="rtl" data-aos="fade-right">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-ink"><Image src="/images/technician.webp" alt="پروفایل امدادگر در مسیر" fill sizes="56px" className="object-cover object-[18%_28%]" /></div>
              <div><strong className="block text-xs text-ink">مهدی حسینی</strong><span className="mt-1 block text-[9px] text-slate-500">امدادگر منتخب</span><span className="text-[10px] text-amber-500">★ ۴.۹</span></div>
            </div>
            <div className="my-4 h-px bg-slate-100" />
            <span className="text-[10px] text-slate-500">زمان رسیدن</span><strong className="mt-1 text-lg text-emerald-600">۱۸ دقیقه</strong>
            <dl className="mt-4 grid gap-2 text-[10px]"><div className="flex justify-between"><dt className="text-slate-400">نوع خدمت</dt><dd className="font-bold text-ink">امداد باتری</dd></div><div className="flex justify-between"><dt className="text-slate-400">خودرو</dt><dd className="font-bold text-ink">RAV4</dd></div></dl>
          </aside>
        </div>
        <div className="flex flex-col justify-center p-5 md:p-7" dir="rtl">
          <h2 className="text-center text-xl font-black text-ink md:text-2xl">نزدیک‌ترین متخصص، در کوتاه‌ترین زمان</h2>
          <Link href="/coverage" className="mx-auto mt-4 inline-flex min-h-10 items-center justify-center rounded-lg border border-brand-orange px-4 text-xs font-black text-brand-orange transition hover:bg-orange-50">مشاهده نقشه کامل محدوده پوشش</Link>
          <div className="mt-8 grid grid-cols-3 gap-2 md:gap-5">
            {processSteps.map((step, index) => <div key={step.title} className="relative min-w-0 text-center" data-aos="fade-up" data-aos-delay={index * 90}><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-100 bg-white text-slate-600 shadow-sm sm:h-16 sm:w-16"><Icon name={step.icon} size={24} /></span><span className="mt-3 block text-[10px] font-black sm:text-xs">{step.title}</span><p className="mx-auto mt-2 max-w-36 text-[8px] leading-4 text-slate-500 sm:text-[10px] sm:leading-5">{step.desc}</p>{index < 2 && <span className="absolute left-[-24%] top-8 hidden w-[48%] border-t border-dashed border-slate-300 md:block" />}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustSection() {
  return (
    <section id="trust" className="section-shell relative overflow-hidden rounded-xl bg-ink text-white shadow-card" data-aos="fade-up">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_22%,rgba(13,86,132,.26),transparent_34%),linear-gradient(125deg,#031326,#08233c)]" />
      <div className="relative grid lg:grid-cols-[220px_1fr]" dir="ltr">
        <div className="relative min-h-44 lg:min-h-60"><Image src="/images/technician.webp" alt="تکنسین مورد اعتماد خودرو چاره" fill sizes="220px" className="object-cover object-[18%_25%]" /><div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink" /></div>
        <div className="p-5" dir="rtl">
        <h2 className="text-center text-xl font-black md:text-2xl">چرا به خودرو چاره اعتماد کنید؟</h2>
        <div className="mt-5 grid grid-cols-2 gap-y-4 divide-white/15 md:grid-cols-4 md:divide-x md:divide-x-reverse">
          {trustItems.map((item, index) => <div key={item.title} className={`flex min-h-32 flex-col items-center justify-center px-3 text-center ${index === 2 ? "rounded-xl border border-amber-400/55 bg-amber-400/8 shadow-[0_0_28px_rgba(245,158,11,.12)]" : ""}`} data-aos="zoom-in" data-aos-delay={index * 90}><Image src={item.image} alt={`نشان ${item.title}`} width={index === 2 ? 68 : 52} height={index === 2 ? 78 : 52} className={index === 2 ? "h-[72px] w-16 drop-shadow-[0_5px_14px_rgba(245,158,11,.4)]" : "h-13 w-13 object-contain"} /><h3 className={`mt-2 text-xs font-black ${index === 2 ? "text-amber-400" : ""}`}>{item.title}</h3><p className="mt-1 text-[9px] leading-5 text-slate-300">{item.desc}</p></div>)}
        </div>
        </div>
      </div>
    </section>
  );
}

export function ProductsSection() {
  return (
    <section id="products" className="section-shell" data-aos="fade-up">
      <div className="grid gap-3 lg:grid-cols-[1fr_300px]" dir="ltr">
        <div className="relative min-h-40 overflow-hidden rounded-xl border-r-[12px] border-brand-orange bg-ink p-5 text-white shadow-card">
          <Image src="/images/parts-catalog.webp" alt="قطعات اصلی خودرو با واردات مستقیم" fill sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover object-right opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-l from-ink/80 via-ink/88 to-ink/75" />
          <div className="relative flex min-h-30 flex-col items-center justify-between gap-5 sm:flex-row" dir="ltr">
            <div className="flex shrink-0 items-center gap-3" data-aos="fade-right">
              {["/images/import-package.svg", "/images/import-certified.svg", "/images/import-global.svg"].map((src, index) => <span key={src} className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 backdrop-blur-sm"><Image src={src} alt={["بسته‌بندی ایمن قطعات", "تضمین اصالت قطعات", "واردات مستقیم جهانی"][index]} width={52} height={52} className="h-full w-full object-contain" /></span>)}
            </div>
            <div className="max-w-lg text-center sm:text-right" dir="rtl" data-aos="fade-left"><p className="text-xl font-black text-brand-orange md:text-2xl">واردات مستقیم، قیمت بی‌واسطه</p><h2 className="mt-2 text-sm font-black">قطعات اصلی و مصرفی با تضمین اصالت</h2><p className="mt-2 text-[10px] leading-5 text-slate-300">قطعات اصلی را مستقیم وارد می‌کنیم تا شما کمتر بپردازید.</p></div>
          </div>
        </div>
        <StoreStats />
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_300px]" dir="ltr">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-5" dir="rtl">
          {products.map((item, index) => <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm" data-aos="fade-up" data-aos-delay={index * 65}><div className="relative flex h-24 items-center justify-center overflow-hidden rounded-lg bg-[#f3f0eb]"><Image src={item.image} alt={item.title} fill sizes="180px" className="object-cover" /></div><h3 className="mt-3 text-xs font-black text-ink">{item.title}</h3><p className="mt-1 text-[10px] text-amber-500">★ {item.rating}</p><div className="mt-2 flex items-center justify-between"><span className="text-xs font-black text-ink">{item.price} <small className="font-normal text-slate-500">تومان</small></span><button aria-label={`افزودن ${item.title} به سبد خرید`} className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-orange text-white">+</button></div></article>)}
        </div>
        <aside className="rounded-lg border border-slate-200 bg-white p-4" dir="rtl"><h3 className="text-center text-sm font-black text-ink">برندهای مورد اعتماد</h3><div className="mt-4 grid grid-cols-4 overflow-hidden rounded-lg border border-slate-200">{brands.map((brand) => <div key={brand.key} className="flex min-h-16 items-center justify-center border-b border-l border-slate-200 bg-white p-1 last:border-l-0" title={brand.name}><BrandLogo brand={brand.key} /></div>)}</div></aside>
      </div>
    </section>
  );
}

function StoreStats() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm" dir="rtl">
      <h3 className="text-sm font-black text-ink">فروشگاه قطعات منتخب</h3>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[["award", "۶.۸", "امتیاز"], ["check", "۵۲,۴۳۰+", "سفارش"], ["clock", "۱۸", "دقیقه"]].map(([icon, value, label]) => <div key={label}><Icon name={icon} size={20} className="mx-auto text-slate-500" /><strong className="mt-2 block text-sm text-ink">{value}</strong><span className="text-[9px] text-slate-400">{label}</span></div>)}
      </div>
      <Link href="/store" className="mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-lg bg-ink text-xs font-black !text-white transition hover:bg-[#0b2b49]">ورود به فروشگاه کامل</Link>
    </aside>
  );
}

export function ContactCta() {
  return (
    <section id="contact" className="section-shell relative overflow-hidden rounded-xl bg-ink text-white shadow-card" data-aos="fade-up">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_50%,rgba(21,116,167,.2),transparent_25%),linear-gradient(90deg,#06172a,#031426)]" />
      <div className="relative grid items-center gap-4 p-4 text-center md:grid-cols-[280px_1fr_150px] md:p-0 md:pr-5" dir="ltr">
        <div className="relative h-44 overflow-hidden rounded-lg md:h-48 md:rounded-none" data-aos="fade-right"><Image src="/images/support-technician-night.webp" alt="تکنسین امداد خودرو در حال پاسخ‌گویی تلفنی کنار ون امدادی" fill sizes="(min-width: 768px) 280px, 100vw" className="object-cover object-[23%_38%]" /><div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-ink md:block" /></div>
        <div className="py-2 text-center" dir="rtl" data-aos="fade-up"><h2 className="text-xl font-black">همین حالا کمک می‌خواهید؟</h2><p className="mt-2 text-xs text-slate-300">با یک تماس، نزدیک‌ترین متخصص به سمت شما می‌آید.</p><div className="mt-4 flex flex-wrap items-center justify-center gap-4"><ButtonLink href="tel:09123022064"><Icon name="phone" size={18} /> تماس فوری</ButtonLink><a href="tel:09123022064" dir="ltr" className="text-xl font-black tracking-wide text-white">09123022064</a></div></div>
        <div className="flex items-center justify-center py-2" data-aos="zoom-in">
          <div className="relative h-32 w-32 rounded-full border-2 border-cyan-300/30 bg-[radial-gradient(circle,#123b58_0%,#071a2e_68%)] shadow-[0_0_35px_rgba(14,165,233,.2)]" aria-label="دسترسی سریع به تماس صوتی، چت و دانلود">
            <span className="absolute left-1/2 top-3 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/15"><Icon name="mic" className="text-cyan-200" /></span>
            <span className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-full border border-orange-300/40 bg-orange-400/15"><Icon name="chat" className="text-orange-200" /></span>
            <span className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/8"><Icon name="download" /></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function MagazineSection() {
  return (
    <section className="section-shell rounded-2xl bg-[#f3f5f7] py-6 md:py-8" aria-labelledby="magazine-title" data-aos="fade-up">
      <div className="flex items-center justify-between gap-4 px-1" dir="rtl"><h2 id="magazine-title" className="text-2xl font-black text-ink md:text-3xl">مجله خودرو چاره</h2><Link href="/blog" className="text-sm font-black text-brand-orange">موارد بیشتر ←</Link></div>
      <div className="mt-6 grid gap-5 md:grid-cols-3" dir="rtl">{blogPosts.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card"><div className="relative h-48 overflow-hidden"><Image src={post.image} alt={post.title} fill sizes="(min-width:768px) 33vw,100vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-5"><div className="flex items-center justify-between text-[10px]"><span className="font-black text-brand-orange">{post.category}</span><span className="text-slate-400">{post.readTime}</span></div><h3 className="mt-3 line-clamp-2 text-base font-black leading-8 text-ink">{post.title}</h3><p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500">{post.excerpt}</p><span className="mt-4 inline-flex text-xs font-black text-brand-orange">مطالعه مقاله ←</span></div></Link>)}</div>
    </section>
  );
}

export function LegacySiteFooter() {
  return (
    <footer className="mt-3 rounded-t-xl bg-[#031224] text-white">
      <div className="site-container grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-5">
        <div><BrandMark /><p className="mt-3 text-xs leading-6 text-slate-400">راه‌حل فوری برای هر مشکل خودرو؛ امداد و خدمات شبانه‌روزی در تهران و کرج.</p></div>
        <div><h2 className="text-sm font-black">اطلاعات تماس</h2><div className="mt-3 space-y-2 text-xs text-slate-400"><p>۰۹۱۲۳۰۲۲۰۶۴</p><p>info@khodrochare.ir</p><p>تهران، خیابان آزادی</p></div></div>
        <div><h2 className="text-sm font-black">فروشگاه</h2><div className="mt-3 grid gap-2 text-xs text-slate-400"><a href="#products">قطعات یدکی</a><a href="#products">باتری خودرو</a><a href="#products">روغن و فیلتر</a></div></div>
        <div><h2 className="text-sm font-black">دسترسی سریع</h2><div className="mt-3 grid gap-2 text-xs text-slate-400"><a href="#services">خدمات</a><a href="#app">اپلیکیشن</a><a href="#assistant">دستیار هوشمند</a><a href="#trust">درباره ما</a></div></div>
        <div>
          <h2 className="text-sm font-black">مجوزهای رسمی</h2>
          <div className="mt-3 flex gap-2">
            <figure className="w-20 text-center"><div className="relative h-24 overflow-hidden rounded-lg bg-white p-1"><Image src="/images/permit-enamad.svg" alt="تصویر نماد اعتماد الکترونیکی خودرو چاره" fill sizes="80px" className="object-contain p-1" /></div><figcaption className="mt-2 text-[8px] leading-4 text-slate-300">نماد اعتماد الکترونیکی</figcaption></figure>
            <figure className="w-20 text-center"><div className="relative h-24 overflow-hidden rounded-lg bg-white p-1"><Image src="/images/permit-union.svg" alt="تصویر مجوز اتحادیه کسب‌وکارهای مجازی خودرو چاره" fill sizes="80px" className="object-contain p-1" /></div><figcaption className="mt-2 text-[8px] leading-4 text-slate-300">اتحادیه کسب‌وکارهای مجازی</figcaption></figure>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-3 text-center text-[10px] text-slate-500">تمام حقوق این وب‌سایت برای خودرو چاره محفوظ است.</div>
    </footer>
  );
}
