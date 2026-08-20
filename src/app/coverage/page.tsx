import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";

export const metadata: Metadata = {
  title: "محدوده پوشش خودرو چاره",
  description: "نقشه سه‌بعدی محدوده پوشش خودرو چاره؛ تهران و کرج فعال هستند و شهرهای دیگر مرحله‌به‌مرحله اضافه می‌شوند.",
  alternates: { canonical: "/coverage" },
};

const lockedCities = ["قم", "اصفهان", "مشهد", "شیراز", "تبریز", "اهواز"];

export default function CoveragePage() {
  return (
    <SubpageShell>
      <section className="relative overflow-hidden bg-[#071a2e] py-16 text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,.22),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(255,83,21,.16),transparent_25%)]" /><div className="site-container relative text-center"><span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-300">تهران و کرج فعال</span><h1 className="mt-6 text-3xl font-black md:text-5xl">محدوده پوشش خودرو چاره</h1><p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-300">تهران و کرج نقطه شروع شبکه امداد خودرو چاره هستند. شهرهای دیگر با توسعه شبکه امدادگران، مرحله‌به‌مرحله فعال می‌شوند.</p></div></section>
      <section className="site-container -mt-8 relative z-10 grid gap-5 lg:grid-cols-[1.45fr_.55fr]" dir="ltr">
        <div className="relative min-h-[520px] overflow-hidden rounded-[1.8rem] border border-slate-200 bg-[#071a2e] shadow-card" dir="rtl"><Image src="/images/coverage-iran-glass-v2.webp" alt="نقشه سه‌بعدی شیشه‌ای محدوده پوشش خودرو چاره در ایران" fill priority sizes="(min-width:1024px) 65vw,100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#031224]/80 via-transparent to-[#031224]/10" /><div className="absolute right-[35%] top-[39%] rounded-full border border-emerald-300/70 bg-emerald-400/20 px-3 py-2 text-[10px] font-black text-white shadow-[0_0_24px_rgba(52,211,153,.55)]">تهران · فعال</div><div className="absolute right-[32%] top-[45%] rounded-full border border-emerald-300/70 bg-emerald-400/20 px-3 py-2 text-[10px] font-black text-white shadow-[0_0_24px_rgba(52,211,153,.55)]">کرج · فعال</div><div className="absolute bottom-5 right-5 max-w-xs rounded-2xl border border-white/20 bg-[#031224]/70 p-4 text-xs leading-6 text-slate-200 backdrop-blur-md">نقاط کم‌نور، شهرهایی هستند که در صف توسعه شبکه قرار دارند. فعال‌سازی هر شهر به تکمیل شبکه امدادگران وابسته است.</div></div>
        <aside className="rounded-[1.8rem] bg-white p-6 shadow-card" dir="rtl"><h2 className="text-xl font-black">وضعیت شهرها</h2><div className="mt-5 grid gap-3"><div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4"><span className="font-black">تهران</span><span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black text-white">فعال</span></div><div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4"><span className="font-black">کرج</span><span className="rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-black text-white">فعال</span></div>{lockedCities.map((city, index) => <div key={city} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2"><Icon name="lock" size={16} className="text-slate-400" /><span className="text-sm font-bold text-slate-600">{city}</span></div><span className="inline-flex items-center gap-2 text-[10px] text-slate-400"><i className="h-3 w-3 animate-spin rounded-full border-2 border-slate-300 border-t-brand-orange" /> مرحله {(index + 1).toLocaleString("fa-IR")}</span></div>)}</div></aside>
      </section>
      <section className="site-container mt-10 rounded-2xl bg-white p-7 text-center shadow-card"><h2 className="text-2xl font-black">در تهران یا کرج به امداد نیاز دارید؟</h2><p className="mt-3 text-sm text-slate-500">درخواست را ثبت کنید تا نزدیک‌ترین مسیر هماهنگی برای شما بررسی شود.</p><div className="mt-6 flex flex-wrap justify-center gap-3"><Link href="/#request" className="inline-flex min-h-11 items-center rounded-lg bg-brand-orange px-6 text-sm font-black text-white">ثبت درخواست</Link><a href="tel:09123022064" className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-6 text-sm font-black" dir="ltr">09123022064</a></div></section>
    </SubpageShell>
  );
}
