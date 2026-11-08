"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type ArticleCard = { slug: string; title: string; excerpt: string; category: string; publishedAt: string; readTime: string };
const PAGE_SIZE = 8;
export function ArticlePagination({ posts }: { posts: ArticleCard[] }) {
  const [page, setPage] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const count = Math.ceil(posts.length / PAGE_SIZE);
  function navigate(next: number) {
    setPage(next);
    root.current?.scrollIntoView({ behavior: "instant", block: "start" });
  }
  return <div ref={root} className="scroll-mt-6" data-testid="article-pagination">
    <p className="my-4 text-sm text-slate-600" role="status" aria-live="polite">صفحه {(page + 1).toLocaleString("fa-IR")} از {count.toLocaleString("fa-IR")}</p>
    <div id="latest-guide-pages">{Array.from({ length: count }, (_, index) => <div key={index} hidden={index !== page} inert={index !== page} className={index === page ? "grid gap-5 md:grid-cols-2" : "hidden"}>
      {posts.slice(index * PAGE_SIZE, (index + 1) * PAGE_SIZE).map(post => <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap justify-between gap-2 text-xs text-slate-600"><span>{post.category}</span><span>{post.publishedAt} · {post.readTime}</span></div>
        <h3 className="mt-3 text-lg font-black leading-8 text-ink"><Link href={`/blog/${post.slug}`} prefetch={false}>{post.title}</Link></h3>
        <p className="mt-3 text-sm leading-8 text-slate-600">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} prefetch={false} className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-brand-orange">مطالعه راهنما ←<span className="sr-only"> {post.title}</span></Link>
      </article>)}
    </div>)}</div>
    {count > 1 && <nav aria-label="صفحه‌بندی تازه‌ترین راهنماها" className="mt-7 flex flex-wrap items-center justify-center gap-3">
      <button type="button" aria-controls="latest-guide-pages" onClick={() => navigate(page - 1)} disabled={page === 0} className="article-page-control">قبلی <span lang="en" className="text-xs">Prev</span></button>
      <div className="flex flex-wrap justify-center gap-1">{Array.from({ length: count }, (_, index) => <button key={index} type="button" aria-label={`صفحه ${index + 1} راهنماها`} aria-current={page === index ? "page" : undefined} aria-controls="latest-guide-pages" onClick={() => navigate(index)} className="article-page-dot"><span /></button>)}</div>
      <button type="button" aria-controls="latest-guide-pages" onClick={() => navigate(page + 1)} disabled={page === count - 1} className="article-page-control">بعدی <span lang="en" className="text-xs">Next</span></button>
    </nav>}
  </div>;
}
