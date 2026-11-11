import Image from "next/image";
import Link from "next/link";
import { assistanceComparison, requestJourney } from "@/content/home-service-promise";
import { customerAppUrl } from "@/content/app-links";

export function RequestJourneySection() {
  return <section id="request-process" className="section-shell request-journey" aria-labelledby="request-journey-title" dir="rtl" data-aos="fade-up">
    <div className="promise-section-heading"><div><p className="promise-eyebrow">از درخواست تا پایان خدمت</p><h2 id="request-journey-title">مراحل دریافت امداد از خودرو چاره</h2></div><a href={customerAppUrl} className="promise-action">ثبت درخواست آنلاین ←</a></div>
    <ol className="request-journey-grid">{requestJourney.map((step, index) => <li key={step.title} className="request-journey-card" data-aos="fade-up" data-aos-delay={index * 80}>
      <div className="request-journey-image"><Image src={step.image} alt={step.alt} fill sizes="(min-width:1024px) 25vw,(min-width:640px) 50vw,100vw" className="object-cover" /><span className="request-journey-number" aria-hidden="true">{(index + 1).toLocaleString("fa-IR")}</span></div>
      <div className="request-journey-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
    </li>)}</ol>
  </section>;
}

export function AssistanceComparisonSection() {
  return <section id="assistance-comparison" className="section-shell assistance-comparison" aria-labelledby="assistance-comparison-title" dir="rtl" data-aos="fade-up">
    <div className="promise-section-heading"><div><p className="promise-eyebrow">انتخاب آگاهانه امداد خودرو</p><h2 id="assistance-comparison-title">مقایسه خدمات امداد خودرو</h2></div><Link href="/contact" className="promise-action">پرسش درباره شرایط و ضمانت ←</Link></div>
    <p id="comparison-intro" className="comparison-intro">تعهدات خودرو چاره در کنار مواردی که پیش از سفارش از سایر شرکت‌ها یا امدادگران آزادکار باید بررسی کنید.</p>
    <p className="comparison-scroll-hint">برای دیدن همه ستون‌ها، جدول را به طرفین بکشید.</p>
    <div className="comparison-scroll" tabIndex={0} role="region" aria-label="جدول مقایسه قابل پیمایش" aria-describedby="comparison-intro comparison-note">
      <table className="assistance-comparison-table comparison-reference"><caption className="sr-only">مقایسه تعهدات خودرو چاره با موارد قابل استعلام از سایر شرکت‌ها و امدادگران آزادکار</caption><thead><tr><th scope="col" className="comparison-criterion">معیار مقایسه</th><th scope="col" className="comparison-featured"><Image src="/images/khodrochare-wordmark.webp" alt="خودرو چاره" width={252} height={96} className="comparison-wordmark" /><small>تعهدات ما</small></th><th scope="col">سایر شرکت‌ها</th><th scope="col">امدادگران آزادکار</th></tr></thead>
        <tbody>{assistanceComparison.map(row => <tr key={row.criterion}><th scope="row" className="comparison-criterion">{row.criterion}</th><td className="comparison-featured"><span className="comparison-promise"><span className="comparison-check" aria-hidden="true">✓</span><span className="comparison-promise-text">{row.promise}</span></span></td><td><span className="comparison-cross" role="img" aria-label="شرایط این ارائه‌دهنده تأیید نشده است">×</span></td><td><span className="comparison-cross" role="img" aria-label="شرایط این ارائه‌دهنده تأیید نشده است">×</span></td></tr>)}</tbody>
      </table>
    </div>
    <details id="comparison-note" className="comparison-note"><summary>شرایط مقایسه، ضمانت و بازگشت وجه</summary><p>علامت × یعنی شرایط ارائه‌دهنده در این جدول تأیید نشده است؛ نه اینکه فاقد آن خدمت یا تعهد باشد. ستون خودرو چاره بیانگر تعهدات اعلام‌شده مجموعه است؛ شرایط سایر ارائه‌دهندگان متفاوت است و این جدول به معنی فقدان این خدمات در همه آن‌ها نیست. نوع قطعه، موجودی و هزینه نهایی پیش از سفارش اعلام می‌شود. دامنه ضمانت و موارد مشمول بازگشت وجه باید هنگام ثبت سفارش روشن باشد. مدرک آموزشی کارشناسان، مدرک داخلی شرکت است و به معنی گواهی دولتی یا دانشگاهی نیست.</p></details>
  </section>;
}
