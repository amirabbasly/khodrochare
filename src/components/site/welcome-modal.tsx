"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/home/home-ui";

const phoneNumber = "09123022064";
const storageKey = "khodrochare:welcome-dismissed-at";
const remindAfterMs = 14 * 24 * 60 * 60 * 1000;
const showAfterMs = 9000;

/**
 * Non-blocking welcome banner.
 *
 * It is intentionally NOT a full-screen interstitial: Google penalises popups that
 * cover the main content right after a visitor arrives from search results, and a
 * blocking overlay also hurts INP/CLS. Instead the card appears in a corner after the
 * visitor has engaged (delay or scroll), never locks page scrolling, and is remembered
 * for two weeks once dismissed.
 */
export function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let dismissedAt = 0;
    try {
      dismissedAt = Number(window.localStorage.getItem(storageKey) ?? 0);
    } catch {
      // Private mode or blocked storage: fall back to showing once per page view.
    }
    if (dismissedAt && Date.now() - dismissedAt < remindAfterMs) return;

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setOpen(true);
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.35) reveal();
    };

    const timer = window.setTimeout(reveal, showAfterMs);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(storageKey, String(Date.now()));
    } catch {
      // Ignore storage failures; the banner simply reappears on the next visit.
    }
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <aside
      className="welcome-modal-card fixed bottom-4 left-4 right-4 z-[150] mx-auto w-auto max-w-md overflow-hidden rounded-2xl border border-white/15 bg-[#071a2e] text-white shadow-[0_24px_70px_rgba(3,18,36,.45)] sm:right-auto sm:w-[380px]"
      dir="rtl"
      aria-label="پیام خوش‌آمدگویی خودرو چاره"
    >
      <div className="relative p-4 sm:p-5">
        <button
          type="button"
          onClick={dismiss}
          className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg text-slate-300 transition hover:border-white/35 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          aria-label="بستن پیام خوش‌آمدگویی"
        >
          ×
        </button>

        <div className="flex items-center gap-3 pl-9">
          <div className="relative h-12 w-16 shrink-0 rounded-xl border border-white/15 bg-white/10 p-1.5">
            <Image src="/images/khodrochare-logo-compact.webp" alt="لوگوی خودرو چاره" fill sizes="64px" className="object-contain" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-wide text-orange-300">خوش آمدید به خودرو چاره</span>
            <p className="mt-1 text-base font-black leading-7">همه خدمات خودرو، یک‌جا</p>
          </div>
        </div>

        <p className="mt-3 text-xs leading-7 text-slate-300">از امداد خودرو آنلاین و مکانیک سیار تا کارواش، باتری و لوازم یدکی کنار شما هستیم. اگر همین حالا کمک می‌خواهید تماس بگیرید.</p>

        <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
          <a href={`tel:${phoneNumber}`} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 text-xs font-black text-white shadow-orange transition hover:brightness-110"><Icon name="phone" size={16} /> تماس فوری</a>
          <Link href="/services" onClick={dismiss} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-4 text-xs font-black text-white transition hover:border-orange-300/60 hover:bg-white/10">آشنایی با خدمات</Link>
        </div>
      </div>
    </aside>
  );
}
