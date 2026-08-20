import type { Metadata } from "next";
import "aos/dist/aos.css";
import "./globals.css";
import { RouteProgress } from "@/components/site/route-progress";
import { StructuredData } from "@/components/seo/structured-data";
import { organizationSchema } from "@/seo/schemas";
import { primaryKeywords } from "@/seo/keywords";
import { WelcomeModal } from "@/components/site/welcome-modal";

export const metadata: Metadata = {
  metadataBase: new URL("https://khodrochare.ir"),
  title: {
    default: "خودرو چاره | امداد خودرو، کارواش و مکانیک سیار",
    template: "%s | خودرو چاره",
  },
  description:
    "خودرو چاره؛ امداد خودرو آنلاین تهران و کرج، یدک‌کش، مکانیک سیار، باتری خودرو، کارواش سیار و خدمات خودرو در محل.",
  icons: {
    icon: "/images/khodrochare-3d-logo.webp",
    apple: "/images/khodrochare-3d-logo.webp",
  },
  keywords: ["خودرو چاره", ...primaryKeywords, "کارواش سیار", "باتری خودرو", "لوازم یدکی"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "خودرو چاره | امداد خودرو آنلاین تهران و کرج",
    description:
      "امداد خودرو آنلاین تهران و کرج با هماهنگی امدادگر، یدک‌کش، مکانیک سیار و خدمات خودرو در محل.",
    url: "https://khodrochare.ir",
    siteName: "خودرو چاره",
    locale: "fa_IR",
    type: "website",
    images: [{ url: "/images/hero-roadside.webp", width: 1536, height: 864, alt: "امداد خودرو چاره" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "خودرو چاره | امداد خودرو آنلاین تهران و کرج",
    description:
      "امداد خودرو آنلاین تهران و کرج با هماهنگی امدادگر، یدک‌کش، مکانیک سیار و خدمات خودرو در محل.",
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
      <body className="min-h-full flex flex-col"><StructuredData data={organizationSchema} /><RouteProgress />{children}<WelcomeModal /></body>
    </html>
  );
}
