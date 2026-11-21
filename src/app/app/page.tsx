import Image from "next/image";
import Link from "next/link";
import { AppShowcaseBanner } from "@/components/home/app-trust-banners";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { customerAppUrl } from "@/content/app-links";
import { seoMetadata, siteUrl } from "@/seo/metadata";
export const metadata = seoMetadata({ title: "سوپر اپلیکیشن خودرو چاره | دانلود و ورود PWA", description: "سوپر اپلیکیشن خودرو چاره؛ دستیار خدمات خودرو، دریافت نسخه اندروید، مایکت و ورود به نسخه وب PWA.", path: "/app", image: "/images/app-screens/customer-home-20261121.webp" });
export default function Page() {
  return <SubpageShell showGeneralFaq={false}>
    <StructuredData data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "سوپر اپلیکیشن خودرو چاره", url: customerAppUrl, operatingSystem: "Web", applicationCategory: "UtilitiesApplication", publisher: { "@id": `${siteUrl}/#organization` } }} />
    <section className="super-app-hero" dir="rtl" aria-labelledby="super-app-title">
      <div className="super-app-hero-copy"><p className="super-app-kicker">خودرو چاره؛</p><h1 id="super-app-title">دستیار هوشمند خودروی شما</h1><p className="super-app-lead">خدمات خودرو، یکجا و آنلاین؛ در کنارتان هستیم!</p><div className="super-app-hero-actions"><a href={customerAppUrl} data-pwa-entry aria-label="ورود به اپلیکیشن PWA" className="super-app-primary">ورود به نسخه PWA</a><Link href="#app" className="super-app-secondary">نصب اپلیکیشن</Link></div><div className="super-app-highlights"><span>امداد و حمل خودرو</span><span>خدمات سیار</span><span>همراه شما در مسیر</span></div></div>
      <div className="super-app-hero-art"><span className="super-app-orbit orbit-one" /><span className="super-app-orbit orbit-two" /><span className="super-app-service service-one" aria-hidden="true">⚙</span><span className="super-app-service service-two" aria-hidden="true"><Image src="/images/service-tiles/battery.webp" alt="" width={62} height={62} /></span><span className="super-app-service service-three" aria-hidden="true"><Image src="/images/service-tiles/carwash.webp" alt="" width={62} height={62} /></span><div className="super-app-hero-phone"><Image src="/images/app-screens/customer-home-20261121.webp" alt="صفحه اصلی سوپر اپلیکیشن خودرو چاره" width={486} height={1080} priority sizes="(min-width:768px) 255px,200px" /></div></div>
    </section>
    <AppShowcaseBanner />
  </SubpageShell>;
}
