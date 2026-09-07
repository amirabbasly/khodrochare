"use client";
import { useState, type FormEvent } from "react";
import { compareQuotes, type QuotedPrice } from "@/lib/quote-comparison";
import { parseNonNegativeNumber } from "@/lib/numbers";
import { useClientReady } from "./client-ready";
import { recordToolUse, ToolFeedback } from "./tool-feedback";
const currency = (value: number) => `${new Intl.NumberFormat("fa-IR").format(value)} تومان`;
export function QuoteComparison() {
  const ready = useClientReady();
  const [result, setResult] = useState<ReturnType<typeof compareQuotes> | null>(null);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setResult(null);
    const data = new FormData(event.currentTarget);
    try {
      const quotes = ["a", "b"].map((prefix) => Object.fromEntries(["quoted", "extras", "discount"].map((key) => {
        const value = parseNonNegativeNumber(String(data.get(`${prefix}-${key}`) ?? ""));
        if (value === null) throw new Error("invalid_amount");
        return [key, value];
      })) as QuotedPrice);
      setResult(compareQuotes(quotes[0], quotes[1], data.has("same-scope"))); recordToolUse("quote-comparison");
    } catch { setError("هر مبلغ را به تومان و به‌صورت عدد صحیح مثبت یا صفر وارد کنید. تخفیف نمی‌تواند از جمع بیشتر باشد؛ یکسان‌بودن دامنه دو برآورد را هم تأیید کنید."); }
  }
  return <section id="compare-quotes" className="site-container mt-8 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8" dir="rtl"><h2 className="text-2xl font-black">مقایسه دو برآورد هزینه حمل خودرو</h2><p id="compare-note" className="mt-3 text-sm leading-8 text-slate-600">فقط مبلغ‌های اعلام‌شده برای یک مسیر، روش حمل، شرایط بارگیری و زمان یکسان را مقایسه کنید. این ابزار نرخ بازار یا کیفیت دو ارائه‌دهنده را نمی‌سنجد. مبلغ اصلی شامل موارد توافق‌شده است؛ هزینه‌های جدا را دوباره در آن حساب نکنید.</p><form className="mt-5" onSubmit={submit} onChange={() => { setError(""); setResult(null); }} aria-describedby="compare-note"><fieldset disabled={!ready} className="min-w-0"><legend className="sr-only">دو برآورد هم‌دامنه</legend><div className="grid gap-5 md:grid-cols-2">{[["a", "برآورد الف"], ["b", "برآورد ب"]].map(([prefix, title]) => <div key={prefix} className="min-w-0 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4"><h3 className="font-black">{title}</h3>{[["quoted", "مبلغ اصلی اعلام‌شده"], ["extras", "جمع هزینه‌های جدا از مبلغ اصلی"], ["discount", "تخفیف توافق‌شده"]].map(([key, label]) => <label key={key} htmlFor={`${prefix}-${key}`} className="block text-sm font-bold">{label}<input id={`${prefix}-${key}`} name={`${prefix}-${key}`} className="form-control mt-2" inputMode="numeric" autoComplete="off" maxLength={15} required aria-describedby="compare-zero" /></label>)}</div>)}</div><p id="compare-zero" className="mt-3 text-xs text-slate-500">همه مبلغ‌ها به تومان‌اند؛ اگر موردی ندارید، صفر وارد کنید.</p><label className="mt-5 flex items-start gap-3 text-sm leading-7"><input type="checkbox" name="same-scope" required className="mt-2 h-4 w-4 shrink-0 accent-orange-600" />مسیر، نوع حمل، بارگیری، انتظار و موارد مشمول هزینه در دو برآورد یکسان‌اند.</label><button type="submit" className="mt-4 min-h-12 rounded-lg bg-brand-orange px-6 py-3 text-sm font-black text-white">مقایسه جمع دو برآورد</button></fieldset><noscript><p>مقایسه تعاملی به جاوااسکریپت نیاز دارد؛ فرمول هر برآورد برابر مبلغ اصلی + هزینه جدا − تخفیف است.</p></noscript></form>{error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-4 text-sm leading-7 text-red-800">{error}</p>}{result && <ToolFeedback title="مقایسه بر اساس مبالغ واردشده"><dl className="space-y-2"><div className="flex flex-wrap justify-between gap-2"><dt>جمع برآورد الف</dt><dd>{currency(result.firstTotal)}</dd></div><div className="flex flex-wrap justify-between gap-2"><dt>جمع برآورد ب</dt><dd>{currency(result.secondTotal)}</dd></div></dl><p data-testid="quote-difference" className="font-black">{result.lower === "equal" ? "جمع دو برآورد برابر است." : `${result.lower === "first" ? "برآورد الف" : "برآورد ب"} در ورودی‌های شما ${currency(result.difference)} کمتر است.`}</p><p>کمتر بودن این جمع به معنی تضمین کمترین قیمت بازار، کیفیت بهتر، پوشش بیمه یا سفارش تأییدشده نیست. هر تفاوت در دامنه خدمت، مقایسه را تغییر می‌دهد.</p></ToolFeedback>}</section>;
}
