"use client";
import { useState, type FormEvent } from "react";
import { transportFields, selectTransport, type TransportInput, type TransportAdvice } from "@/lib/transport-selector";
import { breakdownFields, guideBreakdown, type BreakdownInput, type BreakdownAdvice } from "@/lib/breakdown-guide";
import { lookupObd } from "@/lib/obd-lookup";
import { useClientReady } from "./client-ready";
import { recordToolUse, ToolFeedback } from "./tool-feedback";

type ChoiceField = { label: string; options: readonly (readonly [string, string])[] };
function Choice({ name, field }: { name: string; field: ChoiceField }) {
  return <label htmlFor={`tool-${name}`} className="min-w-0 text-sm font-bold text-ink">{field.label}<select id={`tool-${name}`} name={name} defaultValue="" required className="form-control mt-2 min-w-0"><option value="" disabled>انتخاب کنید</option>{field.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>;
}
function NoScriptHelp() { return <noscript><p className="mt-4 text-sm leading-8">برای نتیجه تعاملی، جاوااسکریپت لازم است. راهنما، جدول و شماره تماس همین صفحه بدون جاوااسکریپت هم در دسترس‌اند.</p></noscript>; }
const formClass = "rounded-2xl border border-orange-200 bg-white p-5 shadow-sm md:p-7";
const buttonClass = "min-h-12 rounded-lg bg-brand-orange px-6 py-3 text-sm font-black text-white disabled:opacity-50";

export function TransportSelector() {
  const ready = useClientReady();
  const [result, setResult] = useState<TransportAdvice | null>(null);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setResult(null); setError("");
    const data = new FormData(event.currentTarget);
    const input = Object.fromEntries(Object.keys(transportFields).map((key) => [key, String(data.get(key) ?? "")])) as TransportInput;
    try { setResult(selectTransport(input)); recordToolUse("transport-selector"); }
    catch { setError("همه گزینه‌ها را انتخاب کنید؛ برای اطلاعات نامعلوم، گزینه «نمی‌دانم» یا «مشخص نیست» را بزنید."); }
  }
  return <div data-testid="transport-selector"><form className={formClass} onSubmit={submit} onChange={() => { setResult(null); setError(""); }} aria-label="انتخاب روش حمل خودرو"><fieldset disabled={!ready} className="grid min-w-0 gap-5 sm:grid-cols-2"><legend className="sr-only">مشخصات مؤثر در انتخاب روش حمل</legend>{Object.entries(transportFields).map(([key, field]) => <Choice key={key} name={key} field={field} />)}<div className="sm:col-span-2"><button type="submit" className={buttonClass}>بررسی اطلاعات حمل خودرو</button></div></fieldset><NoScriptHelp />{error && <p className="mt-4 text-sm text-red-800" role="alert">{error}</p>}</form>{result && <ToolFeedback title={result.title} summary={[result.title, ...result.reasons, "تجهیزات برای بررسی:", ...result.equipment, result.caution].join("\n")} links={result.links}><ul className="list-inside list-disc space-y-2">{result.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul><p className="font-bold">تجهیزاتی که باید با اپراتور بررسی شوند:</p><ul className="list-inside list-disc">{result.equipment.map((item) => <li key={item}>{item}</li>)}</ul><p className="border-t border-orange-200 pt-3">{result.caution}</p></ToolFeedback>}</div>;
}

export function BreakdownGuide() {
  const ready = useClientReady();
  const [result, setResult] = useState<BreakdownAdvice | null>(null);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setResult(null); setError("");
    const data = new FormData(event.currentTarget);
    const input = Object.fromEntries(Object.keys(breakdownFields).map((key) => [key, String(data.get(key) ?? "")])) as BreakdownInput;
    try { setResult(guideBreakdown(input)); recordToolUse("breakdown-guide"); }
    catch { setError("به هر سه پرسش پاسخ دهید؛ اگر از ایمنی مطمئن نیستید گزینه نامشخص را انتخاب کنید."); }
  }
  return <div data-testid="breakdown-guide"><p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-8">فقط پس از توقف در موقعیت امن از ابزار استفاده کنید. مصدومیت، آتش‌سوزی، نشت سوخت و خطر ترافیکی به خدمات اضطراری عمومی نیاز دارند، نه صرفاً درخواست یدک‌کش.</p><form className={formClass} onSubmit={submit} onChange={(event) => { setError(""); const danger = new FormData(event.currentTarget).get("emergency"); setResult(danger === "yes" ? guideBreakdown({ emergency: "yes", location: "unknown", symptom: "other" }) : null); }} aria-label="راهنمای نشانه خرابی"><fieldset disabled={!ready} className="grid min-w-0 gap-5"><legend className="sr-only">اول ایمنی، سپس نشانه خرابی</legend>{Object.entries(breakdownFields).map(([key, field]) => <Choice key={key} name={key} field={field} />)}<div><button type="submit" className={buttonClass}>نمایش مسیر بررسی</button></div></fieldset><NoScriptHelp />{error && <p className="mt-4 text-sm text-red-800" role="alert">{error}</p>}</form>{result && <ToolFeedback title={result.title} summary={[result.title, ...result.actions, result.avoid, "این راهنما تشخیص قطعی یا مجوز ادامه حرکت نیست."].join("\n")} links={result.servicePath ? [{ title: result.serviceTitle!, href: result.servicePath }, { title: "ابزار انتخاب روش حمل", href: "/tools/transport-selector" }] : []}><div data-priority={result.priority}><ol className="list-inside list-decimal space-y-2">{result.actions.map((action) => <li key={action}>{action}</li>)}</ol><p className="mt-4 rounded-lg border border-amber-200 bg-white p-3 font-bold">{result.avoid}</p><p className="mt-3">این راهنما تشخیص قطعی یا مجوز ادامه حرکت نیست.</p></div></ToolFeedback>}</div>;
}

