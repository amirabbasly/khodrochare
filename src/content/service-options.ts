/** Labels shared by interactive tools; deliberately excludes the large editorial dataset. */
export const serviceOptions = [
  { value: "roadside-assistance", label: "امداد خودرو در محل", transport: false },
  { value: "tow-truck", label: "یدک‌کش", transport: true },
  { value: "flatbed-carrier", label: "خودروبر کفی", transport: true },
  { value: "mobile-mechanic", label: "مکانیک سیار", transport: false },
  { value: "battery-replacement", label: "تست و تعویض باتری", transport: false },
  { value: "jump-start", label: "باتری به باتری", transport: false },
  { value: "flat-tire", label: "پنچرگیری و تعویض چرخ", transport: false },
  { value: "mobile-diagnostics", label: "دیاگ سیار", transport: false },
  { value: "fuel-delivery", label: "سوخت‌رسانی", transport: false },
  { value: "vehicle-access", label: "بازیابی دسترسی با تأیید مالکیت", transport: false },
  { value: "pre-trip-check", label: "بازدید فنی پیش از سفر", transport: false },
  { value: "mobile-carwash", label: "کارواش سیار با رزرو", transport: false },
] as const;
export const requestRegions = ["تهران", "کرج و حومه", "گیلان", "مازندران", "گلستان"] as const;
