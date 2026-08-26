"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [notice, setNotice] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const body = [`نام: ${name}`, `شماره تماس: ${phone}`, `موضوع: ${subject}`, "", message].join("\n");
    window.location.href = `mailto:info@khodrochare.ir?subject=${encodeURIComponent(`پیام سایت خودرو چاره: ${subject}`)}&body=${encodeURIComponent(body)}`;
    setNotice("پیام در نرم‌افزار ایمیل شما آماده شد. برای تحویل به خودرو چاره، ارسال را تأیید کنید.");
  }

  return (
    <form id="contact-form" onSubmit={submit} className="grid gap-4" aria-label="فرم تماس با خودرو چاره">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-slate-600">نام و نام خانوادگی<input name="name" required autoComplete="name" className="form-control mt-2" placeholder="نام شما" /></label>
        <label className="text-xs font-bold text-slate-600">شماره تماس<input name="phone" required inputMode="tel" autoComplete="tel" className="form-control mt-2" placeholder="مثلاً 09121234567" dir="ltr" /></label>
      </div>
      <label className="text-xs font-bold text-slate-600">موضوع<select name="subject" required defaultValue="" className="form-control mt-2"><option value="" disabled>موضوع پیام را انتخاب کنید</option><option>درخواست راهنمایی</option><option>پیگیری خدمت</option><option>پیشنهاد همکاری</option><option>انتقاد یا شکایت</option><option>سایر موارد</option></select></label>
      <label className="text-xs font-bold text-slate-600">متن پیام<textarea name="message" required rows={6} className="form-control mt-2 min-h-36 py-3" placeholder="لطفاً توضیحات لازم را بنویسید." /></label>
      <div className="flex flex-wrap items-center gap-4"><button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-orange px-6 text-sm font-black text-white shadow-orange">ارسال از طریق ایمیل</button><p className="text-xs leading-6 text-slate-500">برای امداد فوری از فرم استفاده نکنید؛ با 09123022064 تماس بگیرید.</p></div>
      {notice ? <p role="status" className="rounded-lg bg-emerald-50 p-3 text-xs leading-6 text-emerald-800">{notice}</p> : null}
    </form>
  );
}
