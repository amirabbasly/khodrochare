import type { Metadata } from "next";

export const siteUrl = "https://khodrochare.ir";
export const siteName = "خودرو چاره";

/** Default social preview image (1200x630 JPEG for maximum crawler compatibility). */
export const defaultOgImage = {
  url: "/images/og-cover.jpg",
  width: 1200,
  height: 630,
} as const;

/** Percent-encodes Persian paths so canonical/sitemap/OG URLs stay RFC 3986 valid. */
export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${encodeURI(normalized)}`;
}

/**
 * Google truncates the meta description around 158-160 characters (it is also
 * rewritten when it does not match the page). Three service pages shipped at
 * 161-164 characters, so every description now passes through this clamp.
 */
export const META_DESCRIPTION_LIMIT = 158;

/** Trims a description to `limit` characters, breaking on the last clause boundary. */
export function clampMetaDescription(text: string, limit = META_DESCRIPTION_LIMIT) {
  const normalized = String(text).replace(/\s+/g, " ").trim();
  if ([...normalized].length <= limit) return normalized;
  const head = [...normalized].slice(0, limit).join("");
  const boundary = Math.max(head.lastIndexOf("؛"), head.lastIndexOf("،"), head.lastIndexOf(". "), head.lastIndexOf(" "));
  const trimmed = boundary > Math.floor(limit * 0.6) ? head.slice(0, boundary) : head;
  return `${trimmed.replace(/[\s،؛.,!?]+$/, "")}.`;
}

/**
 * Maps an on-page artwork to its 1200x630 JPEG social twin in /images/og.
 * WebP link previews are still dropped by several messengers, so social crawlers
 * always get a JPEG. Run `npm run og:images` after adding new artwork.
 */
export function ogImagePath(image: string) {
  if (!image.startsWith("/images/") || image.startsWith("/images/og/")) return image;
  const fileName = image.split("/").pop() ?? "";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  return baseName ? `/images/og/${baseName}.jpg` : image;
}

export function seoMetadata({
  title,
  description,
  path,
  noindex = false,
  keywords,
  image,
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  authorName,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  keywords?: readonly string[];
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  /** Named human author, when one exists. Emitted as `<meta name="author">`. */
  authorName?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const safeDescription = clampMetaDescription(description);
  const ogImage = image
    ? { url: `${siteUrl}${encodeURI(ogImagePath(image))}`, width: defaultOgImage.width, height: defaultOgImage.height, alt: imageAlt ?? title }
    : { url: `${siteUrl}${defaultOgImage.url}`, width: defaultOgImage.width, height: defaultOgImage.height, alt: imageAlt ?? title };

  return {
    title,
    description: safeDescription,
    ...(keywords?.length ? { keywords: [...keywords] } : {}),
    ...(authorName ? { authors: [{ name: authorName }] } : {}),
    alternates: { canonical: path },
    robots: noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      title,
      description: safeDescription,
      url,
      siteName,
      locale: "fa_IR",
      type,
      images: [ogImage],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(type === "article" && section ? { section } : {}),
    },
    twitter: { card: "summary_large_image", title, description: safeDescription, images: [ogImage.url] },
  };
}
