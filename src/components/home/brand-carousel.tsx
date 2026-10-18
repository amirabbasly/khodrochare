"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { brandProfiles } from "@/content/brands";

const logoSlugs = ["toyota", "mercedes-benz", "bmw", "hyundai", "kia", "mazda", "nissan", "renault"];
export function BrandCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || media.matches) return;
    const timer = setInterval(() => {
      const element = viewport.current;
      if (!element) return;
      const end = element.scrollWidth - element.clientWidth;
      element.scrollTo({ left: element.scrollLeft >= end - 3 ? 0 : Math.min(end, element.scrollLeft + 120), behavior: "smooth" });
    }, 3200);
    return () => clearInterval(timer);
  }, [paused]);
  const move = (amount: number) => viewport.current?.scrollBy({ left: amount, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  return <section aria-label="برندهای خودرو" data-testid="home-brand-carousel" className="hidden min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-card lg:block" dir="rtl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false); }}>
    <div className="mb-3 flex items-center justify-between"><div className="flex items-center gap-2"><span className="h-4 w-1 rounded-full bg-brand-orange" /><h2 className="text-xs font-black text-ink">امداد متناسب با برند خودروی شما</h2></div><div className="flex gap-1.5" dir="ltr"><button type="button" aria-label="برندهای قبلی" onClick={() => move(-240)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-orange-300 hover:text-brand-orange">‹</button><button type="button" aria-label="برندهای بعدی" onClick={() => move(240)} className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-orange-300 hover:text-brand-orange">›</button></div></div>
    <div ref={viewport} dir="ltr" className="brand-carousel-viewport overflow-x-auto overscroll-x-contain rounded-xl" tabIndex={0} aria-label="فهرست قابل پیمایش برندها"><ul className="flex w-max gap-2 pb-1">{logoSlugs.map(slug => {
      const brand = brandProfiles.find(item => item.slug === slug)!;
      return <li key={slug}><Link href={`/brands/${slug}`} className="group flex w-[110px] flex-col items-center gap-2 rounded-xl border border-transparent bg-slate-50/80 px-3 py-3 transition hover:border-orange-200 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-orange-400" dir="rtl"><Image src={`/images/brands/${slug}.png`} alt={`لوگوی ${brand.name}`} width={68} height={48} sizes="68px" className="h-10 w-16 object-contain transition-transform group-hover:scale-110" /><span className="text-[11px] font-bold text-slate-600 group-hover:text-brand-orange">{brand.name}</span></Link></li>;
    })}</ul></div>
  </section>;
}
