import Link from "next/link";
import { fleetAppUrl } from "@/content/app-links";
import { fleetBenefits } from "@/content/fleet";
import { businessFacts } from "@/content/business";
import { SubpageShell } from "@/components/site/subpage-shell";
import { LandingSchemas, LinkGrid, Questions, Section } from "@/components/seo/landing-ui";
import { SeoBreadcrumbs } from "@/components/seo/seo-breadcrumbs";
import { StructuredData } from "@/components/seo/structured-data";
import { seoMetadata, siteUrl } from "@/seo/metadata";
const title = "اپلیکیشن سفیران خودرو چاره | نصب، ورود و مزایای همکاری";
const description = "ورود و نصب اپلیکیشن سفیران خودرو چاره؛ فرصت‌های حمل و امداد، لوازم یدکی با تضمین کف قیمت، کارت امدادگری، آرم و علائم و پیشنهادهای بیمه ویژه ناوگان.";
export const metadata = seoMetadata({ title, description, path: "/safir" });

function FleetAction() {
  return <a href={fleetAppUrl} data-app-entry="fleet" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-orange px-6 py-3 text-sm font-black text-white shadow-orange transition hover:brightness-110">ورود، ثبت‌نام و نصب اپلیکیشن سفیران</a>;
}

export default function Page() {
  return <SubpageShell>
    <LandingSchemas path="/safir" title={title} description={description} />
    <StructuredData data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "اپلیکیشن سفیران خودرو چاره", url: fleetAppUrl, operatingSystem: "Web", applicationCategory: "BusinessApplication", description: "سامانه اختصاصی ورود و ثبت‌نام ناوگان سفیران خودرو چاره.", publisher: { "@id": `${siteUrl}/#organization` } }} />
    <section className="relative overflow-hidden bg-ink text-white" dir="rtl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(249,115,22,.22),transparent_65%)]" />
      <div className="site-container relative py-12 lg:py-20">
        <SeoBreadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: "اپلیکیشن سفیران" }]} />
        <p className="mt-8 text-sm font-bold text-orange-300">ویژه امدادگران، یدک‌کش‌داران و همکاران حمل خودرو</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-black leading-[1.7] md:text-5xl">اپلیکیشن سفیران خودرو چاره؛ فرصت‌های بیشتر برای همکاری</h1>
        <p className="mt-5 max-w-3xl text-base leading-9 text-slate-200">به ناوگان خودرو چاره بپیوندید؛ از بارها و مأموریت‌های شبکه تا لوازم یدکی، کارت امدادگری و پیشنهادهای بیمه، مزایای همکاری را در یک مسیر اختصاصی دنبال کنید.</p>
        <div className="mt-7 flex flex-wrap gap-3"><FleetAction /><a href="#benefits" className="inline-flex min-h-12 items-center rounded-xl border border-white/30 px-6 text-sm font-bold">مزایای عضویت سفیران</a></div>
        <p className="mt-4 text-xs leading-7 text-slate-300">نسخه وب روی دامنه رسمی safir.khodrochare.ir باز می‌شود؛ ثبت‌نام و بررسی شرایط همکاری در همان سامانه انجام می‌شود.</p>
      </div>
    </section>
    <Section id="benefits" title="با نصب اپلیکیشن سفیران چه مزایایی دارید؟">
      <p>مزایای زیر بر اساس طرح اعلام‌شده خودرو چاره معرفی می‌شوند. بهره‌مندی از هر مورد به تأیید همکاری، شرایط همان طرح و مدارک موردنیاز بستگی دارد؛ جزئیات و هزینه احتمالی را پیش از اقدام از پشتیبانی دریافت کنید.</p>
      <div className="grid gap-4 md:grid-cols-2">{fleetBenefits.map((benefit, index) => <article key={benefit.title} data-fleet-benefit className="rounded-2xl border border-orange-100 bg-white/70 p-6 shadow-sm backdrop-blur-md">
        <span aria-hidden="true" className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 font-black text-brand-orange">{(index + 1).toLocaleString("fa-IR")}</span>
        <h3 className="mt-4 text-lg font-black text-ink">{benefit.title}</h3><p className="mt-3">{benefit.description}</p>
      </article>)}</div>
    </Section>
    <Section id="install" title="راهنمای نصب و ورود سفیران">
      <ol className="list-inside list-decimal space-y-3"><li>دکمه ورود و نصب را بزنید و دامنه <bdi>safir.khodrochare.ir</bdi> را بررسی کنید.</li><li>اگر حساب دارید وارد شوید؛ برای شروع همکاری، مسیر ثبت‌نام داخل سامانه را انتخاب کنید.</li><li>در Android از منوی مرورگر، در صورت نمایش، «Install app» یا «افزودن به صفحه اصلی» را بزنید.</li><li>در iPhone سامانه را در Safari باز کنید و از Share گزینه «Add to Home Screen» را انتخاب کنید.</li><li>اگر گزینه نصب موجود نبود، از نسخه مرورگر استفاده کنید. فایل APK یا لینک فروشگاهی تأییدنشده در این صفحه ارائه نمی‌شود.</li></ol>
      <div className="mt-5"><FleetAction /></div>
    </Section>
    <Section title="از ثبت‌نام تا شروع همکاری"><p>شهر و محدوده فعالیت، نوع خدمات و تجهیزات خود را برای بررسی همکاری آماده کنید. پس از ثبت‌نام، شرایط عضویت و مدارک موردنیاز را در سامانه یا با پشتیبانی پیگیری کنید. نصب اپ یا ایجاد حساب به معنی تأیید ناوگان، صدور فوری کارت یا فعال‌شدن خودکار تمام مزایا نیست.</p><LinkGrid links={[{title:"شرایط و مراحل همکاری ناوگان",href:"/partners"},{title:"هویت ثبتی و جواز فعالیت خودرو چاره",href:"/licenses"},{title:"تماس با مجموعه",href:"/contact"}]} /></Section>
    <Questions items={[
      { question: "اپلیکیشن سفیران با اپلیکیشن مشتریان چه تفاوتی دارد؟", answer: "سامانه safir.khodrochare.ir مخصوص ناوگان و همکاران امداد و حمل است. مشتریان برای درخواست خدمت از app.khodrochare.ir استفاده می‌کنند." },
      { question: "آیا نصب اپلیکیشن تعداد مشخصی بار را تضمین می‌کند؟", answer: "خیر. فرصت‌های حمل و امداد به منطقه، درخواست مشتری، تجهیزات، ظرفیت و تأیید همکاری بستگی دارند؛ تعداد مأموریت یا درآمد ثابت وعده داده نمی‌شود." },
      { question: "شرایط تضمین کف قیمت لوازم یدکی و بیمه چیست؟", answer: "پیش از خرید، قطعات مشمول و شرایط ضمانت قیمت را از پشتیبانی بخواهید. درباره بیمه نیز نوع بیمه‌نامه، بیمه‌گر، مبلغ و پوشش همان پیشنهاد باید مشخص شوند؛ درصد تخفیف یکسان برای همه موارد اعلام نشده است." },
      { question: "کارت امدادگری و آرم و علائم چگونه ارائه می‌شوند؟", answer: "پس از بررسی مدارک و شرایط طرح مربوط، درباره صدور کارت و تهیه علائم راهنمایی می‌شوید. دامنه اعتبار و ضوابط قانونی باید پیش از استفاده مشخص شوند؛ عضویت به‌تنهایی مجوز استفاده از علائم ویژه نیست." },
    ]} />
    <section className="site-container mt-8 rounded-2xl bg-ink p-7 text-white" dir="rtl"><h2 className="text-2xl font-black">به جمع سفیران خودرو چاره بپیوندید</h2><p className="mt-3 text-sm leading-8 text-slate-300">برای ورود و ثبت‌نام، سامانه سفیران را باز کنید. برای پرسش درباره مزایا و شرایط همکاری با مجموعه تماس بگیرید.</p><div className="mt-5 flex flex-wrap gap-3"><FleetAction /><a href={`tel:${businessFacts.emergencyPhone}`} className="inline-flex min-h-12 items-center rounded-xl border border-white/30 px-5 text-sm font-bold">پرسش درباره همکاری: <bdi className="mr-2">{businessFacts.emergencyPhone}</bdi></a></div><Link href="/app" className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-orange-300">مشتری هستید؟ راهنمای اپلیکیشن مشتریان ←</Link></section>
  </SubpageShell>;
}
