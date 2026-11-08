import { customerAppUrl, fleetAppUrl } from "@/content/app-links";
export function AppEntry({ fleet = false }: { fleet?: boolean }) {
  return <div className="mt-5 flex flex-wrap gap-3" dir="rtl">
    <a href={customerAppUrl} data-app-entry="customer" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand-orange px-5 py-3 text-sm font-black text-white">ورود به اپلیکیشن و درخواست آنلاین امداد</a>
    {fleet && <a href={fleetAppUrl} data-app-entry="fleet" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-ink">ورود و ثبت‌نام ناوگان سفیران</a>}
  </div>;
}
