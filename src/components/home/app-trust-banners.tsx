import Image from "next/image";
import Link from "next/link";
import { customerAppUrl } from "@/content/app-links";
import { getAppDownload } from "@/lib/app-downloads";
import { trustItems } from "./home-content";

export function AppShowcaseBanner() {
  const release = getAppDownload("customer");
  return <section id="app" className="section-shell app-showcase" aria-labelledby="app-showcase-title" dir="rtl" data-aos="fade-up">
    <div className="app-showcase-panel">
      <div className="app-showcase-copy">
        <p className="showcase-eyebrow">خدمات خودرو، همیشه همراه شما</p>
        <h2 id="app-showcase-title">اپلیکیشن اختصاصی خودرو چاره</h2>
        <p className="app-showcase-description">از ثبت درخواست امداد خودرو و انتخاب خدمت تا دستیار هوشمند و ارتباط با پشتیبانی؛ همه در یک اپلیکیشن. راهنمای هماهنگی و خدمات موردنیاز خودرو را همیشه همراه داشته باشید.</p>
        <div className="app-showcase-actions">
          <a href={customerAppUrl} data-app-entry="customer" aria-label="دانلود و نصب وب‌اپلیکیشن" className="showcase-button showcase-button-primary"><span aria-hidden="true">↗</span>دانلود و نصب وب‌اپلیکیشن<small>PWA · ورود به اپ مشتریان</small></a>
          {release.available ? <a href={release.href} download={release.filename} className="showcase-button"><span aria-hidden="true">↓</span>دانلود مستقیم اندروید<small>فایل رسمی APK</small></a> : <Link href="/app#downloads" className="showcase-button"><span aria-hidden="true">↓</span>دریافت نسخه اندروید<small>بررسی انتشار و راهنمای دریافت</small></Link>}
          <Link href="/app" className="showcase-button"><span aria-hidden="true">＋</span>راهنمای نصب در آیفون<small>افزودن به صفحه اصلی Safari</small></Link>
        </div>
        <p className="app-showcase-note">نسخه وب روی app.khodrochare.ir باز می‌شود؛ نصب از منوی مرورگر همان اپ انجام می‌شود. <Link href="/app">امکانات و راهنمای نصب ←</Link></p>
      </div>
    </div>
    <div className="app-showcase-phones" aria-label="تصاویر ارسالی از اپلیکیشن خودرو چاره">
      <Image src="/images/app-screens/benefits.webp" alt="صفحه خدمات و مزایای اپلیکیشن خودرو چاره" width={252} height={502} className="app-phone app-phone-third" sizes="(min-width:1024px) 170px, 105px" />
      <Image src="/images/app-screens/services.webp" alt="فهرست خدمات در اپلیکیشن خودرو چاره" width={254} height={501} className="app-phone app-phone-back" sizes="(min-width:1024px) 210px, 145px" />
      <Image src="/images/app-screens/home.webp" alt="صفحه اصلی واقعی اپلیکیشن خودرو چاره در تصویر ارسالی" width={232} height={453} className="app-phone app-phone-front" sizes="(min-width:1024px) 226px, 160px" />
    </div>
  </section>;
}

export function TrustShowcaseBanner() {
  return <section id="trust" className="section-shell trust-showcase" aria-labelledby="trust-showcase-title" dir="rtl" data-aos="fade-up">
    <div className="trust-showcase-art" aria-hidden="true"><Image src="/images/trust-vehicles.webp" alt="" fill sizes="(min-width:1024px) 400px, 100vw" className="object-cover" /></div>
    <div className="trust-showcase-copy">
      <Image src="/images/khodrochare-wordmark.webp" alt="خودرو چاره" width={252} height={96} className="trust-showcase-wordmark" />
      <h2 id="trust-showcase-title">چرا به ما اعتماد کنید؟</h2>
      <p className="trust-showcase-intro">از انتخاب خدمت مناسب و اعلام هزینه پیش از شروع، تا هماهنگی رسید و پیگیری شرایط ضمانت؛ در مسیر خدمت کنار شما هستیم.</p>
      <ul className="trust-showcase-points">{trustItems.map(item => <li key={item.title}><span aria-hidden="true">✓</span><strong>{item.title}</strong><span>{item.desc}</span></li>)}</ul>
      <Link href="/about" className="trust-showcase-action">آشنایی با مجموعه و تعهدات ما <span aria-hidden="true">←</span></Link>
    </div>
  </section>;
}
