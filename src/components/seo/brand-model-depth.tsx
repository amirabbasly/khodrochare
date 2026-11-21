import { brandModelDepth } from "@/content/brand-model-depth";
import type { BrandProfile } from "@/content/brands";
import { LinkGrid, Section } from "./landing-ui";

export function BrandModelDepth({ brand, region }: { brand: BrandProfile; region?: string }) {
  const groups = brandModelDepth[brand.slug];
  if (!groups) return null;
  return <Section id="model-details" title={`راهنمای مدل‌ها و محصولات ${brand.name}${region ? ` در ${region}` : ""}`}>
    <p>مدل دقیق را هنگام درخواست اعلام کنید؛ مثال‌های زیر برای انتخاب خدمت و تجهیزات‌اند، نه تشخیص قطعی یا اعلام موجودی قطعه. مشخصات مدل‌های یک برند و حتی تیپ‌های یک سال می‌تواند متفاوت باشد.</p>
    <div className="grid gap-4 md:grid-cols-2">{groups.map(group => <article key={group.models} className="rounded-xl border border-slate-200 bg-white/60 p-5"><h3 className="text-base font-black text-ink">{group.models}</h3><p className="mt-3">{group.guidance}</p></article>)}</div>
    <p>در تماس، از روی کارت خودرو مدل و سال را بخوانید و عکس هشدار، محل توقف و وضعیت چرخ‌ها را آماده کنید. برای خرید قطعه، مشخصات لازم را فقط از مسیر هماهنگ‌شده با پشتیبانی ارسال کنید؛ اطلاعات شخصی مدارک را در کانال عمومی منتشر نکنید.</p>
    <LinkGrid links={[{ title: "انتخاب روش حمل بر اساس وضعیت خودرو", href: "/tools/transport-selector" }, { title: "راهنمای حمل خودرو اتوماتیک", href: "/blog/automatic-car-towing-guide" }, { title: "مجوزها و معیار انتخاب امداد قابل پیگیری", href: "/licenses" }]} />
  </Section>;
}
