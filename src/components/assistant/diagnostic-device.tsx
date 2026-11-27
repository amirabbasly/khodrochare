import Image from "next/image";
import Link from "next/link";

export function DiagnosticDevice() {
  return <section className="diagnostic-device site-container" aria-labelledby="diagnostic-device-title" dir="rtl">
    <div className="diagnostic-device-image"><Image src="/images/khodrochare-obd-tool.webp" alt="تصویر معرفی دستگاه دیاگ OBD-II خودرو چاره" width={1200} height={900} sizes="(min-width:1024px) 50vw, 100vw" className="h-auto w-full object-contain" /><p>تصویر معرفی محصول؛ مشخصات و سازگاری را پیش از خرید بررسی کنید.</p></div>
    <div className="diagnostic-device-copy"><span className="diagnostic-device-tag">دستگاه OBD-II خودرو چاره</span><h2 id="diagnostic-device-title">دیاگ با هوش مصنوعی؛ همراه خودرو و اپلیکیشن شما</h2>
      <p>دستگاه معرفی‌شده خودرو چاره برای اتصال خودرو به تجربه خدمات هوشمند در اپلیکیشن است. قابلیت‌های معرفی‌شده توسط عرضه‌کننده شامل دیاگ، ریمپ و GPS است و دسترسی به امکانات ارائه‌شده از طریق اپلیکیشن خودرو چاره انجام می‌شود.</p>
      <div className="diagnostic-device-price"><span>پیشنهاد بلک فرایدی</span><del aria-label="قیمت قبل از تخفیف">۱٬۱۵۰٬۰۰۰ تومان</del><strong>۵۵۹٬۰۰۰ <small>تومان</small></strong><p>قیمت اعلام‌شده توسط عرضه‌کننده؛ اعتبار تخفیف، موجودی و شرایط خرید را پیش از پرداخت تأیید کنید.</p></div>
      <ul><li><strong>دیاگ:</strong> بررسی خطاها و داده‌های قابل‌پشتیبانی خودرو؛ قابلیت‌ها برای هر مدل متفاوت است.</li><li><strong>ریمپ:</strong> فقط پس از بررسی ECU، پشتیبانی نرم‌افزار و ارزیابی متخصص؛ ریمپ برای همه خودروها قابل انجام نیست.</li><li><strong>GPS:</strong> ردیابی به سخت‌افزار یا منبع موقعیت، مجوزها و ارتباط لازم وابسته است؛ اتصال OBD-II به‌تنهایی وجود GPS مستقل را تضمین نمی‌کند.</li></ul>
      <p className="diagnostic-device-notice">این محصول برای استفاده با برندهای مختلف معرفی شده است، اما پشتیبانی از تمامی برندها، مدل‌ها و تمام قابلیت‌ها تأیید نشده است. پیش از خرید، برند، مدل، سال ساخت و نوع ECU را برای بررسی سازگاری اعلام کنید. دستیار هوشمند جایگزین بررسی فنی حضوری نیست.</p>
      <div className="diagnostic-device-actions"><Link href="/app">نصب و امکانات اپلیکیشن</Link><Link href="/contact">بررسی سازگاری و شرایط خرید</Link></div>
    </div>
  </section>;
}