export function ObdLookup() {
  const ready = useClientReady();
  const [result, setResult] = useState<ReturnType<typeof lookupObd> | null>(null);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = lookupObd(String(new FormData(event.currentTarget).get("code") ?? ""));
    setResult(next); if (next.status === "found") recordToolUse("obd-code");
  }
  return <div data-testid="obd-lookup"><form className={formClass} onSubmit={submit} onChange={() => setResult(null)} aria-label="جست‌وجوی کد دیاگ"><fieldset disabled={!ready} className="grid min-w-0 gap-4 sm:grid-cols-[minmax(0,1fr)_auto]"><legend className="sr-only">کد پنج‌حرفی OBD</legend><label className="min-w-0 text-sm font-bold" htmlFor="obd-code">کد روی گزارش دیاگ<input id="obd-code" name="code" className="form-control mt-2" dir="ltr" autoComplete="off" spellCheck={false} autoCapitalize="characters" placeholder="P0300" maxLength={20} required /></label><button type="submit" className={`${buttonClass} self-end`}>نمایش معنی کد</button></fieldset><p className="mt-3 text-xs leading-7 text-slate-500">نمونه: P0300 یا P۰۳۰۰. هیچ اتصال به خودرو، خواندن خطا یا پاک‌کردن حافظه انجام نمی‌شود.</p><NoScriptHelp /></form>{result?.status === "invalid" && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm" role="alert">کد پنج‌حرفی مانند P0300 را وارد کنید؛ عبارت یا شماره طولانی قابل تفسیر نیست.</p>}{result?.status === "unknown" && <ToolFeedback title="این کد در فهرست محدود ابزار نیست"><p><bdi>{result.code}</bdi> ممکن است به مستندات اختصاصی مدل یا واحد کنترل مربوط باشد. نبودن آن در این فهرست، سالم‌بودن خودرو را ثابت نمی‌کند؛ با گزارش کامل به متخصص مراجعه کنید.</p></ToolFeedback>}{result?.status === "found" && <ToolFeedback title={`${result.code} — ${result.entry.title}`} links={[{ title: "راهنمای دیاگ سیار", href: "/services/mobile-diagnostics" }, { title: "اولویت‌بندی نشانه‌های خطر", href: "/tools/breakdown-guide" }]}><p>{result.entry.meaning}</p><p><strong>این کد چه چیزی را ثابت نمی‌کند؟ </strong>{result.entry.notProof}</p><p><strong>از متخصص چه بخواهیم؟ </strong>{result.entry.ask}</p><p className="font-bold">چراغ چک چشمک‌زن، لرزش شدید، هشدار روغن یا دما و ایراد ترمز یا فرمان بر تفسیر کد مقدم‌اند؛ ابتدا توقف ایمن و بررسی لازم است.</p><a href={result.entry.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-brand-orange underline">منبع تعریف کد در OBD-Codes</a></ToolFeedback>}</div>;
}
