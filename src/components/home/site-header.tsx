"use client";


import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavAmbientLight } from "./nav-ambient-light";
import { mainMenu } from "@/content/main-menu";
import { BrandMark, Icon } from "./home-ui";

function MenuChevron() {
  return <svg className="menu-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>;
}

export function ResponsiveSiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [desktopExpanded, setDesktopExpanded] = useState<string | null>(null);
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

  useEffect(() => {
    if (!desktopExpanded) return;
    const closeOutside = (event: PointerEvent) => {
      if (!(event.target as Element).closest(".desktop-menu-group")) setDesktopExpanded(null);
    };
    const closeEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setDesktopExpanded(null); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => { document.removeEventListener("pointerdown", closeOutside); document.removeEventListener("keydown", closeEscape); };
  }, [desktopExpanded]);

  return (
    <header className={`site-header relative ${open ? "navigation-is-open" : ""}`} style={{ zIndex: open ? 1000 : 80 }}>
      <div className="border-b border-white/10">
        <div className="header-container flex min-h-9 items-center justify-between gap-3 text-[10px] text-slate-300 sm:text-[11px]">
          <div className="flex items-center gap-3 sm:gap-4">
            <a className="inline-flex items-center gap-1.5 hover:text-white" href="tel:02182801043">
              <Icon name="phone" size={14} /> <span dir="ltr">02182801043</span>
            </a>
            <span className="hidden items-center gap-1.5 min-[430px]:inline-flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> خدمات ۲۴/۷
            </span>
          </div>
          <span className="hidden lg:inline">هماهنگی شبانه‌روزی در تهران، کرج و شمال</span>
        </div>
      </div>

      <div className="header-container desktop-header-shell flex min-h-[76px] items-center gap-4 xl:min-h-[92px] xl:gap-5">
        <BrandMark />
        <nav className="primary-navigation hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex 2xl:gap-2" aria-label="منوی اصلی">
          <NavAmbientLight />
          {mainMenu.map(item => <div key={item.label} className="desktop-menu-group relative">
            {item.children ? <><button type="button" className="nav-item inline-flex min-h-12 items-center gap-1 rounded-xl px-2 text-xs font-black" aria-expanded={desktopExpanded === item.label} aria-controls={`desktop-group-${mainMenu.indexOf(item)}`} onClick={() => setDesktopExpanded(desktopExpanded === item.label ? null : item.label)} onKeyDown={event => { if (event.key === "Escape") setDesktopExpanded(null); }}>{item.label}<MenuChevron /></button>
              <div aria-hidden={desktopExpanded !== item.label} inert={desktopExpanded !== item.label} data-open={desktopExpanded === item.label} id={`desktop-group-${mainMenu.indexOf(item)}`} className="desktop-menu-children"><Link href={item.href} onClick={() => setDesktopExpanded(null)} className="menu-group-hub">{item.label} ←</Link>{item.children.map(child => <Link key={child.label} href={child.href} onClick={() => setDesktopExpanded(null)}>{child.label}</Link>)}</div></> : <Link href={item.href} className="nav-item inline-flex min-h-12 items-center rounded-xl px-2 text-xs font-black">{item.label}</Link>}
          </div>)}
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
          <Link href="/app" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-4 text-xs font-bold hover:bg-white/10">سوپر اپلیکیشن خودرو چاره</Link>
          <Link href="/safir" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-4 text-xs font-bold hover:bg-white/10">عضویت سفیران</Link>
          <Link href="/partners" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-4 text-xs font-bold hover:bg-white/10">طرح نمایندگان خودرو چاره</Link>
          <Link href="/imports" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-4 text-xs font-bold hover:bg-white/10">واردات خودرو</Link>
          <Link href="/about" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-orange bg-brand-orange text-[#07152f] px-4 text-xs font-bold hover:brightness-110">درباره ما</Link>
          <Link href="/team" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-orange bg-brand-orange text-[#07152f] px-4 text-xs font-bold hover:brightness-110">تیم ما</Link>
        </nav>
      </div>

      <div className={`fixed inset-0 z-[90] bg-black/60 transition-opacity duration-300 xl:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside
        ref={mobilePanel}
        id="mobile-navigation"
        data-theme-panel="navigation"
        className={`fixed inset-y-0 right-0 z-[100] flex w-[min(88vw,390px)] flex-col bg-[#07152f] shadow-[-24px_0_60px_rgba(0,0,0,.35)] transition-transform duration-300 ease-out xl:hidden ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-5">
          <BrandMark />
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 text-2xl" aria-label="بستن منو" onClick={() => setOpen(false)}>×</button>
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4" aria-label="منوی موبایل">
          {mainMenu.map((item, index) => <div key={item.label} className="mobile-menu-group">
            {item.children ? <><button type="button" className="mobile-menu-parent" aria-expanded={expanded === item.label} aria-controls={`mobile-group-${index}`} onClick={() => setExpanded(expanded === item.label ? null : item.label)}>{item.label}<MenuChevron /></button>
              <div id={`mobile-group-${index}`} aria-hidden={expanded !== item.label} inert={expanded !== item.label} data-open={expanded === item.label} className="mobile-menu-accordion"><div className="mobile-menu-accordion-inner"><div className="mobile-menu-children"><Link href={item.href} onClick={() => setOpen(false)} className="menu-group-hub">{item.label} ←</Link>{item.children.map(child => <Link key={child.label} href={child.href} onClick={() => setOpen(false)} aria-current={isActive(child.href) ? "page" : undefined}>{child.label}</Link>)}</div></div></div></> : <Link href={item.href} onClick={() => setOpen(false)} className="mobile-menu-parent">{item.label}<span aria-hidden="true">←</span></Link>}
          </div>)}
        </nav>
        <div className="mobile-install-actions grid shrink-0 gap-2 border-t border-white/10 p-4">
          <Link href="/app" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-4 text-xs font-bold hover:bg-white/10">سوپر اپلیکیشن خودرو چاره</Link>
          <Link href="/safir" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 px-4 text-xs font-bold hover:bg-white/10">عضویت سفیران</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-orange bg-brand-orange text-[#07152f] px-4 text-xs font-bold hover:brightness-110">درباره ما</Link>
          <Link href="/team" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-brand-orange bg-brand-orange text-[#07152f] px-4 text-xs font-bold hover:brightness-110">تیم ما</Link>
        </div>
      </aside>
    </header>
  );
}
