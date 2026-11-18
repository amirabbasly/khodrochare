import { getAppDownload, type DownloadApp } from "@/lib/app-downloads";
import { customerAppUrl, fleetAppUrl } from "@/content/app-links";

/** Static server output; upload signed releases BEFORE building to enable their links. */
export function AppDownloads({ apps = ["customer", "fleet"] }: { apps?: DownloadApp[] }) {
  return <section id="downloads" className="site-container mt-8 scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 md:p-8" dir="rtl" aria-labelledby="app-downloads-title">
    <h2 id="app-downloads-title" className="text-2xl font-black text-ink">دانلود مستقیم اپلیکیشن اندروید</h2>
    <p className="mt-3 text-sm leading-8 text-slate-600">فایل APK مخصوص Android است؛ روی iPhone از نسخه وب و گزینه افزودن به صفحه اصلی در Safari استفاده کنید. نسخه وب همچنان بدون دانلود فایل در دسترس است.</p>
    <div className="mt-5 grid gap-4 md:grid-cols-2">{apps.map(app => {
      const release = getAppDownload(app);
      const label = `دانلود مستقیم ${release.name} (APK)`;
      return <article key={app} data-download-app={app} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="font-black text-ink">{release.name}</h3>
        {release.available ? <><a href={release.href} download={release.filename} className="mt-4 inline-flex min-h-12 items-center rounded-xl bg-brand-orange px-5 py-3 text-sm font-black text-white">{label}</a><p className="mt-2 text-xs leading-7 text-slate-600">اندروید · {new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 }).format(release.bytes / 1048576)} مگابایت</p></> : <><button type="button" disabled aria-describedby={`download-status-${app}`} className="mt-4 inline-flex min-h-12 cursor-not-allowed items-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-black opacity-60">{label}</button><p id={`download-status-${app}`} className="mt-2 text-xs leading-7 text-slate-600">فایل اندروید هنوز منتشر نشده است؛ فعلاً از نسخه وب استفاده کنید.</p></>}
        <a href={app === "customer" ? customerAppUrl : fleetAppUrl} className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-brand-orange underline">ورود به نسخه وب {release.name}</a>
      </article>;
    })}</div>
    <p className="mt-4 text-xs leading-7 text-slate-600">برای نصب، فقط به مرورگری که همین فایل رسمی را دانلود کرده مجوز نصب بدهید. حفاظت دستگاه یا Play Protect را خاموش نکنید. کد ورود و رمز را در اختیار دیگران نگذارید.</p>
  </section>;
}
