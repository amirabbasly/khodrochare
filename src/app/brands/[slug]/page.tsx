import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandLanding } from "@/components/seo/brand-pages";
import { seoMetadata } from "@/seo/metadata";
import { carBrands, getBrand } from "@/content/brands";

export function generateStaticParams() {
  return carBrands.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const brand = getBrand((await params).slug);
  if (!brand) return {};
  return seoMetadata({
    title: `امداد خودرو ${brand.name} تهران و کرج | یدک‌کش و مکانیک سیار`,
    description: `${brand.summary} ثبت آنلاین امداد خودرو ${brand.name} در تهران و کرج؛ مدل‌های تحت پوشش، خرابی‌های قابل رفع در محل، زمان اعزام و عوامل هزینه.`,
    path: `/brands/${brand.slug}`,
    keywords: [`امداد خودرو ${brand.name}`, `یدک کش ${brand.name}`, `مکانیک سیار ${brand.name}`, `خودروبر ${brand.name}`, `امداد خودرو ${brand.name} تهران`],
    image: brand.image,
    imageAlt: `امداد خودرو ${brand.name} در تهران و کرج`,
  });
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const brand = getBrand((await params).slug);
  if (!brand) notFound();
  return <BrandLanding brand={brand} />;
}
