import type { Metadata } from "next";
import "./globals.css";
import { RouteProgress } from "@/components/site/route-progress";
import { StructuredData } from "@/components/seo/structured-data";
import { organizationSchema } from "@/seo/schemas";
import { primaryKeywords } from "@/seo/keywords";
import { WelcomeModal } from "@/components/site/welcome-modal";
import { AnalyticsEvents } from "@/components/site/analytics-events";

export const metadata: Metadata = {
  metadataBase: new URL("https://khodrochare.ir"),
  title: {
    default: "امداد خودرو شبانه‌روزی تهران و کرج | خودرو چاره",
    template: "%s | خودرو چاره",
  },
  description:
    "خودرو چاره؛ سامانه امداد خودرو آنلاین و خدمات خودرو در محل، با هماهنگی امدادگر، یدک‌کش، مکانیک سیار و باتری در تهران و کرج و توسعه مرحله‌ای در شهرهای دیگر.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  keywords: ["خودرو چاره", ...primaryKeywords, "کارواش سیار", "باتری خودرو", "لوازم یدکی"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "امداد خودرو شبانه‌روزی تهران و کرج | خودرو چاره",
    description:
      "امداد خودرو آنلاین خودرو چاره برای هماهنگی امدادگر، یدک‌کش، مکانیک سیار و خدمات خودرو در محل؛ با تمرکز فعلی تهران و کرج و مسیر توسعه برای شهرهای دیگر.",
    url: "https://khodrochare.ir",
    siteName: "خودرو چاره",
    locale: "fa_IR",
    type: "website",
    images: [{ url: "/images/hero-roadside.webp", width: 1536, height: 864, alt: "امداد خودرو چاره" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "امداد خودرو شبانه‌روزی تهران و کرج | خودرو چاره",
    description:
      "امداد خودرو آنلاین خودرو چاره برای هماهنگی امدادگر، یدک‌کش، مکانیک سیار و خدمات خودرو در محل؛ با تمرکز فعلی تهران و کرج و مسیر توسعه برای شهرهای دیگر.",
    images: ["/images/hero-roadside.webp"],
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col"><StructuredData data={organizationSchema} /><AnalyticsEvents /><RouteProgress />{children}<WelcomeModal /></body>
    </html>
  );
}
