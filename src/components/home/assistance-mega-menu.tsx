"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { assistanceRegions, regionalBrandPath } from "@/content/assistance-regions";
import { brandProfiles } from "@/content/brands";

function Chevron({ down = false }: { down?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`h-4 w-4 shrink-0 transition-transform ${down ? "-rotate-90" : ""}`}><path d="m14 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function AssistanceMegaMenu({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = mobile ? "mobile-assistance-menu" : "desktop-assistance-menu";
  const close = () => { setOpen(false); setActive(null); };
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) { setOpen(false); setActive(null); }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, [open]);
  const navigate = () => { close(); onNavigate?.(); };
  const descriptions = ["خدمات شهری و بزرگراهی", "شهر کرج و مسیرهای اطراف", "گیلان، مازندران و گلستان"];

  return <div ref={root} dir="rtl" className={mobile ? "border-b border-white/10" : "relative"}
    onMouseEnter={() => { if (!mobile) setOpen(true); }}
    onMouseLeave={() => { if (!mobile) close(); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close(); }}
    onKeyDown={event => {
      if (event.key === "Escape" && open) {
        event.preventDefault(); event.stopPropagation(); close(); trigger.current?.focus();
      }
    }}>
    <button ref={trigger} type="button" aria-expanded={open} aria-controls={id} onClick={() => { if (mobile && open) close(); else setOpen(true); }} className={`flex items-center justify-between gap-2 rounded-lg font-black transition-colors hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-orange-400 ${mobile ? "min-h-12 w-full px-3 text-sm" : `min-h-14 whitespace-nowrap text-[12px] 2xl:text-[13px] ${open ? "text-orange-400" : "text-slate-200"}`}`}>
      امداد خودرو <span className={`transition-transform ${open ? "rotate-180" : ""}`}><Chevron down /></span>
    </button>
    <div id={id} hidden={!open} className={mobile ? "pb-4" : "absolute right-0 top-full z-50 w-[264px] pt-2"}>
      <div className={`relative ${mobile ? "rounded-2xl border border-white/10 bg-white/[.04] p-2" : "rounded-2xl border border-slate-200/90 bg-white p-2 text-ink shadow-[0_24px_70px_-15px_rgba(0,0,0,.35)]"}`}>
        <div className={`px-3 pb-3 pt-2 ${mobile ? "text-slate-400" : "text-slate-400"}`}>
          <p className="text-[10px] font-bold tracking-wide">یک تماس، یک چاره</p>
          <p className={`mt-1 text-sm font-black ${mobile ? "text-white" : "text-ink"}`}>محدوده خدمت را انتخاب کنید</p>
        </div>
        {assistanceRegions.map((region, index) => {
          const selected = active === region.slug;
          const regionId = `${id}-region-${index}`;
          return <div key={region.slug} onMouseEnter={() => { if (!mobile) setActive(region.slug); }}>
            <button type="button" aria-expanded={selected} aria-controls={regionId}
              onFocus={() => { if (!mobile) setActive(region.slug); }}
              onKeyDown={event => { if (event.key === "ArrowLeft") { event.preventDefault(); setActive(region.slug); root.current?.querySelector<HTMLAnchorElement>(`#${regionId} a`)?.focus(); } }}
              onClick={() => setActive(mobile && selected ? null : region.slug)}
              className={`group flex min-h-[76px] w-full items-center gap-3 rounded-xl px-3 py-3 text-right transition-colors focus-visible:outline-2 focus-visible:outline-orange-400 ${selected ? "bg-orange-50 text-ink" : mobile ? "text-white hover:bg-white/5" : "text-ink hover:bg-slate-50"}`}>
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-brand-orange text-white shadow-sm" : mobile ? "bg-white/10 text-orange-300" : "bg-slate-100 text-slate-500"}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
              </span>
              <span className="flex-1"><span className="block text-sm font-black">{region.name}</span><span className={`mt-1 block text-[10px] font-medium ${selected ? "text-slate-500" : mobile ? "text-slate-400" : "text-slate-500"}`}>{descriptions[index]}</span></span>
              <Chevron down={mobile} />
            </button>
            <div id={regionId} hidden={!selected} className={mobile ? "mx-1 my-2 rounded-xl bg-white p-4 text-ink" : "absolute right-full top-0 w-[440px] pl-2"}>
              <section aria-label={`برندهای ${region.name}`} className={mobile ? "" : "max-h-[min(70vh,620px)] overflow-y-auto rounded-2xl border border-slate-200/90 bg-white p-6 text-ink shadow-[0_24px_70px_-15px_rgba(0,0,0,.3)]"}>
                <div className="mb-4 flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div><p className="text-[10px] font-bold text-brand-orange">امداد خودرو / {region.name}</p><h2 className="mt-1.5 text-base font-black">خودروی شما چیست؟</h2><p className="mt-1 text-[11px] leading-6 text-slate-500">راهنمای خدمات و حمل متناسب با برند</p></div>
                  <span aria-hidden="true" className="rounded-lg bg-orange-50 px-2.5 py-1.5 text-[10px] font-bold text-brand-orange">۱۲ برند</span>
                </div>
                <ul className="grid grid-cols-2 gap-2">{brandProfiles.map(brand => <li key={brand.slug}>
                  <Link href={regionalBrandPath(region.slug, brand.slug)} onClick={navigate} className="group flex min-h-14 items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2 transition-colors hover:border-orange-200 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-orange-400">
                    <span><span className="block text-[12px] font-bold text-slate-800 group-hover:text-brand-orange">{brand.name}</span><span className="mt-0.5 block text-[9px] font-medium text-slate-400" lang="en">{brand.latin}</span></span><span className="text-slate-300 group-hover:text-brand-orange"><Chevron /></span>
                  </Link>
                </li>)}</ul>
                <div className="mt-4 grid gap-1 border-t border-slate-100 pt-3">
                  <Link href={`/${region.slug}`} onClick={navigate} className="flex min-h-10 items-center justify-between text-xs font-bold text-slate-600 hover:text-brand-orange">همه خدمات {region.name}<Chevron /></Link>
                  <Link href={`/${region.slug}/brands`} onClick={navigate} className="flex min-h-10 items-center justify-between text-xs font-bold text-brand-orange">مقایسه و راهنمای برندها<Chevron /></Link>
                </div>
              </section>
            </div>
          </div>;
        })}
        <Link href="/امداد-خودرو" onMouseEnter={() => { if (!mobile) setActive(null); }} onClick={navigate} className={`mt-2 flex min-h-12 items-center justify-between border-t px-3 text-[11px] font-bold ${mobile ? "border-white/10 text-orange-300" : "border-slate-100 text-slate-500 hover:text-brand-orange"}`}>راهنمای جامع امداد خودرو<Chevron /></Link>
      </div>
    </div>
  </div>;
}
