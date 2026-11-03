"use client";

import { ThemeToggle } from "@/components/site/theme-toggle";
import { customerAppUrl, fleetAppUrl } from "@/content/app-links";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AssistanceMegaMenu } from "./assistance-mega-menu";
import { navLinks } from "./home-content";
import { BrandMark, ButtonLink, Icon } from "./home-ui";

export function ResponsiveSiteHeader() {
  const [open, setOpen] = useState(false);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const mobilePanel = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isActive = (href: string) => href === "/" ? pathname === "/" : (decodeURIComponent(pathname) === href || decodeURIComponent(pathname).startsWith(`${href}/`));

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement as HTMLElement | null;
    mobilePanel.current?.querySelector<HTMLButtonElement>('button[aria-label="بستن منو"]')?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        const items = Array.from(mobilePanel.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),summary,[tabindex="0"]') ?? []).filter(el => el.getClientRects().length && !el.closest('[inert]'));
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const onResize = () => { if (window.innerWidth >= 1280) setOpen(false); };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="site-header relative z-50">
      <div className="border-b border-white/10">
        <div className="header-container flex min-h-9 items-center justify-between gap-3 text-[10px] text-slate-300 sm:text-[11px]">
          <div className="flex items-center gap-3 sm:gap-4">
            <a className="inline-flex items-center gap-1.5 hover:text-white" href="tel:09123022064">
              <Icon name="phone" size={14} /> <span dir="ltr">09123022064</span>
            </a>
            <span className="hidden items-center gap-1.5 min-[430px]:inline-flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> خدمات ۲۴/۷
            </span>
          </div>
          <span className="hidden lg:inline">هماهنگی شبانه‌روزی در تهران، کرج و شمال</span>
        </div>
      </div>

      <div className="header-container flex min-h-[76px] items-center gap-4 xl:min-h-[92px] xl:gap-5">
        <BrandMark />
        <div className="header-theme-control"><ThemeToggle /></div>
        <nav className="primary-navigation hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex 2xl:gap-2" aria-label="منوی اصلی">
          <AssistanceMegaMenu />
          {navLinks.filter(item => item.href !== "/امداد-خودرو").map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item relative min-h-12 content-center whitespace-nowrap rounded-xl px-3 text-[12px] font-black transition 2xl:text-[13px] ${isActive(item.href) ? "text-brand-orange after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-brand-orange" : "text-slate-200 hover:text-brand-orange"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>


        <button
          ref={mobileTrigger}
          type="button"
          className="mobile-menu-trigger mr-auto flex h-12 w-12 items-center justify-center rounded-lg border border-white/25 bg-white/5 xl:hidden"
          aria-label="باز کردن منوی اصلی"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(true)}
        >
          <span className="grid gap-1.5" aria-hidden="true"><span className="h-0.5 w-6 bg-white" /><span className="h-0.5 w-6 bg-white" /><span className="h-0.5 w-6 bg-white" /></span>
        </button>
      </div>

      <div className="hidden border-t border-white/10 xl:block">
        <nav className="app-navigation header-container flex flex-wrap items-center justify-start gap-3 py-2" aria-label="اپلیکیشن‌های خودرو چاره">
          <Link href="/app#features" className="inline-flex min-h-11 items-center rounded-lg border border-white/25 px-4 text-xs font-bold hover:bg-white/10">قابلیت‌های اپلیکیشن‌ها</Link>
          <Link href={customerAppUrl} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/35 px-4 text-xs font-bold hover:bg-white/10"><Icon name="download" size={17} /> اپلیکیشن خودرو چاره</Link>
          <Link href={fleetAppUrl} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/35 px-4 text-xs font-bold hover:bg-white/10"><Icon name="truck" size={17} /> اپلیکیشن سفیران</Link>
          <ButtonLink href={customerAppUrl} className="min-h-11 px-4 text-xs">درخواست خدمت</ButtonLink>
        </nav>
      </div>

      <div className={`fixed inset-0 z-[90] bg-black/60 transition-opacity duration-300 xl:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside
        ref={mobilePanel}
        id="mobile-navigation"
        data-theme-panel="navigation"
        className={`fixed inset-y-0 right-0 z-[100] flex w-[min(88vw,390px)] flex-col bg-[#061a2e] shadow-[-24px_0_60px_rgba(0,0,0,.35)] transition-transform duration-300 ease-out xl:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-5">
          <BrandMark />
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-2xl" aria-label="بستن منو" onClick={() => setOpen(false)}>×</button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="منوی موبایل">
          <AssistanceMegaMenu mobile onNavigate={() => setOpen(false)} />
          {navLinks.filter(item => item.href !== "/امداد-خودرو").map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex min-h-12 items-center justify-between border-b border-white/10 px-3 text-sm font-black ${isActive(item.href) ? "text-brand-orange" : "text-slate-100"}`}>
              {item.label}<span className="text-slate-500" aria-hidden="true">←</span>
            </Link>
          ))}
        </nav>
        <div className="grid gap-2 border-t border-white/10 p-4">
          <Link href="/app#features" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 text-sm font-bold">قابلیت‌های اپلیکیشن‌ها</Link>
          <Link href={customerAppUrl} onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 text-sm font-bold"><Icon name="download" size={17} /> اپلیکیشن خودرو چاره</Link>
          <Link href={fleetAppUrl} onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/25 text-sm font-bold"><Icon name="truck" size={17} /> اپلیکیشن سفیران</Link>
          <ButtonLink href={customerAppUrl} className="w-full" >درخواست خدمت</ButtonLink>
          <a href="tel:09123022064" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/25 text-sm font-bold"><Icon name="phone" size={17} /> تماس فوری</a>
        </div>
      </aside>
    </header>
  );
}
