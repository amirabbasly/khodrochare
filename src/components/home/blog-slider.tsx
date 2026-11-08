"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import type { HomeArticleCard } from "@/content/home-articles";

const POSTS_PER_SLIDE = 5;
function subscribeViewport(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}
const viewportSnapshot = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 5;
const serverSnapshot = () => 5;

export function BlogSlider({ posts }: { posts: HomeArticleCard[] }) {
  const perView = useSyncExternalStore(subscribeViewport, viewportSnapshot, serverSnapshot);
  const mobile = perView === 1;
  const track = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mountedCount, setMountedCount] = useState(POSTS_PER_SLIDE);
  const dotStep = mobile ? POSTS_PER_SLIDE : perView;
  const pages = Math.ceil(posts.length / dotStep);
  const activePage = Math.floor(activeIndex / dotStep);
  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < posts.length - perView;
  const navigate = (index: number) => {
    const target = Math.max(0, Math.min(Math.max(0, posts.length - perView), index));
    setMountedCount(count => Math.max(count, Math.min(posts.length, (Math.floor(target / POSTS_PER_SLIDE) + 1) * POSTS_PER_SLIDE)));
    requestAnimationFrame(() => {
      const container = track.current;
      const card = container?.children[target];
      if (!container || !card) return;
      const distance = card.getBoundingClientRect().right - container.getBoundingClientRect().right;
      container.scrollTo({ left: container.scrollLeft + distance, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    });
  };

  return <div className="mt-6" dir="rtl" data-testid="home-latest-articles" data-active-article={activeIndex} data-illustrated={posts.some(post => Boolean(post.image))} role="region" aria-label="اسلایدر تازه‌ترین مقاله‌های خودرو چاره" aria-roledescription="اسلایدر">
    <div ref={track} className="magazine-card-track" onScroll={event => {
      const container = event.currentTarget;
      const first = container.firstElementChild;
      if (!first) return;
      const stride = first.getBoundingClientRect().width + parseFloat(getComputedStyle(container).columnGap);
      const index = Math.min(posts.length - 1, Math.round(Math.abs(container.scrollLeft) / stride));
      setActiveIndex(index);
      if (index >= mountedCount - 2) setMountedCount(count => Math.min(posts.length, count + POSTS_PER_SLIDE));
    }}>
      {posts.slice(0, mountedCount).map(post => <Link key={post.slug} href={`/blog/${post.slug}`} prefetch={false} className="magazine-slide-card home-glass group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-card">
        {post.image && <div className="relative h-44 shrink-0 overflow-hidden"><Image src={post.image} alt={post.title} fill sizes="(min-width:1024px) 20vw,(min-width:768px) 50vw,85vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>}
        <div className="flex h-full flex-col p-5"><div className="flex items-center justify-between text-[10px]"><span className="font-black text-brand-orange">{post.category}</span><span className="text-slate-400">{post.readTime}</span></div><h3 className="mt-3 text-base font-black leading-8 text-ink">{post.title}</h3><p className="mt-3 text-xs leading-7 text-slate-500">{post.excerpt}</p><span className="mt-auto inline-flex min-h-11 items-end pt-4 text-xs font-black text-brand-orange">مطالعه مقاله ←</span></div>
      </Link>)}
    </div>
    <div className="magazine-slider-controls mt-5 flex items-center justify-between gap-3" dir="rtl">
      <span className="text-[11px] text-slate-400" aria-live="polite">{mobile ? `مقاله ${(activeIndex + 1).toLocaleString("fa-IR")} از ${posts.length.toLocaleString("fa-IR")}` : `اسلاید ${(activePage + 1).toLocaleString("fa-IR")} از ${pages.toLocaleString("fa-IR")}`}</span>
      <div className="flex gap-1" aria-label="انتخاب صفحه مقالات">{Array.from({ length: pages }, (_, index) => <button key={index} type="button" aria-label={`صفحه ${index + 1} مقالات`} aria-current={activePage === index ? "page" : undefined} onClick={() => navigate(index * dotStep)} className="article-page-dot"><span /></button>)}</div>
      <div className="flex gap-2"><button type="button" onClick={() => navigate(activeIndex - perView)} disabled={!hasPrevious} aria-label="مقالات قبلی" className="min-h-11 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-black text-ink transition hover:border-brand-orange hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-40">قبلی</button><button type="button" onClick={() => navigate(activeIndex + perView)} disabled={!hasNext} aria-label="مقالات بعدی" className="min-h-11 rounded-lg bg-brand-orange px-4 py-2 text-xs font-black text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40">بعدی</button></div>
    </div>
  </div>;
}
