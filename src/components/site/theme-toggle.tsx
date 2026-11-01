"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("khodrochare:theme", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("khodrochare:theme", callback);
    window.removeEventListener("storage", callback);
  };
}
function snapshot() { return document.documentElement.dataset.theme === "dark"; }
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, snapshot, () => false);
  function toggle() {
    const next = snapshot() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try { localStorage.setItem("khodrochare:theme", next); } catch { /* Theme works without storage. */ }
    window.dispatchEvent(new Event("khodrochare:theme"));
  }
  return <button type="button" onClick={toggle} className="theme-switch" aria-label="تم تاریک" aria-pressed={dark} title={dark ? "تغییر به تم روشن" : "تغییر به تم تاریک"}>
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">{dark ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z" />}</svg>
    <span className="sr-only">تغییر تم سایت</span>
  </button>;
}
