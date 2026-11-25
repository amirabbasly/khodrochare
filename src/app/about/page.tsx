import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroStats } from "@/components/home/hero-stats";
import { AboutStory } from "@/components/site/about-story";
import { TeamShowcase } from "@/components/site/team-showcase";
import { StructuredData } from "@/components/seo/structured-data";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { SubpageShell } from "@/components/site/subpage-shell";
import { businessFacts } from "@/content/business";
import { breadcrumbSchema, webPageSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";
const description = "درباره خودرو چاره؛ آشنایی با مسیر خدمات، مأموریت، چشم‌انداز، تیم و اطلاعات شرکت سیما رایگان ایرانیان؛ هماهنگی امداد خودرو در تهران، کرج و شمال.";
export const metadata: Metadata = seoMetadata({ title: "درباره ما | خودرو چاره، همراه رانندگان", description, path: "/about", keywords: ["درباره خودرو چاره", "امداد خودرو آنلاین", "امداد خودرو تهران", "امداد خودرو کرج"] });
export default function AboutPage() {
  return <SubpageShell showGeneralFaq={false}>
    <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "درباره خودرو چاره" }], "/about")} />
    <StructuredData data={webPageSchema({ type: "AboutPage", name: "درباره خودرو چاره", description, path: "/about", breadcrumb: true })} />
    <div className="about-page" dir="rtl">
      <section className="about-intro about-block" aria-labelledby="about-title">
        <SeoBreadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: "درباره خودرو چاره" }]} />
        <div className="about-split"><div><p className="about-overline">همراه شما؛ از انتخاب خدمت تا پیگیری</p><h1 id="about-title">خودرو چاره؛ تیمی همراه و پاسخ‌گو</h1><p>خودرو چاره پلی میان رانندگان و خدمات خودرو است؛ مسیری برای اینکه در زمان خرابی یا نیاز به خدمات سیار، انتخاب‌ها روشن‌تر و هماهنگی ساده‌تر باشد. ما با همراهی تیم عملیات، پشتیبانی و شبکه همکاران، درخواست را بر اساس موقعیت، نوع خودرو و نیاز واقعی بررسی می‌کنیم.</p><p>از بیمه و لوازم یدکی و امداد خودرو تا کارشناسی و تالار فروش ۲۴ ساعته خودرو؛ همه در اپلیکیشن خودرو چاره، یکجا در دسترس شماست. با نصب سوپر اپلیکیشن خودرو چاره، به‌جای جست‌وجوی مسیرهای پراکنده، نیازهای خودرویی‌تان را از یک نقطه دنبال کنید.</p><p className="about-availability-note">امکانات فعال و شرایط هر خدمت را در اپ بررسی کنید. دسترسی به تالار فروش شبانه‌روزی است؛ زمان نهایی معامله به کارشناسی، خریدار و توافق طرفین بستگی دارد. هماهنگی امداد در تهران، کرج و محدوده‌های فعال شمال بر اساس موقعیت و ظرفیت انجام می‌شود.</p><div className="about-actions"><Link href="/app">آشنایی با سوپر اپلیکیشن</Link><Link href="/contact">ارتباط با خودرو چاره ←</Link></div></div><div className="about-photo about-intro-photo"><Image src="/images/facts/active-network.webp" alt="تصویر معرفی شبکه خدمات خودرو چاره؛ نمای توضیحی، نه عکس اعضای تیم" fill priority sizes="(min-width:768px) 480px,90vw" className="object-cover" /></div></div>
        <HeroStats />
      </section>
      <AboutStory />
      <TeamShowcase />
      <div className="about-team-link"><Link href="/team">آشنایی بیشتر با تیم خودرو چاره ←</Link></div>
      <section className="about-block about-credentials" aria-labelledby="about-license-title">
        <header className="about-section-heading"><h2 id="about-license-title">هویت، مجوزها و پاسخ‌گویی خودرو چاره</h2><span>اعتماد، پشتوانه خدمات ما</span></header>
        <div className="about-credentials-layout">
          <div className="about-license-list">
            <Link href="/licenses"><span className="about-license-symbol" aria-hidden="true">✓</span><span><strong>هویت حقوقی مجموعه</strong><small>{businessFacts.legalName} · برند {businessFacts.registeredBrand}</small></span></Link>
            <Link href="/licenses"><span className="about-license-symbol" aria-hidden="true">◇</span><span><strong>جواز یکتا و فعالیت کشوری امداد خودرو</strong><small>بر اساس تأیید مدیریت مجموعه؛ اطلاعات بیشتر در صفحه مجوزها</small></span></Link>
            <Link href="/coverage"><span className="about-license-symbol" aria-hidden="true">⌖</span><span><strong>محدوده‌های فعال خدمات</strong><small>تهران، کرج، گیلان، مازندران و گلستان</small></span></Link>
            <Link href="/contact"><span className="about-license-symbol" aria-hidden="true">↗</span><span><strong>ارتباط رسمی و پیگیری خدمت</strong><small>پشتیبانی و مسیر رسیدگی به درخواست‌ها</small></span></Link>
          </div>
          <article className="about-trust-copy"><h3>اعتماد، نظارت و پشتیبانی</h3><p>اعتماد رانندگان با اطلاعات روشن و پاسخ‌گویی شکل می‌گیرد. خودرو چاره با نام حقوقی {businessFacts.legalName} و مدیریت {businessFacts.managingDirector}، مسیر هماهنگی خدمات خودرو را دنبال می‌کند. طبق اعلام و تأیید مدیریت، فعالیت امداد خودرو با جواز یکتا و دامنه کشوری انجام می‌شود.</p><p>از انتخاب خدمت تا هماهنگی اجرا، نوع کار، عوامل مؤثر بر قیمت و شرایط خودرو باید مشخص باشند. امکان ارائه خدمت و زمان رسیدن برای هر درخواست جداگانه بررسی می‌شود. برای پرسش یا پیگیری، راه‌های ارتباط رسمی مجموعه در دسترس است.</p><p>خودرو چاره نمایندگی رسمی خودروسازان نیست؛ اطلاعات هویتی و راه پیگیری را در صفحه مجوزها و تماس با ما ببینید.</p><Link href="/contact">ارتباط و پیگیری درخواست ←</Link></article>
        </div>
      </section>
      <section className="about-block about-partners" aria-labelledby="about-partners-title"><header className="about-section-heading"><p>همراهان مسیر خدمات خودرو</p><h2 id="about-partners-title">همکاران شبکه خدمات خودرو چاره</h2><span>امدادگران، همکاران حمل و متخصصان خدمات سیار</span></header><div className="about-partner-strip" aria-label="گروه‌های همکاری شبکه خودرو چاره">{["امداد و حمل خودرو", "بیمه خودرو", "لوازم یدکی", "کارشناسی خودرو", "خرید و فروش خودرو"].map(label => <div key={label}><span aria-hidden="true">◇</span><strong>{label}</strong></div>)}</div><p>کیفیت هماهنگی به همراهی متخصصان وابسته است. اگر در حوزه امداد، تعمیرات سیار یا حمل خودرو فعالیت می‌کنید، می‌توانید شرایط همکاری و مسیر ثبت‌نام سفیران را بررسی کنید. تأیید مدارک و توافق درباره محدوده و شرایط کار، پیش‌نیاز شروع همکاری است.</p><div className="about-actions"><Link href="/safir">ثبت نام سفیران خودرو چاره</Link><Link href="/partners">شرایط همکاری ←</Link></div><nav className="about-service-links" aria-label="خدمات و راهنماهای خودرو چاره"><Link href="/services">همه خدمات</Link><Link href="/تهران">امداد خودرو تهران</Link><Link href="/کرج">امداد خودرو کرج</Link><Link href="/شمال">امداد خودرو شمال</Link><Link href="/editorial-policy">روش تدوین اطلاعات</Link><Link href="/press">خودرو چاره برای رسانه‌ها</Link></nav></section>
    </div>
  </SubpageShell>;
}
