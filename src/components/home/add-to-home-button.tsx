import { customerAppUrl } from "@/content/app-links";

/** Installation belongs to the real app origin, not this marketing site's service worker. */
export function AddToHomeButton({ label = "ورود و نصب اپلیکیشن خودرو چاره", light = false }: { label?: string; light?: boolean }) {
  return <div className="mt-3 w-full"><a href={customerAppUrl} data-app-entry="customer" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-xs font-black text-white shadow-orange transition hover:-translate-y-0.5 hover:brightness-110 sm:min-h-13 sm:max-w-sm sm:px-7 sm:text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4" strokeLinecap="round" strokeLinejoin="round" /></svg>{label}</a><p className={`mt-2 text-xs leading-6 ${light ? "text-slate-600" : "text-slate-500"}`}>نسخه وب اپلیکیشن روی دامنه app.khodrochare.ir باز می‌شود؛ نصب از امکانات مرورگر همان اپ انجام می‌شود.</p></div>;
}
