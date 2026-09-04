import type { Metadata } from "next";
import { AssistantWorkspace } from "@/components/assistant/assistant-workspace";
import { SubpageShell } from "@/components/site/subpage-shell";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema, webPageSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";

export const metadata: Metadata = seoMetadata({
  title: "دستیار هوشمند خودرو | بررسی اولیه مشکل خودرو",
  description: "گفت‌وگوی تخصصی با دستیار هوشمند خودرو چاره برای بررسی اولیه نشانه‌های خرابی خودرو، اقدام ایمن و انتخاب خدمت مناسب مانند مکانیک سیار، باتری یا یدک‌کش.",
  path: "/assistant",
  keywords: ["دستیار هوشمند خودرو", "عیب یابی آنلاین خودرو", "مشاوره خرابی خودرو", "هوش مصنوعی خودرو"],
});

export default function AssistantPage() {
  return <SubpageShell><StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "دستیار هوشمند" }], "/assistant")} /><StructuredData data={webPageSchema({ name: "دستیار هوشمند خودرو چاره", description: "بررسی اولیه نشانه‌های خرابی خودرو و انتخاب مسیر خدمت با دستیار هوشمند خودرو چاره.", path: "/assistant", breadcrumb: true })} /><section className="relative overflow-hidden bg-[#071a2e] pb-20 pt-14 text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,83,21,.17),transparent_24%),radial-gradient(circle_at_80%_35%,rgba(14,165,233,.22),transparent_27%)]" /><div className="site-container relative text-center"><span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-200">دستیار هوشمند خودرو</span><h1 className="mt-5 text-3xl font-black md:text-5xl">مشکل خودرو را توضیح دهید؛ قدم بعدی را روشن کنید</h1><p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-300">یک گفت‌وگوی سریع برای شناخت اولیه نشانه‌ها، اقدام‌های ایمن و انتخاب خدمت مناسب. برای پیشنهادهای آماده از ابزار پایین سمت راست استفاده کنید.</p></div></section><AssistantWorkspace /></SubpageShell>;
}
