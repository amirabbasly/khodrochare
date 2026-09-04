import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { carBrands } from "@/content/brands";

const title = "امداد خودرو بر اساس برند";
const description = "امداد خودرو آنلاین برای انواع برندها در تهران و کرج؛ ایران خودرو، سایپا، مدیران خودرو، کرمان موتور، بهمن موتور، تویوتا، هیوندای، کیا، نیسان، رنو، بی‌ام‌و و مرسدس بنز.";

export const metadata: Metadata = seoMetadata({
  title,
  description,
  path: "/brands",
  keywords: ["امداد خودرو بر اساس برند", "امداد خودرو ایران خودرو", "امداد خودرو سایپا", "امداد خودرو تویوتا", "امداد خودرو هیوندای", "یدک کش خودرو خارجی", "خودروبر خودرو لوکس"],
  image: "/images/services/roadside-assistance-v2.webp",
  imageAlt: "امداد خودرو بر اساس برند در تهران و کرج",
});

const originBadge: Record<string, string> = {
  "خودروی داخلی": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "خودروی چینی": "bg-amber-50 text-amber-700 border-amber-200",
  "خودروی خارجی": "bg-sky-50 text-sky-700 border-sky-200",
  "خودروی لوکس": "bg-violet-50 text-violet-700 border-violet-200",
};

export default function BrandsPage() {
  return (
    <SubpageShell>
      <StructuredData data={webPageSchema({ name: title, description, path: "/brands", breadcrumb: true })} />
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: title }], "/brands")} />
      <StructuredData data={itemListSchema({ name: "امداد خودرو بر اساس برند در تهران و کرج", path: "/brands", items: carBrands.map((brand) => ({ name: `امداد خودرو ${brand.name}`, path: `/brands/${brand.slug}` })) })} />

      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,83,21,.2),transparent_25%),radial-gradient(circle_at_80%_35%,rgba(14,165,233,.2),transparent_30%)]" />
        <div className="site-container relative py-14 md:py-20" dir="rtl">
          <SeoBreadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: title }]} />
          <span className="mt-4 inline-flex rounded-full border border-orange-300/25 bg-orange-300/10 px-4 py-2 text-xs font-black text-orange-200">تخصص بر اساس برند خودرو</span>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.55] md:text-5xl">امداد خودرو بر اساس برند در تهران و کرج</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300">خرابی هر برند، مختصات خودش را دارد؛ از باتری و برق پژو ۲۰۶ تا حمل استاندارد بی‌ام‌و با کفی کم‌شیب. برند خودروی خود را انتخاب کنید تا خدمات، مدل‌های تحت پوشش و نکات تخصصی همان برند را ببینید.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/#request" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-brand-orange px-6 text-sm font-black text-white shadow-orange"><Icon name="form" size={17} /> ثبت درخواست امداد</Link>
            <a href="tel:09123022064" className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-white/30 px-6 text-sm font-black" dir="ltr"><Icon name="phone" size={17} /> 09123022064</a>
          </div>
        </div>
      </section>

      <section className="site-container mt-8" dir="rtl">
        <h2 className="text-2xl font-black text-ink">برند خودروی خود را انتخاب کنید</h2>
        <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-500">برای هر برند، مدل‌های تحت پوشش، خرابی‌های رایج قابل رفع در محل و استاندارد حمل (یدک‌کش یا خودروبر کفی) مشخص شده است.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {carBrands.map((brand) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-orange-200">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-black text-ink transition group-hover:text-brand-orange">امداد خودرو {brand.name}</h3>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${originBadge[brand.origin]}`}>{brand.origin}</span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-500">{brand.summary}</p>
              <p className="mt-3 text-[11px] leading-6 text-slate-400">{brand.models.slice(0, 5).join("، ")} و مدل‌های دیگر</p>
              <span className="mt-4 inline-flex text-xs font-black text-brand-orange">مشاهده خدمات {brand.name} ←</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-container mt-8 grid gap-6 md:grid-cols-2" dir="rtl">
        <article className="rounded-2xl bg-white p-6 shadow-card md:p-8">
          <h2 className="text-xl font-black text-ink">برند شما در فهرست نیست؟</h2>
          <p className="mt-3 text-sm leading-8 text-slate-600">خودرو چاره برای تمام خودروهای سواری، شاسی‌بلند و وانت — از هر برند داخلی یا خارجی — در تهران و کرج امداد در محل، یدک‌کش، خودروبر، باتری و مکانیک سیار ارائه می‌کند. هنگام ثبت درخواست، مدل دقیق خودرو را بنویسید تا تجهیز متناسب اعزام شود.</p>
          <Link href="/services" className="mt-4 inline-flex text-sm font-black text-brand-orange">مشاهده همه خدمات ←</Link>
        </article>
        <article className="rounded-2xl bg-white p-6 shadow-card md:p-8">
          <h2 className="text-xl font-black text-ink">برآورد هزینه قبل از اعزام</h2>
          <p className="mt-3 text-sm leading-8 text-slate-600">با ابزار محاسبه آنلاین، بر اساس نوع خدمت، نوع خودرو و مسافت حمل، بازه تقریبی هزینه را ببینید و بعد با خیال راحت درخواست ثبت کنید.</p>
          <Link href="/cost-calculator" className="mt-4 inline-flex text-sm font-black text-brand-orange">محاسبه آنلاین هزینه امداد ←</Link>
        </article>
      </section>
    </SubpageShell>
  );
}
