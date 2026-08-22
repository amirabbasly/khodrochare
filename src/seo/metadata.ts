import type { Metadata } from "next";

export const siteUrl = "https://khodrochare.ir";

export function seoMetadata({ title, description, path, noindex = false, keywords }: { title: string; description: string; path: string; noindex?: boolean; keywords?: readonly string[] }): Metadata {
  return {
    title,
    description,
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title, description, url: `${siteUrl}${path}`, siteName: "خودرو چاره", locale: "fa_IR", type: "website", images: [{ url: `${siteUrl}/images/hero-roadside.webp`, width: 1536, height: 864, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/images/hero-roadside.webp`] },
  };
}
