import Image from "next/image";
import Link from "next/link";
import { customerAppUrl, customerMyketUrl } from "@/content/app-links";
import { getAppDownload } from "@/lib/app-downloads";
import { trustItems } from "./home-content";

export function AppShowcaseBanner() {
  const release = getAppDownload("customer");
  return <section id="app" className="section-shell app-showcase app-reference" aria-labelledby="app-showcase-title" dir="rtl" data-aos="fade-up">
    <span id="downloads" className="absolute" aria-hidden="true" /><span id="features" className="absolute" aria-hidden="true" />
    <div className="app-showcase-panel">
      <div className="app-showcase-copy">
        <p className="showcase-eyebrow">خدمات خودرو، همیشه همراه شما</p>
        <h2 id="app-showcase-title">سوپر اپلیکیشن خودرو چاره</h2>
        <p className="app-showcase-description">خدمت موردنیازتان را انتخاب کنید و درخواست را در اپ مشتریان ادامه دهید؛ از امداد خودرو و حمل تا خدمات سیار، با هماهنگی و بررسی شرایط همان درخواست.</p>
        <div className="app-showcase-actions">
          <a href={customerMyketUrl} target="_blank" rel="noopener noreferrer" className="showcase-button"><Image src="/images/social/myket.svg" alt="" width={48} height={48} className="download-button-art" />دریافت از مایکت<small>اپلیکیشن اندروید مشتریان</small></a>
          {release.available ? <a href={release.href} download={release.filename} className="showcase-button"><Image src="/images/social/android.svg" alt="" width={48} height={48} className="download-button-art" />دریافت نسخه اندروید<small>دانلود مستقیم APK</small></a> : <button type="button" disabled aria-label="دریافت نسخه اندروید؛ فایل هنوز منتشر نشده" className="showcase-button opacity-60 cursor-not-allowed"><Image src="/images/social/android.svg" alt="" width={48} height={48} className="download-button-art" />دریافت نسخه اندروید<small>فایل هنوز منتشر نشده</small></button>}
          <a href={customerAppUrl} data-app-entry="customer" aria-label="ورود به اپلیکیشن PWA" className="showcase-button showcase-button-primary"><Image src="/images/app-screens/download-web.webp" alt="" width={48} height={48} className="download-button-art" />وب‌اپلیکیشن PWA<small>نسخه IOS</small></a>
        </div>
        <details className="app-showcase-note"><summary>راهنمای نصب و توضیح تصاویر اپ</summary><p>نسخه وب روی app.khodrochare.ir باز می‌شود؛ نصب از منوی مرورگر همان اپ انجام می‌شود. <Link href="/app">راهنمای نصب در آیفون و امکانات اپ ←</Link> این دو تصویر، اسکرین‌شات‌های ارسالی اپلیکیشن هستند و وضعیت زنده سفارش یا موجودی حساب شما را نشان نمی‌دهند.</p></details>
      </div>
    </div>
    <div className="app-showcase-phones" aria-label="دو تصویر ارسالی اپلیکیشن خودرو چاره در قاب موبایل">
      <div className="app-device app-device-back"><Image src="/images/app-screens/customer-services-20261121.webp" alt="تصویر ارسالی فهرست خدمات اپلیکیشن خودرو چاره" width={486} height={1080} className="app-phone app-phone-back" sizes="(min-width:1024px) 208px, (min-width:768px) 163px, 138px" /></div>
      <div className="app-device app-device-front"><Image src="/images/app-screens/customer-home-20261121.webp" alt="تصویر ارسالی صفحه اصلی اپلیکیشن خودرو چاره" width={486} height={1080} className="app-phone app-phone-front" sizes="(min-width:1024px) 218px, (min-width:768px) 173px, 146px" /></div>
    </div>
  </section>;
}

export function TrustShowcaseBanner() {
  return <section id="trust" className="section-shell trust-showcase" aria-labelledby="trust-showcase-title" dir="rtl" data-aos="fade-up">
    <div className="trust-showcase-art" aria-hidden="true"><Image src="/images/trust-vehicles.webp" alt="" fill sizes="(min-width:1024px) 400px, 100vw" className="object-cover" /></div>
    <div className="trust-showcase-copy">
      <Image src="/images/khodrochare-brand-wordmark-dark.webp" alt="خودرو چاره" width={252} height={96} className="trust-showcase-wordmark" />
      <h2 id="trust-showcase-title">چرا به ما اعتماد کنید؟</h2>
      <p className="trust-showcase-intro">از انتخاب خدمت مناسب و اعلام هزینه پیش از شروع، تا هماهنگی رسید و پیگیری شرایط ضمانت؛ در مسیر خدمت کنار شما هستیم.</p>
      <ul className="trust-showcase-points">{trustItems.map(item => <li key={item.title}><span aria-hidden="true">✓</span><strong>{item.title}</strong><span>{item.desc}</span></li>)}</ul>
      <Link href="/about" className="trust-showcase-action">آشنایی با مجموعه و تعهدات ما <span aria-hidden="true">←</span></Link>
    </div>
  </section>;
}
