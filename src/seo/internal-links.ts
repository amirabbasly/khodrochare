export const persianServiceRoutes = [
  { slug: "امداد-خودرو", serviceSlug: "roadside-assistance", title: "امداد خودرو" },
  { slug: "یدک-کش", serviceSlug: "tow-truck", title: "یدک‌کش و حمل خودرو" },
  { slug: "خودروبر", serviceSlug: "flatbed-carrier", title: "خودروبر و حمل با کفی" },
  { slug: "مکانیک-سیار", serviceSlug: "mobile-mechanic", title: "مکانیک سیار" },
  { slug: "باتری-خودرو", serviceSlug: "battery-replacement", title: "باتری خودرو" },
  { slug: "پنچرگیری-سیار", serviceSlug: "flat-tire", title: "پنچرگیری سیار" },
  { slug: "کارواش-سیار", serviceSlug: "mobile-carwash", title: "کارواش سیار" },
  { slug: "دیاگ-سیار", serviceSlug: "mobile-diagnostics", title: "دیاگ سیار" },
  { slug: "سوخت-رسانی-اضطراری", serviceSlug: "fuel-delivery", title: "سوخت‌رسانی اضطراری" },
] as const;

export function cityServicePath(citySlug: string, serviceSlug: string) {
  return `/${citySlug}/${serviceSlug}`;
}
