import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SubpageShell } from "@/components/site/subpage-shell";
import { blogPosts } from "@/content/blog";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema } from "@/seo/schemas";

export const metadata: Metadata = {
  title: "مجله خودرو | راهنمای نگهداری و امداد خودرو",
  description: "مقالات کاربردی خودرو چاره درباره باتری، امداد جاده‌ای، یدک‌کشی ایمن، مکانیک سیار و نگهداری خودرو.",
  alternates: { canonical: "/blog" },
};

const categories = ["همه مطالب", "امداد خودرو آنلاین", "امداد جاده‌ای", "حمل خودرو", "مکانیک سیار", "باتری و برق", "نگهداری خودرو"];

export default function BlogPage() {
  const [featured, ...posts] = blogPosts;
  return (
    <SubpageShell>
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "مجله خودرو چاره" }])} />
      <section className="border-t border-white/10 bg-[#071a2e] py-14 text-white md:py-20"><div className="site-container"><div className="flex flex-wrap items-end justify-between gap-6" dir="rtl"><div><span className="inline-flex rounded-full border border-orange-300/25 bg-orange-300/10 px-4 py-2 text-xs font-black text-orange-200">مجله خودرو چاره</span><h1 className="mt-5 max-w-3xl text-3xl font-black leading-[1.55] md:text-5xl">راهنمای روشن برای تصمیم‌های مهم خودرو</h1><p className="mt-4 max-w-2xl text-sm leading-8 text-slate-300">مقاله‌های کوتاه و کاربردی درباره نگهداری، خرابی، امداد جاده‌ای و انتخاب خدمت مناسب؛ برای زمانی که می‌خواهید قبل از تصمیم، اطلاعات درست داشته باشید.</p></div><div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-xs text-slate-300"><strong className="block text-lg text-white">{blogPosts.length.toLocaleString("fa-IR")} مقاله</strong><span className="mt-1 block">راهنمای کاربردی خودرو</span></div></div></div></section>
      <section className="site-container mt-8" aria-labelledby="featured-article">
        <div className="flex flex-wrap items-center justify-between gap-3"><h2 id="featured-article" className="text-2xl font-black text-ink">مقاله منتخب</h2><div className="flex flex-wrap gap-2" dir="rtl">{categories.map((category, index) => <span key={category} className={`rounded-full px-3 py-2 text-[10px] font-black ${index === 0 ? "bg-brand-orange text-white" : "border border-slate-200 bg-white text-slate-500"}`}>{category}</span>)}</div></div>
        <Link href={`/blog/${featured.slug}`} className="group mt-5 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card lg:grid-cols-[1.1fr_.9fr]" dir="ltr"><div className="relative min-h-72 overflow-hidden lg:min-h-[360px]"><Image src={featured.image} alt={featured.title} fill priority sizes="(min-width:1024px) 58vw,100vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="flex flex-col justify-center p-7 text-right md:p-10" dir="rtl"><div className="flex items-center gap-3 text-[11px]"><span className="font-black text-brand-orange">{featured.category}</span><span className="text-slate-400">{featured.readTime} مطالعه</span></div><h3 className="mt-4 text-2xl font-black leading-[1.7] md:text-3xl">{featured.title}</h3><p className="mt-4 text-sm leading-8 text-slate-500">{featured.excerpt}</p><span className="mt-7 inline-flex w-fit items-center rounded-lg bg-ink px-5 py-3 text-xs font-black text-white transition group-hover:bg-brand-orange">مطالعه مقاله</span></div></Link>
        <div className="mt-12 flex items-center justify-between gap-4"><h2 className="text-2xl font-black text-ink">آخرین مطالب</h2><span className="text-xs text-slate-400">دانش کاربردی، بدون پیچیدگی</span></div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">{posts.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card"><div className="relative h-56 overflow-hidden"><Image src={post.image} alt={post.title} fill sizes="(min-width:768px) 50vw,100vw" className="object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-6" dir="rtl"><div className="flex items-center justify-between text-[10px]"><span className="font-black text-brand-orange">{post.category}</span><span className="text-slate-400">{post.readTime} مطالعه</span></div><h3 className="mt-3 text-lg font-black leading-8">{post.title}</h3><p className="mt-3 text-xs leading-7 text-slate-500">{post.excerpt}</p><span className="mt-4 inline-flex text-xs font-black text-brand-orange">خواندن مقاله ←</span></div></Link>)}</div>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 text-right shadow-sm md:p-8" dir="rtl"><h2 className="text-xl font-black">چرا مجله خودرو چاره؟</h2><p className="mt-3 text-sm leading-8 text-slate-600">هدف این مجله، کمک به تصمیم‌گیری بهتر در زمان نگهداری یا خرابی خودرو است. از نشانه‌های ضعف باتری و ایمنی یدک‌کشی تا انتخاب مکانیک سیار، مطالب بر اساس موقعیت‌های واقعی رانندگان نوشته می‌شوند و جای تشخیص متخصص را نمی‌گیرند.</p></div>
      </section>
    </SubpageShell>
  );
}
