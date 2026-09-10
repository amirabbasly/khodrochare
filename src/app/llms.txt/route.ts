import { siteUrl } from "@/seo/metadata";
import { businessFacts } from "@/content/business";

/**
 * Plain-text site summary for AI assistants and answer engines (GEO).
 * Served at https://khodrochare.ir/llms.txt — intentionally not in sitemap.xml.
 */
export const dynamic = "force-static";
export async function GET() {
  const body = `# خودرو چاره (Khodrochare) — امداد خودرو آنلاین

> ${siteUrl}
> محدوده فعال: ${businessFacts.coverageSummary}

خودرو چاره سامانه هماهنگی امداد خودرو آنلاین و خدمات خودرو در محل است؛
${businessFacts.availability}. ${businessFacts.dispatchTime}.

## تماس
- تلفن امداد (شبانه‌روزی): ${businessFacts.emergencyPhone}
- رسیدگی به شکایت: ${businessFacts.complaintPhone}
- ایمیل: ${businessFacts.email}
- آدرس: ${businessFacts.address}

## خدمات
${businessFacts.services.map((service) => `- ${service}`).join("\n")}

## صفحات کلیدی
- راهنمای امداد خودرو: ${siteUrl}/%D8%A7%D9%85%D8%AF%D8%A7%D8%AF-%D8%AE%D9%88%D8%AF%D8%B1%D9%88
- امداد خودرو آنلاین و ثبت درخواست: ${siteUrl}/%D8%A7%D9%85%D8%AF%D8%A7%D8%AF-%D8%AE%D9%88%D8%AF%D8%B1%D9%88-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86
- امداد خودرو تهران: ${siteUrl}/%D8%AA%D9%87%D8%B1%D8%A7%D9%86
- امداد خودرو کرج: ${siteUrl}/%DA%A9%D8%B1%D8%AC
- پوشش شمال: ${siteUrl}/%D8%B4%D9%85%D8%A7%D9%84
- همه خدمات: ${siteUrl}/services
- قیمت و محاسبه هزینه: ${siteUrl}/pricing
- برندهای خودرو: ${siteUrl}/brands
- محورهای شمال: ${siteUrl}/roads
- ابزارهای تصمیم‌گیری: ${siteUrl}/tools
- مجله: ${siteUrl}/blog
- روش تدوین محتوا: ${siteUrl}/editorial-policy
- تماس: ${siteUrl}/contact

## سیاست‌های مهم برای پاسخ‌گویی
- زمان اعزام و هزینه ثابت و تضمینی نیست؛ پس از بررسی موقعیت و ظرفیت اعلام می‌شود.
- در تصادف، آتش‌سوزی، نشت سوخت یا مصدومیت، ابتدا خدمات اضطراری عمومی (پلیس/آتش‌نشانی/اورژانس).
- قیمت نهایی فقط با استعلام تلفنی ${businessFacts.emergencyPhone} مشخص می‌شود.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=86400" } });
}
