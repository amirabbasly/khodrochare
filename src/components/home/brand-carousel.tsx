import { MotionToggle } from "./motion-preference";
import Image from "next/image";
import Link from "next/link";
import { brandProfiles } from "@/content/brands";

const logoSlugs = ["toyota", "mercedes-benz", "bmw", "hyundai", "kia", "mazda", "nissan", "renault"];
export function BrandCarousel() {
  return <section aria-label="برندهای خودرو" data-testid="home-brand-carousel" className="brand-marquee landing-glass min-w-0 max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white px-3 py-4 shadow-card lg:px-5 lg:py-6" dir="rtl">
    <div className="mb-4 flex items-center justify-between gap-3 lg:mb-5"><div className="flex items-center gap-2"><span className="h-4 w-1 rounded-full bg-brand-orange" /><h2 className="text-xs font-black text-ink lg:text-sm">امداد متناسب با برند خودروی شما</h2></div><div className="flex shrink-0 items-center gap-2"><Link href="/brands" className="hidden text-[10px] font-bold text-brand-orange sm:inline">همه برندها ←</Link><MotionToggle /></div></div>
    <div className="brand-marquee-viewport min-w-0 max-w-full overflow-hidden rounded-xl" dir="ltr" aria-label="نوار پیوسته برندها">
      <div className="brand-marquee-track flex w-max">
        {[false, true].map(duplicate => <ul key={String(duplicate)} aria-hidden={duplicate || undefined} className="flex shrink-0 gap-3 pr-3">{logoSlugs.map(slug => {
          const brand = brandProfiles.find(item => item.slug === slug)!;
          return <li key={slug}><Link href={`/brands/${slug}`} tabIndex={duplicate ? -1 : undefined} className="group flex min-h-[110px] w-[116px] flex-col items-center justify-center gap-3 rounded-xl border border-transparent bg-slate-50/80 px-3 py-4 transition hover:border-orange-200 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-orange-400 lg:min-h-[140px] lg:w-[136px]" dir="rtl"><Image src={`/images/brands/${slug}.png`} alt={duplicate ? "" : `لوگوی ${brand.name}`} width={80} height={60} sizes="80px" className="h-12 w-20 object-contain transition-transform group-hover:scale-110 lg:h-16" /><span className="text-[11px] font-bold text-slate-600 group-hover:text-brand-orange lg:text-xs">{brand.name}</span></Link></li>;
        })}</ul>)}
      </div>
    </div>
  </section>;
}
