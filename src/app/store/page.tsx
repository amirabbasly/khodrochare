import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";

export const metadata: Metadata = {
  title: "فروشگاه خودرو چاره به‌زودی",
  description: "فروشگاه خودرو چاره به‌زودی با قدرت شروع خواهد کرد.",
  alternates: { canonical: "/store" },
  robots: { index: false, follow: true },
};

export default function StorePage() {
  return (
    <SubpageShell>
      <main className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#071a2e] py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,83,21,.24),transparent_25%),radial-gradient(circle_at_85%_70%,rgba(14,165,233,.2),transparent_30%)]" />
        <div className="site-container relative text-center"><span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-orange-300"><Icon name="tag" size={24} /></span><h1 className="mt-7 text-4xl font-black leading-[1.5] md:text-6xl">به‌زودی با قدرت شروع خواهیم کرد</h1><p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-300">فروشگاه خودرو چاره در حال آماده‌سازی است تا قطعات و لوازم مصرفی سازگار با خودرو را با تجربه‌ای دقیق و قابل اعتماد ارائه کند.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/services" className="inline-flex min-h-12 items-center rounded-lg bg-brand-orange px-6 text-sm font-black shadow-orange">مشاهده خدمات خودرو</Link><a href="tel:09123022064" className="inline-flex min-h-12 items-center rounded-lg border border-white/25 px-6 text-sm font-black" dir="ltr">09123022064</a></div></div>
      </main>
    </SubpageShell>
  );
}
