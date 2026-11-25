import Image from "next/image";
import Link from "next/link";
import { AppShowcaseBanner } from "@/components/home/app-trust-banners";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { fleetAppUrl } from "@/content/app-links";
import { seoMetadata, siteUrl } from "@/seo/metadata";
export const metadata = seoMetadata({ title: "اپلیکیشن سفیران خودرو چاره | دانلود و ورود PWA", description: "اپلیکیشن سفیران خودرو چاره؛ فرصت‌های همکاری، حمل و امداد، دریافت نسخه اندروید و ورود به نسخه وب PWA.", path: "/safir", image: "/images/app-screens/fleet-home-20261121.webp" });
export default function Page() {
  return <SubpageShell showGeneralFaq={false}>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "اپلیکیشن سفیران خودرو چاره", url: fleetAppUrl, operatingSystem: "Web", applicationCategory: "BusinessApplication", publisher: { "@id": `${siteUrl}/#organization` } }} />
    <section className="super-app-hero" dir="rtl" aria-labelledby="super-app-title">
      <div className="super-app-hero-copy"><p className="super-app-kicker">همراه هوشمند سفیران خودرو چاره</p><h1 id="super-app-title">اپلیکیشن سفیران خودرو چاره</h1><p className="super-app-lead">فرصت‌های همکاری و کسب درآمد از خدمات خودرو، در یک اپلیکیشن!</p><div className="super-app-hero-actions"><a href={fleetAppUrl} data-pwa-entry aria-label="ورود به اپلیکیشن PWA" className="super-app-primary">ورود به نسخه PWA</a><Link href="#app" className="super-app-secondary">نصب اپلیکیشن</Link></div><div className="super-app-highlights" aria-label="آمار اعلام‌شده مجموعه"><div><strong dir="ltr">4.8</strong><span>رضایت از پشتیبانی</span></div><div><strong dir="ltr">50000</strong><span>سرویس موفق</span></div><div><strong dir="ltr">+1000</strong><span>سفیر فعال</span></div></div></div>
      <div className="super-app-hero-art"><span className="super-app-orbit orbit-one" /><span className="super-app-orbit orbit-two" /><Image className="super-app-hand" src="/images/app-screens/fleet-hand-phone.webp" alt="گوشی در دست با نمایش صفحه اصلی اپلیکیشن سفیران خودرو چاره" width={580} height={952} priority sizes="(min-width:768px) 390px,300px" /></div>
    </section>
    <AppShowcaseBanner fleet />
  </SubpageShell>;
}
