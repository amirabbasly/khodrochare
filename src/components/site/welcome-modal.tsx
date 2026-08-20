"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/home/home-ui";

const phoneNumber = "09123022064";

const benefits = [
  "اپلیکیشن خودرو چاره؛ نوآوری در حوزه امداد خودرو و خدمات خودرویی",
  "تضمین قیمت منصفانه، کیفیت خدمت و مشتری‌مداری",
  "هماهنگی سریع با متخصص مناسب برای هر مشکل خودرو",
];

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
              <Image src="/images/khodrochare-3d-logo.webp" alt="لوگوی خودرو چاره" fill priority sizes="128px" className="object-contain" />
            </div>
            <div>
              <span className="text-[10px] font-black tracking-wide text-orange-300">خوش آمدید به خودرو چاره</span>
              <h2 id="welcome-modal-title" className="mt-1 text-xl font-black leading-8 sm:text-2xl">کمک خودرو، همیشه نزدیک شما</h2>
            </div>
          </div>

          <p id="welcome-modal-description" className="mt-6 text-sm leading-8 text-slate-300">برای شروع، مزیت‌های خودرو چاره را ببینید و هر وقت نیاز داشتید با یک تماس از ما کمک بگیرید.</p>

          <ul className="mt-5 grid gap-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs leading-7 text-slate-100 sm:p-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-400/15 text-orange-300"><Icon name="check" size={15} /></span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-2xl border border-orange-300/20 bg-orange-300/10 p-4 text-center">
            <p className="text-xs leading-7 text-orange-50">اگر عجله دارید، همین الان تماس بگیرید؛ اگر هم عجله ندارید، شماره ما را ذخیره کنید، شاید یک روز به کارتان بیاید.</p>
            <a href={`tel:${phoneNumber}`} className="mt-3 inline-flex items-center gap-2 text-xl font-black tracking-wide text-white transition hover:text-orange-200" dir="ltr"><Icon name="phone" size={19} className="text-orange-300" />{phoneNumber}</a>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
            <a href={`tel:${phoneNumber}`} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 text-sm font-black text-white shadow-orange transition hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><Icon name="phone" size={18} /> تماس بگیرید</a>
            <Link href="/app" onClick={() => setOpen(false)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-5 text-sm font-black text-white transition hover:border-orange-300/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"><Icon name="download" size={17} /> ادامه برای نصب اپلیکیشن</Link>
          </div>

          <button type="button" onClick={() => setOpen(false)} className="mx-auto mt-4 block text-[11px] font-bold text-slate-400 transition hover:text-white">فعلاً فقط می‌خواهم سایت را ببینم</button>
        </div>
      </div>
    </div>
  );
}
