import { businessFacts } from "@/content/business";
import { Icon } from "./home-ui";

const details = [
  { title: "نوع خدمت", text: "امداد، یدک‌کش یا تعمیر در محل", icon: "truck" },
  { title: "محدوده خدمات", text: "تهران، کرج و شمال", icon: "map" },
  { title: "مشخصات خودرو", text: "مدل، سال و نوع گیربکس", icon: "car" },
  { title: "موقعیت خودرو", text: "نشانی دقیق و جهت حرکت", icon: "location" },
] as const;

/** An informational home card, not an intake form. The contact link is real. */
export function RequestPreviewCard() {
  return (
    <section
      id="request"
      data-testid="home-request-card"
      className="order-1 min-w-0 scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white text-ink shadow-card lg:order-2"
      dir="rtl"
      aria-labelledby="home-request-title"
    >
      <div className="border-b border-orange-100 bg-gradient-to-l from-orange-50 to-white p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white shadow-orange">
            <Icon name="form" size={22} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-slate-500">یک تماس، یک چاره</p>
            <h2 id="home-request-title" className="mt-1 text-base font-black leading-7 sm:text-lg">
              آماده‌سازی درخواست امداد خودرو
            </h2>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <dl className="grid grid-cols-2 gap-3">
          {details.map((detail) => (
            <div key={detail.title} className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
              <dt className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                <Icon name={detail.icon} size={16} className="shrink-0 text-brand-orange" />
                {detail.title}
              </dt>
              <dd className="mt-2 text-xs font-bold leading-6 text-ink">{detail.text}</dd>
            </div>
          ))}
        </dl>

        <a
          href={`tel:${businessFacts.emergencyPhone}`}
          className="mt-4 flex min-h-12 flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-xl bg-brand-orange px-3 py-3 text-sm font-black text-white shadow-orange transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange"
        >
          <span className="inline-flex items-center gap-2"><Icon name="phone" size={18} /> تماس برای امداد</span>
          <bdi>{businessFacts.emergencyPhone}</bdi>
        </a>
        <p className="mt-3 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-500">
          <Icon name="clock" size={14} /> پاسخ‌گویی ۲۴ ساعته، ۷ روز هفته
        </p>
      </div>
    </section>
  );
}
