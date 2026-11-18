"use client";

import { useState } from "react";
import { buildOnlineBrief, onlineServices } from "@/content/online-assistance";
import { customerAppUrl } from "@/content/app-links";

export function OnlineRequestBrief() {
  const [input, setInput] = useState({ service: "unknown", location: "", vehicle: "", symptom: "", access: "" });
  const [copyStatus, setCopyStatus] = useState("");
  const text = buildOnlineBrief(input);
  const selected = onlineServices.find(service => service.id === input.service)!;
  const fieldClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500";
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus("متن کپی شد؛ برای ثبت درخواست، آن را در مسیر هماهنگی اپ مشتریان استفاده کنید.");
    } catch {
      setCopyStatus("کپی خودکار در دسترس نیست؛ متن زیر را انتخاب و دستی کپی کنید.");
    }
  }
  return <div data-testid="online-request-brief" className="space-y-5">
    <p>این ابزار فقط شرح درخواست را آماده می‌کند؛ <strong>سفارش ثبت نمی‌کند و اطلاعات را ارسال نمی‌کند.</strong> متن را کپی کنید و درخواست را در اپ مشتریان ادامه دهید. رمز، کد پیامک، مدارک و اطلاعات بانکی را اینجا ننویسید.</p>
    <div className="grid gap-4 md:grid-cols-2">
      <div><label htmlFor="brief-service" className="font-bold">نیاز اولیه</label><select id="brief-service" className={fieldClass} value={input.service} onChange={e => { setInput({ ...input, service: e.target.value }); setCopyStatus(""); }}>{onlineServices.map(service => <option key={service.id} value={service.id}>{service.title}</option>)}</select></div>
      {([
        ["location", "محل توقف و جهت حرکت", "مثلاً کرج، جهت تهران، نزدیک خروجی …"],
        ["vehicle", "مدل، سال و نوع گیربکس", "اگر نمی‌دانید، نامشخص بنویسید"],
        ["symptom", "نشانه خرابی", "مثلاً استارت کند است و چراغ‌ها ضعیف‌اند"],
        ["access", "دسترسی و مقصد احتمالی حمل", "پارکینگ، ارتفاع ورودی، چرخ قفل یا مقصد"],
      ] as const).map(([key, label, placeholder]) => <label key={key} htmlFor={`brief-${key}`} className="font-bold">{label}<input id={`brief-${key}`} type="text" maxLength={240} autoComplete="off" className={fieldClass} placeholder={placeholder} value={input[key]} onChange={e => { setInput({ ...input, [key]: e.target.value }); setCopyStatus(""); }} /></label>)}
    </div>
    <p className="rounded-xl border border-slate-200 p-4"><strong>برای این نیاز: </strong>{selected.prompt} <a href={selected.href} className="inline-flex min-h-11 items-center font-bold text-brand-orange underline">جزئیات انتخاب خدمت</a></p>
    <label htmlFor="brief-result" className="block font-bold">شرح آماده برای کپی<textarea id="brief-result" readOnly rows={8} value={text} className={`${fieldClass} text-sm leading-8`} /></label>
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={copy} className="min-h-12 rounded-xl border border-slate-300 px-5 font-bold text-ink">کپی شرح درخواست</button>
      <a href={customerAppUrl} className="inline-flex min-h-12 items-center rounded-xl bg-brand-orange px-5 font-black text-white">شروع درخواست در اپ مشتریان</a>
    </div>
    <p role="status" aria-live="polite">{copyStatus}</p>
    <noscript><p>ابزار تعاملی به جاوااسکریپت نیاز دارد. برای درخواست، مدل، نشانه خرابی و نشانی را آماده کنید و از لینک اپ مشتریان یا تماس تلفنی استفاده کنید.</p></noscript>
  </div>;
}
