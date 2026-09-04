import type { Metadata } from "next";
import Link from "next/link";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { breadcrumbSchema, faqSchema, webAppSchema, webPageSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";
import { CostCalculator } from "@/components/calculator/cost-calculator";

const title = "محاسبه آنلاین هزینه امداد خودرو و یدک‌کش";
const description = "محاسبه آنلاین و رایگان برآورد هزینه امداد خودرو، یدک‌کش، خودروبر، مکانیک سیار، باتری و پنچرگیری در تهران و کرج بر اساس نوع خدمت، نوع خودرو و مسافت حمل.";

const calculatorFaqs = [
  { question: "آیا عددی که این ابزار نشان می‌دهد قیمت قطعی است؟", answer: "خیر. این ابزار یک برآورد آموزشی بر اساس فاکتورهای رایج قیمت‌گذاری (نوع خدمت، نوع خودرو، مسافت و زمان) ارائه می‌کند تا پیش از ثبت درخواست دید واقع‌بینانه‌ای از بازه هزینه داشته باشید. قیمت نهایی پس از ثبت موقعیت و مدل خودرو و پیش از اعزام اعلام می‌شود." },
  { question: "هزینه یدک‌کش در تهران و کرج بر چه اساسی تعیین می‌شود؟", answer: "سه فاکتور اصلی تعیین‌کننده است: مبنای اعزام (هزینه پایه)، مسافت حمل از محل خودرو تا مقصد، و نوع خودرو (سواری، شاسی‌بلند، وانت یا لوکس). زمان درخواست در ساعات شبانه یا تعطیلات نیز می‌تواند ضریب جداگانه‌ای داشته باشد." },
  { question: "چرا حمل خودروی اتوماتیک یا لوکس گران‌تر است؟", answer: "خودروهای گیربکس اتوماتیک و CVT برای جلوگیری از آسیب به گیربکس باید با خودروبر کفی حمل شوند و خودروهای لوکس به کفی کم‌شیب با تجهیزات مهار اختصاصی نیاز دارند. این تجهیز و ریسک پایین‌تر، تعرفه متفاوتی نسبت به یدک‌کش چرخ‌گیر ایجاد می‌کند." },
  { question: "امکان محاسبه هزینه قبل از تماس وجود دارد؟", answer: "بله؛ همین ابزار برای این منظور ساخته شده است. مشخصات را وارد کنید، بازه تقریبی را ببینید و در صورت تمایل مستقیم از همین صفحه درخواست آنلاین ثبت کنید تا قیمت دقیق هماهنگ شود." },
] as const;

export const metadata: Metadata = seoMetadata({
  title,
  description,
  path: "/cost-calculator",
  keywords: ["محاسبه هزینه امداد خودرو", "هزینه یدک کش", "قیمت خودروبر", "هزینه حمل خودرو", "قیمت امداد خودرو تهران", "تعرفه یدک کش کرج"],
  image: "/images/services/tow-truck-v2.webp",
  imageAlt: "محاسبه آنلاین هزینه امداد خودرو و یدک کش",
});

export default function CostCalculatorPage() {
  return (
    <SubpageShell>
      <StructuredData data={webPageSchema({ name: title, description, path: "/cost-calculator", breadcrumb: true })} />
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: title }], "/cost-calculator")} />
      <StructuredData data={webAppSchema({ name: title, description, path: "/cost-calculator" })} />
      <StructuredData data={faqSchema([...calculatorFaqs])} />

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,83,21,.2),transparent_25%),radial-gradient(circle_at_80%_35%,rgba(14,165,233,.2),transparent_30%)]" />
        <div className="site-container relative py-14 md:py-20" dir="rtl">
          <SeoBreadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: title }]} />
          <span className="mt-4 inline-flex rounded-full border border-orange-300/25 bg-orange-300/10 px-4 py-2 text-xs font-black text-orange-200">قیمت‌گذاری شفاف، قبل از اعزام</span>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.55] md:text-5xl">محاسبه آنلاین هزینه امداد خودرو</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">ابزار زیر بر اساس نوع خدمت، نوع خودرو و مسافت حمل، بازه تقریبی هزینه یدک‌کش، خودروبر، مکانیک سیار، باتری و پنچرگیری در تهران و کرج را برآورد می‌کند تا پیش از ثبت درخواست، از هزینه تقریبی مطمئن شوید.</p>
        </div>
      </section>

      <section className="site-container mt-8" dir="rtl">
        <CostCalculator />
      </section>

      <section className="site-container mt-10 grid gap-6 md:grid-cols-3" dir="rtl">
        <article className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-lg font-black text-ink">چه چیزهایی روی قیمت اثر می‌گذارد؟</h2>
          <ul className="mt-4 grid gap-2 text-sm leading-7 text-slate-600">
            <li>• نوع خدمت: امداد در محل، حمل با یدک‌کش یا خودروبر</li>
            <li>• مسافت حمل و شرایط دسترسی به محل توقف</li>
            <li>• نوع و وزن خودرو و نیاز به تجهیزات خاص</li>
            <li>• زمان درخواست؛ شبانه، تعطیلات و پیک ترافیک</li>
          </ul>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-lg font-black text-ink">کدام خدمت مناسب شماست؟</h2>
          <p className="mt-3 text-sm leading-8 text-slate-600">اگر خودرو روشن نمی‌شود یا چراغ چک روشن است، «امداد در محل» یا «مکانیک سیار» کافی است؛ برای حمل خودروی گیربکس اتوماتیک یا تصادفی، «خودروبر و کفی» انتخاب درست است.</p>
          <Link href="/services" className="mt-4 inline-flex text-sm font-black text-brand-orange">مقایسه همه خدمات ←</Link>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-card">
          <h2 className="text-lg font-black text-ink">راهنمای کامل قیمت یدک‌کش</h2>
          <p className="mt-3 text-sm leading-8 text-slate-600">در مقاله راهنمای هزینه حمل خودرو، اجزای تشکیل قیمت یدک‌کش و خودروبر در تهران و کرج را به‌تفصیل توضیح داده‌ایم.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/blog/car-tow-truck-price-guide" className="text-sm font-black text-brand-orange">خواندن راهنما ←</Link>
            <Link href="/pricing" className="text-sm font-black text-brand-orange">صفحه قیمت خدمات ←</Link>
          </div>
        </article>
      </section>

      <section className="site-container mt-8 rounded-2xl bg-white p-6 shadow-card md:p-8" dir="rtl">
        <h2 className="text-2xl font-black text-ink">پرسش‌های رایج درباره هزینه امداد خودرو</h2>
        <div className="mt-5 divide-y divide-slate-100">
          {calculatorFaqs.map((faq) => <details key={faq.question} className="py-4"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 text-sm leading-8 text-slate-600">{faq.answer}</p></details>)}
        </div>
      </section>
    </SubpageShell>
  );
}
