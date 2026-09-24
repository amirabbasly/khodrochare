import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SubpageShell } from "@/components/site/subpage-shell";
import { blogContentUpdatedAtIso, blogPosts, getBlogPost, supplementalArticleSections } from "@/content/blog";
import { StructuredData } from "@/components/seo/structured-data";
import { articleSchema, breadcrumbSchema, faqSchema, webPageSchema } from "@/seo/schemas";
import { seoMetadata } from "@/seo/metadata";
import { sectionText } from "@/content/editorial-types";
import { EditorialDetails, SourceList } from "@/components/seo/editorial-content";

const commercialLinks: Record<string, { title: string; href: string }[]> = {
  "emergency-car-assistance-tehran-districts": [{ title: "امداد خودرو تهران", href: "/تهران" }, { title: "امداد شبانه تهران", href: "/تهران/امداد-خودرو" }, { title: "یدک‌کش تهران", href: "/تهران/یدک-کش" }, { title: "مناطق تحت پوشش", href: "/coverage" }],
  "emergency-car-assistance-karaj-guide": [{ title: "امداد خودرو کرج", href: "/کرج" }, { title: "امداد خودرو آنلاین کرج", href: "/کرج/امداد-خودرو" }, { title: "یدک‌کش کرج", href: "/کرج/یدک-کش" }, { title: "ثبت درخواست فوری", href: "/امداد-خودرو-آنلاین#request" }],
  "car-assistance-coverage-tehran-karaj": [{ title: "امداد خودرو تهران", href: "/تهران" }, { title: "امداد خودرو کرج", href: "/کرج" }, { title: "مناطق تحت پوشش", href: "/coverage" }, { title: "ثبت امداد خودرو آنلاین", href: "/امداد-خودرو-آنلاین#request" }],
  "safe-towing-guide": [{ title: "یدک کش تهران", href: "/تهران/یدک-کش" }, { title: "یدک کش کرج", href: "/کرج/یدک-کش" }, { title: "خودروبر تهران و کرج", href: "/services/flatbed-carrier" }, { title: "هزینه حمل خودرو", href: "/blog/car-tow-truck-price-guide" }],
  "car-tow-truck-price-guide": [{ title: "هزینه و درخواست یدک کش تهران", href: "/تهران/یدک-کش" }, { title: "هزینه و درخواست یدک کش کرج", href: "/کرج/یدک-کش" }, { title: "خودروبر تهران و کرج", href: "/services/flatbed-carrier" }, { title: "قیمت خدمات امدادی", href: "/pricing" }],
  "mobile-mechanic-checklist": [{ title: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" }, { title: "مکانیک سیار کرج", href: "/کرج/مکانیک-سیار" }, { title: "دیاگ سیار تهران", href: "/تهران/دیاگ-سیار" }],
  "what-to-do-when-car-stops-on-highway": [{ title: "امداد خودرو آنلاین تهران", href: "/تهران/امداد-خودرو" }, { title: "امداد خودرو آنلاین کرج", href: "/کرج/امداد-خودرو" }, { title: "یدک کش تهران", href: "/تهران/یدک-کش" }, { title: "ثبت درخواست فوری", href: "/امداد-خودرو-آنلاین#request" }],
  "car-battery-warning-signs": [{ title: "باتری خودرو تهران", href: "/تهران/باتری-خودرو" }, { title: "باتری خودرو کرج", href: "/کرج/باتری-خودرو" }, { title: "باتری به باتری", href: "/services/jump-start" }],
  "mobile-battery-replacement-tehran-karaj": [{ title: "باتری خودرو تهران", href: "/تهران/باتری-خودرو" }, { title: "باتری خودرو کرج", href: "/کرج/باتری-خودرو" }, { title: "باتری به باتری", href: "/services/jump-start" }],
  "mobile-carwash-guide": [{ title: "کارواش سیار تهران", href: "/تهران/کارواش-سیار" }, { title: "کارواش سیار کرج", href: "/کرج/کارواش-سیار" }, { title: "کارواش سیار در محل", href: "/services/mobile-carwash" }],
  "flat-tire-roadside-assistance": [{ title: "پنچرگیری سیار تهران", href: "/تهران/پنچرگیری-سیار" }, { title: "پنچرگیری سیار کرج", href: "/کرج/پنچرگیری-سیار" }, { title: "تعویض لاستیک در محل", href: "/services/flat-tire" }],
  "mobile-diagnostics-check-engine-guide": [{ title: "دیاگ سیار تهران", href: "/تهران/دیاگ-سیار" }, { title: "دیاگ سیار کرج", href: "/کرج/دیاگ-سیار" }, { title: "عیب‌یابی سیار خودرو", href: "/services/mobile-diagnostics" }],
  "car-maintenance-before-long-trip": [{ title: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" }, { title: "باتری خودرو در محل", href: "/services/battery-replacement" }, { title: "پنچرگیری سیار", href: "/services/flat-tire" }, { title: "امداد خودرو آنلاین", href: "/services/roadside-assistance" }],
  "online-roadside-assistance-request-guide": [{ title: "امداد خودرو آنلاین تهران", href: "/تهران/امداد-خودرو" }, { title: "امداد خودرو آنلاین کرج", href: "/کرج/امداد-خودرو" }, { title: "مناطق تحت پوشش", href: "/coverage" }, { title: "ثبت درخواست آنلاین", href: "/امداد-خودرو-آنلاین#request" }],
  "automatic-car-towing-guide": [{ title: "یدک کش تهران", href: "/تهران/یدک-کش" }, { title: "یدک کش کرج", href: "/کرج/یدک-کش" }, { title: "خودروبر و حمل با کفی", href: "/services/flatbed-carrier" }, { title: "هزینه حمل خودرو", href: "/blog/car-tow-truck-price-guide" }],
  "car-overheating-roadside-guide": [{ title: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" }, { title: "مکانیک سیار کرج", href: "/کرج/مکانیک-سیار" }, { title: "امداد خودرو در محل", href: "/services/roadside-assistance" }, { title: "یدک کش", href: "/services/tow-truck" }],
  "mobile-mechanic-repairs-at-location": [{ title: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" }, { title: "مکانیک سیار کرج", href: "/کرج/مکانیک-سیار" }, { title: "دیاگ سیار", href: "/services/mobile-diagnostics" }, { title: "قیمت خدمات", href: "/pricing" }],
  "tehran-karaj-freeway-breakdown-guide": [{ title: "امداد خودرو تهران", href: "/تهران/امداد-خودرو" }, { title: "امداد خودرو کرج", href: "/کرج/امداد-خودرو" }, { title: "یدک‌کش و حمل از مسیر", href: "/services/tow-truck" }, { title: "ثبت درخواست فوری", href: "/امداد-خودرو-آنلاین#request" }],
  "jumpstart-vs-battery-replacement": [{ title: "باتری‌به‌باتری در محل", href: "/services/jump-start" }, { title: "تست و تعویض باتری", href: "/services/battery-replacement" }, { title: "باتری خودرو تهران", href: "/تهران/باتری-خودرو" }, { title: "باتری خودرو کرج", href: "/کرج/باتری-خودرو" }],
  "ev-hybrid-roadside-safety-guide": [{ title: "حمل با کفی خودروبر", href: "/services/flatbed-carrier" }, { title: "ابزار انتخاب روش حمل", href: "/tools/transport-selector" }, { title: "امداد خودرو در محل", href: "/services/roadside-assistance" }],
  "car-lockout-key-guide": [{ title: "بازیابی دسترسی خودرو", href: "/services/vehicle-access" }, { title: "امداد خودرو تهران", href: "/تهران/امداد-خودرو" }, { title: "اطلاعات تماس", href: "/contact" }],
  "pre-purchase-car-inspection-guide": [{ title: "دیاگ سیار در محل", href: "/services/mobile-diagnostics" }, { title: "بازدید فنی پیش از سفر", href: "/services/pre-trip-check" }, { title: "راهنمای کد دیاگ", href: "/tools/obd-code" }],
  "tehran-night-roadside-guide": [{ title: "امداد شبانه تهران", href: "/تهران/امداد-خودرو" }, { title: "یدک‌کش شبانه تهران", href: "/تهران/یدک-کش" }, { title: "ثبت درخواست فوری", href: "/امداد-خودرو-آنلاین#request" }, { title: "مناطق تحت پوشش", href: "/coverage" }],
  "shahin-roadside-tehran-karaj": [{ title: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" }, { title: "مکانیک سیار کرج", href: "/کرج/مکانیک-سیار" }, { title: "راهنمای برند سایپا", href: "/brands/saipa" }],
  "tiggo-7-pro-cvt-tehran": [{ title: "حمل با خودروبر کفی", href: "/services/flatbed-carrier" }, { title: "ابزار انتخاب روش حمل", href: "/tools/transport-selector" }, { title: "راهنمای برند چری", href: "/brands/chery" }],
  "peugeot-206-207-roadside": [{ title: "باتری‌به‌باتری در محل", href: "/services/jump-start" }, { title: "باتری خودرو تهران", href: "/تهران/باتری-خودرو" }, { title: "راهنمای برند ایران‌خودرو", href: "/brands/iran-khodro" }],
  "dena-plus-overheat-guide": [{ title: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" }, { title: "راهنمای داغ‌کردن خودرو", href: "/blog/car-overheating-roadside-guide" }, { title: "حمل با خودروبر", href: "/services/flatbed-carrier" }],
  "quick-saina-battery-starter": [{ title: "تست و تعویض باتری", href: "/services/battery-replacement" }, { title: "باتری‌به‌باتری در محل", href: "/services/jump-start" }, { title: "باتری خودرو کرج", href: "/کرج/باتری-خودرو" }],
  "tiba-roadside-guide": [{ title: "بازدید پیش از سفر", href: "/services/pre-trip-check" }, { title: "امداد خودرو کرج", href: "/کرج/امداد-خودرو" }, { title: "امداد خودرو شمال", href: "/شمال" }],
  "jac-j7-diagnostics-tehran": [{ title: "دیاگ سیار در محل", href: "/services/mobile-diagnostics" }, { title: "دیاگ سیار تهران", href: "/تهران/دیاگ-سیار" }, { title: "راهنمای کد دیاگ", href: "/tools/obd-code" }],
  "changan-cs35-tow-guide": [{ title: "حمل با خودروبر کفی", href: "/services/flatbed-carrier" }, { title: "چک‌لیست تحویل به کفی", href: "/blog/flatbed-handover-checklist" }, { title: "ابزار انتخاب روش حمل", href: "/tools/transport-selector" }],
  "kmc-k7-flatbed-guide": [{ title: "حمل با خودروبر کفی", href: "/services/flatbed-carrier" }, { title: "امداد خودرو تهران", href: "/تهران/امداد-خودرو" }, { title: "امداد خودرو شمال", href: "/شمال" }],
  "atlas-warranty-roadside": [{ title: "حمل ایمن تا نمایندگی", href: "/services/flatbed-carrier" }, { title: "تعمیر در محل یا حمل؟", href: "/blog/tow-truck-or-on-site-repair" }, { title: "راهنمای برند سایپا", href: "/brands/saipa" }],
  "rasht-emdad-khodro-guide": [{ title: "امداد خودرو رشت", href: "/رشت" }, { title: "امداد خودرو گیلان", href: "/گیلان" }, { title: "امداد خودرو شمال", href: "/شمال" }, { title: "ثبت درخواست آنلاین", href: "/امداد-خودرو-آنلاین#request" }],
  "sari-mazandaran-east-guide": [{ title: "امداد خودرو ساری", href: "/ساری" }, { title: "امداد خودرو قائم‌شهر", href: "/قائم-شهر" }, { title: "امداد خودرو مازندران", href: "/مازندران" }],
  "chalus-road-breakdown-guide": [{ title: "امداد خودرو چالوس", href: "/چالوس" }, { title: "راهنمای جاده چالوس", href: "/roads/chalus" }, { title: "امداد خودرو کرج", href: "/کرج/امداد-خودرو" }],
  "haraz-road-assistance-guide": [{ title: "امداد خودرو آمل", href: "/آمل" }, { title: "راهنمای محور هراز", href: "/roads/haraz" }, { title: "امداد خودرو تهران", href: "/تهران/امداد-خودرو" }],
  "gilan-west-anzali-lahijan-guide": [{ title: "امداد خودرو انزلی", href: "/بندر-انزلی" }, { title: "امداد خودرو لاهیجان", href: "/لاهیجان" }, { title: "امداد خودرو آستارا", href: "/آستارا" }, { title: "امداد خودرو گیلان", href: "/گیلان" }],
  "north-trip-car-checklist": [{ title: "بازدید پیش از سفر", href: "/services/pre-trip-check" }, { title: "امداد خودرو شمال", href: "/شمال" }, { title: "راهنمای محور هراز", href: "/roads/haraz" }],
  "peugeot-pars-roadside": [{ title: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" }, { title: "باتری‌به‌باتری در محل", href: "/services/jump-start" }, { title: "راهنمای برند ایران‌خودرو", href: "/brands/iran-khodro" }],
  "samand-soren-roadside": [{ title: "مکانیک سیار کرج", href: "/کرج/مکانیک-سیار" }, { title: "بازدید پیش از سفر", href: "/services/pre-trip-check" }, { title: "راهنمای برند ایران‌خودرو", href: "/brands/iran-khodro" }],
  "haima-s7-tow-guide": [{ title: "حمل با خودروبر کفی", href: "/services/flatbed-carrier" }, { title: "ابزار انتخاب روش حمل", href: "/tools/transport-selector" }, { title: "راهنمای برندها", href: "/brands" }],
  "dignity-roadside-guide": [{ title: "حمل با خودروبر کفی", href: "/services/flatbed-carrier" }, { title: "دیاگ سیار در محل", href: "/services/mobile-diagnostics" }, { title: "امداد خودرو تهران", href: "/تهران/امداد-خودرو" }],
  "fidelity-roadside-guide": [{ title: "حمل با خودروبر کفی", href: "/services/flatbed-carrier" }, { title: "امداد خودرو شمال", href: "/شمال" }, { title: "چک‌لیست سفر شمال", href: "/blog/north-trip-car-checklist" }],
  "tow-scam-avoidance-guide": [{ title: "قوانین هماهنگی و خدمت", href: "/rules" }, { title: "تماس و رسیدگی به شکایت", href: "/contact" }, { title: "درباره خودرو چاره", href: "/about" }, { title: "امداد خودرو آنلاین", href: "/امداد-خودرو-آنلاین" }],
  "tehran-north-intercity-transport": [{ title: "حمل با خودروبر کفی", href: "/services/flatbed-carrier" }, { title: "محاسبه هزینه حمل", href: "/pricing#calculator" }, { title: "چک‌لیست تحویل به کفی", href: "/blog/flatbed-handover-checklist" }, { title: "امداد خودرو شمال", href: "/شمال" }],
  "autumn-north-driving-guide": [{ title: "بازدید پیش از سفر", href: "/services/pre-trip-check" }, { title: "امداد خودرو شمال", href: "/شمال" }, { title: "امداد خودرو رشت", href: "/رشت" }],
};

const contextualLinkRules = [
  { phrase: "امداد خودرو آنلاین تهران", href: "/تهران/امداد-خودرو" },
  { phrase: "امداد خودرو آنلاین کرج", href: "/کرج/امداد-خودرو" },
  { phrase: "امداد خودرو تهران", href: "/تهران" },
  { phrase: "امداد خودرو کرج", href: "/کرج" },
  { phrase: "امداد خودرو شمال", href: "/شمال" },
  { phrase: "امداد خودرو رشت", href: "/رشت" },
  { phrase: "امداد خودرو ساری", href: "/ساری" },
  { phrase: "امداد خودرو چالوس", href: "/چالوس" },
  { phrase: "امداد خودرو لاهیجان", href: "/لاهیجان" },
  { phrase: "امداد خودرو انزلی", href: "/بندر-انزلی" },
  { phrase: "امداد خودرو آمل", href: "/آمل" },
  { phrase: "مناطق تحت پوشش", href: "/coverage" },
  { phrase: "جاده چالوس", href: "/roads/chalus" },
  { phrase: "محور هراز", href: "/roads/haraz" },
  { phrase: "مسیر فیروزکوه", href: "/roads/firuzkuh" },
  { phrase: "آزادراه تهران–شمال", href: "/roads/tehran-north" },
  { phrase: "انتخاب یدک‌کش یا خودروبر", href: "/tools/transport-selector" },
  { phrase: "کد خطای دیاگ", href: "/tools/obd-code" },
  { phrase: "نشانه خرابی", href: "/tools/breakdown-guide" },
  { phrase: "بازیابی دسترسی خودرو", href: "/services/vehicle-access" },
  { phrase: "بازدید پیش از سفر", href: "/services/pre-trip-check" },
  { phrase: "یدک‌کش تهران", href: "/تهران/یدک-کش" },
  { phrase: "یدک‌کش کرج", href: "/کرج/یدک-کش" },
  { phrase: "مکانیک سیار تهران", href: "/تهران/مکانیک-سیار" },
  { phrase: "مکانیک سیار کرج", href: "/کرج/مکانیک-سیار" },
  { phrase: "دیاگ سیار تهران", href: "/تهران/دیاگ-سیار" },
  { phrase: "دیاگ سیار کرج", href: "/کرج/دیاگ-سیار" },
  { phrase: "کارواش سیار تهران", href: "/تهران/کارواش-سیار" },
  { phrase: "کارواش سیار کرج", href: "/کرج/کارواش-سیار" },
  { phrase: "پنچرگیری سیار", href: "/services/flat-tire" },
  { phrase: "تعویض لاستیک در محل", href: "/services/flat-tire" },
  { phrase: "باتری خودرو در محل", href: "/services/battery-replacement" },
  { phrase: "مکانیک سیار", href: "/services/mobile-mechanic" },
  { phrase: "دیاگ سیار", href: "/services/mobile-diagnostics" },
  { phrase: "کارواش سیار", href: "/services/mobile-carwash" },
  { phrase: "خودروبر", href: "/services/flatbed-carrier" },
  { phrase: "یدک‌کش", href: "/services/tow-truck" },
  { phrase: "قیمت خدمات", href: "/pricing" },
  { phrase: "امداد خودرو آنلاین", href: "/امداد-خودرو-آنلاین" },
  { phrase: "محاسبه هزینه حمل خودرو", href: "/pricing#calculator" },
  { phrase: "امداد خودرو", href: "/امداد-خودرو" },
  { phrase: "شاهین", href: "/blog/shahin-roadside-tehran-karaj" },
  { phrase: "تیگو ۷ پرو", href: "/blog/tiggo-7-pro-cvt-tehran" },
  { phrase: "پژو ۲۰۶", href: "/blog/peugeot-206-207-roadside" },
  { phrase: "پژو ۲۰۷", href: "/blog/peugeot-206-207-roadside" },
  { phrase: "دنا پلاس", href: "/blog/dena-plus-overheat-guide" },
  { phrase: "کوییک", href: "/blog/quick-saina-battery-starter" },
  { phrase: "ساینا", href: "/blog/quick-saina-battery-starter" },
  { phrase: "تیبا ۲", href: "/blog/tiba-roadside-guide" },
  { phrase: "تیبا", href: "/blog/tiba-roadside-guide" },
  { phrase: "جک J7", href: "/blog/jac-j7-diagnostics-tehran" },
  { phrase: "چانگان", href: "/blog/changan-cs35-tow-guide" },
  { phrase: "KMC K7", href: "/blog/kmc-k7-flatbed-guide" },
  { phrase: "اطلس", href: "/blog/atlas-warranty-roadside" },
  { phrase: "پژو پارس", href: "/blog/peugeot-pars-roadside" },
  { phrase: "سورن", href: "/blog/samand-soren-roadside" },
  { phrase: "سمند", href: "/blog/samand-soren-roadside" },
  { phrase: "هایما", href: "/blog/haima-s7-tow-guide" },
  { phrase: "دیگنیتی", href: "/blog/dignity-roadside-guide" },
  { phrase: "فیدلیتی", href: "/blog/fidelity-roadside-guide" },
  { phrase: "ایران‌خودرو", href: "/brands/iran-khodro" },
  { phrase: "سایپا", href: "/brands/saipa" },
  { phrase: "چری", href: "/brands/chery" },
  { phrase: "سعادت‌آباد", href: "/تهران/سعادت-آباد" },
  { phrase: "صادقیه", href: "/تهران/صادقیه" },
  { phrase: "تهرانپارس", href: "/تهران/تهرانپارس" },
  { phrase: "ستارخان", href: "/تهران/ستارخان" },
  { phrase: "نارمک", href: "/تهران/نارمک" },
  { phrase: "پونک", href: "/تهران/پونک" },
  { phrase: "زعفرانیه", href: "/تهران/زعفرانیه" },
  { phrase: "نیاوران", href: "/تهران/نیاوران" },
  { phrase: "تجریش", href: "/تهران/تجریش" },
  { phrase: "اکباتان", href: "/تهران/اکباتان" },
  { phrase: "مهرشهر", href: "/کرج/مهرشهر" },
  { phrase: "عظیمیه", href: "/کرج/عظیمیه" },
  { phrase: "گوهردشت", href: "/کرج/گوهردشت" },
  { phrase: "محله گلسار", href: "/رشت/گلسار" },
  { phrase: "محله معلم", href: "/رشت/معلم" },
  { phrase: "محله منظریه", href: "/رشت/منظریه" },
  { phrase: "باتری‌به‌باتری", href: "/services/jump-start" },
  { phrase: "تعویض باتری", href: "/services/battery-replacement" },
  { phrase: "حمل با کفی", href: "/services/flatbed-carrier" },
  { phrase: "پنچرگیری", href: "/services/flat-tire" },
  { phrase: "تعویض لاستیک", href: "/services/flat-tire" },
  { phrase: "سوخت‌رسانی", href: "/services/fuel-delivery" },
  { phrase: "عیب‌یابی", href: "/services/mobile-diagnostics" },
  { phrase: "تشخیص کلاهبرداری", href: "/blog/tow-scam-avoidance-guide" },
  { phrase: "حمل بین‌شهری", href: "/blog/tehran-north-intercity-transport" },
  { phrase: "سفر پاییزی", href: "/blog/autumn-north-driving-guide" },
  { phrase: "چک‌لیست سفر شمال", href: "/blog/north-trip-car-checklist" },
  { phrase: "بررسی پیش از خرید", href: "/blog/pre-purchase-car-inspection-guide" },
  { phrase: "امداد شبانه", href: "/blog/tehran-night-roadside-guide" },
  { phrase: "مقایسه برآورد", href: "/pricing#compare-quotes" },
  { phrase: "راهنمای نشانه‌ها", href: "/tools/breakdown-guide" },
  { phrase: "انتخاب خدمت", href: "/tools/breakdown-guide" },
  { phrase: "کد پذیرش", href: "/blog/online-roadside-assistance-request-guide" },
  { phrase: "هزینه امداد خودرو", href: "/امداد-خودرو" },
  { phrase: "درخواست امداد خودرو", href: "/امداد-خودرو" },
  { phrase: "تماس با امداد خودرو", href: "/امداد-خودرو" },
  { phrase: "امداد جاده‌ای", href: "/امداد-خودرو" },
  { phrase: "یدک‌کش و خودروبر", href: "/امداد-خودرو" },
  { phrase: "امدادگر خودرو", href: "/امداد-خودرو" },
  { phrase: "امداد تقلبی", href: "/امداد-خودرو" },
  { phrase: "امداد خودرو مطمئن", href: "/امداد-خودرو" },
  { phrase: "شرکت امداد خودرو", href: "/امداد-خودرو" },
  { phrase: "امداد در محل", href: "/امداد-خودرو" },
] as const;

function contextualText(text: string, used: Set<string>): ReactNode[] {
  const output: ReactNode[] = [];
  let remaining = text;
  let key = 0;
  while (remaining && used.size < 18) {
    const matches = contextualLinkRules
      .filter((rule) => !used.has(rule.phrase))
      .map((rule) => ({ rule, index: remaining.indexOf(rule.phrase) }))
      .filter((match) => match.index >= 0)
      .sort((a, b) => a.index - b.index || b.rule.phrase.length - a.rule.phrase.length);
    const match = matches[0];
    if (!match) break;
    if (match.index) output.push(remaining.slice(0, match.index));
    output.push(<Link key={`${match.rule.href}-${key++}`} href={match.rule.href} className="font-bold text-brand-orange underline decoration-orange-200 decoration-2 underline-offset-4 transition hover:text-orange-700">{match.rule.phrase}</Link>);
    used.add(match.rule.phrase);
    remaining = remaining.slice(match.index + match.rule.phrase.length);
  }
  if (remaining) output.push(remaining);
  return output;
}

export const dynamicParams = false;
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/** Converts "۱۰ دقیقه" into the ISO 8601 duration schema.org expects. */
function readingTimeIso(readTime: string) {
  const minutes = Number(readTime.replace(/[^\d\u06F0-\u06F9]/g, "").replace(/[\u06F0-\u06F9]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0)));
  return Number.isFinite(minutes) && minutes > 0 ? `PT${minutes}M` : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  return seoMetadata({
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [post.title, post.category, "امداد خودرو", "امداد خودرو آنلاین", "امداد خودرو تهران", "امداد خودرو کرج"],
    image: post.image,
    imageAlt: post.title,
    type: "article",
    publishedTime: post.publishedAtIso,
    modifiedTime: post.updatedAtIso ?? post.publishedAtIso ?? blogContentUpdatedAtIso,
    section: post.category,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const allSections = [...post.sections, ...(supplementalArticleSections[post.slug] ?? [])];
  const usedContextualLinks = new Set<string>();
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug && (post.relatedSlugs ? post.relatedSlugs.includes(item.slug) : item.category === post.category)).slice(0, 3);
  const serviceLinks = post.links ?? commercialLinks[post.slug] ?? [{ title: "امداد خودرو در محل", href: "/services/roadside-assistance" }, { title: "امداد خودرو تهران", href: "/تهران" }, { title: "امداد خودرو کرج", href: "/کرج" }];
  return (
    <SubpageShell>
      <StructuredData data={articleSchema({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, image: post.image, publishedAt: post.publishedAtIso, modifiedAt: post.updatedAtIso ?? post.publishedAtIso ?? blogContentUpdatedAtIso, section: post.category, keywords: [post.title, post.category, "امداد خودرو", "امداد خودرو آنلاین", "خودرو چاره"], timeRequired: readingTimeIso(post.readTime), wordCount: allSections.reduce((total, section) => total + sectionText(section).split(/\s+/u).length, 0) + (post.faqs ?? []).reduce((total, faq) => total + `${faq.question} ${faq.answer}`.trim().split(/\s+/u).length, 0), citations: post.sources })} />
      <StructuredData data={webPageSchema({ name: post.title, description: post.excerpt, path: `/blog/${post.slug}`, breadcrumb: true })} />
      <StructuredData data={breadcrumbSchema([{ name: "صفحه اصلی", path: "/" }, { name: "مجله خودرو چاره", path: "/blog" }, { name: post.title }], `/blog/${post.slug}`)} />
      {post.faqs?.length ? <StructuredData data={faqSchema(post.faqs)} /> : null}
      <article>
        <header className="bg-[#071a2e] py-14 text-white"><div className="site-container max-w-4xl"><Link href="/blog" className="text-xs font-black text-brand-orange">بازگشت به وبلاگ</Link><p className="mt-6 text-xs text-slate-400">{post.category} · {post.readTime} · <time dateTime={post.publishedAtIso}>{post.publishedAt}</time>{post.updatedAtIso && post.updatedAtIso !== post.publishedAtIso ? <> · به‌روزرسانی: <time dateTime={post.updatedAtIso}>{new Intl.DateTimeFormat("fa-IR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(post.updatedAtIso))}</time></> : null} · تحریریه خودرو چاره</p><h1 className="mt-4 text-3xl font-black leading-[1.6] md:text-5xl">{post.title}</h1><p className="mt-5 max-w-3xl text-sm leading-8 text-slate-300">{post.excerpt}</p></div></header>
        <div className="site-container max-w-4xl -mt-5 relative z-10"><div className="relative h-64 overflow-hidden rounded-2xl shadow-card md:h-[430px]"><Image src={post.image} alt={post.title} fill priority sizes="900px" className="object-cover" /></div><nav className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" dir="rtl" aria-label="فهرست مطالب مقاله"><h2 className="text-lg font-black">در این مقاله می‌خوانید</h2><ol className="mt-4 grid gap-2 md:grid-cols-2">{allSections.map((section, index) => <li key={section.title}><Link href={`#section-${index + 1}`} className="block rounded-lg bg-slate-50 px-4 py-3 text-xs font-bold leading-6 text-slate-600 transition hover:bg-orange-50 hover:text-brand-orange">{(index + 1).toLocaleString("fa-IR")}. {section.title}</Link></li>)}</ol></nav><div className="mt-6 rounded-2xl bg-white p-6 shadow-card md:p-10">{allSections.map((section, index) => <section id={`section-${index + 1}`} key={section.title} className="mb-10 scroll-mt-24 border-b border-slate-100 pb-10 last:mb-0 last:border-0 last:pb-0"><h2 className="text-xl font-black leading-9 md:text-2xl">{section.title}</h2><p className="mt-4 max-w-prose text-base leading-9 text-slate-600">{contextualText(section.body, usedContextualLinks)}</p><EditorialDetails section={section} /></section>)}{post.faqs?.length ? <section className="mt-10 border-t border-slate-100 pt-8" aria-labelledby="article-faq"><h2 id="article-faq" className="text-xl font-black md:text-2xl">سؤالات متداول</h2><div className="mt-5 space-y-3">{post.faqs.map((faq) => <details key={faq.question} className="group rounded-xl border border-slate-200 bg-slate-50 p-4"><summary className="cursor-pointer list-none text-sm font-black text-ink marker:hidden">{faq.question}<span className="float-left text-brand-orange transition group-open:rotate-45">+</span></summary><p className="mt-3 text-sm leading-8 text-slate-600">{faq.answer}</p></details>)}</div></section> : null}{post.sources?.length ? <SourceList sources={post.sources} /> : null}</div>{relatedPosts.length ? <aside className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" dir="rtl"><h2 className="text-lg font-black">مطالب مرتبط</h2><div className="mt-4 grid gap-3 md:grid-cols-3">{relatedPosts.map((related) => <Link key={related.slug} href={`/blog/${related.slug}`} className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm font-black leading-7 text-ink transition hover:border-orange-200 hover:text-brand-orange">{related.title}<span className="mt-2 block text-[10px] font-normal text-slate-400">مطالعه مقاله ←</span></Link>)}</div></aside> : null}<div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-center"><strong className="text-lg">نیاز به بررسی خودرو در محل دارید؟</strong><p className="mt-2 text-xs leading-7 text-slate-600">تشخیص قطعی ایراد فنی باید توسط متخصص و پس از بازدید انجام شود.</p><Link href="/امداد-خودرو-آنلاین#request" className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-brand-orange px-6 text-sm font-black text-white">آماده‌سازی اطلاعات درخواست</Link></div></div>
        <aside className="site-container max-w-4xl mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6" dir="rtl" aria-label="خدمات مرتبط"><h2 className="text-lg font-black">خدمات مرتبط خودرو چاره</h2><div className="mt-4 flex flex-wrap gap-3">{serviceLinks.map((item) => <Link key={item.href} href={item.href} className="rounded-lg bg-white px-4 py-3 text-sm font-black text-brand-orange shadow-sm">{item.title} ←</Link>)}</div></aside>
      </article>
    </SubpageShell>
  );
}
