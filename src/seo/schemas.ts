import { defaultOgImage, ogImagePath, siteUrl } from "./metadata";
import { businessFacts, sameAsProfiles } from "@/content/business";

const openAllWeek = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  opens: "00:00",
  closes: "23:59",
};

/**
 * City entities are DEFINED once (inside the Organization node, which layout.tsx
 * renders on every page) and only REFERENCED by `@id` everywhere else.
 *
 * Before this change every `Service`, `areaServed` and `serviceArea` re-declared
 * `{ "@type": "City", name, "@id": "#city-tehran" }`, which produced 150 duplicate
 * `@id` definitions across the site: a node may only be defined once in a JSON-LD
 * graph, otherwise crawlers cannot tell which declaration is authoritative.
 */
const cityEntities = [
  { "@type": "City", name: "تهران", "@id": `${siteUrl}/#city-tehran` },
  { "@type": "City", name: "کرج", "@id": `${siteUrl}/#city-karaj` },
];

/** Reference-only form (`{"@id": ...}`) of the two defined cities. */
const cityRefs = cityEntities.map((city) => ({ "@id": city["@id"] }));

/**
 * Reference to a city entity. Known cities resolve to the single definition in the
 * Organization node; any other city gets its own stable, percent-encoded `@id` so
 * it can still be referenced consistently across the graph.
 */
export function cityRef(name: string) {
  const known = cityEntities.find((city) => city.name === name);
  if (known) return { "@id": known["@id"] };
  return { "@type": "City", name, "@id": `${siteUrl}/#city-${encodeURIComponent(name)}` };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoRepair", "EmergencyService"],
  "@id": `${siteUrl}/#organization`,
  name: businessFacts.name,
  alternateName: ["خودروچاره", "Khodrochare"],
  description:
    "سامانه امداد خودرو آنلاین و خدمات خودرو در محل؛ هماهنگی امدادگر، یدک‌کش، خودروبر، مکانیک سیار، باتری، پنچرگیری و سوخت‌رسانی در تهران و کرج به‌صورت شبانه‌روزی.",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    "@id": `${siteUrl}/#logo`,
    url: `${siteUrl}/images/khodrochare-3d-logo.webp`,
    contentUrl: `${siteUrl}/images/khodrochare-3d-logo.webp`,
    caption: businessFacts.name,
  },
  image: [`${siteUrl}/images/og-cover.jpg`, `${siteUrl}/images/hero-roadside.webp`, `${siteUrl}/images/support-technician-night.webp`],
  telephone: businessFacts.emergencyPhoneE164,
  email: businessFacts.email,
  sameAs: sameAsProfiles,
  address: { "@type": "PostalAddress", ...businessFacts.addressParts },
  areaServed: cityEntities,
  serviceArea: cityRefs,
  availableLanguage: [{ "@type": "Language", name: "Persian", alternateName: "fa" }],
  numberOfEmployees: { "@type": "QuantitativeValue", value: 100 },
  knowsAbout: [...businessFacts.services, "امداد خودرو آنلاین"],
  slogan: "امداد خودرو آنلاین و شبانه‌روزی در تهران و کرج",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "خدمات امداد خودرو و خدمات خودرو در محل",
    itemListElement: businessFacts.services.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service, provider: { "@id": `${siteUrl}/#organization` }, areaServed: cityRefs },
    })),
  },
  openingHoursSpecification: [openAllWeek],
  contactPoint: [
    { "@type": "ContactPoint", telephone: businessFacts.emergencyPhoneE164, contactType: "emergency", areaServed: ["IR"], availableLanguage: ["fa"], hoursAvailable: openAllWeek },
    { "@type": "ContactPoint", telephone: businessFacts.complaintPhoneE164, contactType: "customer support", areaServed: ["IR"], availableLanguage: ["fa"], hoursAvailable: openAllWeek },
  ],
  // `geo`, `hasMap` and `priceRange` are intentionally NOT guessed: wrong
  // coordinates are worse than none. Add them here as soon as the Google Business
  // Profile is verified (see docs/seo-audit-live-2026-09-06.md, finding P1-1).
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: `${siteUrl}/`,
  name: businessFacts.name,
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
  const areaServed = area === "تهران و کرج" ? cityRefs : [cityRef(area)];
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
      servicePhone: { "@type": "ContactPoint", telephone: businessFacts.emergencyPhoneE164, contactType: "emergency", availableLanguage: ["fa"] },
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

export type ArticleAuthor = { name: string; url?: string; jobTitle?: string };

export function articleSchema({ title, description, path, image, publishedAt, modifiedAt, section, keywords, timeRequired, wordCount, author }: { title: string; description: string; path: string; image: string; publishedAt: string; modifiedAt?: string; section?: string; keywords?: string[]; timeRequired?: string; wordCount?: number; author?: ArticleAuthor }) {
  const url = `${siteUrl}${encodeURI(path)}`;
  const imageUrl = `${siteUrl}${encodeURI(ogImagePath(image))}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: title.length > 110 ? `${title.slice(0, 107)}...` : title,
    name: title,
    description,
    url,
    // Plain URL form (Google's recommended shape). An inline `{"@type":"WebPage","@id":...}`
    // here would DEFINE the page node a second time — webPageSchema() already owns
    // `${url}#webpage` on every article page, and a node may only be defined once.
    mainEntityOfPage: url,
    isPartOf: { "@id": `${siteUrl}/#website` },
    // No `@id` here: `#primaryimage` is defined by webPageSchema() and referenced from
    // `primaryImageOfPage`. Defining the same id twice breaks the graph.
    image: { "@type": "ImageObject", url: imageUrl, contentUrl: imageUrl, width: defaultOgImage.width, height: defaultOgImage.height, caption: title },
    datePublished: publishedAt,
    dateModified: modifiedAt ?? publishedAt,
    ...(section ? { articleSection: section } : {}),
    ...(keywords?.length ? { keywords: keywords.join(", ") } : {}),
    ...(timeRequired ? { timeRequired } : {}),
    ...(wordCount ? { wordCount } : {}),
    // A named human author is a real E-E-A-T signal for safety/diagnostic topics.
    // Falls back to the Organization until real author profiles exist — never
    // invent a person (finding P1-4).
    author: author
      ? { "@type": "Person", name: author.name, ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}), ...(author.url ? { url: `${siteUrl}${encodeURI(author.url)}` } : {}) }
      : { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "fa-IR",
  };
}

/**
 * Page-level node that ties Breadcrumb, Article/Service and the primary image into
 * one graph. `AboutPage`, `ContactPage` and `CollectionPage` are valid WebPage
 * subtypes, so pages using those already have a page node.
 */
export function webPageSchema({ type = "WebPage", name, description, path, breadcrumb = false, image }: { type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage" | "ItemPage"; name: string; description: string; path: string; breadcrumb?: boolean; image?: string }) {
  const url = `${siteUrl}${encodeURI(path)}`;
  // `primaryImageOfPage` used to point at `#logo` (the site logo, not the page
  // artwork). It now references the page's own 1200x630 social image, defined once
  // as an ImageObject so social crawlers and image search agree on the artwork.
  const imageUrl = `${siteUrl}${encodeURI(ogImagePath(image ?? defaultOgImage.url))}`;
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
    image: { "@type": "ImageObject", "@id": `${url}#primaryimage`, url: imageUrl, contentUrl: imageUrl, width: defaultOgImage.width, height: defaultOgImage.height, caption: name },
    primaryImageOfPage: { "@id": `${url}#primaryimage` },
    ...(breadcrumb ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
  };
}
