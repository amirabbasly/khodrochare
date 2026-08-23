"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/home/home-ui";

const phoneNumber = "09123022064";

export function WelcomeModal() {
  const [open, setOpen] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="welcome-modal fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto p-4 sm:p-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
      <div className="welcome-modal-card relative my-auto w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/15 bg-[#071a2e] text-white shadow-[0_30px_100px_rgba(3,18,36,.45)]" role="dialog" aria-modal="true" aria-labelledby="welcome-modal-title" aria-describedby="welcome-modal-description" dir="rtl">
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="relative p-5 sm:p-7">
          <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-slate-300 transition hover:border-white/35 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange" aria-label="بستن پیام خوش‌آمدگویی">×</button>

          <div className="flex items-center gap-3 pl-10">
            <div className="relative h-16 w-24 shrink-0 rounded-2xl border border-white/15 bg-white/10 p-2 sm:h-20 sm:w-32">
              <Image src="/images/khodrochare-logo-compact.webp" alt="لوگوی خودرو چاره" fill sizes="128px" className="object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-wide text-orange-300">خوش آمدید به خودرو چاره</span>
              <h2 id="welcome-modal-title" className="mt-1 text-xl font-black leading-8 sm:text-2xl">همه خدمات خودرو، یک‌جا</h2>
            </div>
          </div>

          <p id="welcome-modal-description" className="mt-6 text-sm leading-8 text-slate-300">از امداد خودرو آنلاین و مکانیک سیار تا کارواش، باتری و لوازم یدکی کنار شما هستیم. برای آشنایی بیشتر سایت را ببینید؛ اگر همین حالا کمک می‌خواهید، تماس بگیرید.</p>

          <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
            <a href={`tel:${phoneNumber}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-black text-white shadow-orange transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><Icon name="phone" size={18} /> تماس فوری</a>
            <Link href="/services" onClick={() => setOpen(false)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 text-sm font-black text-white transition hover:border-orange-300/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange">آشنایی با خدمات</Link>
          </div>

          <button type="button" onClick={() => setOpen(false)} className="mx-auto mt-4 block text-[11px] font-bold text-slate-400 transition hover:text-white">ورود به سایت</button>
        </div>
      </div>
    </div>
  );
}
