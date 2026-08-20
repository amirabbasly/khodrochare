import { siteUrl } from "./metadata";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "AutoRepair"],
  "@id": `${siteUrl}/#organization`,
  name: "خودرو چاره",
  url: siteUrl,
  logo: `${siteUrl}/images/khodrochare-3d-logo.webp`,
  telephone: "+989123022064",
  email: "info@khodrochare.ir",
  areaServed: ["تهران", "کرج"],
  contactPoint: [{ "@type": "ContactPoint", telephone: "+989123022064", contactType: "customer service", areaServed: "IR", availableLanguage: ["fa"] }],
};

export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, ...(item.path ? { item: `${siteUrl}${item.path}` } : {}) })) };
}

export function serviceSchema({ name, description, path, area }: { name: string; description: string; path: string; area: string }) {
  return { "@context": "https://schema.org", "@type": "Service", name, description, url: `${siteUrl}${path}`, areaServed: { "@type": "City", name: area }, provider: { "@id": `${siteUrl}/#organization` } };
}

export function faqSchema(items: readonly { question: string; answer: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
}

export function articleSchema({ title, description, path, image, publishedAt }: { title: string; description: string; path: string; image: string; publishedAt: string }) {
  return { "@context": "https://schema.org", "@type": "Article", headline: title, description, url: `${siteUrl}${path}`, image: `${siteUrl}${image}`, datePublished: publishedAt, author: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` }, inLanguage: "fa-IR" };
}
