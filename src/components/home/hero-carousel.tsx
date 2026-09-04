"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TowTruckStage } from "./home-illustrations";
import { ButtonLink, Icon } from "./home-ui";

const slides = [
  {
    image: "/images/hero-roadside.webp",
    alt: "امداد خودرو در جاده بارانی",
    eyebrow: "امداد هوشمند شبانه‌روزی",
    title: "امداد خودرو آنلاین شبانه‌روزی تهران و کرج",
    desc: "امداد خودرو آنلاین خودرو چاره برای هماهنگی امدادگر، باتری، مکانیک سیار و یدک‌کش؛ با توسعه مرحله‌ای خدمات در شهرهای دیگر",
    cta: "درخواست امداد فوری",
    icon: "truck",
    objectPosition: "48% center",
  },
  {
    image: "/images/service-carwash.webp",
    alt: "کارواش سیار خودرو چاره",
    eyebrow: "کارواش سیار در محل",
    title: "درخشش خودرو بدون اتلاف وقت",
    desc: "شست‌وشوی حرفه‌ای بدنه و داخل خودرو با تجهیزات کامل در محل شما",
    cta: "سفارش کارواش",
    icon: "car",
    objectPosition: "58% center",
  },
  {
    image: "/images/service-mechanic.webp",
    alt: "مکانیک سیار خودرو چاره",
    eyebrow: "مکانیک و برق خودرو",
    title: "تعمیر تخصصی، همان‌جایی که هستید",
    desc: "عیب‌یابی، تعمیرات سبک و رفع ایراد باتری و برق خودرو در محل",
    cta: "اعزام مکانیک",
    icon: "engine",
    objectPosition: "60% center",
  },
] as const;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  // Only slides that have actually been shown are mounted, so the first paint downloads
  // one hero image instead of three (large LCP/bandwidth win on mobile connections).
  const [loadedSlides, setLoadedSlides] = useState(1);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % slides.length;
        setLoadedSlides((count) => Math.max(count, next + 1));
        return next;
      });
    }, 7200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#07182a] text-white" aria-roledescription="carousel" aria-label="معرفی خدمات خودرو چاره">
      <div className="absolute inset-0 -z-20">
        {slides.slice(0, loadedSlides).map((slide, index) => (
          <Image
            key={slide.image}
            src={slide.image}
            alt={index === active ? slide.alt : ""}
            fill
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "low"}
            quality={index === 0 ? 78 : 65}
            sizes="100vw"
            style={{ objectPosition: slide.objectPosition }}
            className={`object-cover transition-[opacity,transform,filter] duration-[1800ms] ease-[cubic-bezier(.22,.61,.36,1)] ${index === 0 ? "brightness-[.78] saturate-[.9]" : "brightness-[.46] saturate-[.78] contrast-[1.08]"} ${index === active ? "scale-100 opacity-100" : "scale-[1.075] opacity-0"}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_45%,rgba(16,76,126,.14),transparent_34%),linear-gradient(90deg,rgba(4,15,29,.2)_0%,rgba(4,15,29,.3)_42%,rgba(4,15,29,.94)_76%,#061426_100%)] max-lg:bg-[linear-gradient(180deg,rgba(4,15,29,.28)_0%,rgba(4,15,29,.76)_43%,#061426_82%)]" />

      <div className="site-container relative min-h-[620px] pb-10 pt-8 sm:min-h-[660px] lg:min-h-[720px] lg:pb-32 lg:pt-10">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.15fr]" dir="ltr">
          <div className="hidden items-start md:flex" dir="rtl"><TechnicianMapCard /></div>
          <div key={active} className="hero-slide-copy min-w-0 max-w-full px-2 pt-4 text-right sm:max-w-xl sm:px-0 lg:justify-self-end lg:pt-0" dir="rtl">
            <span className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-white/35 bg-black/20 px-3 text-xs font-bold"><Icon name={slides[active].icon} size={16} /> {slides[active].eyebrow}</span>
            {active === 0 ? <h1 className="mt-5 max-w-[12ch] text-3xl font-black leading-[1.5] text-white sm:text-4xl md:text-5xl">{slides[active].title}</h1> : <h2 className="mt-5 max-w-[12ch] text-3xl font-black leading-[1.5] text-white sm:text-4xl md:text-5xl">{slides[active].title}</h2>}
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-200 md:text-base">{slides[active].desc}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="#request"><Icon name="user" size={17} /> {slides[active].cta}</ButtonLink>
              <a href="tel:09123022064" className="inline-flex min-h-11 items-center gap-3 rounded-lg border border-white/50 bg-black/20 px-5 text-sm font-extrabold" dir="ltr">09123022064 <Icon name="phone" size={17} /></a>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonLink href="/app" variant="outline"><Icon name="download" size={17} /> نصب اپلیکیشن</ButtonLink>
              <span className="inline-flex items-center gap-2 text-xs font-black text-amber-300"><Image src="/images/quality-guarantee.svg" alt="نشان تضمین کیفیت و قیمت" width={38} height={44} className="h-10 w-9 drop-shadow-[0_4px_10px_rgba(245,158,11,.45)]" /> تضمین کیفیت و قیمت</span>
            </div>
            <div className="mt-6 grid max-w-md grid-cols-3 divide-x divide-x-reverse divide-white/15 text-center">
              {[["clock", "خدمات شبانه‌روزی"], ["shield", "متخصص تأییدشده"], ["tag", "قیمت منصفانه"]].map(([icon, label]) => <div key={label} className="px-2"><Icon name={icon} size={21} className="mx-auto text-slate-200" /><p className="mt-2 text-[10px] font-bold text-slate-300">{label}</p></div>)}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function TechnicianMapCard() {
  return (
    <div className="mt-2 w-80 overflow-hidden rounded-2xl border border-white/40 bg-white/95 text-ink shadow-2xl xl:w-[410px]">
      <div className="flex items-center gap-3 px-4 py-4 xl:px-5">
        <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-slate-900 xl:h-16 xl:w-16"><Image src="/images/technician.webp" alt="تصویر امدادگر منتخب" fill sizes="64px" className="object-cover object-[18%_28%]" /></div>
        <div><p className="text-xs font-bold text-slate-500 xl:text-sm">مهدی حسینی</p><p className="text-sm font-black xl:text-lg">امدادگر منتخب</p><p className="mt-1 text-sm font-black text-amber-500 xl:text-base">★ ۴.۹</p></div>
      </div>
      <TowTruckStage compact />
      <div className="flex items-center justify-between px-4 py-3 text-xs xl:text-sm"><span>زمان رسیدن</span><strong className="text-emerald-600">۱۸ دقیقه</strong></div>
    </div>
  );
}
