import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SubpageShell } from "@/components/site/subpage-shell";
import { blogPosts } from "@/content/blog";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema } from "@/seo/schemas";

export const metadata: Metadata = {
  title: "مجله خودرو چاره | راهنمای امداد خودرو و نگهداری خودرو",
  description: "مقالات تخصصی درباره امداد خودرو آنلاین، امداد خودرو تهران و کرج، خودروبر، یدک‌کش، مکانیک سیار، باتری و نگهداری خودرو.",
  alternates: { canonical: "/blog" },
};

const topics = [
  ["امداد خودرو آنلاین", "/services/roadside-assistance"],
  ["امداد خودرو تهران", "/تهران"],
  ["امداد خودرو کرج", "/کرج"],
  ["یدک‌کش و خودروبر", "/services/flatbed-carrier"],
  ["مکانیک سیار", "/services/mobile-mechanic"],
  ["باتری و برق", "/services/battery-replacement"],
] as const;

export default function BlogPage() {
  const [lead, second, third, ...posts] = blogPosts;
  return <SubpageShell>
    <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "مجله خودرو چاره" }])} />
    <main className="bg-[#f6f6f4] pb-16" dir="rtl">
      <section className="border-b border-slate-200 bg-white"><div className="site-container flex min-h-14 items-center gap-4 overflow-hidden"><strong className="shrink-0 rounded-lg bg-brand-orange px-4 py-2 text-xs text-white">آخرین مطالب</strong><div className="flex min-w-0 items-center gap-8 overflow-hidden whitespace-nowrap text-xs font-bold text-slate-600">{blogPosts.slice(0, 5).map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="hover:text-brand-orange">{post.title}</Link>)}</div></div></section>
      <section className="site-container py-8 md:py-12">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><span className="text-xs font-black text-brand-orange">مجله خودرو چاره</span><h1 className="mt-2 text-3xl font-black tracking-tight text-ink md:text-5xl">دانستنی‌های خودرو و راهنمای امداد در مسیر</h1><p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600">راهنمای تخصصی و قابل‌فهم برای خرابی خودرو، انتخاب امدادگر، حمل ایمن، نگهداری و تصمیم‌گیری سریع در تهران و کرج.</p></div><div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-center shadow-sm"><strong className="block text-2xl text-ink">{blogPosts.length.toLocaleString("fa-IR")}</strong><span className="text-xs text-slate-500">مقاله تخصصی</span></div></div>
        <nav className="mt-7 flex gap-2 overflow-x-auto pb-2" aria-label="موضوعات مجله">{topics.map(([label, href], index) => <Link key={href} href={href} className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-black ${index === 0 ? "border-brand-orange bg-brand-orange text-white" : "border-slate-200 bg-white text-slate-600 hover:border-brand-orange hover:text-brand-orange"}`}>{label}</Link>)}</nav>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
          <Link href={`/blog/${lead.slug}`} className="group relative min-h-[430px] overflow-hidden rounded-3xl bg-ink shadow-card md:min-h-[540px]"><Image src={lead.image} alt={lead.title} fill priority sizes="(min-width:1024px) 66vw,100vw" className="object-cover transition duration-500 group-hover:scale-[1.03]"/><div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-9"><span className="rounded-md bg-brand-orange px-3 py-2 text-[11px] font-black">{lead.category}</span><h2 className="mt-4 max-w-3xl text-2xl font-black leading-[1.7] md:text-4xl">{lead.title}</h2><p className="mt-3 max-w-2xl text-sm leading-8 text-slate-200">{lead.excerpt}</p><span className="mt-4 block text-xs text-slate-300">{lead.publishedAt} · {lead.readTime} مطالعه</span></div></Link>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">{[second, third].map(post => <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative min-h-[255px] overflow-hidden rounded-3xl bg-ink shadow-card"><Image src={post.image} alt={post.title} fill sizes="(min-width:1024px) 32vw,50vw" className="object-cover transition duration-500 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-5 text-white"><span className="text-[10px] font-black text-orange-300">{post.category}</span><h2 className="mt-2 text-lg font-black leading-8">{post.title}</h2><span className="mt-2 block text-[10px] text-slate-300">{post.readTime} مطالعه</span></div></Link>)}</div>
        </div>
      </section>
      <section className="site-container grid gap-8 lg:grid-cols-[1fr_320px]">
        <div><div className="flex items-center justify-between border-b-2 border-ink pb-3"><h2 className="text-2xl font-black">تازه‌ترین راهنماها</h2><Link href="/services" className="text-xs font-black text-brand-orange">همه خدمات ←</Link></div><div className="mt-6 grid gap-6 md:grid-cols-2">{posts.map(post => <article key={post.slug} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-card"><Link href={`/blog/${post.slug}`}><div className="relative aspect-[16/9] overflow-hidden"><Image src={post.image} alt={post.title} fill sizes="(min-width:1024px) 34vw,(min-width:768px) 50vw,100vw" className="object-cover transition duration-500 group-hover:scale-105"/></div><div className="p-5"><div className="flex items-center justify-between text-[10px]"><span className="font-black text-brand-orange">{post.category}</span><span className="text-slate-400">{post.publishedAt}</span></div><h3 className="mt-3 text-lg font-black leading-8 text-ink">{post.title}</h3><p className="mt-3 line-clamp-3 text-xs leading-7 text-slate-500">{post.excerpt}</p><span className="mt-4 inline-flex text-xs font-black text-brand-orange">ادامه مطلب ←</span></div></Link></article>)}</div></div>
        <aside><div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="border-b-2 border-brand-orange pb-3 text-lg font-black">راهنمای خدمات فوری</h2><div className="mt-4 space-y-3">{topics.slice(0, 5).map(([label, href], index) => <Link key={href} href={href} className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 hover:bg-orange-50"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ink text-xs font-black text-white">{(index + 1).toLocaleString("fa-IR")}</span><strong className="text-xs leading-6">{label}</strong></Link>)}</div><div className="mt-6 rounded-xl bg-ink p-5 text-white"><strong>خودرو در مسیر متوقف شده؟</strong><p className="mt-2 text-xs leading-7 text-slate-300">موقعیت و نوع مشکل را آنلاین ثبت کنید.</p><Link href="/#request" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-brand-orange px-4 text-xs font-black">ثبت درخواست فوری</Link></div></div></aside>
      </section>
    </main>
  </SubpageShell>;
}
