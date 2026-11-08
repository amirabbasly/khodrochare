import { AppShowcaseBanner, TrustShowcaseBanner } from "./app-trust-banners";
import { CoverageExplorer } from "./coverage-explorer";
import { allCities } from "@/content/coverage";
import { BrandCarousel } from "./brand-carousel";
import Image from "next/image";
import { RequestPreviewCard } from "./request-preview-card";
import Link from "next/link";
import {
  processSteps,
  serviceTiles,
} from "./home-content";
import { latestHomeArticles } from "@/content/home-articles";
import { blogPosts } from "@/content/blog";
import { BlogSlider } from "./blog-slider";
import { BrandMark, Icon } from "./home-ui";
import { HeroCarousel } from "./hero-carousel";
import { homeLocalLinkGroups } from "@/content/home-local-links";
// The site-wide header and footer live in shared site components.

export function HeroSection() {
  return <HeroCarousel />;
}

export function ServiceStrip() {
  const servicePaths = ["/services/tow-truck", "/services/jump-start", "/services/mobile-carwash", "/store"];
  return (
    <section className="site-container relative z-20 -mt-5 lg:-mt-[120px]" aria-label="درخواست و دسته‌بندی خدمات" data-testid="service-strip" data-aos="fade-up">
      <div className="grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_400px]" dir="ltr">
        <div className="order-2 min-w-0 space-y-3 lg:order-1">
        <div data-testid="service-categories" className="service-category-grid grid min-w-0 grid-cols-4 gap-1.5 sm:gap-3 lg:order-1" dir="rtl">
          {serviceTiles.map((item, index) => (
            <a
              href={servicePaths[index]}
              key={item.title}
              className="service-category-card group flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl px-1 py-3 text-center sm:px-3 sm:py-4"
              data-aos="zoom-in"
              data-aos-delay={index * 60}
            >
              <span className="service-category-art"><Image src={item.image} alt="" width={160} height={160} sizes="(min-width: 1024px) 104px, (min-width: 640px) 96px, 64px" className="h-full w-full object-contain" /></span>
              <span className="service-category-label text-[10px] font-black leading-5 sm:text-sm">{item.title}</span>
            </a>
          ))}
        </div>
        <BrandCarousel />
        </div>
        <RequestPreviewCard />
      </div>
    </section>
  );
}


export function FeatureBanners() {
  return (
    <section id="services" className="mt-4 w-full" data-aos="fade-up"><div className="site-container grid gap-4 lg:grid-cols-2">
      <div data-aos="fade-left"><ServiceBanner href="/services/tow-truck" image="/images/service-tow.webp" title="امداد خودرو و یدک‌کش" desc="امداد سریع در محل، حمل ایمن خودرو و پشتیبانی تا رسیدن به مقصد" /></div>
      <div data-aos="fade-right"><ServiceBanner href="/services/mobile-carwash" image="/images/service-carwash.webp" title="کارواش سیار" desc="شست‌وشوی حرفه‌ای خودرو در محل با تجهیزات کامل و مواد استاندارد" /></div>
    </div></section>
  );
}

function ServiceBanner({ href, image, title, desc }: { href: string; image: string; title: string; desc: string }) {
  return (
    <article className="relative isolate min-h-64 overflow-hidden rounded-2xl border border-white/30 bg-ink text-white shadow-card">
      <Image src={image} alt={title} fill sizes="(min-width: 1024px) 50vw, 100vw" className="-z-20 object-cover object-center" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-l from-ink/90 via-ink/55 to-ink/10" />
      <div className="relative flex min-h-64 w-full flex-col justify-center p-6 md:p-8" dir="rtl">
        <h2 className="text-xl font-black md:text-2xl">{title}</h2>
        <p className="mt-3 max-w-sm text-sm leading-7 text-slate-200">{desc}</p>
            <Link href={href} className="mt-4 inline-flex min-h-10 w-fit items-center gap-2 rounded-lg border border-white/45 px-4 text-xs font-bold">جزئیات خدمت <span aria-hidden="true">←</span></Link>
      </div>
    </article>
  );
}

export function AppSection() {
  return <AppShowcaseBanner />;
}

