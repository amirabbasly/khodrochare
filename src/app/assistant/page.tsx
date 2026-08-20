import type { Metadata } from "next";
import { AssistantWorkspace } from "@/components/assistant/assistant-workspace";
import { SubpageShell } from "@/components/site/subpage-shell";

export const metadata: Metadata = {
  title: "دستیار هوشمند خودرو چاره",
  description: "گفت‌وگوی تخصصی با دستیار هوشمند خودرو چاره برای بررسی اولیه مشکلات خودرو و انتخاب مسیر امن بعدی.",
  alternates: { canonical: "/assistant" },
};

export default function AssistantPage() {
  return <SubpageShell><section className="relative overflow-hidden bg-[#071a2e] pb-20 pt-14 text-white"><div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,83,21,.17),transparent_24%),radial-gradient(circle_at_80%_35%,rgba(14,165,233,.22),transparent_27%)]" /><div className="site-container relative text-center"><span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-xs font-black text-cyan-200">دستیار هوشمند خودرو</span><h1 className="mt-5 text-3xl font-black md:text-5xl">مشکل خودرو را توضیح دهید؛ قدم بعدی را روشن کنید</h1><p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-slate-300">یک گفت‌وگوی سریع برای شناخت اولیه نشانه‌ها، اقدام‌های ایمن و انتخاب خدمت مناسب. برای پیشنهادهای آماده از ابزار پایین سمت راست استفاده کنید.</p></div></section><AssistantWorkspace /></SubpageShell>;
}
