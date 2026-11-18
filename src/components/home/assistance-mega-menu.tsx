"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navigationRegions as assistanceRegions, navigationBrands as brandProfiles, regionalBrandPath } from "@/content/home-navigation";

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
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false); setActive(null); trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    window.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); window.removeEventListener("keydown", escape); };
  }, [open]);
  const navigate = () => { close(); onNavigate?.(); };
  const descriptions = ["خدمات شهری و بزرگراهی", "شهر کرج و مسیرهای اطراف", "گیلان، مازندران و گلستان"];
  const activeRegion = assistanceRegions.find(region => region.slug === active);
  const brandsPanel = (region: typeof assistanceRegions[number], index: number) => <section key={region.slug} id={`${id}-region-${index}`} hidden={active !== region.slug} aria-label={`برندهای ${region.name}`} className="mega-brand-reveal text-ink">
    <div className="mb-4 flex items-center justify-between gap-3"><div><p className="text-[10px] font-bold text-brand-orange">امداد خودرو / {region.name}</p><h2 className="mt-2 text-lg font-black">خودروی شما چیست؟</h2></div><span className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-brand-orange">۱۲ برند</span></div>
    <ul className={`grid gap-2 ${mobile ? "grid-cols-2" : "grid-cols-3"}`}>{brandProfiles.map(brand => <li key={brand.slug}><Link prefetch={false} href={regionalBrandPath(region.slug, brand.slug)} onClick={navigate} className="group flex min-h-[65px] items-center justify-between gap-2 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2 transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-orange-400"><span><span className="block text-[12px] font-bold text-slate-800 group-hover:text-brand-orange">{brand.name}</span><span className="mt-1 block text-[9px] text-slate-400" lang="en">{brand.latin}</span></span><span className="text-slate-300 group-hover:text-brand-orange"><Chevron /></span></Link></li>)}</ul>
    <div className="mt-4 flex flex-wrap gap-x-6 border-t border-slate-100 pt-3"><Link prefetch={false} href={`/${region.slug}`} onClick={navigate} className="flex min-h-10 items-center gap-2 text-xs font-bold text-slate-600 hover:text-brand-orange">همه خدمات {region.name}<Chevron /></Link><Link prefetch={false} href={`/${region.slug}/brands`} onClick={navigate} className="flex min-h-10 items-center gap-2 text-xs font-bold text-brand-orange">راهنمای برندها<Chevron /></Link></div>
  </section>;

  return <div ref={root} dir="rtl" className={mobile ? "border-b border-white/10" : "static"}
    onKeyDown={event => { if (event.key === "Escape" && open) { event.preventDefault(); event.stopPropagation(); close(); trigger.current?.focus(); } }}>
    <button ref={trigger} type="button" aria-expanded={open} aria-controls={id} onClick={() => { if (open) close(); else { setActive("تهران"); setOpen(true); } }} className={`relative z-[60] flex items-center justify-between gap-2 rounded-lg font-black transition-colors hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-orange-400 ${mobile ? "min-h-12 w-full px-3 text-sm" : `min-h-14 whitespace-nowrap text-[12px] 2xl:text-[13px] ${open ? "text-orange-400" : "text-slate-200"}`}`}>امداد خودرو <span className={`transition-transform ${open ? "rotate-180" : ""}`}><Chevron down /></span></button>
    {!mobile && <button type="button" aria-label="بستن مگامنو" tabIndex={-1} aria-hidden={!open} onClick={close} className={`fixed inset-0 z-40 cursor-default bg-[#020b18]/55 backdrop-blur-[4px] transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />}
    <div id={id} aria-hidden={!open} inert={!open} className={mobile ? `${open ? "" : "hidden"} pb-4` : `absolute inset-x-4 top-full z-[60] mx-auto max-w-[1160px] origin-top transition-[opacity,transform,visibility] duration-300 ease-out ${open ? "visible translate-y-0 scale-100 opacity-100" : "invisible pointer-events-none -translate-y-3 scale-[.98] opacity-0"}`}>
      <div className={mobile ? "space-y-2 rounded-2xl border border-white/10 bg-white/[.04] p-2" : "grid grid-cols-[235px_minmax(0,1fr)_250px] overflow-hidden rounded-b-[28px] rounded-t-xl border border-white/80 bg-white text-ink shadow-[0_35px_100px_-15px_rgba(0,0,0,.55)]"}>
        <div className={mobile ? "" : "border-l border-slate-100 bg-slate-50/80 p-4"}>
          <p className={`px-3 pb-1 pt-3 text-[10px] font-bold ${mobile ? "text-slate-400" : "text-slate-400"}`}>یک تماس، یک چاره</p><p className={`mb-4 px-3 text-sm font-black ${mobile ? "text-white" : "text-ink"}`}>کجا به کمک نیاز دارید؟</p>
          {assistanceRegions.map((region, index) => <div key={region.slug}>
            <button type="button" aria-expanded={active === region.slug} aria-controls={`${id}-region-${index}`} onClick={() => setActive(region.slug)} className={`mb-2 flex min-h-[80px] w-full items-center gap-3 rounded-2xl border px-3 text-right transition-all focus-visible:outline-2 focus-visible:outline-orange-400 ${active === region.slug ? "border-orange-200 bg-white text-ink shadow-[0_5px_20px_-10px_#f97316]" : mobile ? "border-transparent text-white hover:bg-white/5" : "border-transparent text-slate-700 hover:bg-white"}`}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${active === region.slug ? "bg-brand-orange text-white" : "bg-orange-100 text-brand-orange"}`}><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span><span className="flex-1"><span className="block text-sm font-black">{region.name}</span><span className="mt-1 block text-[9px] text-slate-400">{descriptions[index]}</span></span><Chevron down={mobile} /></button>
            {mobile && <div hidden={active !== region.slug} className="rounded-xl bg-white p-3">{brandsPanel(region, index)}</div>}
          </div>)}
          <Link prefetch={false} href="/امداد-خودرو" onClick={navigate} className={`mt-3 flex min-h-12 items-center justify-between border-t px-3 text-[11px] font-bold ${mobile ? "border-white/10 text-orange-300" : "border-slate-200 text-slate-500 hover:text-brand-orange"}`}>راهنمای جامع امداد خودرو<Chevron /></Link>
        </div>
        {!mobile && <>
          <div className="max-h-[72vh] overflow-y-auto p-6">{assistanceRegions.map(brandsPanel)}{!activeRegion && <div className="flex min-h-[370px] flex-col items-center justify-center text-center"><span className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-3xl text-brand-orange" aria-hidden="true">↖</span><h2 className="text-xl font-black">مسیر خدمت از اینجا شروع می‌شود</h2><p className="mt-3 max-w-xs text-sm leading-8 text-slate-500">روی منطقه موردنظر بروید؛ سپس برند خودروی خود را انتخاب کنید.</p><div className="mt-6 flex gap-2">{["تهران", "کرج", "شمال"].map(name => <span key={name} className="rounded-full bg-slate-100 px-4 py-2 text-[11px] text-slate-500">{name}</span>)}</div></div>}</div>
          <div className="relative m-3 mr-0 isolate min-h-[430px] overflow-hidden rounded-[20px] bg-ink text-white"><Image src="/images/service-tow.webp" alt="خودروبر و خدمات حمل خودرو چاره" fill sizes="250px" className="-z-20 object-cover" /><div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#061426] via-[#061426]/45 to-[#061426]/10" /><div className="flex h-full flex-col justify-end p-5"><span className="mb-4 w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] backdrop-blur">همراه شما در مسیر</span><p className="text-2xl font-black leading-[1.8]">یک تماس،<br /><span className="text-orange-400">یک چاره.</span></p><p className="mt-3 text-xs leading-7 text-slate-300">انتخاب خدمت متناسب با خودرو و موقعیت شما</p><a href="tel:09123022064" className="mt-5 rounded-xl bg-brand-orange px-3 py-3 text-center text-sm font-bold" dir="ltr">09123022064</a></div></div>
        </>}
      </div>
    </div>
  </div>;
}