function CoverageProcess() {
  return <section className="coverage-process" aria-label="مراحل هماهنگی متخصص">
        <div className="flex flex-col justify-center p-5 md:p-7" dir="rtl">
          <h2 className="text-center text-xl font-black text-ink md:text-2xl">هماهنگی متخصص بر اساس خودرو و موقعیت</h2>
          <Link href="/coverage" className="mx-auto mt-4 inline-flex min-h-10 items-center justify-center rounded-lg border border-brand-orange px-4 text-xs font-black text-brand-orange transition hover:bg-orange-50">مشاهده نقشه کامل محدوده پوشش</Link>
          <div className="mt-8 grid grid-cols-3 gap-2 md:gap-5">
            {processSteps.map((step, index) => <div key={step.title} className="relative min-w-0 text-center" data-aos="fade-up" data-aos-delay={index * 90}><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-100 bg-white text-slate-600 shadow-sm sm:h-16 sm:w-16"><Icon name={step.icon} size={24} /></span><span className="mt-3 block text-[10px] font-black sm:text-xs">{step.title}</span><p className="mx-auto mt-2 max-w-36 text-[8px] leading-4 text-slate-500 sm:text-[10px] sm:leading-5">{step.desc}</p>{index < 2 && <span className="absolute left-[-24%] top-8 hidden w-[48%] border-t border-dashed border-slate-300 md:block" />}</div>)}
          </div>
        </div>
<p className="px-5 pb-5 text-xs text-slate-300">تهران، کرج و شمال فعال · محدوده‌ها و زمان اعزام را پیش از خدمت بررسی کنید.</p></section>;
}

export function SeoServiceHub() {
  return <CoverageExplorer cities={allCities.map(({ slug, name, province }) => ({ slug, name, province }))}>
    <SeoServiceDirectory />
    <CoverageProcess />
    <nav className="coverage-complete-cities" aria-label="صفحه همه شهرهای تحت پوشش">{allCities.map(city => <Link prefetch={false} key={city.slug} href={`/${city.slug}`}>امداد خودرو {city.name}</Link>)}</nav>
  </CoverageExplorer>;
}

function SeoServiceDirectory() {
  const commercialServices = [
    ["امداد خودرو در محل", "/services/roadside-assistance", "عیب‌یابی اولیه و رفع خرابی‌های قابل‌تعمیر در محل"],
    ["یدک کش تهران و کرج", "/services/tow-truck", "حمل خودرو پس از بررسی نوع گیربکس، چرخ‌ها و مسیر"],
    ["خودروبر تهران و کرج", "/services/flatbed-carrier", "حمل ایمن خودروهای لوکس، صفر، تصادفی یا غیرقابل حرکت"],
    ["مکانیک سیار تهران و کرج", "/services/mobile-mechanic", "اعزام مکانیک برای عیب‌یابی و تعمیرات مجاز در محل"],
  ] as const;


  return (
    <section className="section-shell grid gap-5 lg:grid-cols-[.78fr_1.22fr]" aria-labelledby="emergency-services-title" dir="ltr">
      <article className="rounded-2xl bg-ink p-6 text-white shadow-card md:p-8" dir="rtl">
        <p className="text-xs font-black text-orange-300">مناطق تحت پوشش</p>
        <h2 className="mt-3 text-2xl font-black">امداد خودرو تهران، کرج و شمال</h2><nav className="mt-4 flex flex-wrap gap-3 text-sm text-orange-300" aria-label="راهنماهای اصلی"><Link href="/امداد-خودرو">انتخاب خدمت امداد خودرو</Link><Link href="/امداد-خودرو-آنلاین">امداد خودرو آنلاین</Link><Link href="/شمال">پوشش شمال کشور</Link><Link href="/brands">برندهای خودرو</Link><Link href="/pricing">قیمت خدمات</Link></nav>
        <p className="mt-4 text-sm leading-8 text-slate-300">شبکه خودرو چاره در تهران، کرج، گیلان، مازندران و گلستان فعال است. برای مشاهده خدمات، محدوده‌ها و روش ثبت درخواست آنلاین، صفحه شهر خود را انتخاب کنید.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link href="/تهران" className="rounded-xl border border-white/15 bg-white/5 p-4 transition hover:border-orange-300/60"><strong className="block">امداد خودرو تهران</strong><span className="mt-2 block text-xs text-slate-300">تهران و مسیرهای شهری فعال ←</span></Link>
          <Link href="/کرج" className="rounded-xl border border-white/15 bg-white/5 p-4 transition hover:border-orange-300/60"><strong className="block">امداد خودرو کرج</strong><span className="mt-2 block text-xs text-slate-300">کرج و محدوده‌های قابل هماهنگی ←</span></Link>
        </div>
        <section data-testid="home-north-hub" className="mt-5 rounded-2xl border border-cyan-200/20 bg-gradient-to-br from-cyan-400/10 via-white/5 to-orange-400/10 p-5 shadow-lg backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3"><h3 className="text-xl font-black">امداد خودرو شمال</h3><Link href="/شمال" className="rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[11px] font-bold text-cyan-100">همه مناطق ←</Link></div>
          <p className="mt-3 text-xs leading-7 text-slate-300">از شهرهای ساحلی تا محورهای ورودی شمال؛ شهر، مسیر یا برند خودروی خود را انتخاب کنید.</p>
          <nav aria-label="استان‌های شمال" className="mt-4 grid grid-cols-3 gap-2">{["گیلان", "مازندران", "گلستان"].map(name => <Link key={name} href={`/${name}`} className="rounded-xl border border-white/15 bg-white/10 p-3 text-center text-xs font-bold transition hover:bg-white/20">{name}</Link>)}</nav>
          <nav aria-label="شهرهای شمال" className="mt-4 grid grid-cols-2 gap-2 text-[11px] sm:grid-cols-3">{["محمودآباد", "آمل", "چالوس", "نوشهر", "نور", "بابلسر", "رامسر", "رشت", "ساری", "گرگان", "بندر-انزلی", "تنکابن"].map(name => <Link key={name} href={`/${name}`} className="rounded-lg border border-white/10 bg-white/5 px-2 py-2.5 text-slate-200 transition hover:border-orange-300/50 hover:text-orange-200">{name.replaceAll("-", " ")} ←</Link>)}</nav>
          <nav aria-label="محورها و برندهای شمال" className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">{[{name:"آزادراه تهران–شمال",href:"/roads/tehran-north"},{name:"جاده چالوس",href:"/roads/chalus"},{name:"هراز",href:"/roads/haraz"},{name:"برندهای خودرو در شمال",href:"/شمال/brands"}].map(item => <Link key={item.href} href={item.href} className="rounded-lg bg-orange-400/10 px-3 py-2 text-[10px] font-bold text-orange-200 hover:bg-orange-400/20">{item.name}</Link>)}</nav>
        </section>
      </article>
      <article className="landing-glass rounded-2xl border border-slate-200 bg-white p-6 shadow-card md:p-8" dir="rtl">
        <p className="text-xs font-black text-brand-orange">خدمات امدادی</p>
        <h2 id="emergency-services-title" className="mt-3 text-2xl font-black text-ink">خدمت مناسب را مستقیم انتخاب کنید</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {commercialServices.map(([title, href, description]) => <Link key={href} href={href} className="rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50"><h3 className="font-black">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{description}</p><span className="mt-3 inline-flex text-xs font-black text-brand-orange">جزئیات و درخواست ←</span></Link>)}
        </div>
        <div className="mt-6 border-t border-slate-200 pt-5">
          <h3 className="text-sm font-black text-ink">خدمات امداد خودرو در تهران و کرج</h3>
          <nav className="mt-4 space-y-5" aria-label="لندینگ‌های محلی خدمات امداد خودرو" data-testid="home-local-directory">
            {homeLocalLinkGroups.map(group => <div key={group.title}><h4 className="mb-3 flex items-center gap-2 text-xs font-black text-slate-600"><span className="h-1.5 w-1.5 rounded-full bg-brand-orange" />{group.title}</h4><div className="grid grid-cols-2 gap-2 lg:grid-cols-3">{group.links.map(item => <Link key={item.href} href={item.href} prefetch={false} className="flex min-h-9 items-center justify-between gap-1 rounded-lg border border-slate-200/80 bg-white/50 px-2.5 py-2 text-[10px] font-bold leading-5 text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange">{item.title}<span aria-hidden="true" className="text-orange-400">←</span></Link>)}</div></div>)}
          </nav>
        </div>
      </article>
    </section>
  );
}

export function TrustSection() {
  return <TrustShowcaseBanner />;
}

export function ContactCta() {
  return <section id="contact" className="section-shell contact-rescue-banner" aria-labelledby="contact-rescue-title" dir="rtl" data-aos="fade-up">
    <div className="contact-rescue-art" aria-hidden="true"><Image src="/images/contact-overhead-car.webp" alt="" fill sizes="(min-width:768px) 480px, 240px" className="object-cover" /></div>
    <div className="contact-rescue-copy"><h2 id="contact-rescue-title">همین حالا کمک می‌خواهید؟</h2><p>با یک تماس، موقعیت و امکان اعزام متخصص بررسی می‌شود. برای هماهنگی امداد خودرو، همراه شما هستیم.</p><div className="contact-rescue-actions"><a href="tel:09123022064" className="contact-rescue-call">درخواست امداد و تماس فوری <span aria-hidden="true">←</span></a><a href="tel:09123022064" dir="ltr" className="contact-rescue-number">09123022064</a></div></div>
  </section>;
}

export function MagazineSection() {
  return (
    <section className="home-glass section-shell rounded-2xl bg-[#f3f5f7] px-4 py-6 md:py-8" aria-labelledby="magazine-title" data-aos="fade-up">
      <div className="flex items-center justify-between gap-4 px-1" dir="rtl"><h2 id="magazine-title" className="text-2xl font-black text-ink md:text-3xl">مجله خودرو چاره</h2><Link href="/blog" className="text-sm font-black text-brand-orange">موارد بیشتر ←</Link></div>
      <BlogSlider posts={latestHomeArticles(blogPosts)} />
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
        <div><h2 className="text-sm font-black">دسترسی سریع</h2><div className="mt-3 grid gap-2 text-xs text-slate-400"><a href="#services">خدمات</a><a href="#app">اپلیکیشن</a><Link href="/assistant">دستیار هوشمند</Link><a href="#trust">درباره ما</a></div></div>
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
