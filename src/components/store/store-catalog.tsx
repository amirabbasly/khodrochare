"use client";

/**
 * PLACEHOLDER CATALOGUE — NOT WIRED TO ANY REAL DATA, AND CURRENTLY NOT RENDERED
 * ANYWHERE (`/store` is a `noindex` "coming soon" page).
 *
 * Before this component is ever mounted:
 *  - replace `products` with real catalogue data (the Prisma models exist but nothing
 *    in `src/` reads them yet),
 *  - never render review stars or availability claims that are not backed by real
 *    reviews/stock: fabricated `aggregateRating` values do not earn rich results
 *    (Google has ignored self-serving LocalBusiness/Organization reviews since 2019)
 *    and put the site at risk of a structured-data manual action,
 *  - do not add `Product`/`Offer` markup until prices and availability are real.
 * See docs/seo-audit-live-2026-09-06.md, finding P1-10.
 */

import Image from "next/image";
import { useDeferredValue, useState } from "react";
import { Icon } from "@/components/home/home-ui";

const products = [
  { id: 1, title: "تیغه برف‌پاک‌کن پریمیوم", category: "مصرفی", price: 750000, image: "/images/products/wiper.png", stock: true },
  { id: 2, title: "روغن موتور چهار فصل", category: "روغن و فیلتر", price: 1250000, image: "/images/products/oil.png", stock: true },
  { id: 3, title: "لنت ترمز جلو", category: "ترمز", price: 990000, image: "/images/products/brake.png", stock: true },
  { id: 4, title: "فیلتر روغن استاندارد", category: "روغن و فیلتر", price: 320000, image: "/images/products/filter.png", stock: true },
  { id: 5, title: "باتری خودرو ۶۰ آمپر", category: "باتری", price: 2460000, image: "/images/products/battery.png", stock: true },
  { id: 6, title: "روغن موتور نیمه‌سنتتیک", category: "روغن و فیلتر", price: 980000, image: "/images/products/oil.png", stock: true },
  { id: 7, title: "لنت ترمز سرامیکی", category: "ترمز", price: 1480000, image: "/images/products/brake.png", stock: false },
  { id: 8, title: "باتری خودرو ۷۴ آمپر", category: "باتری", price: 3180000, image: "/images/products/battery.png", stock: true },
];

const categories = ["همه", "مصرفی", "روغن و فیلتر", "ترمز", "باتری"];

export function StoreCatalog() {
  const [category, setCategory] = useState("همه");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const deferredQuery = useDeferredValue(query.trim());
  const visible = products.filter((product) => (category === "همه" || product.category === category) && product.title.includes(deferredQuery));
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const total = products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0);

  function add(id: number) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  }

  return (
    <div className="site-container mt-8">
      <div className="sticky top-3 z-20 grid gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-card backdrop-blur-md md:grid-cols-[1fr_auto_auto]">
        <label className="relative block"><span className="sr-only">جست‌وجوی محصول</span><Icon name="search" size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"/><input value={query} onChange={(event) => setQuery(event.target.value)} className="min-h-12 w-full rounded-xl border border-slate-200 pr-11 pl-4 text-sm outline-none focus:border-brand-orange focus:ring-4 focus:ring-orange-100" placeholder="نام قطعه یا محصول را جست‌وجو کنید"/></label>
        <div className="flex gap-2 overflow-x-auto">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`min-h-12 shrink-0 rounded-xl px-4 text-xs font-black transition ${category === item ? "bg-ink text-white" : "border border-slate-200 text-slate-600 hover:border-slate-400"}`}>{item}</button>)}</div>
        <div className="flex min-h-12 items-center justify-between gap-4 rounded-xl bg-orange-50 px-4 text-xs"><span className="font-black text-brand-orange">سبد خرید: {cartCount.toLocaleString("fa-IR")}</span><strong>{total.toLocaleString("fa-IR")} تومان</strong></div>
      </div>
      <p className="mt-6 text-xs text-slate-500">{visible.length.toLocaleString("fa-IR")} محصول مطابق انتخاب شما</p>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card">
            <div className="relative h-40 bg-[#f3f0eb] sm:h-52"><Image src={product.image} alt={product.title} fill sizes="(min-width:1024px) 25vw,(min-width:768px) 33vw,50vw" className="object-cover"/></div>
            <div className="p-4"><span className="text-[9px] font-bold text-slate-400">{product.category}</span><h2 className="mt-2 min-h-12 text-sm font-black leading-6">{product.title}</h2><div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><strong className="text-sm">{product.price.toLocaleString("fa-IR")} <small className="font-normal text-slate-400">تومان</small></strong><button type="button" disabled={!product.stock} onClick={() => add(product.id)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 text-xs font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300"><Icon name="plus" size={15}/> افزودن</button></div>{cart[product.id] ? <p className="mt-3 text-[10px] font-bold text-emerald-700" role="status">{cart[product.id].toLocaleString("fa-IR")} عدد در سبد</p> : null}</div>
          </article>
        ))}
      </div>
      {!visible.length && <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><Icon name="search" className="mx-auto text-slate-400"/><h2 className="mt-4 font-black">محصولی پیدا نشد</h2><button type="button" onClick={() => {setQuery("");setCategory("همه");}} className="mt-4 min-h-11 rounded-lg border border-slate-300 px-5 text-xs font-black">پاک‌کردن فیلترها</button></div>}
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-xs leading-7 text-amber-950/80">قیمت و موجودی کالا تا پیش از تأیید نهایی سفارش قطعی نیست. سازگاری قطعه با مدل، سال ساخت و مشخصات فنی خودرو باید پیش از خرید بررسی شود.</div>
    </div>
  );
}
