import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد (خطای ۴۰۴)",
  description: "این آدرس در سایت خودرو چاره وجود ندارد. از فهرست خدمات امداد خودرو، صفحه شهر یا مجله خودرو چاره ادامه دهید.",
  robots: { index: false, follow: true },
};

const suggestions = [
  ["همه خدمات خودرو", "/services"],
  ["امداد خودرو تهران", "/تهران"],
  ["امداد خودرو کرج", "/کرج"],
  ["مجله خودرو چاره", "/blog"],
  ["مناطق تحت پوشش", "/coverage"],
  ["تماس با پشتیبانی", "/contact"],
] as const;

export default function NotFound() {
  return (
    <SubpageShell>
      <section className="site-container flex min-h-[62vh] items-center justify-center py-16">
        <div className="max-w-2xl text-center">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-orange-50 text-5xl font-black text-brand-orange">۴۰۴</span>
          <h1 className="mt-7 text-3xl font-black md:text-5xl">این مسیر پیدا نشد</h1>
          <p className="mt-4 text-sm leading-8 text-slate-500">صفحه‌ای که دنبال آن هستید حذف شده، جابه‌جا شده یا آدرس آن اشتباه وارد شده است. از مسیرهای زیر ادامه دهید یا برای درخواست فوری تماس بگیرید.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-orange px-6 text-sm font-black text-white shadow-orange"><Icon name="home" size={18} /> بازگشت به صفحه اصلی</Link>
            <a href="tel:09123022064" className="inline-flex min-h-12 items-center rounded-lg border border-slate-300 px-6 text-sm font-black text-ink" dir="ltr">09123022064</a>
          </div>
          <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="مسیرهای پیشنهادی">
            {suggestions.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-xs font-black text-slate-600 transition hover:border-orange-200 hover:text-brand-orange">{label}</Link>
            ))}
          </nav>
        </div>
      </section>
    </SubpageShell>
  );
}
