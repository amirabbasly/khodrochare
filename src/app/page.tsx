import type { Metadata } from "next";
import { AiChat } from "@/components/home/ai-chat";
import { AosProvider } from "@/components/home/aos-provider";
import { ResponsiveSiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteFaq } from "@/components/site/site-faq";
import { StructuredData } from "@/components/seo/structured-data";
import { faqSchema, serviceSchema } from "@/seo/schemas";
import { faqItems } from "@/content/faq";
import {
  AppSection,
  ChatSection,
  ContactCta,
  CoverageSection,
  FeatureBanners,
  HeroSection,
  MiniServices,
  MagazineSection,
  ProductsSection,
  SeoServiceHub,
  ServiceStrip,
  TrustSection,
} from "@/components/home/home-sections";

export const metadata: Metadata = {
  title: { absolute: "امداد خودرو آنلاین تهران و کرج | یدک کش و خودروبر | خودرو چاره" },
  description: "امداد خودرو آنلاین شبانه‌روزی در تهران و کرج؛ ثبت درخواست اینترنتی یدک‌کش، خودروبر، مکانیک سیار، باتری و امداد در محل با امکان پیگیری خدمت.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "امداد خودرو آنلاین تهران و کرج | یدک کش و خودروبر | خودرو چاره",
    description: "ثبت آنلاین امداد خودرو شبانه‌روزی، یدک‌کش، خودروبر و مکانیک سیار در تهران و کرج.",
    url: "/",
    type: "website",
    images: [{ url: "/images/hero-roadside.webp", width: 1536, height: 864, alt: "امداد خودرو آنلاین خودرو چاره" }],
  },
};

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <StructuredData data={serviceSchema({ name: "امداد خودرو آنلاین شبانه‌روزی", description: "ثبت آنلاین امداد خودرو، یدک‌کش، خودروبر، مکانیک سیار و امداد در محل در تهران و کرج", path: "/", area: "تهران و کرج" })} />
      <StructuredData data={faqSchema(faqItems)} />
      <AosProvider />
      <ResponsiveSiteHeader />
      <HeroSection />
      <ServiceStrip />
      <FeatureBanners />
      <SeoServiceHub />
      <MiniServices />
      <ChatSection />
      <AppSection />
      <CoverageSection />
      <TrustSection />
      <MagazineSection />
      <ProductsSection />
      <ContactCta />
      <SiteFaq />
      <SiteFooter />
      <AiChat />
    </main>
  );
}
