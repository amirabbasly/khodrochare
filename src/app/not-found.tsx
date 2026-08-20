import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";

export default function NotFound() {
  return <SubpageShell><section className="site-container flex min-h-[62vh] items-center justify-center py-16"><div className="max-w-xl text-center"><span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-5xl font-black text-brand-orange">۴۰۴</span><h1 className="mt-7 text-3xl font-black md:text-5xl">این مسیر پیدا نشد</h1><p className="mt-4 text-sm leading-8 text-slate-500">صفحه‌ای که دنبال آن هستید حذف شده، جابه‌جا شده یا آدرس آن اشتباه وارد شده است.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-orange px-6 text-sm font-black text-white shadow-orange"><Icon name="home" size={18} /> بازگشت به صفحه اصلی</Link><Link href="/services" className="inline-flex min-h-12 items-center rounded-lg border border-slate-300 px-6 text-sm font-black text-ink">مشاهده خدمات</Link></div></div></section></SubpageShell>;
}
