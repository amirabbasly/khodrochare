"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";

type Message = { role: "user" | "assistant"; content: string };
const welcome: Message = { role: "assistant", content: "سلام، من دستیار تخصصی خودرو چاره هستم. نشانه‌های مشکل، مدل خودرو و زمان شروع ایراد را بنویسید تا یک بررسی اولیه و مسیر امن بعدی را پیشنهاد بدهم. در موقعیت خطرناک، ابتدا با پشتیبانی تماس بگیرید." };
const promptGroups = [
  { icon: "battery", title: "باتری و استارت", prompts: ["خودرو استارت نمی‌خورد؛ از کجا شروع کنم؟", "چطور ضعف باتری را از خرابی دینام تشخیص بدهم؟"] },
  { icon: "engine", title: "موتور و هشدارها", prompts: ["چراغ چک روشن شده؛ رانندگی کنم؟", "دمای موتور بالا رفته؛ اقدام امن چیست؟"] },
  { icon: "brake", title: "ترمز و ایمنی", prompts: ["هنگام ترمز صدای سوت می‌آید؛ علت چیست؟", "پدال ترمز نرم شده؛ خودرو را حرکت بدهم؟"] },
  { icon: "car", title: "سرویس و نگهداری", prompts: ["برای سفر چه بخش‌هایی از خودرو را بررسی کنم؟", "زمان مناسب تعویض روغن را چطور بفهمم؟"] },
];

export function AssistantWorkspace() {
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight, behavior: "smooth" }); }, [messages, loading]);

  async function send(content: string) {
    const trimmed = content.trim();
    if (!trimmed || loading) return;
    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages); setInput(""); setError(""); setLoading(true); setSuggestionsOpen(false);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages }) });
      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error || "پاسخی دریافت نشد.");
      setMessages((current) => [...current, { role: "assistant", content: data.reply as string }]);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "ارتباط با دستیار برقرار نشد."); } finally { setLoading(false); }
  }

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void send(input); }

  return (
    <div className="site-container relative z-10 -mt-8 min-h-[720px] overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(2,12,24,.18)]">
      <section className="flex min-h-[720px] min-w-0 flex-col bg-[radial-gradient(circle_at_70%_0%,rgba(14,165,233,.08),transparent_25%),white]" dir="rtl">
        <header className="flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 px-4 md:px-7"><div className="flex items-center gap-3"><span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-cyan-300"><span className="absolute -left-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" /><Icon name="bot" size={23} /></span><div><h1 className="text-sm font-black md:text-lg">گفت‌وگوی تخصصی خودرو</h1><p className="mt-1 hidden text-[10px] text-slate-400 sm:block">راهنمایی اولیه، ایمن و مرحله‌به‌مرحله برای مشکل خودرو</p></div></div><div className="flex items-center gap-2"><span className="hidden rounded-full bg-emerald-50 px-3 py-2 text-[10px] font-black text-emerald-700 sm:inline-flex">آنلاین و آماده پاسخ</span><button type="button" onClick={() => { setMessages([welcome]); setError(""); }} className="inline-flex min-h-10 items-center rounded-lg border border-slate-200 px-3 text-[10px] font-black">گفت‌وگوی جدید</button></div></header>
        <div ref={messagesRef} className="flex-1 space-y-5 overflow-y-auto p-4 md:p-8" aria-live="polite">
          {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${message.role === "assistant" ? "bg-ink text-cyan-300" : "bg-orange-100 text-brand-orange"}`}><Icon name={message.role === "assistant" ? "bot" : "user"} size={18} /></span><div className={`max-w-[min(88%,760px)] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-8 ${message.role === "assistant" ? "rounded-tr-sm border border-slate-200 bg-white text-slate-700 shadow-sm" : "rounded-tl-sm bg-ink text-white"}`}>{message.content}</div></div>)}
          {loading && <div className="flex gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-cyan-300"><Icon name="bot" size={18} /></span><div className="flex items-center gap-1 rounded-2xl rounded-tr-sm border border-slate-200 bg-white px-5 py-4" aria-label="دستیار در حال پاسخ‌گویی است"><span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" /><span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:.12s]" /><span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:.24s]" /></div></div>}
          {error && <div className="mr-12 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-6 text-red-800" role="alert">{error} <button type="button" onClick={() => setError("")} className="mr-2 font-black underline">بستن</button></div>}
        </div>
        <div className="border-t border-slate-200 bg-white p-3 md:p-5"><form onSubmit={submit} className="mx-auto flex max-w-4xl items-end gap-2 rounded-2xl border border-slate-300 bg-white p-2 shadow-[0_8px_30px_rgba(15,30,48,.08)] focus-within:border-brand-orange focus-within:ring-4 focus-within:ring-orange-100"><label className="sr-only" htmlFor="assistant-message">پیام شما</label><textarea id="assistant-message" rows={2} value={input} onChange={(event) => setInput(event.target.value)} maxLength={1200} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); if (input.trim()) void send(input); } }} className="max-h-36 min-h-12 flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-7 outline-none" placeholder="مثلاً: پژو ۲۰۶ دارم، استارت می‌زند اما روشن نمی‌شود..." /><button type="submit" disabled={loading || !input.trim()} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white shadow-orange disabled:cursor-not-allowed disabled:opacity-40" aria-label="ارسال پیام"><Icon name="send" size={19} /></button></form><p className="mt-2 text-center text-[9px] leading-5 text-slate-400">پاسخ دستیار جایگزین تشخیص قطعی یا بازدید متخصص نیست. در شرایط خطرناک با پشتیبانی تماس بگیرید.</p></div>
      </section>
      <div className="fixed bottom-5 right-5 z-[70] flex items-end gap-3" dir="rtl">
        {suggestionsOpen && <div className="absolute bottom-16 right-0 w-[min(88vw,360px)] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_55px_rgba(2,12,24,.2)]" role="dialog" aria-label="سوالات پیشنهادی"><div className="flex items-center justify-between"><strong className="text-sm">سوالات پیشنهادی</strong><button type="button" onClick={() => setSuggestionsOpen(false)} className="text-xs font-black text-slate-400">بستن</button></div><div className="mt-3 grid max-h-[55vh] gap-3 overflow-y-auto">{promptGroups.map((group) => <div key={group.title} className="rounded-xl border border-slate-100 bg-slate-50 p-3"><div className="flex items-center gap-2 text-xs font-black"><Icon name={group.icon} size={16} className="text-brand-orange" />{group.title}</div>{group.prompts.map((prompt) => <button key={prompt} type="button" onClick={() => void send(prompt)} className="mt-2 block w-full rounded-lg bg-white px-2 py-2 text-right text-[10px] leading-5 text-slate-600 transition hover:bg-orange-50 hover:text-ink">{prompt}</button>)}</div>)}</div></div>}
        <button type="button" onClick={() => setSuggestionsOpen((open) => !open)} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white shadow-[0_10px_25px_rgba(3,18,36,.28)] transition hover:-translate-y-1" aria-label="باز کردن سوالات پیشنهادی" aria-expanded={suggestionsOpen}><Icon name="toolbox" size={24} /></button>
        <Link href="tel:09123022064" className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 text-white shadow-[0_10px_25px_rgba(185,28,28,.3)] transition hover:-translate-y-1" aria-label="تماس اضطراری"><Icon name="phone" size={23} /></Link>
      </div>
    </div>
  );
}
