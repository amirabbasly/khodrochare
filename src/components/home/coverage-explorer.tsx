"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { coverageNetworkAverage, coverageNetworkNote, mapRegions, mapServices, normalizeCitySearch, type MapCity } from "@/content/coverage-explorer";

export function CoverageExplorer({ cities, children }: { cities: MapCity[]; children: ReactNode }) {
  const [selected, setSelected] = useState("تهران");
  const [search, setSearch] = useState("");
  const city = cities.find(item => item.slug === selected)!;
  const visible = cities.filter(item => normalizeCitySearch(`${item.name} ${item.province}`).includes(normalizeCitySearch(search)));
  const choose = (slug: string) => { setSelected(slug); };
  return <section id="coverage" className="coverage-explorer section-shell" aria-labelledby="coverage-explorer-title" dir="rtl" data-testid="coverage-explorer">
    <div className="coverage-explorer-top">
      <div className="coverage-controls">
        <p className="coverage-eyebrow">مناطق تحت پوشش · خدمات امدادی</p>
        <h2 id="coverage-explorer-title">امداد خودرو تهران، کرج و شمال</h2>
        <p className="coverage-intro">شبکه خودرو چاره در تهران، کرج، گیلان، مازندران و گلستان فعال است. برای مشاهده خدمات، محدوده‌ها و روش ثبت درخواست آنلاین، صفحه شهر خود را انتخاب کنید.</p>
        <label htmlFor="coverage-city-search" className="coverage-search-label">جست‌وجوی شهر یا استان</label>
        <div className="coverage-search"><svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5" /></svg><input id="coverage-city-search" type="search" value={search} onChange={event => setSearch(event.target.value.slice(0, 80))} placeholder="مثلاً رشت، کرج یا مازندران" autoComplete="off" maxLength={80} aria-controls="coverage-city-list" /></div>
        <p className="coverage-result-count" role="status">{visible.length.toLocaleString("fa-IR")} شهر در فهرست · انتخاب فعلی: {city.name}</p>
        <div id="coverage-city-list" className="coverage-city-list" role="group" aria-label="انتخاب شهر تحت پوشش">
          {cities.map(item => <button key={item.slug} type="button" hidden={!visible.includes(item)} aria-pressed={selected === item.slug} onClick={() => choose(item.slug)}><span>{item.name}</span><small>{item.province}</small><span aria-hidden="true">←</span></button>)}
          {visible.length === 0 && <p className="coverage-empty">شهری پیدا نشد. نام شهر یا استان را تغییر دهید؛ فقط محدوده‌های معرفی‌شده در این فهرست قرار دارند.</p>}
        </div>
        {search && <button type="button" className="coverage-clear" onClick={() => setSearch("")}>نمایش همه شهرها</button>}
        <Link prefetch={false} href="/coverage" className="coverage-all-link">مشاهده نقشه کامل محدوده پوشش ←</Link>
      </div>
      <div className="coverage-map-column">
        <div className="coverage-map-board" aria-label="نقشه انتخاب استان‌های تحت پوشش">
          {/* Static local SVG keeps the map independent of tile servers, GPS, tokens and third-party requests. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/coverage-iran-provinces.svg" alt="نقشه ایران؛ تهران، البرز، گیلان، مازندران و گلستان با رنگ متمایز" width="654" height="593" loading="lazy" />
          <svg className="coverage-map-leaders" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{mapRegions.map(region => <g key={region.name}><line x1={region.x} y1={region.y} x2={region.labelX} y2={region.labelY} className={city.province === region.name ? "is-selected" : ""} /><circle cx={region.x} cy={region.y} r="0.8" /></g>)}</svg>
          {mapRegions.map(region => <button key={region.name} type="button" className="coverage-map-pin" style={{ left: `${region.labelX}%`, top: `${region.labelY}%` }} aria-label={`انتخاب استان ${region.name}`} aria-pressed={city.province === region.name} onClick={() => { setSearch(""); choose(region.city); }}><span className="coverage-pin-dot" aria-hidden="true" /><span>{region.name === "البرز" ? "کرج / البرز" : region.name}</span></button>)}
          <span className="coverage-map-caption">نشان‌ها محدوده استان‌اند؛ نه موقعیت زنده امدادگر یا نشانی شعبه</span>
        </div>
        <div className="coverage-map-legend"><span><i />محدوده معرفی‌شده</span><span><i />سایر استان‌ها</span></div>
      </div>
    </div>
    <div className="coverage-selection" aria-labelledby="coverage-selection-title">
      <div className="coverage-selected-heading"><div><p className="coverage-eyebrow">شهر انتخاب‌شده · {city.province}</p><h3 id="coverage-selection-title">امداد خودرو {city.name}</h3></div><Link prefetch={false} href={`/${city.slug}`} className="coverage-city-page">خدمات و محدوده‌های {city.name} ←</Link></div>
      <div className="coverage-stats">{coverageNetworkAverage.map(item => <div key={item.label}><strong>{item.value.toLocaleString("fa-IR")}</strong><span>{item.label}</span><small>میانگین در هر شهر</small></div>)}</div>
      <p className="coverage-average-note">{coverageNetworkNote}</p>
      <h3 className="coverage-services-title">خدمت مناسب را مستقیم انتخاب کنید</h3>
      <div className="coverage-selected-services">{mapServices.map(service => <Link prefetch={false} key={service.href} href={`/${city.slug}/${service.local}`}><strong>{service.title.replace("تهران و کرج", city.name)}</strong><span>{service.description}</span><small>جزئیات و درخواست ←</small></Link>)}</div>
      <p className="coverage-dispatch-note">محدوده‌ها و زمان اعزام را پیش از خدمت بررسی کنید. موجودی قطعه، پذیرش تعمیرگاه و واردات قطعات خاص از مسیر هماهنگی مجموعه پیگیری می‌شوند؛ نشانی شعبه یا موجودی زنده در این نقشه نمایش داده نمی‌شود.</p>
    </div>
    <details className="coverage-seo-directory"><summary>همه خدمات، مناطق، برندها و راهنماهای هماهنگی <span aria-hidden="true">＋</span></summary><div className="coverage-directory-content">{children}</div></details>
  </section>;
}
