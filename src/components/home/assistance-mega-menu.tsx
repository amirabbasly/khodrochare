"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { assistanceRegions, regionalBrandPath } from "@/content/assistance-regions";
import { brandProfiles } from "@/content/brands";

export function AssistanceMegaMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = mobile ? "mobile-assistance-menu" : "desktop-assistance-menu";
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  const navigate = () => { setOpen(false); onNavigate?.(); };
  return <div ref={root} className={mobile ? "border-b border-white/10" : "static"}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false); }}
    onKeyDown={event => { if (event.key === "Escape" && open) { event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus(); } }}>
    <button ref={trigger} type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)} className={`flex items-center justify-between gap-2 font-black hover:text-brand-orange focus-visible:outline-2 focus-visible:outline-orange-400 ${mobile ? "min-h-12 w-full px-3 text-sm" : "min-h-14 whitespace-nowrap text-[12px] 2xl:text-[13px]"}`}>امداد خودرو <span aria-hidden="true">{open ? "−" : "+"}</span></button>
    <div id={id} hidden={!open} className={mobile ? "px-2 pb-4" : "absolute inset-x-0 top-full border-t border-white/15 bg-[#061a2e] shadow-2xl"}>
      <div className={mobile ? "space-y-4" : "header-container max-h-[75vh] overflow-y-auto py-7"}>
        <Link href="/امداد-خودرو" onClick={navigate} className="mb-5 inline-flex min-h-11 items-center text-sm font-black text-orange-300">راهنمای جامع امداد خودرو ←</Link>
        <div className={mobile ? "space-y-5" : "grid grid-cols-3 gap-8"}>
          {assistanceRegions.map(region => <section key={region.slug} aria-label={`امداد ${region.name}`}>
            <Link href={`/${region.slug}`} onClick={navigate} className="block border-b border-white/20 pb-3 text-lg font-black text-orange-300">امداد خودرو {region.name} ←</Link>
            <Link href={`/${region.slug}/brands`} onClick={navigate} className="flex min-h-11 items-center text-xs text-slate-300 underline underline-offset-4">همه برندها در {region.name}</Link>
            <ul className="grid grid-cols-2 gap-x-3">{brandProfiles.map(brand => <li key={brand.slug}><Link href={regionalBrandPath(region.slug, brand.slug)} onClick={navigate} className="flex min-h-11 items-center rounded px-2 text-xs leading-6 text-slate-100 hover:bg-white/10 hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-orange-400">{brand.name}</Link></li>)}</ul>
          </section>)}
        </div>
      </div>
    </div>
  </div>;
}
