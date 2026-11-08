"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { HomeArticleCard } from "@/content/home-articles";

const POSTS_PER_SLIDE = 5;

function groupPosts(posts: HomeArticleCard[]) {
  return Array.from({ length: Math.ceil(posts.length / POSTS_PER_SLIDE) }, (_, index) => posts.slice(index * POSTS_PER_SLIDE, (index + 1) * POSTS_PER_SLIDE));
}

export function BlogSlider({ posts }: { posts: HomeArticleCard[] }) {
  const slides = groupPosts(posts);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lastMountedSlide, setLastMountedSlide] = useState(0);
  const hasPrevious = activeSlide > 0;
  const hasNext = activeSlide < slides.length - 1;

  return (
    <div className="mt-6" dir="ltr" data-testid="home-latest-articles">
      <div className="overflow-hidden rounded-xl">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} aria-hidden={slideIndex !== activeSlide} inert={slideIndex !== activeSlide} className="grid w-full shrink-0 gap-5 md:grid-cols-2 lg:grid-cols-5" dir="rtl">
              {slideIndex <= lastMountedSlide && slide.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} prefetch={false} className="home-glass group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
                  {post.image && <div className="relative h-44 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill sizes="(min-width:1024px) 20vw,(min-width:768px) 50vw,100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>}
                  <div className="flex h-full flex-col p-5">
                    <div className="flex items-center justify-between text-[10px]"><span className="font-black text-brand-orange">{post.category}</span><span className="text-slate-400">{post.readTime}</span></div>
                    <h3 className="mt-3 text-base font-black leading-8 text-ink">{post.title}</h3>
                    <p className="mt-3 text-xs leading-7 text-slate-500">{post.excerpt}</p>
                    <span className="mt-auto inline-flex min-h-11 items-end pt-4 text-xs font-black text-brand-orange">مطالعه مقاله ←</span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3" dir="rtl">
        <span className="text-[11px] text-slate-400">اسلاید {String(activeSlide + 1).padStart(2, "۰")} از {String(slides.length).padStart(2, "۰")}</span>
        <div className="flex gap-1" aria-label="انتخاب صفحه مقالات">{slides.map((_, index) => <button key={index} type="button" aria-label={`صفحه ${index + 1} مقالات`} aria-current={activeSlide === index ? "page" : undefined} onClick={() => { setLastMountedSlide(current => Math.max(current, index)); setActiveSlide(index); }} className="article-page-dot"><span /></button>)}</div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setActiveSlide((slide) => Math.max(0, slide - 1))} disabled={!hasPrevious} aria-label="مقالات قبلی" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-black text-ink transition hover:border-brand-orange hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-40">قبلی</button>
          <button type="button" onClick={() => { const next = Math.min(slides.length - 1, activeSlide + 1); setLastMountedSlide(current => Math.max(current, next)); setActiveSlide(next); }} disabled={!hasNext} aria-label="مقالات بعدی" className="rounded-lg bg-brand-orange px-4 py-2 text-xs font-black text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40">بعدی</button>
        </div>
      </div>
    </div>
  );
}
