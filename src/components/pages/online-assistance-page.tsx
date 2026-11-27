import { roadsideCoordinationCluster } from "@/content/roadside-coordination-cluster";
import { onlineServiceCluster } from "@/content/online-service-cluster";
import Link from "next/link";
import { AppShowcaseBanner } from "@/components/home/app-trust-banners";
import { SubpageShell } from "@/components/site/subpage-shell";
import { FinalContact, LandingHeader, LandingSchemas, LinkGrid, Questions, SafetyNote, Section } from "@/components/seo/landing-ui";
import { businessFacts } from "@/content/business";
import { onlineDescription, onlineHubFaqs, onlinePath, onlineServices, onlineTitle } from "@/content/online-assistance";
import { seoMetadata } from "@/seo/metadata";

export const metadata = seoMetadata({ title: "درخواست امداد خودرو آنلاین | یدک‌کش، مکانیک و باتری", description: onlineDescription, path: onlinePath });

export default function Page() {
  return <SubpageShell showGeneralFaq={false}>
    <LandingSchemas path={onlinePath} title={onlineTitle} description={onlineDescription} area={businessFacts.coverageSummary} areaType="Place" />
    {/* Preserve incoming links to retired request sections without rendering a form. */}
    <span id="request" aria-hidden="true" /><span id="request-checklist" aria-hidden="true" />
    <AppShowcaseBanner />
    <LandingHeader title={onlineTitle} intro="امداد خودرو آنلاین با اپلیکیشن خودرو چاره، راه دسترسی به خدمات یدک‌کش، مکانیک سیار و برق و باتری در تهران، کرج و شمال است. نسخه اندروید را از بازار یا مایکت دریافت کنید یا از نسخه وب روی آیفون و اندروید استفاده کنید؛ نصب برنامه برای استفاده از نسخه وب اجباری نیست." crumbs={[{ label: "امداد خودرو آنلاین" }]} primaryAction={{ label: "نصب اپلیکیشن امداد خودرو", href: "/app" }} />

    <Section id="online-app" title="دسترسی به خدمات امداد خودرو آنلاین از اپلیکیشن">
      <p>برای استفاده از امداد خودرو آنلاین، می‌توانید نسخه اندروید خودرو چاره را از فروشگاه‌های معرفی‌شده در بالای صفحه دریافت کنید. کاربران آیفون از وب‌اپلیکیشن در مرورگر استفاده می‌کنند و در صورت تمایل میان‌بر آن را به صفحه اصلی اضافه می‌کنند؛ این نسخه فایل نصب iOS نیست. مسیر نصب و ورود مشتریان با اپلیکیشن عضویت سفیران تفاوت دارد.</p>
      <p>اپلیکیشن امداد خودرو چاره، دسترسی به خدمات امدادی و حمل خودرو را در یک مسیر جمع می‌کند. از نسخه اندروید یا وب‌اپ وارد شوید و خدمت متناسب با نیاز خودرو را انتخاب کنید؛ هماهنگی تعمیر در محل یا حمل به تعمیرگاه بر اساس وضعیت خودرو انجام می‌شود.</p>
      <Link href="/app" data-app-entry="customer" className="inline-flex min-h-11 items-center font-bold text-brand-orange underline">دانلود اپلیکیشن امداد خودرو و راهنمای نسخه وب</Link>
    </Section>
    <Section id="choose-service" title="خدمات امداد خودرو آنلاین در اپلیکیشن خودرو چاره">
      <p>از یدک‌کش و خودروبر کفی تا مکانیک سیار، برق و باتری و تعویض چرخ، خدمات موردنیازتان را در اپلیکیشن امداد خودرو انتخاب کنید. معرفی هر خدمت در لینک‌های زیر کمک می‌کند با کاربرد و شرایط آن آشنا شوید و انتخاب متناسب با وضعیت خودرو داشته باشید.</p>
      <LinkGrid label="انتخاب خدمات امداد آنلاین" links={onlineServices.map(service => ({ title: service.title, href: service.href, description: service.description }))} />
    </Section>
    <Section id="online-service-planning" title="اعزام آنلاین امدادگر؛ هماهنگی متناسب با خودرو و محل">
      <h3 className="font-black text-ink">یک شرح روشن، انتخاب خدمت دقیق‌تر</h3>
      <p>در خدمات امداد خودرو آنلاین، مدل و سال خودرو، نوع گیربکس و نشانه قابل مشاهده را کنار نشانی قرار دهید. برای استارت ضعیف، بررسی برق و باتری مطرح است؛ برای خودروی دارای صدای غیرعادی، مکانیک سیار و برای جابه‌جایی، یدک‌کش یا کفی را بشناسید. انتخاب آگاهانه خدمت، ارتباط کاربر و پشتیبانی را هدفمند می‌کند. در اپلیکیشن امداد خودرو چاره، مسیر مشتریان از عضویت سفیران جداست و ادامه هماهنگی خدمت از حساب مشتریان انجام می‌شود.</p>
      <h3 className="font-black text-ink">راننده، مالک و محل دسترسی را هماهنگ کنید</h3>
      <p>برای خودروی کاری یا خانوادگی، یک فرد مسئول ارتباط معرفی کنید تا شرح نشانه‌ها، تصمیم هزینه و مقصد یکپارچه بمانند. در پارکینگ، ورودی مناسب، طبقه و شماره فرد پاسخ‌گو را آماده کنید. در حمل خودرو، نام تعمیرگاه و ساعت پذیرش و تحویل‌گیرنده را از ابتدا مشخص کنید. راهنماهای تکمیلی این صفحه، هماهنگی خودروی شرکتی، دسترسی مجتمع و پذیرش مقصد را با جزئیات توضیح می‌دهند تا تجربه دریافت خدمات خودرو در محل منظم و حرفه‌ای پیش برود.</p>
    </Section>
    <Section id="request-cost" title="هزینه امداد خودرو آنلاین چگونه محاسبه می‌شود؟">
      <p>هزینه امداد خودرو آنلاین از نوع خدمت و شرایط واقعی آن به دست می‌آید، نه صرفاً ثبت اینترنتی درخواست. در تعمیر، اعزام، عیب‌یابی، اجرت و قطعه را جدا بپرسید؛ در حمل، نوع وسیله، ورودی، مسافت مشمول نرخ و بارگیری را روشن کنید. هزینه بازدید در صورت انجام‌نشدن تعمیر، انتظار و تغییر مقصد هم باید مشخص باشد. هر کار اضافه به توافق تازه نیاز دارد؛ آنلاین‌بودن به معنی رایگان‌بودن اعزام نیست.</p>
      <div className="overflow-x-auto"><table className="w-full min-w-[480px] text-right"><caption className="p-3 text-right font-bold text-ink">چه چیزی را پیش از شروع هماهنگ کنیم؟</caption><thead><tr>{["خدمت", "اقلام هزینه", "اطلاعات تعیین‌کننده"].map(label => <th key={label} scope="col" className="border-b p-3">{label}</th>)}</tr></thead><tbody>{[
        ["برق، باتری و عیب‌یابی", "اعزام، تست، نصب و قطعه احتمالی", "مدل، نشانه و نتیجه تست"],
        ["یدک‌کش و کفی", "ورودی، کیلومتر، بارگیری و اقلام جدا", "مبدأ، مقصد، گیربکس و چرخ‌ها"],
        ["تعویض چرخ", "اعزام، اجرت و لوازم احتمالی", "زاپاس، رینگ و فضای امن کار"],
      ].map(row => <tr key={row[0]} className="border-b border-slate-200"><th scope="row" className="p-3">{row[0]}</th><td className="p-3">{row[1]}</td><td className="p-3">{row[2]}</td></tr>)}</tbody></table></div>
      <LinkGrid links={[{ title: "جدول نرخ‌نامه ۱۴۰۵ و محاسبه حمل", href: "/pricing", description: "مبنای جدول تهران و البرز است؛ شرایط مسیرهای دیگر جدا بررسی می‌شود." }, { title: "حقوق مشتری و شرایط خدمت", href: "/rules" }]} />
    </Section>
    <Section id="online-coverage" title="امداد آنلاین در تهران، کرج و شمال">
      <p>برای امداد آنلاین در تهران و کرج، نام محله به‌تنهایی کافی نیست؛ ورودی قابل دسترسی و در بزرگراه جهت حرکت و آخرین خروجی را اعلام کنید. در شمال، شهر یا محور، مسیر فرعی و ورودی اقامتگاه را اضافه کنید. ارتفاع و شیب پارکینگ، زمین نرم یا چرخ قفل می‌تواند تجهیزات لازم را تغییر دهد. لوکیشن به یافتن خودرو کمک می‌کند، اما به‌تنهایی دسترسی کفی یا امکان تعمیر را تأیید نمی‌کند.</p>
      <LinkGrid label="محدوده‌های درخواست آنلاین" links={[{ title: "تهران", href: "/تهران", description: "محله، جهت بزرگراه و ورودی قابل دسترسی." }, { title: "کرج", href: "/کرج", description: "توقف شهری را از آزادراه یا ابتدای جاده چالوس جدا اعلام کنید." }, { title: "شمال؛ گیلان، مازندران و گلستان", href: "/شمال", description: "نام شهر یا محور و ورودی ویلا یا اقامتگاه." }, { title: "آزادراه تهران–شمال", href: "/roads/tehran-north", description: "نام تونل یا خروجی و جهت؛ این مسیر با جاده چالوس متفاوت است." }]} />
    </Section>
    <Section title="هویت مجموعه و مسیر پیگیری">
      <p>خودرو چاره برند شرکت {businessFacts.legalName} است. خدمت مستقل از نمایندگی رسمی خودروساز هماهنگ می‌شود؛ برای خودروی دارای گارانتی، شرایط تعمیر و مقصد پذیرنده را با ارائه‌دهنده ضمانت کنترل کنید. پیش از تأیید، درباره دامنه کار، مسئولیت حمل و شرایط ضمانت همان خدمت سؤال کنید و شرح توافق و رسید را نگه دارید. مشخصات حقوقی، نشانی و مسیر پیگیری در صفحات زیر آمده‌اند.</p>
      <LinkGrid links={[{ title: "هویت ثبتی و جواز فعالیت", href: "/licenses" }, { title: "تماس، نشانی و پیگیری خدمت", href: "/contact" }, { title: "تیم و معرفی مجموعه", href: "/about" }]} />
    </Section>
    <Section id="online-help" title="راهنماهای تکمیلی امداد خودرو آنلاین">
      <p>برای آشنایی بیشتر با استفاده از اپلیکیشن امداد خودرو، راهنماهای زیر را بخوانید. در صورت نبود اینترنت، پشتیبانی تلفنی جایگزین مسیر آنلاین است؛ در موقعیت خطرناک، ایمنی سرنشینان بر استفاده از برنامه اولویت دارد.</p>
      <LinkGrid links={[...roadsideCoordinationCluster.map(guide => ({ title: guide.title, href: guide.path })), ...onlineServiceCluster.map(guide => ({ title: guide.title, href: guide.path })), { title: "بررسی هویت امدادگر و مشخصات خدمت", href: "/guides/verify-roadside-provider" }, { title: "فاکتور و تحویل خودرو به خودروبر", href: "/blog/roadside-service-invoice-handover" }, { title: "راهنمای امداد خودرو در محل و جاده", href: "/امداد-خودرو" }, { title: "نصب اپلیکیشن امداد خودرو", href: "/app" }, { title: "راهنمای استفاده و پیگیری خدمات آنلاین", href: "/blog/online-roadside-assistance-request-guide" }, { title: "آمادگی پیش از دریافت امداد", href: "/blog/online-roadside-assistance-tehran-karaj-complete-guide" }, { title: "دریافت کمک بدون اینترنت", href: "/blog/roadside-help-without-internet" }]} />
    </Section>
    <Questions title="پرسش‌های امداد خودرو آنلاین و اپلیکیشن" items={onlineHubFaqs.filter(item => !item.question.includes("ابزار آماده‌سازی"))} />
    <SafetyNote /><FinalContact title="برای شروع درخواست آماده‌اید؟" />
  </SubpageShell>;
}
