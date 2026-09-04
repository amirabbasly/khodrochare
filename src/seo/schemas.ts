import { siteUrl } from "./metadata";
import { businessFacts } from "@/content/business";

const openAllWeek = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  opens: "00:00",
  closes: "23:59",
};

const servedCities = [
  { "@type": "City", name: "تهران", "@id": `${siteUrl}/#city-tehran` },
  { "@type": "City", name: "کرج", "@id": `${siteUrl}/#city-karaj` },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoRepair", "EmergencyService"],
  "@id": `${siteUrl}/#organization`,
  name: "خودرو چاره",
  alternateName: ["خودروچاره", "Khodrochare"],
  description:
    "سامانه امداد خودرو آنلاین و خدمات خودرو در محل؛ هماهنگی امدادگر، یدک‌کش، خودروبر، مکانیک سیار، باتری، پنچرگیری و سوخت‌رسانی در تهران و کرج به‌صورت شبانه‌روزی.",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    "@id": `${siteUrl}/#logo`,
    url: `${siteUrl}/images/khodrochare-3d-logo.webp`,
    contentUrl: `${siteUrl}/images/khodrochare-3d-logo.webp`,
    caption: "خودرو چاره",
  },
  image: [`${siteUrl}/images/og-cover.jpg`, `${siteUrl}/images/hero-roadside.webp`, `${siteUrl}/images/support-technician-night.webp`],
  telephone: "+989123022064",
  email: "info@khodrochare.ir",
  sameAs: [
    "https://www.instagram.com/khodrochare",
    "https://web.bale.ai/chat?uid=6102593448",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "خیابان آزادی، جنب تعمیرات یدکی چاره، پلاک ۱۲۱، واحد ۱۴",
    addressLocality: "تهران",
    addressRegion: "تهران",
    addressCountry: "IR",
  },
  areaServed: servedCities,
  serviceArea: servedCities,
  availableLanguage: [{ "@type": "Language", name: "Persian", alternateName: "fa" }],
  numberOfEmployees: { "@type": "QuantitativeValue", value: 100 },
  knowsAbout: [...businessFacts.services, "امداد خودرو آنلاین"],
  slogan: "امداد خودرو آنلاین و شبانه‌روزی در تهران و کرج",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "خدمات امداد خودرو و خدمات خودرو در محل",
    itemListElement: businessFacts.services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service, provider: { "@id": `${siteUrl}/#organization` }, areaServed: servedCities },
    })),
  },
  openingHoursSpecification: [openAllWeek],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+989123022064", contactType: "emergency", areaServed: ["IR"], availableLanguage: ["fa"], hoursAvailable: openAllWeek },
    { "@type": "ContactPoint", telephone: "+989397979861", contactType: "customer support", areaServed: ["IR"], availableLanguage: ["fa"], hoursAvailable: openAllWeek },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: "خودرو چاره",
  alternateName: ["خودروچاره", "khodrochare.ir"],
  description: "امداد خودرو آنلاین، یدک‌کش، خودروبر، مکانیک سیار و خدمات خودرو در محل در تهران و کرج.",
  inLanguage: "fa-IR",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export function breadcrumbSchema(items: { name: string; path?: string }[], pagePath?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...(pagePath ? { "@id": `${siteUrl}${encodeURI(pagePath)}#breadcrumb` } : {}),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: `${siteUrl}${encodeURI(item.path)}` } : {}),
    })),
  };
}

export function serviceSchema({ name, description, path, area, image }: { name: string; description: string; path: string; area: string; image?: string }) {
  const areaServed = area === "تهران و کرج" ? servedCities : [{ "@type": "City", name: area }];
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${encodeURI(path)}#service`,
    name,
    description,
    url: `${siteUrl}${encodeURI(path)}`,
    serviceType: name,
    category: "امداد خودرو",
    areaServed,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}/#request`,
      servicePhone: { "@type": "ContactPoint", telephone: "+989123022064", contactType: "emergency", availableLanguage: ["fa"] },
      availableLanguage: ["fa"],
    },
    provider: { "@id": `${siteUrl}/#organization` },
    providerMobility: "dynamic",
    ...(image ? { image: `${siteUrl}${encodeURI(image)}` } : {}),
  };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };
}

export function itemListSchema({ name, path, items }: { name: string; path: string; items: { name: string; path: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteUrl}${encodeURI(path)}#itemlist`,
    name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${siteUrl}${encodeURI(item.path)}`,
    })),
  };
}

export function articleSchema({ title, description, path, image, publishedAt, modifiedAt, section, keywords, timeRequired, wordCount }: { title: string; description: string; path: string; image: string; publishedAt: string; modifiedAt?: string; section?: string; keywords?: string[]; timeRequired?: string; wordCount?: number }) {
  const url = `${siteUrl}${encodeURI(path)}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title.length > 110 ? `${title.slice(0, 107)}...` : title,
    name: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    image: { "@type": "ImageObject", url: `${siteUrl}${encodeURI(image)}` },
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    ...(section ? { articleSection: section } : {}),
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    ...(timeRequired ? { timeRequired } : {}),
    ...(wordCount ? { wordCount } : {}),
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "fa-IR",
  };
}

export function webPageSchema({ type = "WebPage", name, description, path, breadcrumb = false }: { type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage"; name: string; description: string; path: string; breadcrumb?: boolean }) {
  const url = `${siteUrl}${encodeURI(path)}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "fa-IR",
    about: { "@id": `${siteUrl}/#organization` },
    isPartOf: { "@id": `${siteUrl}/#website` },
    primaryImageOfPage: { "@id": `${siteUrl}/#logo` },
    ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}
