import { SourceList } from "./editorial-content";
import { serviceKnowledge } from "@/content/service-knowledge";
import Link from "next/link";
import { businessFacts } from "@/content/business";
import { tehranHighways, tehranRegionDecisions, tehranServiceGuides } from "@/content/tehran-seo";
import { LinkGrid, Section } from "./landing-ui";

/** Server-rendered, no images, effects or new client dependencies. Never mounted on home. */
export function TehranServiceDepth({ service }: { service: string }) {
  const guide = tehranServiceGuides[service];
  if (!guide) return null;
  return <div data-tehran-depth="service"><Section title="این راهنما برای کدام درخواست است؟"><p>{guide.intent}</p></Section>{guide.sections.map(section => <Section key={section.title} title={section.title}>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</Section>)}<Section title="ادامه بررسی همین خدمت"><LinkGrid links={guide.links} />{serviceKnowledge[service]?.sources && <SourceList sources={serviceKnowledge[service].sources!} />}</Section></div>;
}
export function TehranRegionDepth({ slug }: { slug: string }) {
  const guide = tehranRegionDecisions[slug];
  if (!guide) return null;
  return <Section title={guide.title}><p>{guide.body}</p><LinkGrid links={guide.links} /></Section>;
}
export function TehranClusterLinks({ path }: { path: string }) {
  const links = [
    { title: "همه خدمات و محدوده‌های تهران", href: "/تهران" },
    { title: "بررسی خرابی در محل", href: "/تهران/امداد-خودرو" },
    { title: "انتخاب یدک‌کش شهری", href: "/تهران/یدک-کش" },
    { title: "حمل کامل با کفی", href: "/تهران/خودروبر" },
    { title: "نشانی در بزرگراه‌های تهران", href: "/roads/tehran-highways" },
    { title: "مرجع نرخ و محاسبه هزینه", href: "/pricing" },
  ].filter(link => link.href !== path);
  return <Section title="مسیرهای تصمیم‌گیری در تهران"><LinkGrid label="خوشه خدمات تهران" links={links} /></Section>;
}
export function TehranLocalIdentity() {
  return <Section title="هویت ارائه‌دهنده و پیگیری خدمت تهران"><p>خودرو چاره برند شرکت {businessFacts.legalName} است. نشانی اعلام‌شده مجموعه: {businessFacts.address}. این نشانی دفتر معرفی‌شده است؛ صفحات محله‌ها نشانی شعبه یا محل استقرار زنده امدادگر نیستند. برای مراجعه حضوری، پیش از حرکت پذیرش و ساعت مراجعه را هماهنگ کنید.</p><p>تماس هماهنگی و پیگیری: <a href={`tel:${businessFacts.emergencyPhone}`} dir="ltr" className="font-bold underline">{businessFacts.emergencyPhone}</a>. شرح خدمت، اقلام مبلغ، شرایط ضمانت همان کار و رسید را نگه دارید؛ ضمانت قطعه با ضمانت اجرت یا مسئولیت حمل یکسان نیست.</p><LinkGrid links={[{ title: "هویت حقوقی و مجوز مجموعه", href: "/licenses" }, { title: "راه‌های تماس و پیگیری", href: "/contact" }, { title: "روش تدوین و اصلاح اطلاعات", href: "/editorial-policy" }]} /></Section>;
}
export function TehranHubDecision() {
  return <Section title="از نشانه خرابی به خدمت مناسب در تهران"><p>این صفحه مرجع انتخاب خدمت و محدوده تهران است؛ لازم نیست پیش از تماس نام قطعه خراب را حدس بزنید. از نشانه شروع کنید و برای جزئیات وارد راهنمای همان خدمت شوید.</p><div className="overflow-x-auto"><table className="w-full min-w-[480px] text-right"><caption className="sr-only">انتخاب خدمت بر اساس وضعیت خودرو در تهران</caption><thead><tr><th scope="col" className="p-3">وضعیت</th><th scope="col" className="p-3">مسیر بررسی</th><th scope="col" className="p-3">نکته تعیین‌کننده</th></tr></thead><tbody>{[
    ["خرابی نامشخص یا خاموشی", "/تهران/امداد-خودرو", "بررسی اولیه در محل", "زمان شروع، هشدار و رفتار استارت"],
    ["استارت کند یا تخلیه تکراری", "/تهران/باتری-خودرو", "تست باتری و شارژ", "تست پیش از تصمیم تعویض"],
    ["چراغ چک و اختلال عملکرد", "/تهران/دیاگ-سیار", "دیاگ و گزارش خطا", "کد خطا حکم تعویض قطعه نیست"],
    ["نیاز به تعمیر مشخص", "/تهران/مکانیک-سیار", "مکانیک سیار", "ابزار و ایمنی محیط کار"],
    ["تایر آسیب‌دیده", "/تهران/پنچرگیری-سیار", "تعویض چرخ یا بررسی تایر", "زاپاس، رینگ و محل امن"],
    ["خودرو غیرقابل حرکت", "/تهران/خودروبر", "ارزیابی حمل با کفی", "گیربکس، چرخ و امکان بارگیری"],
  ].map(([state, href, label, check]) => <tr key={href} className="border-t border-slate-200"><th scope="row" className="p-3">{state}</th><td className="p-3"><Link prefetch={false} href={href} className="font-bold underline">{label}</Link></td><td className="p-3">{check}</td></tr>)}</tbody></table></div><p>در مصدومیت، نشت سوخت، آتش‌سوزی یا خطر فوری، ابتدا خدمات اضطراری مسئول را مطلع کنید؛ انتخاب خدمت در سایت جای ایمن‌سازی صحنه نیست.</p></Section>;
}
export function TehranHighwayDepth() {
  return <><Section title="نشانی در محورهای تهران؛ جهت و سطح مسیر را مشخص کنید"><p>لوکیشن را با نام محور، جهت، پل یا خروجی و قرارداشتن در مسیر اصلی، رمپ یا خیابان کناری تکمیل کنید. در تقاطع چندسطحی، نزدیک‌بودن پین به یک پل، سطح توقف خودرو را مشخص نمی‌کند.</p>{tehranHighways.map(item => <div key={item.name}><h3 className="font-black text-ink">{item.name}</h3><p>{item.detail}</p></div>)}</Section><Section title="شرح تماس نمونه؛ نه سفارش ثبت‌شده"><p>«در همت، مسیر غرب به شرق، نزدیک خروجی مشخص‌شده روی تابلو، در مسیر اصلی متوقفم؛ خودرو اتوماتیک است، موتور خاموش شده و چرخ‌ها آزادند. لوکیشن و وضعیت خطر را اعلام می‌کنم؛ برای بررسی در محل یا حمل راهنمایی می‌خواهم.» این یک نمونه آموزشی است و گزارش عملیات واقعی یا تأیید ایمنی توقف نیست.</p></Section><Section title="تعمیر کنار مسیر یا انتقال؛ معیار تصمیم چیست؟"><p>وجود شانه به‌تنهایی محل را برای تعمیر ایمن نمی‌کند. دید، تردد، فضای استقرار و نوع خرابی باید توسط مسئول صحنه و متخصص بررسی شوند. برای گذاشتن علامت، عکس‌گرفتن یا پیداکردن امدادگر وارد مسیر عبور نشوید. در حادثه یا انسداد خط عبور، رسیدگی مرجع مسئول بر تعمیر مقدم است.</p><p>درباره هزینه حضور بدون تعمیر، جابه‌جایی اولیه به محل مناسب، بارگیری و حمل تا مقصد جدا سؤال کنید. خودروبر کفی و چرخ‌گیر یک روش نیستند؛ نوع خودرو، چرخ‌ها و دستور حمل همان مدل ملاک انتخاب‌اند.</p></Section></>;
}
