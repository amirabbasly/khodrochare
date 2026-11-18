"use client";

import { useEffect, useRef } from "react";

// Business figures supplied by the site owner; not a review/rating schema.
const stats = [
  { label: "رضایت از پشتیبانی", value: 4.8, decimals: 1, suffix: "" },
  { label: "سرویس موفق", value: 20000, decimals: 0, suffix: "+" },
  { label: "سفیر فعال", value: 450, decimals: 0, suffix: "+" },
];

export function HeroStats() {
  const root = useRef<HTMLDListElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let started = false;
    const render = (progress: number) => {
      element.querySelectorAll<HTMLElement>("[data-stat-value]").forEach((node, index) => {
        const stat = stats[index];
        node.textContent = (stat.value * progress).toLocaleString("en-US", { minimumFractionDigits: stat.decimals, maximumFractionDigits: stat.decimals }) + stat.suffix;
      });
    };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting) || started) return;
      started = true;
      observer.disconnect();
      if (media.matches) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / 1400);
        render(1 - Math.pow(1 - progress, 3));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      render(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    const finish = () => { if (media.matches) { cancelAnimationFrame(frame); render(1); } };
    media.addEventListener("change", finish);
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); media.removeEventListener("change", finish); };
  }, []);
  return <dl ref={root} className="hero-stats mt-6 grid max-w-md grid-cols-3 divide-x divide-x-reverse divide-white/15 text-center">
    {stats.map(stat => <div key={stat.label} className="px-2"><dt className="text-[10px] font-bold text-slate-300">{stat.label}</dt><dd className="mt-2 text-xl font-black text-amber-300 sm:text-2xl"><span className="sr-only">{stat.value.toLocaleString("en-US")}{stat.suffix}</span><span data-stat-value aria-hidden="true" dir="ltr" className="inline-block tabular-nums">{stat.value.toLocaleString("en-US")}{stat.suffix}</span></dd></div>)}
  </dl>;
}
