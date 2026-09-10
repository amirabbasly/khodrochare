"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/home/home-ui";
import { businessFacts } from "@/content/business";

const storageKey = "khodrochare:welcome-seen:v2";
const showAfterMs = 4500;
// If storage is blocked, still avoid repeating the message on client-side navigation.
let seenInThisDocument = false;

/**
 * Small, non-blocking welcome dialog: no full-screen overlay, scroll lock or focus
 * stealing. Display once per tab session, after a delay, without interrupting forms.
 */
export function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (seenInThisDocument) return;
    try {
      if (window.sessionStorage.getItem(storageKey) === "1") return;
    } catch {
      // The in-memory guard above also works when browser storage is unavailable.
    }

    let timer: number;
    const revealWhenIdle = () => {
      const editing = document.activeElement?.matches("input, textarea, select, [contenteditable='true'], [role='textbox']");
      const anotherDialog = document.querySelector("dialog[open], [role='dialog'][aria-modal='true']");
      if (document.visibilityState !== "visible" || editing || anotherDialog) {
        timer = window.setTimeout(revealWhenIdle, 1000);
        return;
      }
      seenInThisDocument = true;
      try {
        window.sessionStorage.setItem(storageKey, "1");
      } catch {
        // Showing and dismissing the dialog must not depend on storage permissions.
      }
      setOpen(true);
    };

    timer = window.setTimeout(revealWhenIdle, showAfterMs);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => setOpen(false);

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
      data-testid="welcome-dialog"
      className="welcome-modal-card fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] z-[150] mx-auto w-auto max-w-[380px] overflow-y-auto overscroll-contain rounded-2xl border border-white/20 bg-[#071a2e] text-white shadow-[0_24px_70px_rgba(3,18,36,.45)] sm:bottom-[max(1rem,env(safe-area-inset-bottom,0px))] sm:left-4 sm:right-auto sm:w-[380px]"
      style={{ maxHeight: "calc(100dvh - 7rem)" }}
      dir="rtl"
      role="dialog"
      aria-modal="false"
      aria-labelledby="welcome-title"
      aria-describedby="welcome-description"
    >
      <div className="relative p-4 sm:p-5">
        <button
          type="button"
          onClick={dismiss}
          className="absolute left-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          aria-label="بستن پیام خوش‌آمدگویی"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="flex items-center gap-3 pl-10">
          <div className="relative h-12 w-14 shrink-0 rounded-xl border border-white/15 bg-white/10">
            <Image src="/images/khodrochare-logo-compact.webp" alt="" fill sizes="56px" className="object-contain p-1" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-orange-300">به خودرو چاره خوش آمدید</p>
            <h2 id="welcome-title" className="mt-1 text-base font-black leading-7">برای کمک، یک تماس کافی‌ست</h2>
          </div>
        </div>

        <p id="welcome-description" className="mt-3 text-xs leading-7 text-slate-200">
          خودرو چاره خدمات امداد خودرو، یدک‌کش، مکانیک سیار، باتری و کارواش ارائه می‌دهد. برای ارتباط سریع با ما تماس بگیرید.
        </p>

        <div className="mt-4 grid gap-2">
          <a
            href={`tel:${businessFacts.emergencyPhone}`}
            onClick={dismiss}
            className="flex min-h-12 flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl bg-brand-orange px-4 py-3 text-sm font-black text-white shadow-orange transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="inline-flex items-center gap-2"><Icon name="phone" size={18} /> تماس سریع</span>
            <bdi>{businessFacts.emergencyPhone}</bdi>
          </a>
          <Link
            href="/app"
            onClick={dismiss}
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-3 py-3 text-center text-xs font-bold leading-6 text-white transition hover:border-orange-300/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
          >
            <Icon name="download" size={16} className="shrink-0" />
            ادامه برای نصب اپلیکیشن و مراجعه به سایت
          </Link>
        </div>
      </div>
    </aside>
  );
}
