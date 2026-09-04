"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/home/home-ui";

/**
 * Educational cost estimator. Default rates are approximation anchors (toman) and
 * the UI always shows a range with an explicit non-binding disclaimer; the final
 * price is confirmed with the customer before dispatch.
 */

type ServiceOption = {
  id: string;
  label: string;
  hint: string;
  base: number;
  perKm?: number;
  fixed?: [min: number, max: number];
};

const serviceOptions: ServiceOption[] = [
  { id: "tow-truck", label: "یدک‌کش و حمل خودرو", hint: "حمل با چرخ‌گیر برای خودروهای قابل حمل", base: 1_800_000, perKm: 45_000 },
  { id: "flatbed-carrier", label: "خودروبر و کفی", hint: "حمل ایمن خودروهای اتوماتیک، لوکس و تصادفی", base: 2_400_000, perKm: 60_000 },
  { id: "mobile-mechanic", label: "مکانیک سیار", hint: "عیب‌یابی و تعمیرات مجاز در محل", base: 900_000, fixed: [900_000, 2_000_000] },
  { id: "battery-replacement", label: "باتری و برق خودرو", hint: "تست، باتری‌به‌باتری و تعویض در محل", base: 600_000, fixed: [600_000, 1_200_000] },
  { id: "flat-tire", label: "پنچرگیری سیار", hint: "تعویض لاستیک و بررسی باد در محل", base: 500_000, fixed: [500_000, 1_000_000] },
  { id: "fuel-delivery", label: "سوخت‌رسانی اضطراری", hint: "بدون احتساب هزینه سوخت", base: 600_000, fixed: [600_000, 1_200_000] },
];

const vehicleMultipliers = [
  { id: "sedan", label: "سواری", factor: 1 },
  { id: "suv", label: "شاسی‌بلند و SUV", factor: 1.15 },
  { id: "pickup", label: "وانت", factor: 1.2 },
  { id: "luxury", label: "لوکس یا خارجی", factor: 1.4 },
] as const;

const faNumber = (value: number) => Math.round(value / 50_000) * 50_000;

