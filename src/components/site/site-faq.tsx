import { faqItems } from "@/content/faq";

export function SiteFaq() {
  return (
    <section className="site-container mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-card md:p-9" aria-labelledby="faq-title">
      <div className="text-center"><span className="text-xs font-black text-brand-orange">راهنمای خودرو چاره</span><h2 id="faq-title" className="mt-3 text-2xl font-black md:text-3xl">سوالات متداول</h2><p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">پاسخ پرسش‌های رایج درباره خدمات امداد خودرو، مناطق تحت پوشش، قیمت‌گذاری، اپلیکیشن و ثبت درخواست.</p></div>
      <div className="mt-6 divide-y divide-slate-100" dir="rtl">{faqItems.map((item) => <details key={item.question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-black text-ink"><span>{item.question}</span><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-50 text-lg font-normal text-brand-orange transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-4xl text-sm leading-8 text-slate-600">{item.answer}</p></details>)}</div>
    </section>
  );
}
