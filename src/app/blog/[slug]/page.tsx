import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubpageShell } from "@/components/site/subpage-shell";
import { blogPosts, getBlogPost } from "@/content/blog";
import { StructuredData } from "@/components/seo/structured-data";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/seo/schemas";

const commercialLinks: Record<string, { title: string; href: string }[]> = {
  "car-assistance-coverage-tehran-karaj": [{ title: "امداد خودرو تهران", href: "/تهران" }, { title: "امداد خودرو کرج", href: "/کرج" }, { title: "مناطق تحت پوشش", href: "/coverage" }, { title: "ثبت امداد خودرو آنلاین", href: "/#request" }],
  "safe-towing-guide": [{ title: "یدک کش تهران", href: "/تهران/یدک-کش" }, { title: "یدک کش کرج", href: "/کرج/یدک-کش" }, { title: "خودروبر تهران و کرج", href: "/services/flatbed-carrier" }, { title: "هزینه حمل خودرو", href: "/blog/car-tow-truck-price-guide" }],
  "car-tow-truck-price-guide": [{ title: "هزینه و درخواست یدک کش تهران", href: "/تهران/یدک-کش" }, { title: "هزینه و درخواست یدک کش کرج", href: "/کرج/یدک-کش" }, { title: "خودروبر تهران و کرج", href: "/services/flatbed-carrier" }, { title: "قیمت خدمات امدادی", href: "/pricing" }],
  "mobile-mechanic-checklist": [{ title: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" }, { title: "مکانیک سیار کرج", href: "/کرج/مکانیک-سیار" }, { title: "دیاگ سیار تهران", href: "/تهران/دیاگ-سیار" }],
  "what-to-do-when-car-stops-on-highway": [{ title: "امداد خودرو آنلاین تهران", href: "/تهران/امداد-خودرو" }, { title: "امداد خودرو آنلاین کرج", href: "/کرج/امداد-خودرو" }, { title: "یدک کش تهران", href: "/تهران/یدک-کش" }, { title: "ثبت درخواست فوری", href: "/#request" }],
  "car-battery-warning-signs": [{ title: "باتری خودرو تهران", href: "/تهران/باتری-خودرو" }, { title: "باتری خودرو کرج", href: "/کرج/باتری-خودرو" }, { title: "باتری به باتری", href: "/services/jump-start" }],
  "mobile-battery-replacement-tehran-karaj": [{ title: "باتری خودرو تهران", href: "/تهران/باتری-خودرو" }, { title: "باتری خودرو کرج", href: "/کرج/باتری-خودرو" }, { title: "باتری به باتری", href: "/services/jump-start" }],
  "mobile-carwash-guide": [{ title: "کارواش سیار تهران", href: "/تهران/کارواش-سیار" }, { title: "کارواش سیار کرج", href: "/کرج/کارواش-سیار" }, { title: "کارواش سیار در محل", href: "/services/mobile-carwash" }],
  "flat-tire-roadside-assistance": [{ title: "پنچرگیری سیار تهران", href: "/تهران/پنچرگیری-سیار" }, { title: "پنچرگیری سیار کرج", href: "/کرج/پنچرگیری-سیار" }, { title: "تعویض لاستیک در محل", href: "/services/flat-tire" }],
  "mobile-diagnostics-check-engine-guide": [{ title: "دیاگ سیار تهران", href: "/تهران/دیاگ-سیار" }, { title: "دیاگ سیار کرج", href: "/کرج/دیاگ-سیار" }, { title: "عیب‌یابی سیار خودرو", href: "/services/mobile-diagnostics" }],
  "car-maintenance-before-long-trip": [{ title: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" }, { title: "باتری خودرو در محل", href: "/services/battery-replacement" }, { title: "پنچرگیری سیار", href: "/services/flat-tire" }, { title: "امداد خودرو آنلاین", href: "/services/roadside-assistance" }],
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.title, post.category, "امداد خودرو", "امداد خودرو آنلاین", "امداد خودرو تهران", "امداد خودرو کرج"],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/blog/${post.slug}`, images: [{ url: post.image, alt: post.title }], publishedTime: post.publishedAtIso, modifiedTime: post.updatedAtIso, section: post.category, locale: "fa_IR" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  const serviceLinks = commercialLinks[post.slug] ?? [{ title: "امداد خودرو در محل", href: "/services/roadside-assistance" }, { title: "امداد خودرو تهران", href: "/تهران" }, { title: "امداد خودرو کرج", href: "/کرج" }];
  return (
    <SubpageShell>
      <StructuredData data={articleSchema({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.image, publishedAt: post.publishedAtIso, modifiedAt: post.updatedAtIso, section: post.category, keywords: [post.title, post.category, "امداد خودرو", "امداد خودرو آنلاین", "خودرو چاره"] })} />
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "مجله خودرو چاره", path: "/blog" }, { name: post.title }])} />
      {post.faqs?.length ? <StructuredData data={faqSchema(post.faqs)} /> : null}
      <article>
        <header className="bg-[#071a2e] py-14 text-white"><div className="site-container max-w-4xl"><Link href="/blog" className="text-xs font-black text-brand-orange">بازگشت به وبلاگ</Link><p className="mt-6 text-xs text-slate-400">{post.category} · {post.readTime} · {post.publishedAt}</p><h1 className="mt-4 text-3xl font-black leading-[1.6] md:text-5xl">{post.title}</h1><p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300">{post.excerpt}</p></div></header>
        <div className="site-container max-w-4xl -mt-5 relative z-10"><div className="relative h-64 overflow-hidden rounded-2xl shadow-card md:h-[430px]"><Image src={post.image} alt={post.title} fill priority sizes="900px" className="object-cover" /></div><div className="mt-6 rounded-2xl bg-white p-6 shadow-card md:p-10">{post.sections.map((section) => <section key={section.title} className="mb-9 last:mb-0"><h2 className="text-xl font-black md:text-2xl">{section.title}</h2><p className="mt-4 text-sm leading-9 text-slate-600">{section.body}</p></section>)}{post.faqs?.length ? <section className="mt-10 border-t border-slate-100 pt-8" aria-labelledby="article-faq"><h2 id="article-faq" className="text-xl font-black md:text-2xl">سؤالات متداول</h2><div className="mt-5 space-y-3">{post.faqs.map((faq) => <details key={faq.question} className="group rounded-xl border border-slate-200 bg-slate-50 p-4"><summary className="cursor-pointer list-none text-sm font-black text-ink marker:hidden">{faq.question}<span className="float-left text-brand-orange transition group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-8 text-slate-600">{faq.answer}</p></details>)}</div></section> : null}</div>{relatedPosts.length ? <aside className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" dir="rtl"><h2 className="text-lg font-black">مطالب مرتبط</h2><div className="mt-4 grid gap-3 md:grid-cols-3">{relatedPosts.map((related) => <Link key={related.slug} href={`/blog/${related.slug}`} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-black leading-7 text-ink transition hover:border-orange-200 hover:text-brand-orange">{related.title}<span className="mt-2 block text-[10px] font-normal text-slate-400">مطالعه مقاله ←</span></Link>)}</div></aside> : null}<div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center"><strong className="text-lg">نیاز به بررسی خودرو در محل دارید؟</strong><p className="mt-2 text-xs leading-7 text-slate-600">تشخیص قطعی ایراد فنی باید توسط متخصص و پس از بازدید انجام شود.</p><Link href="/#request" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-brand-orange px-6 text-sm font-black text-white">ثبت درخواست خدمت</Link></div></div>
        <aside className="site-container max-w-4xl mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6" dir="rtl" aria-label="خدمات مرتبط"><h2 className="text-lg font-black">خدمات مرتبط خودرو چاره</h2><div className="mt-4 flex flex-wrap gap-3">{serviceLinks.map((item) => <Link key={item.href} href={item.href} className="rounded-lg bg-white px-4 py-3 text-sm font-black text-brand-orange shadow-sm">{item.title} ←</Link>)}</div></aside>
      </article>
    </SubpageShell>
  );
}
