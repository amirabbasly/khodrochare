import type { Metadata } from "next";
import { AiChat } from "@/components/home/ai-chat";
import { AosProvider } from "@/components/home/aos-provider";
import { ResponsiveSiteHeader } from "@/components/home/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteFaq } from "@/components/site/site-faq";
import { StructuredData } from "@/components/seo/structured-data";
import { faqSchema } from "@/seo/schemas";
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
  ServiceStrip,
  TrustSection,
} from "@/components/home/home-sections";

export const metadata: Metadata = {
  title: { absolute: "خودرو چاره | امداد خودرو، کارواش و مکانیک سیار" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "خودرو چاره",
  url: "https://khodrochare.ir",
  telephone: "09123022064",
  areaServed: "IR",
  description:
    "خودرو چاره؛ خدمات خودرو در محل شامل امداد، کارواش سیار، باتری، لوازم یدکی و پشتیبانی هوشمند.",
};

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StructuredData data={faqSchema(faqItems)} />
      <AosProvider />
      <ResponsiveSiteHeader />
      <HeroSection />
      <ServiceStrip />
      <FeatureBanners />
      <MiniServices />
      <ChatSection />
      <AppSection />
      <CoverageSection />
      <TrustSection />
      <ProductsSection />
      <MagazineSection />
      <ContactCta />
      <SiteFaq />
      <SiteFooter />
      <AiChat />
    </main>
  );
}
