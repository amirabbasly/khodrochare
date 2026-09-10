/** Explicit legacy URLs only: never turn unknown city/service combinations into soft 404s. */
export const legacyRedirects: Readonly<Record<string, string>> = {
  "/قیمت-خدمات": "/pricing",
  "/blog/مناطق-تحت-پوشش-خودرو-چاره": "/blog/car-assistance-coverage-tehran-karaj",
  "/blog/نشانه-های-خرابی-باتری-خودرو": "/blog/car-battery-warning-signs",
  "/blog/راهنمای-یدک-کشی-ایمن": "/blog/safe-towing-guide",
  "/blog/چک-لیست-انتخاب-مکانیک-سیار": "/blog/mobile-mechanic-checklist",
  "/خودروبر": "/services/flatbed-carrier",
  "/یدک-کش": "/services/tow-truck",
  "/مکانیک-سیار": "/services/mobile-mechanic",
  "/کارواش-سیار": "/services/mobile-carwash",
  "/feed": "/blog/feed.xml",
  "/rss.xml": "/blog/feed.xml",
  "/تهران/تهران-پارس": "/تهران/تهرانپارس",
  "/تهران/سعادت‌آباد": "/تهران/سعادت-آباد",
  "/قائمشهر": "/قائم-شهر",
  "/علی‌آباد-کتول": "/علی-آباد-کتول",
};
