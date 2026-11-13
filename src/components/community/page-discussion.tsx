"use client";
import { useEffect, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
type PublicComment = { id: string; name: string; text: string; rating?: number; reply?: string };
export function PageDiscussion() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false), [comments, setComments] = useState<PublicComment[]>([]), [message, setMessage] = useState(""), [busy, setBusy] = useState(false);
  useEffect(() => {
    const path = decodeURIComponent(pathname);
    if (!/^\/(blog\/|services\/|تهران(?:\/|$)|roads\/tehran-highways$)/u.test(path)) return;
    const controller = new AbortController();
    fetch(`/api/community?page=${encodeURIComponent(decodeURIComponent(pathname))}`, { signal: controller.signal }).then(r => r.json()).then(data => { setEnabled(data.enabled === true); setComments(data.comments ?? []); }).catch(() => {});
    return () => controller.abort();
  }, [pathname]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const form = event.currentTarget, fields = new FormData(form); setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/community", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ page: decodeURIComponent(pathname), name: fields.get("name"), text: fields.get("text"), website: fields.get("website"), consent: fields.get("consent") === "on", ...(fields.get("rating") ? { rating: Number(fields.get("rating")) } : {}) }) });
      if (!response.ok) { setMessage("دیدگاه ذخیره نشد؛ متن، اطلاعات شخصی و ارسال تکراری را بررسی کنید یا کمی بعد تلاش کنید."); return; }
      form.reset(); setMessage("دیدگاه شما دریافت شد و پس از بررسی منتشر می‌شود. این فرم برای امداد فوری نیست.");
    } catch { setMessage("ارتباط برقرار نشد؛ دریافت دیدگاه تأیید نشده است."); } finally { setBusy(false); }
  }
  if (!enabled) return null;
  return <section className="site-container my-10 max-w-4xl rounded-2xl border border-slate-200 bg-white p-6" dir="rtl" aria-labelledby="discussion-title"><h2 id="discussion-title" className="text-xl font-black">پرسش و دیدگاه شما</h2><p className="mt-3 text-sm leading-8">پرسش درباره این راهنما یا تجربه خودتان را بنویسید. انتشار پس از بررسی است؛ دیدگاه کاربران تأیید مستقل انجام خدمت نیست. اطلاعات تماس، نشانی دقیق و مدارک را ننویسید. برای امداد فوری <a href="tel:09123022064" className="underline">تماس بگیرید</a>.</p>{comments.map(c => <article key={c.id} className="my-4 rounded-xl border border-slate-200 p-4"><h3 className="font-bold">{c.name}</h3>{c.rating && <p>امتیاز ثبت‌شده کاربر: {c.rating.toLocaleString("fa-IR")} از ۵</p>}<p className="whitespace-pre-wrap text-sm leading-8">{c.text}</p>{c.reply && <aside className="mt-3 border-r-2 border-orange-300 pr-4 text-sm leading-8"><strong>پاسخ خودرو چاره: </strong>{c.reply}</aside>}</article>)}<form onSubmit={submit} className="mt-5 grid gap-4"><label>نام نمایشی<input name="name" required minLength={2} maxLength={60} className="mt-2 block w-full rounded-lg border border-slate-300 p-3" autoComplete="nickname" /></label><label>متن دیدگاه<textarea name="text" required minLength={15} maxLength={2000} className="mt-2 block w-full rounded-lg border border-slate-300 p-3" /></label><label>امتیاز اختیاری؛ فقط بر اساس تجربه خودتان<select name="rating" className="mr-3 rounded border p-2"><option value="">بدون امتیاز</option>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}</select></label><input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" /><label className="text-sm"><input name="consent" type="checkbox" required /> با انتشار عمومی نام نمایشی، متن و امتیاز انتخابی موافقم و اطلاعات شخصی ننوشته‌ام.</label><button disabled={busy} className="min-h-11 rounded-xl bg-brand-orange px-5 py-3 font-bold text-white disabled:opacity-50">{busy ? "در حال ارسال…" : "ارسال برای بررسی"}</button><p role="status" className="text-sm leading-8">{message}</p></form></section>;
}
