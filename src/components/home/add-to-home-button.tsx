"use client";

import { useEffect, useState } from "react";

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function AddToHomeButton({ label = "افزودن به صفحه اصلی", light = false }: { label?: string; light?: boolean }) {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // The fallback instructions remain available if registration is blocked.
      });
    }

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  async function install() {
    if (promptEvent) {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      setMessage(choice.outcome === "accepted" ? "خودرو چاره به صفحه اصلی اضافه شد." : "نصب لغو شد؛ هر زمان خواستید دوباره تلاش کنید.");
      setPromptEvent(null);
      return;
    }

    setMessage("از منوی مرورگر، گزینه «افزودن به صفحه اصلی» یا «Install app» را انتخاب کنید.");
  }

  return (
    <div className="mt-3 w-full">
      <button
        type="button"
        onClick={install}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-xs font-black text-white shadow-orange transition hover:-translate-y-0.5 hover:brightness-110 sm:min-h-13 sm:max-w-sm sm:px-7 sm:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        {label}
      </button>
      {message && <p className={`mt-2 text-xs leading-6 ${light ? "text-slate-600" : "text-cyan-100"}`} role="status">{message}</p>}
    </div>
  );
}
