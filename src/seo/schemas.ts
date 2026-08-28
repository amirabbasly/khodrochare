import { siteUrl } from "./metadata";
import { businessFacts } from "@/content/business";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoRepair"],
  "@id": `${siteUrl}/#organization`,
  name: "خودرو چاره",
  url: siteUrl,
  logo: `${siteUrl}/images/khodrochare-3d-logo.webp`,
  telephone: "+989123022064",
  email: "info@khodrochare.ir",
  address: {
    "@type": "PostalAddress",
    streetAddress: "خیابان آزادی، جنب تعمیرات یدکی چاره، پلاک ۱۲۱، واحد ۱۴",
    addressLocality: "تهران",
    addressRegion: "تهران",
    addressCountry: "IR",
  },
  areaServed: ["تهران", "کرج"],
  numberOfEmployees: { "@type": "QuantitativeValue", value: 100 },
  knowsAbout: [...businessFacts.services, "امداد خودرو آنلاین"],
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" }],
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+989123022064", contactType: "emergency", areaServed: ["تهران", "کرج"], availableLanguage: ["fa"], hoursAvailable: organizationHours() },
    { "@type": "ContactPoint", telephone: "+989397979861", contactType: "customer support", availableLanguage: ["fa"] },
  ],
};

function organizationHours() {
  return { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "00:00", closes: "23:59" };
}

export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, ...(item.path ? { item: `${siteUrl}${item.path}` } : {}) })) };
}

export function serviceSchema({ name, description, path, area }: { name: string; description: string; path: string; area: string }) {
  const areaServed = area === "تهران و کرج" ? [{ "@type": "City", name: "تهران" }, { "@type": "City", name: "کرج" }] : { "@type": "City", name: area };
  return { "@context": "https://schema.org", "@type": "Service", name, description, url: `${siteUrl}${path}`, areaServed, provider: { "@id": `${siteUrl}/#organization` } };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
}

export function articleSchema({ title, description, path, image, publishedAt, modifiedAt, section, keywords }: { title: string; description: string; path: string; image: string; publishedAt: string; modifiedAt?: string; section?: string; keywords?: string[] }) {
  return { "@context": "https://schema.org", "@type": "Article", headline: title, description, url: `${siteUrl}${path}`, image: `${siteUrl}${image}`, datePublished: publishedAt, dateModified: modifiedAt ?? publishedAt, ...(section ? { articleSection: section } : {}), ...(keywords?.length ? { keywords: keywords.join(", ") } : {}), author: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "fa-IR" };
}

export function webPageSchema({ type = "WebPage", name, description, path }: { type?: "WebPage" | "AboutPage" | "ContactPage"; name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${siteUrl}${path}#webpage`,
    url: `${siteUrl}${path}`,
    name,
    description,
    inLanguage: "fa-IR",
    about: { "@id": `${siteUrl}/#organization` },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };
}
