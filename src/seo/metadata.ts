import type { Metadata } from "next";

export const siteUrl = "https://khodrochare.ir";

export function seoMetadata({ title, description, path, noindex = false }: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title, description, url: encodeURI(`${siteUrl}${path}`), siteName: "خودرو چاره", locale: "fa_IR", type: "website" },
  };
}
