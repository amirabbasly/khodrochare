export const coverageNetworkAverage = [
  { value: 30, label: "امدادگر" },
  { value: 3, label: "نمایندگی قطعات" },
  { value: 5, label: "تعمیرگاه" },
  { value: 1, label: "شرکت واردات قطعات خاص" },
] as const;
/** Business-owner supplied averages, not real-time counts or individual branch addresses. */
export const coverageNetworkNote = "میانگین اعلام‌شده مجموعه در هر شهر تحت پوشش؛ این اعداد تعداد نیروهای آزاد یا ظرفیت لحظه‌ای اعزام نیستند. موجودی قطعه، پذیرش تعمیرگاه و امکان خدمت باید هماهنگ شود.";
export const mapRegions = [
  { name: "تهران", city: "تهران", x: 43, y: 31, labelX: 51, labelY: 43 },
  { name: "البرز", city: "کرج", x: 35, y: 27, labelX: 17, labelY: 36 },
  { name: "گیلان", city: "رشت", x: 30, y: 19, labelX: 19, labelY: 9 },
  { name: "مازندران", city: "ساری", x: 46, y: 24, labelX: 53, labelY: 8 },
  { name: "گلستان", city: "گرگان", x: 57, y: 19, labelX: 79, labelY: 21 },
] as const;
export const mapServices = [
  { title: "امداد خودرو در محل", href: "/services/roadside-assistance", local: "امداد-خودرو", description: "عیب‌یابی اولیه و رفع خرابی‌های قابل‌تعمیر در محل" },
  { title: "یدک کش تهران و کرج", href: "/services/tow-truck", local: "یدک-کش", description: "حمل خودرو پس از بررسی نوع گیربکس، چرخ‌ها و مسیر" },
  { title: "خودروبر تهران و کرج", href: "/services/flatbed-carrier", local: "خودروبر", description: "حمل ایمن خودروهای لوکس، صفر، تصادفی یا غیرقابل حرکت" },
  { title: "مکانیک سیار تهران و کرج", href: "/services/mobile-mechanic", local: "مکانیک-سیار", description: "اعزام مکانیک برای عیب‌یابی و تعمیرات مجاز در محل" },
] as const;
export function normalizeCitySearch(value: string) {
  return value.replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\s\u200c-]+/g, "").trim();
}
export type MapCity = { slug: string; name: string; province: string };
