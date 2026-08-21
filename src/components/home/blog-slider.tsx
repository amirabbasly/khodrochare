"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { BlogPost } from "@/content/blog";

const POSTS_PER_SLIDE = 5;

function groupPosts(posts: BlogPost[]) {
  return Array.from({ length: Math.ceil(posts.length / POSTS_PER_SLIDE) }, (_, index) => posts.slice(index * POSTS_PER_SLIDE, (index + 1) * POSTS_PER_SLIDE));
}

export function BlogSlider({ posts }: { posts: BlogPost[] }) {
  const slides = groupPosts(posts);
  const [activeSlide, setActiveSlide] = useState(0);
  const hasPrevious = activeSlide > 0;
  const hasNext = activeSlide < slides.length - 1;

  return (
    <div className="mt-6" dir="ltr">
      <div className="overflow-hidden rounded-xl">
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {slides.map((slide, slideIndex) => (
            <div key={slideIndex} className="grid w-full shrink-0 gap-5 md:grid-cols-2 lg:grid-cols-5" dir="rtl">
              {slide.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={post.image} alt={post.title} fill sizes="(min-width:1024px) 20vw,(min-width:768px) 50vw,100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-[10px]"><span className="font-black text-brand-orange">{post.category}</span><span className="text-slate-400">{post.readTime}</span></div>
                    <h3 className="mt-3 line-clamp-2 text-sm font-black leading-7 text-ink">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-[11px] leading-6 text-slate-500">{post.excerpt}</p>
                    <span className="mt-3 inline-flex text-[11px] font-black text-brand-orange">مطالعه مقاله ←</span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-3" dir="rtl">
        <span className="text-[11px] text-slate-400">اسلاید {String(activeSlide + 1).padStart(2, "۰")} از {String(slides.length).padStart(2, "۰")}</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => setActiveSlide((slide) => Math.max(0, slide - 1))} disabled={!hasPrevious} aria-label="مقالات قبلی" className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-black text-ink transition hover:border-brand-orange hover:text-brand-orange disabled:cursor-not-allowed disabled:opacity-40">قبلی</button>
          <button type="button" onClick={() => setActiveSlide((slide) => Math.min(slides.length - 1, slide + 1))} disabled={!hasNext} aria-label="مقالات بعدی" className="rounded-lg bg-brand-orange px-4 py-2 text-xs font-black text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40">بعدی</button>
        </div>
      </div>
    </div>
  );
}
