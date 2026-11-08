import { SubpageShell } from "@/components/site/subpage-shell";
import { AnswerBox, FinalContact, LandingHeader, LandingSchemas, LinkGrid, Questions, SafetyNote, Section } from "@/components/seo/landing-ui";
import { OnlineRequestBrief } from "@/components/tools/online-request-brief";
import { customerAppUrl } from "@/content/app-links";
import { businessFacts } from "@/content/business";
import { onlineContentRelease, onlineDescription, onlineHubFaqs, onlinePath, onlineServices, onlineTitle } from "@/content/online-assistance";
import { seoMetadata } from "@/seo/metadata";

export const metadata = seoMetadata({ title: "امداد خودرو آنلاین | درخواست یدک‌کش، مکانیک و باتری", description: onlineDescription, path: onlinePath });

export default function Page() {
  return <SubpageShell showGeneralFaq={false}>
    <LandingSchemas path={onlinePath} title={onlineTitle} description={onlineDescription} area={businessFacts.coverageSummary} areaType="Place" />
    <LandingHeader title={onlineTitle} intro="برای یدک‌کش، خودروبر، مکانیک سیار، برق و باتری یا تعویض چرخ، درخواست را در اپ مشتریان خودرو چاره شروع کنید. هماهنگی خدمات در تهران، کرج و شمال انجام می‌شود؛ نسخه وب از مرورگر در دسترس است و نصب برنامه الزامی نیست." crumbs={[{ label: "امداد خودرو آنلاین" }]} primaryAction={{ label: "شروع درخواست امداد آنلاین", href: customerAppUrl }} />
    <AnswerBox updatedAt={onlineContentRelease}><p>خدمت موردنیاز، مدل خودرو و محل توقف را آماده کنید و از <a href={customerAppUrl} className="font-bold text-brand-orange underline">اپ مشتریان خودرو چاره</a> وارد مسیر درخواست شوید. مرحله بعد، ورود یا ساخت حساب است؛ هزینه و زمان تقریبی با توجه به خودرو، دسترسی و خدمت هماهنگ می‌شوند. اگر اینترنت ندارید، با <a href={`tel:${businessFacts.emergencyPhone}`} className="font-bold underline" dir="ltr">{businessFacts.emergencyPhone}</a> تماس بگیرید.</p></AnswerBox>
    <nav aria-label="بخش‌های امداد آنلاین" className="site-container mt-6 flex flex-wrap gap-3 text-sm font-bold">
      {[["request", "شروع درخواست"], ["choose-service", "انتخاب خدمت"], ["request-checklist", "آماده‌سازی شرح خرابی"], ["request-cost", "هزینه"], ["online-coverage", "پوشش مناطق"], ["online-help", "ورود و پیگیری"]].map(([id, label]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-4 text-ink hover:underline">{label}</a>)}
    </nav>
    <Section id="request" title="شروع درخواست آنلاین؛ سه مرحله روشن">
      <ol className="grid list-inside list-decimal gap-4 md:grid-cols-3">
        <li className="rounded-xl border border-slate-200 p-4"><strong>ورود به حساب مشتری</strong><p>اپ را در مرورگر باز کنید و وارد حساب شوید یا ثبت‌نام کنید. برای نصب میان‌بر هم می‌توانید بعداً از منوی مرورگر استفاده کنید.</p></li>
        <li className="rounded-xl border border-slate-200 p-4"><strong>شرح نیاز و موقعیت</strong><p>مدل، نشانه خرابی و محل توقف را در مسیر درخواست تکمیل کنید. برای حمل، مقصد و وضعیت چرخ‌ها را هم بگویید.</p></li>
        <li className="rounded-xl border border-slate-200 p-4"><strong>هماهنگی خدمت</strong><p>نتیجه ارسال را بررسی کنید؛ نوع کار، حدود هزینه و زمان تقریبی برای همان درخواست مشخص می‌شوند.</p></li>
      </ol>
      <a href={customerAppUrl} data-app-entry="customer" className="inline-flex min-h-12 items-center rounded-xl bg-brand-orange px-5 font-black text-white">شروع درخواست در اپ مشتریان</a>
    </Section>
    <Section id="choose-service" title="کدام خدمت را آنلاین درخواست کنم؟">
      <p>اگر نوع خرابی را نمی‌دانید، نشانه را توضیح دهید. انتخاب خدمت اولیه، جای تشخیص متخصص را نمی‌گیرد؛ هدف این است که از ابتدا اطلاعات و تجهیزات مناسب بررسی شوند.</p>
      <LinkGrid label="انتخاب خدمات امداد آنلاین" links={onlineServices.map(service => ({ title: service.title, href: service.href, description: service.description }))} />
    </Section>
    <Section id="request-checklist" title="شرح درخواست را آماده کنید؛ بدون ارسال اطلاعات"><OnlineRequestBrief /></Section>
    <Section id="request-cost" title="هزینه امداد خودرو آنلاین چگونه محاسبه می‌شود؟">
      <p>برای تعمیر در محل، هزینه اعزام، تست، اجرت و قطعه را مشخص کنید. برای حمل، ورودی، مسافت، نوع وسیله و شرایط بارگیری مهم‌اند. آنلاین‌بودن درخواست به معنی رایگان‌بودن اعزام نیست؛ برآورد باید دامنه مشخص داشته باشد.</p>
      <div className="overflow-x-auto"><table className="w-full min-w-[480px] text-right"><caption className="p-3 text-right font-bold text-ink">چه چیزی را پیش از شروع هماهنگ کنیم؟</caption><thead><tr>{["خدمت", "اقلام هزینه", "اطلاعات تعیین‌کننده"].map(label => <th key={label} scope="col" className="border-b p-3">{label}</th>)}</tr></thead><tbody>{[
        ["برق، باتری و عیب‌یابی", "اعزام، تست، نصب و قطعه احتمالی", "مدل، نشانه و نتیجه تست"],
        ["یدک‌کش و کفی", "ورودی، کیلومتر، بارگیری و اقلام جدا", "مبدأ، مقصد، گیربکس و چرخ‌ها"],
        ["تعویض چرخ", "اعزام، اجرت و لوازم احتمالی", "زاپاس، رینگ و فضای امن کار"],
      ].map(row => <tr key={row[0]} className="border-b border-slate-200"><th scope="row" className="p-3">{row[0]}</th><td className="p-3">{row[1]}</td><td className="p-3">{row[2]}</td></tr>)}</tbody></table></div>
      <LinkGrid links={[{ title: "جدول نرخ‌نامه ۱۴۰۵ و محاسبه حمل", href: "/pricing", description: "مبنای جدول تهران و البرز است؛ شرایط مسیرهای دیگر جدا بررسی می‌شود." }, { title: "حقوق مشتری و شرایط خدمت", href: "/rules" }]} />
    </Section>
    <Section id="online-coverage" title="امداد آنلاین در تهران، کرج و شمال">
      <p>موقعیت دقیق، نه فقط نام شهر، مبنای بررسی دسترسی است. در بزرگراه جهت و خروجی، در پارکینگ ارتفاع و رمپ و در راه فرعی جنس زمین را مشخص کنید.</p>
      <LinkGrid label="محدوده‌های درخواست آنلاین" links={[{ title: "تهران", href: "/تهران", description: "محله، جهت بزرگراه و ورودی قابل دسترسی." }, { title: "کرج", href: "/کرج", description: "توقف شهری را از آزادراه یا ابتدای جاده چالوس جدا اعلام کنید." }, { title: "شمال؛ گیلان، مازندران و گلستان", href: "/شمال", description: "نام شهر یا محور و ورودی ویلا یا اقامتگاه." }, { title: "آزادراه تهران–شمال", href: "/roads/tehran-north", description: "نام تونل یا خروجی و جهت؛ این مسیر با جاده چالوس متفاوت است." }]} />
    </Section>
    <Section title="هویت مجموعه و مسیر پیگیری">
      <p>خودرو چاره برند شرکت {businessFacts.legalName} است. خدمات هماهنگی مستقل از نمایندگی خودروساز انجام می‌شوند. برای تصمیم درباره گارانتی، شرایط ارائه‌دهنده ضمانت خودرو را هم کنترل کنید. اطلاعات هویتی، نشانی و راه پیگیری در صفحات زیر در دسترس‌اند.</p>
      <LinkGrid links={[{ title: "هویت ثبتی و جواز فعالیت", href: "/licenses" }, { title: "تماس، نشانی و پیگیری خدمت", href: "/contact" }, { title: "تیم و معرفی مجموعه", href: "/about" }]} />
    </Section>
    <Section id="online-help" title="راهنمای ورود، آماده‌سازی و پیگیری درخواست">
      <p>برای شروع خدمت همین صفحه را مبنا قرار دهید؛ راهنماهای زیر هرکدام یک مسئله جدا را توضیح می‌دهند. در قطع اینترنت یا نتیجه نامشخص، پیش از ارسال دوباره با پشتیبانی هماهنگ کنید.</p>
      <LinkGrid links={[{ title: "ورود و نصب نسخه وب مشتریان", href: "/app", description: "راهنمای مرورگر، Android و iPhone؛ مسیر ناوگان سفیران جداست." }, { title: "چک‌لیست پیش از درخواست؛ تهران و کرج", href: "/blog/online-roadside-assistance-tehran-karaj-complete-guide", description: "اطلاعات خودرو، نشانی و محدودیت بارگیری." }, { title: "پس از ارسال؛ پیگیری و تغییر موقعیت", href: "/blog/online-roadside-assistance-request-guide", description: "نتیجه ارسال، تماس پیگیری و هماهنگی نشانی تازه." }, { title: "دریافت کمک بدون اینترنت", href: "/blog/roadside-help-without-internet" }]} />
    </Section>
    <Questions title="سؤال‌های درخواست امداد آنلاین" items={onlineHubFaqs} />
    <SafetyNote /><FinalContact title="برای شروع درخواست آماده‌اید؟" />
  </SubpageShell>;
}
