import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubpageShell } from "@/components/site/subpage-shell";
import { blogPosts, getBlogPost } from "@/content/blog";
import { StructuredData } from "@/components/seo/structured-data";
import { articleSchema, breadcrumbSchema } from "@/seo/schemas";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${post.slug}` } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return (
    <SubpageShell>
      <StructuredData data={articleSchema({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.image, publishedAt: post.publishedAtIso })} />
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "مجله خودرو چاره", path: "/blog" }, { name: post.title }])} />
      <article>
        <header className="bg-[#071a2e] py-14 text-white"><div className="site-container max-w-4xl"><Link href="/blog" className="text-xs font-black text-brand-orange">بازگشت به وبلاگ</Link><p className="mt-6 text-xs text-slate-400">{post.category} · {post.readTime} · {post.publishedAt}</p><h1 className="mt-4 text-3xl font-black leading-[1.6] md:text-5xl">{post.title}</h1><p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300">{post.excerpt}</p></div></header>
        <div className="site-container max-w-4xl -mt-5 relative z-10"><div className="relative h-64 overflow-hidden rounded-2xl shadow-card md:h-[430px]"><Image src={post.image} alt={post.title} fill priority sizes="900px" className="object-cover" /></div><div className="mt-6 rounded-2xl bg-white p-6 shadow-card md:p-10">{post.sections.map((section) => <section key={section.title} className="mb-9 last:mb-0"><h2 className="text-xl font-black md:text-2xl">{section.title}</h2><p className="mt-4 text-sm leading-9 text-slate-600">{section.body}</p></section>)}</div><div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center"><strong className="text-lg">نیاز به بررسی خودرو در محل دارید؟</strong><p className="mt-2 text-xs leading-7 text-slate-600">تشخیص قطعی ایراد فنی باید توسط متخصص و پس از بازدید انجام شود.</p><Link href="/#request" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-brand-orange px-6 text-sm font-black text-white">ثبت درخواست خدمت</Link></div></div>
      </article>
    </SubpageShell>
  );
}
