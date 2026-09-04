import type { Metadata } from "next";
import { AiChat } from "@/components/home/ai-chat";
import { ResponsiveSiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteFaq } from "@/components/site/site-faq";
import { StructuredData } from "@/components/seo/structured-data";
import { faqSchema, serviceSchema } from "@/seo/schemas";
import { faqItems } from "@/content/faq";
import { defaultOgImage, siteName, siteUrl } from "@/seo/metadata";
import { itemListSchema, webPageSchema } from "@/seo/schemas";
import { services } from "@/content/services";
import {
  AppSection,
  BusinessFactsSection,
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

const homeTitle = "امداد خودرو آنلاین تهران و کرج | یدک کش و خودروبر | خودرو چاره";
const homeDescription =
  "امداد خودرو آنلاین شبانه‌روزی در تهران و کرج؛ ثبت درخواست اینترنتی یدک‌کش، خودروبر، مکانیک سیار، باتری و امداد در محل با امکان پیگیری خدمت.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: siteUrl,
    siteName,
    locale: "fa_IR",
    type: "website",
    images: [{ url: defaultOgImage.url, width: defaultOgImage.width, height: defaultOgImage.height, alt: "امداد خودرو آنلاین خودرو چاره" }],
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: homeDescription, images: [defaultOgImage.url] },
};

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <StructuredData data={webPageSchema({ name: "امداد خودرو آنلاین تهران و کرج", description: "ثبت آنلاین امداد خودرو شبانه‌روزی، یدک‌کش، خودروبر، مکانیک سیار و باتری در تهران و کرج.", path: "/" })} />
      <StructuredData data={serviceSchema({ name: "امداد خودرو آنلاین شبانه‌روزی", description: "ثبت آنلاین امداد خودرو، یدک‌کش، خودروبر، مکانیک سیار و امداد در محل در تهران و کرج", path: "/", area: "تهران و کرج", image: "/images/hero-roadside.webp" })} />
      <StructuredData data={itemListSchema({ name: "خدمات امداد خودرو خودرو چاره", path: "/", items: services.map((service) => ({ name: service.title, path: `/services/${service.slug}` })) })} />
      <StructuredData data={faqSchema(faqItems)} />
      <ResponsiveSiteHeader />
      <HeroSection />
      <ServiceStrip />
      <FeatureBanners />
      <SeoServiceHub />
      <BusinessFactsSection />
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
