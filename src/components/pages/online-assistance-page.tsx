import Link from "next/link";
import { AppShowcaseBanner } from "@/components/home/app-trust-banners";
import { SubpageShell } from "@/components/site/subpage-shell";
import { AnswerBox, FinalContact, LandingHeader, LandingSchemas, LinkGrid, Questions, SafetyNote, Section } from "@/components/seo/landing-ui";
import { businessFacts } from "@/content/business";
import { onlineContentRelease, onlineDescription, onlineHubFaqs, onlinePath, onlineServices, onlineTitle } from "@/content/online-assistance";
import { seoMetadata } from "@/seo/metadata";

export const metadata = seoMetadata({ title: "امداد خودرو آنلاین | اپلیکیشن امداد خودرو چاره", description: onlineDescription, path: onlinePath });

export default function Page() {
  return <SubpageShell showGeneralFaq={false}>
    <LandingSchemas path={onlinePath} title={onlineTitle} description={onlineDescription} area={businessFacts.coverageSummary} areaType="Place" />
    {/* Preserve incoming links to retired request sections without rendering a form. */}
    <span id="request" aria-hidden="true" /><span id="request-checklist" aria-hidden="true" />
    <AppShowcaseBanner />
    <LandingHeader title={onlineTitle} intro="امداد خودرو آنلاین با اپلیکیشن خودرو چاره، راه دسترسی به خدمات یدک‌کش، مکانیک سیار و برق و باتری در تهران، کرج و شمال است. نسخه اندروید را از بازار یا مایکت دریافت کنید یا از نسخه وب روی آیفون و اندروید استفاده کنید؛ نصب برنامه برای استفاده از نسخه وب اجباری نیست." crumbs={[{ label: "امداد خودرو آنلاین" }]} primaryAction={{ label: "نصب اپلیکیشن امداد خودرو", href: "/app" }} />
    <AnswerBox updatedAt={onlineContentRelease}><p>اپلیکیشن امداد خودرو، مسیر ارتباط کاربر با خدمات موردنیاز خودرو در محل یا جاده است. خودرو چاره امکان شروع هماهنگی امداد، حمل خودرو و خدمات سیار را در اپ مشتریان فراهم می‌کند. انتخاب خدمت در اپ به معنی تأیید قطعی اعزام نیست؛ پوشش، هزینه و زمان تقریبی با توجه به موقعیت و ظرفیت بررسی می‌شوند.</p></AnswerBox>
    <Section id="online-app" title="اپلیکیشن امداد خودرو؛ اندروید و آیفون">
      <p>برای استفاده از امداد خودرو آنلاین، می‌توانید نسخه اندروید خودرو چاره را از فروشگاه‌های معرفی‌شده در بالای صفحه دریافت کنید. کاربران آیفون از وب‌اپلیکیشن در مرورگر استفاده می‌کنند و در صورت تمایل میان‌بر آن را به صفحه اصلی اضافه می‌کنند؛ این نسخه فایل نصب iOS نیست. مسیر نصب و ورود مشتریان با اپلیکیشن عضویت سفیران تفاوت دارد.</p>
      <p>اپلیکیشن، دسترسی به خدمات مختلف را در یک مسیر جمع می‌کند؛ اما نوع خرابی، شرایط خودرو و دسترسی محل تعیین می‌کنند تعمیر در محل مناسب است یا حمل به تعمیرگاه. برای دریافت خدمت، ادامه کار در اپ مشتریان انجام می‌شود و این صفحه فرم ثبت درخواست ندارد.</p>
      <Link href="/app" className="inline-flex min-h-11 items-center font-bold text-brand-orange underline">دانلود اپلیکیشن امداد خودرو و راهنمای نسخه وب</Link>
    </Section>
    <Section id="choose-service" title="خدمات امداد خودرو آنلاین در اپلیکیشن خودرو چاره">
      <p>برای انتخاب خدمت، رفتار خودرو مهم‌تر از حدس نام قطعه است: «استارت کند است»، «موتور می‌چرخد اما روشن نمی‌شود» و «خودرو روشن است اما حرکت نمی‌کند» وضعیت‌های متفاوت‌اند. اگر مطمئن نیستید، نشانه را توضیح دهید. انتخاب اولیه فقط مسیر بررسی را روشن می‌کند؛ تشخیص و امکان تعمیر به ارزیابی متخصص نیاز دارند.</p>
      <LinkGrid label="انتخاب خدمات امداد آنلاین" links={onlineServices.map(service => ({ title: service.title, href: service.href, description: service.description }))} />
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
      <LinkGrid links={[{ title: "نصب اپلیکیشن امداد خودرو", href: "/app" }, { title: "راهنمای استفاده و پیگیری خدمات آنلاین", href: "/blog/online-roadside-assistance-request-guide" }, { title: "آمادگی پیش از دریافت امداد", href: "/blog/online-roadside-assistance-tehran-karaj-complete-guide" }, { title: "دریافت کمک بدون اینترنت", href: "/blog/roadside-help-without-internet" }]} />
    </Section>
    <Questions title="پرسش‌های امداد خودرو آنلاین و اپلیکیشن" items={onlineHubFaqs.filter(item => !item.question.includes("ابزار آماده‌سازی"))} />
    <SafetyNote /><FinalContact title="برای شروع درخواست آماده‌اید؟" />
  </SubpageShell>;
}
