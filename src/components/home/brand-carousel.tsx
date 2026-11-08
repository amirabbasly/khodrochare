import Image from "next/image";
import Link from "next/link";
import { brandProfiles } from "@/content/brands";

const logoSlugs = ["toyota", "mercedes-benz", "bmw", "hyundai", "kia", "mazda", "nissan", "renault"];
export function BrandCarousel() {
  return <section aria-label="برندهای خودرو" data-testid="home-brand-carousel" className="brand-marquee brand-showcase min-w-0 max-w-full overflow-hidden rounded-2xl border px-3 py-4 shadow-card lg:px-5 lg:py-6" dir="rtl">
    <div className="mb-4 flex items-center justify-between gap-3 lg:mb-5"><div className="flex items-center gap-2"><span className="h-4 w-1 rounded-full bg-brand-orange" /><h2 className="text-xs font-black text-ink lg:text-sm">امداد متناسب با برند خودروی شما</h2></div><div className="flex shrink-0 items-center gap-2"><Link prefetch={false} href="/brands" className="hidden text-[10px] font-bold text-brand-orange sm:inline">همه برندها ←</Link></div></div>
    <div className="brand-marquee-viewport min-w-0 max-w-full overflow-hidden rounded-xl" dir="ltr" aria-label="نوار پیوسته برندها">
      <div className="always-motion brand-marquee-track flex w-max">
        {[false, true].map(duplicate => <ul key={String(duplicate)} aria-hidden={duplicate || undefined} className="flex shrink-0 gap-3 pr-3">{logoSlugs.map(slug => {
          const brand = brandProfiles.find(item => item.slug === slug)!;
          return <li key={slug}><Link prefetch={false} href={`/brands/${slug}`} tabIndex={duplicate ? -1 : undefined} className="brand-showcase-card group flex min-h-[110px] w-[116px] flex-col items-center justify-center gap-3 rounded-xl px-3 py-4 focus-visible:outline-2 focus-visible:outline-orange-400 lg:min-h-[140px] lg:w-[136px]" dir="rtl"><span className="brand-logo-plinth"><Image src={`/images/brands/display/${slug}.webp`} alt={duplicate ? "" : `لوگوی ${brand.name}`} width={80} height={60} sizes="80px" className={`h-12 w-20 object-contain transition-transform group-hover:scale-110 lg:h-16 ${["toyota", "mercedes-benz", "mazda", "nissan", "renault"].includes(slug) ? "brand-logo-silver" : "brand-logo-colour"}`} /></span><span className="text-[11px] font-bold brand-showcase-name lg:text-xs">{brand.name}</span></Link></li>;
        })}</ul>)}
      </div>
    </div>
  </section>;
}