export function CostCalculator() {
  const [serviceId, setServiceId] = useState(serviceOptions[0].id);
  const [vehicleId, setVehicleId] = useState<(typeof vehicleMultipliers)[number]["id"]>("sedan");
  const [distanceKm, setDistanceKm] = useState(10);
  const [isNightOrHoliday, setIsNightOrHoliday] = useState(false);

  const service = serviceOptions.find((item) => item.id === serviceId) ?? serviceOptions[0];
  const vehicle = vehicleMultipliers.find((item) => item.id === vehicleId) ?? vehicleMultipliers[0];
  const isDistanceBased = Boolean(service.perKm);

  const result = useMemo(() => {
    const vehicleFactor = vehicle.factor;
    const timeFactor = isNightOrHoliday ? 1.25 : 1;
    if (service.fixed) {
      return {
        min: faNumber(service.fixed[0] * vehicleFactor * timeFactor),
        max: faNumber(service.fixed[1] * vehicleFactor * timeFactor),
        breakdown: [
          { label: `بازه پایه خدمات ${service.label}`, value: `${service.fixed[0].toLocaleString("fa-IR")} تا ${service.fixed[1].toLocaleString("fa-IR")} تومان` },
          { label: "ضریب نوع خودرو", value: `×${vehicle.factor.toLocaleString("fa-IR")}` },
          ...(isNightOrHoliday ? [{ label: "ضریب زمان شبانه یا تعطیل", value: "×۱٫۲۵" }] : []),
        ] as { label: string; value: string }[],
      };
    }
    const distanceCost = (service.perKm ?? 0) * distanceKm;
    const raw = (service.base + distanceCost) * vehicleFactor * timeFactor;
    return {
      min: faNumber(Math.max(service.base * timeFactor, raw * 0.8)),
      max: faNumber(raw * 1.25),
      breakdown: [
        { label: `هزینه پایه ${service.label}`, value: `${service.base.toLocaleString("fa-IR")} تومان` },
        { label: `مسافت حمل (${distanceKm.toLocaleString("fa-IR")} کیلومتر)`, value: `${faNumber(distanceCost).toLocaleString("fa-IR")} تومان` },
        { label: "ضریب نوع خودرو", value: `×${vehicle.factor.toLocaleString("fa-IR")}` },
        ...(isNightOrHoliday ? [{ label: "ضریب زمان شبانه یا تعطیل", value: "×۱٫۲۵" }] : []),
      ] as { label: string; value: string }[],
    };
  }, [service, vehicle, distanceKm, isNightOrHoliday]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]" dir="rtl">
      <div className="rounded-2xl bg-white p-6 shadow-card md:p-8">
        <fieldset>
          <legend className="text-sm font-black text-ink">۱. نوع خدمت</legend>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {serviceOptions.map((option) => (
              <button key={option.id} type="button" onClick={() => setServiceId(option.id)} className={`rounded-xl border p-4 text-right transition ${serviceId === option.id ? "border-brand-orange bg-orange-50" : "border-slate-200 bg-white hover:border-orange-200"}`}>
                <span className="block text-sm font-black text-ink">{option.label}</span>
                <span className="mt-1 block text-[11px] leading-5 text-slate-500">{option.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="text-sm font-black text-ink">۲. نوع خودرو</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {vehicleMultipliers.map((option) => (
              <button key={option.id} type="button" onClick={() => setVehicleId(option.id)} className={`min-h-11 rounded-lg border px-4 text-xs font-black transition ${vehicleId === option.id ? "border-brand-orange bg-orange-50 text-brand-orange" : "border-slate-200 bg-white text-slate-700 hover:border-orange-200"}`}>{option.label}</button>
            ))}
          </div>
        </fieldset>

        {isDistanceBased && (
          <fieldset className="mt-6">
            <legend className="text-sm font-black text-ink">۳. مسافت تقریبی حمل (کیلومتر)</legend>
            <div className="mt-4 flex items-center gap-4">
              <input type="range" min={2} max={80} step={1} value={distanceKm} onChange={(event) => setDistanceKm(Number(event.target.value))} className="h-2 w-full accent-[#ff5315]" aria-label="مسافت حمل به کیلومتر" />
              <span className="inline-flex min-w-24 items-center justify-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-black text-ink">{distanceKm.toLocaleString("fa-IR")} km</span>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-slate-400">مسافت از محل خودرو تا مقصد (تعمیرگاه یا منزل). اگر مطمئن نیستید، متن تقریبی را وارد کنید؛ فاصله دقیق هنگام هماهنگی ثبت می‌شود.</p>
          </fieldset>
        )}

        <fieldset className="mt-6">
          <legend className="text-sm font-black text-ink">{isDistanceBased ? "۴" : "۳"}. زمان درخواست</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" onClick={() => setIsNightOrHoliday(false)} className={`min-h-11 rounded-lg border px-4 text-xs font-black transition ${!isNightOrHoliday ? "border-brand-orange bg-orange-50 text-brand-orange" : "border-slate-200 bg-white text-slate-700 hover:border-orange-200"}`}>ساعات عادی</button>
            <button type="button" onClick={() => setIsNightOrHoliday(true)} className={`min-h-11 rounded-lg border px-4 text-xs font-black transition ${isNightOrHoliday ? "border-brand-orange bg-orange-50 text-brand-orange" : "border-slate-200 bg-white text-slate-700 hover:border-orange-200"}`}>شبانه یا روز تعطیل</button>
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl bg-ink p-6 text-white shadow-card md:p-8">
          <p className="text-xs font-black text-orange-300">برآورد بازه هزینه</p>
          <p className="mt-4 text-3xl font-black leading-[1.6] md:text-4xl">
            {result.min.toLocaleString("fa-IR")} <span className="text-base font-bold text-slate-300">تا</span> {result.max.toLocaleString("fa-IR")} <span className="text-base font-bold text-slate-300">تومان</span>
          </p>
          <ul className="mt-6 grid gap-3 border-t border-white/10 pt-5">
            {result.breakdown.map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-3 text-xs"><span className="text-slate-300">{row.label}</span><span className="font-black" dir="ltr">{row.value}</span></li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl bg-white/5 p-4 text-[11px] leading-6 text-slate-300"><strong className="text-amber-300">مهم:</strong> این عدد صرفاً یک برآورد آموزشی بر اساس فاکتورهای رایج قیمت‌گذاری است و الزام‌آور نیست. قیمت دقیق پس از ثبت موقعیت و مدل خودرو و پیش از اعزام، به‌صورت شفاف اعلام و با تأیید شما نهایی می‌شود.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link href="/#request" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-orange px-5 text-sm font-black text-white shadow-orange"><Icon name="form" size={17} /> ثبت درخواست با همین مشخصات</Link>
            <a href="tel:09123022064" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/30 px-5 text-sm font-black" dir="ltr"><Icon name="phone" size={17} /> 09123022064</a>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="flex items-center gap-2 text-sm font-black text-ink"><Icon name="tag" size={18} className="text-brand-orange" /> راهنمای قیمت‌گذاری شفاف</h2>
          <p className="mt-3 text-xs leading-7 text-slate-500">برای آشنایی با عوامل مؤثر بر قیمت هر خدمت و راهنمای کامل هزینه یدک‌کش، این صفحات را ببینید:</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/pricing" className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-black text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange">قیمت خدمات خودرو چاره ←</Link>
            <Link href="/blog/car-tow-truck-price-guide" className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-black text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-brand-orange">راهنمای هزینه حمل خودرو ←</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
