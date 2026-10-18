import type { Metadata, Viewport } from "next";
import "./globals.css";
import { RouteProgress } from "@/components/site/route-progress";
import { StructuredData } from "@/components/seo/structured-data";
import { organizationSchema, websiteSchema } from "@/seo/schemas";
import { primaryKeywords } from "@/seo/keywords";
import { WelcomeModal } from "@/components/site/welcome-modal";
import { AnalyticsEvents } from "@/components/site/analytics-events";
import { Analytics } from "@/components/site/analytics";
import { defaultOgImage, siteName, siteUrl } from "@/seo/metadata";

const defaultTitle = "امداد خودرو آنلاین تهران، کرج و شمال | خودرو چاره";
const defaultDescription =
  "خودرو چاره؛ هماهنگی امداد خودرو آنلاین، یدک‌کش، خودروبر، مکانیک سیار و باتری در تهران، کرج، گیلان، مازندران و گلستان.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | خودرو چاره",
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "خدمات خودرو",
  generator: "Next.js",
  formatDetection: { telephone: true, email: true, address: false },
  appleWebApp: { capable: true, title: siteName, statusBarStyle: "black-translucent" },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/app-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: ["خودرو چاره", ...primaryKeywords, "کارواش سیار", "باتری خودرو", "لوازم یدکی"],
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${siteUrl}/blog/feed.xml` },
  },
  openGraph: {
    title: defaultTitle,
    description:
      "امداد خودرو آنلاین خودرو چاره برای هماهنگی امدادگر، یدک‌کش، مکانیک سیار و خدمات خودرو در محل؛ در تهران، کرج، گیلان، مازندران و گلستان.",
    url: siteUrl,
    siteName,
    locale: "fa_IR",
    type: "website",
    images: [{ url: defaultOgImage.url, width: defaultOgImage.width, height: defaultOgImage.height, alt: "امداد خودرو چاره" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description:
      "امداد خودرو آنلاین خودرو چاره برای هماهنگی امدادگر، یدک‌کش، مکانیک سیار و خدمات خودرو در محل؛ در تهران، کرج، گیلان، مازندران و گلستان.",
    images: [defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#071a2e" }, { media: "(prefers-color-scheme: dark)", color: "#031224" }],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <head>
        <link rel="preload" href="/fonts/Vazir.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Vazir-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col"><a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-brand-orange focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-white">رفتن به محتوای اصلی</a><StructuredData data={organizationSchema} /><StructuredData data={websiteSchema} /><Analytics /><AnalyticsEvents /><RouteProgress />{children}<WelcomeModal /></body>
    </html>
  );
}
