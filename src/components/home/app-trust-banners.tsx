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
        <p className="app-showcase-description">ثبت درخواست امداد، انتخاب خدمت و ارتباط با پشتیبانی؛ خدمات خودرو همیشه همراه شما.</p>
        <div className="app-showcase-actions">
          <a href={customerAppUrl} data-app-entry="customer" aria-label="دانلود و نصب وب‌اپلیکیشن" className="showcase-button showcase-button-primary"><Image src="/images/app-screens/download-web.webp" alt="" width={48} height={48} className="download-button-art" />دانلود و نصب وب‌اپلیکیشن<small>PWA · ورود به اپ مشتریان</small></a>
          {release.available ? <a href={release.href} download={release.filename} className="showcase-button"><Image src="/images/app-screens/download-android.webp" alt="" width={48} height={48} className="download-button-art" />دانلود مستقیم اندروید<small>فایل رسمی APK</small></a> : <Link href="/app#downloads" className="showcase-button"><Image src="/images/app-screens/download-android.webp" alt="" width={48} height={48} className="download-button-art" />دریافت نسخه اندروید<small>بررسی انتشار و راهنمای دریافت</small></Link>}
          <Link href="/app" className="showcase-button"><Image src="/images/app-screens/download-ios.webp" alt="" width={48} height={48} className="download-button-art" />راهنمای نصب در آیفون<small>افزودن به صفحه اصلی Safari</small></Link>
        </div>
        <details className="app-showcase-note"><summary>راهنمای نصب و توضیح تصاویر اپ</summary><p>نسخه وب روی app.khodrochare.ir باز می‌شود؛ نصب از منوی مرورگر همان اپ انجام می‌شود. <Link href="/app">امکانات و راهنمای نصب ←</Link> تصاویر، بازسازی نمایشی رابط اپ هستند و ممکن است با نسخه جاری تفاوت داشته باشند.</p></details>
      </div>
    </div>
    <div className="app-showcase-phones" aria-label="تصاویر بازسازی‌شده نمایشی اپلیکیشن خودرو چاره">
      <Image src="/images/app-screens/benefits-hd.webp" alt="بازسازی نمایشی خدمات و مزایای اپلیکیشن خودرو چاره" width={900} height={1860} className="app-phone app-phone-third" sizes="(min-width:1024px) 120px, (min-width:768px) 100px, 78px" />
      <Image src="/images/app-screens/services-hd.webp" alt="بازسازی نمایشی فهرست خدمات اپلیکیشن خودرو چاره" width={900} height={1860} className="app-phone app-phone-back" sizes="(min-width:1024px) 148px, (min-width:768px) 130px, 96px" />
      <Image src="/images/app-screens/home-hd.webp" alt="بازسازی نمایشی صفحه اصلی اپلیکیشن خودرو چاره" width={900} height={1860} className="app-phone app-phone-front" sizes="(min-width:1024px) 164px, (min-width:768px) 140px, 100px" />
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
