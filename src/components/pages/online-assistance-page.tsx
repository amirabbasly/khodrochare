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
    <LandingHeader title={onlineTitle} intro="امداد خودرو آنلاین، مسیر شروع درخواست و هماهنگی کمک برای خودروی متوقف یا خراب است؛ از عیب‌یابی در محل و خدمات باتری تا تعویض چرخ و حمل با یدک‌کش یا کفی. در خودرو چاره درخواست را از اپ مشتریان، بدون نصب اجباری، شروع کنید. خدمت، هزینه و امکان اعزام در تهران، کرج و شمال برای موقعیت همان خودرو بررسی می‌شوند." crumbs={[{ label: "امداد خودرو آنلاین" }]} primaryAction={{ label: "شروع درخواست امداد آنلاین", href: customerAppUrl }} />
    <AnswerBox updatedAt={onlineContentRelease}><p>برای درخواست امداد خودرو آنلاین، نوع نیاز، مدل و سال خودرو، نشانه خرابی و محل توقف را آماده کنید. از <a href={customerAppUrl} className="font-bold text-brand-orange underline">اپ مشتریان خودرو چاره</a> وارد مسیر درخواست شوید؛ ورود یا ساخت حساب، دریافت درخواست و تأیید اعزام مراحل جدا هستند. پیش از شروع کار، نوع خدمت و اجزای هزینه را هماهنگ کنید. اگر اینترنت ندارید یا وضعیت فوری است، با <a href={`tel:${businessFacts.emergencyPhone}`} className="font-bold underline" dir="ltr">{businessFacts.emergencyPhone}</a> تماس بگیرید.</p></AnswerBox>
    <nav aria-label="بخش‌های امداد آنلاین" className="site-container mt-6 flex flex-wrap gap-3 text-sm font-bold">
      {[["request", "شروع درخواست"], ["choose-service", "انتخاب خدمت"], ["request-checklist", "آماده‌سازی شرح خرابی"], ["request-cost", "هزینه"], ["online-coverage", "پوشش مناطق"], ["online-help", "ورود و پیگیری"]].map(([id, label]) => <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center rounded-xl border border-slate-300 px-4 text-ink hover:underline">{label}</a>)}
    </nav>
    <Section id="request" title="شروع درخواست آنلاین؛ سه مرحله روشن">
      <ol className="grid list-inside list-decimal gap-4 md:grid-cols-3">
        <li className="rounded-xl border border-slate-200 p-4"><strong>ورود به حساب مشتری</strong><p>اپ مشتریان را در مرورگر باز کنید و وارد شوید یا حساب بسازید. نصب میان‌بر اختیاری است؛ ورود به حساب به‌تنهایی درخواست امداد ثبت نمی‌کند.</p></li>
        <li className="rounded-xl border border-slate-200 p-4"><strong>شرح نیاز و موقعیت</strong><p>مدل و سال، رفتار خودرو و نشانی قابل دسترسی را اعلام کنید. برای حمل، گیربکس، وضعیت چرخ‌ها و مقصد؛ در بزرگراه، جهت حرکت و خروجی نزدیک مهم‌اند.</p></li>
        <li className="rounded-xl border border-slate-200 p-4"><strong>هماهنگی خدمت</strong><p>پیام نتیجه را بررسی کنید و درباره خدمت، مبلغ و زمان تقریبی هماهنگ شوید. دریافت اطلاعات به معنی اعزام قطعی نیست؛ در ابهام، همان درخواست را پیگیری کنید.</p></li>
      </ol>
      <a href={customerAppUrl} data-app-entry="customer" className="inline-flex min-h-12 items-center rounded-xl bg-brand-orange px-5 font-black text-white">شروع درخواست در اپ مشتریان</a>
    </Section>
    <Section id="choose-service" title="کدام خدمت را آنلاین درخواست کنم؟">
      <p>برای انتخاب خدمت، رفتار خودرو مهم‌تر از حدس نام قطعه است: «استارت کند است»، «موتور می‌چرخد اما روشن نمی‌شود» و «خودرو روشن است اما حرکت نمی‌کند» وضعیت‌های متفاوت‌اند. اگر مطمئن نیستید، نشانه را توضیح دهید. انتخاب اولیه فقط مسیر بررسی را روشن می‌کند؛ تشخیص و امکان تعمیر به ارزیابی متخصص نیاز دارند.</p>
      <LinkGrid label="انتخاب خدمات امداد آنلاین" links={onlineServices.map(service => ({ title: service.title, href: service.href, description: service.description }))} />
    </Section>
    <Section id="request-checklist" title="شرح درخواست را آماده کنید؛ بدون ارسال اطلاعات"><OnlineRequestBrief /></Section>
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
    <Section id="online-help" title="راهنمای ورود، آماده‌سازی و پیگیری درخواست">
      <p>این صفحه مسیر انتخاب خدمت و شروع درخواست امداد خودرو آنلاین است. برای آماده‌کردن اطلاعات، راهنمای پیش از درخواست؛ برای پیام نامشخص، تغییر محل یا تأخیر، راهنمای پیگیری را بخوانید. اگر موقعیت یا مقصد عوض شد، تغییر را مستقیم اطلاع دهید؛ به‌روزرسانی خودکار نشانی را فرض نکنید و پیش از ارسال دوباره وضعیت درخواست قبلی را بپرسید.</p>
      <LinkGrid links={[{ title: "ورود و نصب نسخه وب مشتریان", href: "/app", description: "راهنمای مرورگر، Android و iPhone؛ مسیر ناوگان سفیران جداست." }, { title: "چک‌لیست پیش از درخواست؛ تهران و کرج", href: "/blog/online-roadside-assistance-tehran-karaj-complete-guide", description: "اطلاعات خودرو، نشانی و محدودیت بارگیری." }, { title: "پس از ارسال؛ پیگیری و تغییر موقعیت", href: "/blog/online-roadside-assistance-request-guide", description: "نتیجه ارسال، تماس پیگیری و هماهنگی نشانی تازه." }, { title: "دریافت کمک بدون اینترنت", href: "/blog/roadside-help-without-internet" }]} />
    </Section>
    <Questions title="سؤال‌های درخواست امداد آنلاین" items={onlineHubFaqs} />
    <SafetyNote /><FinalContact title="برای شروع درخواست آماده‌اید؟" />
  </SubpageShell>;
}
