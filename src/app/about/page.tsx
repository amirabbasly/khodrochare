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
        <div className="about-split"><div><p className="about-overline">همراه شما؛ از انتخاب خدمت تا پیگیری</p><h1 id="about-title">خودرو چاره؛ تیمی همراه و پاسخ‌گو</h1><p>خودرو چاره پلی میان رانندگان و خدمات خودرو است؛ مسیری برای اینکه در زمان خرابی یا نیاز به خدمات سیار، انتخاب‌ها روشن‌تر و هماهنگی ساده‌تر باشد. ما با همراهی تیم عملیات، پشتیبانی و شبکه همکاران، درخواست را بر اساس موقعیت، نوع خودرو و نیاز واقعی بررسی می‌کنیم.</p><p>از امداد در محل و خدمات باتری تا حمل خودرو و کارواش سیار، هدف ما کمک به تصمیم‌گیری آگاهانه و ارائه راه ارتباطی قابل پیگیری است. پوشش فعال مجموعه شامل تهران، کرج، گیلان، مازندران و گلستان است؛ امکان اعزام و زمان رسیدن برای هر درخواست جداگانه بررسی می‌شود.</p><div className="about-actions"><Link href="/app">آشنایی با سوپر اپلیکیشن</Link><Link href="/contact">ارتباط با خودرو چاره ←</Link></div></div><div className="about-photo about-intro-photo"><Image src="/images/facts/active-network.webp" alt="تصویر معرفی شبکه خدمات خودرو چاره؛ نمای توضیحی، نه عکس اعضای تیم" fill priority sizes="(min-width:768px) 480px,90vw" className="object-cover" /></div></div>
        <HeroStats />
      </section>
      <AboutStory />
      <TeamShowcase />
      <div className="about-team-link"><Link href="/team">آشنایی بیشتر با تیم خودرو چاره ←</Link></div>
      <section className="about-block" aria-labelledby="about-license-title"><header className="about-section-heading"><p>اعتماد، پشتوانه همراهی</p><h2 id="about-license-title">هویت مجموعه و مجوزهای خودرو چاره</h2></header><div className="about-license-grid"><article><span className="about-card-number">۰۱</span><h3>هویت حقوقی روشن</h3><p>نام شرکت: {businessFacts.legalName}<br />برند: {businessFacts.registeredBrand}<br />مدیرعامل: {businessFacts.managingDirector}</p><Link href="/licenses">اطلاعات هویتی و مجوزها ←</Link></article><article><span className="about-card-number">۰۲</span><h3>جواز فعالیت کشوری</h3><p>طبق اعلام و تأیید مدیریت مجموعه، فعالیت امداد خودرو با جواز یکتا و دامنه کشوری انجام می‌شود. محدوده فعال و ظرفیت اعزام هر درخواست جداگانه بررسی می‌شود.</p><Link href="/coverage">بررسی محدوده‌های فعال ←</Link></article><article><span className="about-card-number">۰۳</span><h3>اعتماد، نظارت و پشتیبانی</h3><p>نوع کار و عوامل هزینه را پیش از شروع هماهنگ کنید. برای پرسش یا پیگیری، مسیر تماس رسمی مجموعه در دسترس است. خودرو چاره نمایندگی رسمی خودروسازان نیست.</p><Link href="/contact">تماس و مسیر رسیدگی ←</Link></article></div></section>
      <section className="about-block about-partners" aria-labelledby="about-partners-title"><header className="about-section-heading"><p>همراهان مسیر خدمات خودرو</p><h2 id="about-partners-title">همکاری با شبکه خودرو چاره</h2><span>امدادگران، همکاران حمل و متخصصان خدمات سیار</span></header><p>کیفیت هماهنگی به همراهی متخصصان وابسته است. اگر در حوزه امداد، تعمیرات سیار یا حمل خودرو فعالیت می‌کنید، می‌توانید شرایط همکاری و مسیر ثبت‌نام سفیران را بررسی کنید. تأیید مدارک و توافق درباره محدوده و شرایط کار، پیش‌نیاز شروع همکاری است.</p><div className="about-actions"><Link href="/safir">ثبت نام سفیران خودرو چاره</Link><Link href="/partners">شرایط همکاری ←</Link></div><nav className="about-service-links" aria-label="خدمات و راهنماهای خودرو چاره"><Link href="/services">همه خدمات</Link><Link href="/تهران">امداد خودرو تهران</Link><Link href="/کرج">امداد خودرو کرج</Link><Link href="/شمال">امداد خودرو شمال</Link><Link href="/editorial-policy">روش تدوین اطلاعات</Link><Link href="/press">خودرو چاره برای رسانه‌ها</Link></nav></section>
    </div>
  </SubpageShell>;
}
