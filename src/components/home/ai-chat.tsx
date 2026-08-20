"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Icon } from "./home-ui";

type Message = { role: "user" | "assistant"; content: string };

const WELCOME_MESSAGE = "سلام به هوش مصنوعی تخصصی خودرو چاره خوش آمدید اینجا جواب سوالات تخصصی مکانیکی و اپلیکیشن خودرو چاره داده میشه";
const SUPPORT_SUFFIX = "بهتر است برای پشتیبانی بهتر با شماره تماس 09123022064 تماس بگیرید.";

export function AiChat({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState(embedded);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: WELCOME_MESSAGE }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesRef.current;
    if (container) container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();
    if (!content || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok) throw new Error(data.error || "خطا در دریافت پاسخ");
      setMessages((current) => [...current, { role: "assistant", content: data.reply || SUPPORT_SUFFIX }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: `در حال حاضر ارتباط با دستیار برقرار نشد. ${SUPPORT_SUFFIX}` }]);
    } finally {
      setLoading(false);
    }
  }

  const chatPanel = (
    <div className={embedded ? "flex h-[360px] flex-col rounded-xl border border-cyan-400/30 bg-[#06192d]/92" : "flex h-[min(560px,72vh)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-ink shadow-[0_24px_70px_rgba(2,12,24,.3)]"}>
      <div className={`flex items-center justify-between border-b px-4 py-3 ${embedded ? "border-white/10 text-white" : "border-slate-200 bg-ink text-white"}`}>
        <div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300"><Icon name="bot" size={19} /></span><div><strong className="block text-xs">دستیار هوشمند خودرو چاره</strong><span className="text-[9px] text-emerald-400">آنلاین و آماده پاسخ‌گویی</span></div></div>
        {!embedded && <button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-xl" aria-label="بستن پنجره چت">×</button>}
      </div>
      <div ref={messagesRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-xs leading-6" aria-live="polite">
        {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`max-w-[88%] rounded-xl px-3 py-2.5 ${message.role === "assistant" ? embedded ? "ml-auto rounded-tr-sm border border-cyan-400/20 bg-cyan-400/5 text-slate-100" : "ml-auto rounded-tr-sm bg-slate-100 text-slate-700" : embedded ? "mr-auto rounded-tl-sm bg-[#123a55] text-white" : "mr-auto rounded-tl-sm bg-ink text-white"}`}>{message.content}</div>)}
        {loading && <div className={`ml-auto w-fit rounded-xl px-4 py-2 ${embedded ? "bg-white/10 text-slate-300" : "bg-slate-100 text-slate-500"}`}>در حال بررسی...</div>}
      </div>
      <form onSubmit={submit} className={`flex gap-2 border-t p-3 ${embedded ? "border-white/10" : "border-slate-200"}`}>
        <label className="sr-only" htmlFor={embedded ? "embedded-chat" : "floating-chat"}>پیام شما</label>
        <input id={embedded ? "embedded-chat" : "floating-chat"} value={input} onChange={(event) => setInput(event.target.value)} maxLength={1200} className={`min-h-11 min-w-0 flex-1 rounded-lg border px-3 text-sm outline-none ${embedded ? "border-white/15 bg-white/5 text-white placeholder:text-slate-500" : "border-slate-300 bg-white text-ink"}`} placeholder="سوال خود را بنویسید..." />
        <button type="submit" disabled={loading || !input.trim()} className="flex min-h-11 min-w-11 items-center justify-center rounded-lg bg-brand-orange text-white disabled:cursor-not-allowed disabled:opacity-45" aria-label="ارسال پیام"><Icon name="send" size={18} /></button>
      </form>
    </div>
  );

  if (embedded) return chatPanel;

  return (
    <div className="fixed bottom-5 left-4 z-[80] sm:bottom-6 sm:left-6">
      <div className={`absolute bottom-16 left-0 origin-bottom-left transition duration-300 ${open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"}`}>{chatPanel}</div>
      <button type="button" onClick={() => setOpen((current) => !current)} className="relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange text-white shadow-[0_12px_35px_rgba(255,83,21,.42)] transition hover:scale-105" aria-label={open ? "بستن پشتیبانی هوشمند" : "باز کردن پشتیبانی هوشمند"} aria-expanded={open}>
        <span className="absolute inset-0 animate-ping rounded-full bg-brand-orange/25" aria-hidden="true" /><Icon name={open ? "chat" : "headset"} size={25} />
      </button>
    </div>
  );
}
