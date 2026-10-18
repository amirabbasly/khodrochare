"use client";

import { useEffect, useSyncExternalStore } from "react";

const eventName = "khodrochare:motion-change";
const storageKey = "khodrochare:motion";
function isRunning() {
  const mode = document.documentElement.dataset.siteMotion;
  return mode === "on" || (mode !== "off" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const storage = (event: StorageEvent) => {
    if (event.key !== storageKey) return;
    if (event.newValue === "on" || event.newValue === "off") document.documentElement.dataset.siteMotion = event.newValue;
    else delete document.documentElement.dataset.siteMotion;
    callback();
  };
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", storage);
  media.addEventListener("change", callback);
  return () => { window.removeEventListener(eventName, callback); window.removeEventListener("storage", storage); media.removeEventListener("change", callback); };
}
export function MotionPreference() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "on" || saved === "off") document.documentElement.dataset.siteMotion = saved;
    } catch { /* Blocked storage must not prevent changing motion for this visit. */ }
    window.dispatchEvent(new Event(eventName));
  }, []);
  return null;
}
export function MotionToggle({ dark = false }: { dark?: boolean }) {
  const running = useSyncExternalStore(subscribe, isRunning, () => true);
  const toggle = () => {
    const value = running ? "off" : "on";
    document.documentElement.dataset.siteMotion = value;
    try { localStorage.setItem(storageKey, value); } catch { /* Session-only choice still works. */ }
    window.dispatchEvent(new Event(eventName));
  };
  return <button type="button" onClick={toggle} aria-pressed={running} aria-label={running ? "کاهش حرکت انیمیشن‌ها" : "فعال کردن انیمیشن‌ها"} className={`motion-toggle inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 text-[10px] font-bold transition focus-visible:outline-2 focus-visible:outline-orange-400 ${dark ? "border-white/20 bg-white/10 text-white" : "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100"}`}><span aria-hidden="true">{running ? "Ⅱ" : "▶"}</span>{running ? "حرکت روشن" : "فعال‌کردن حرکت"}</button>;
}
