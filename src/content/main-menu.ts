/** Menu entries use existing destinations; unreleased services enter the related hub. */
export type MainMenuGroup = { label: string; href: string; children?: { label: string; href: string }[] };
export const mainMenu: MainMenuGroup[] = [
  { label: "امداد خودرو", href: "/امداد-خودرو", children: [
    { label: "حمل خودرو", href: "/services/tow-truck" },
    { label: "امداد خودرو در محل", href: "/services/roadside-assistance" },
    { label: "کارواش سیار", href: "/services/mobile-carwash" },
    { label: "سرویس دوره ای خودرو در محل", href: "/services/mobile-mechanic" },
  ] },
  { label: "تالار خودرو", href: "/car-market", children: [
    { label: "تالار خرید و فروش خودرو", href: "/car-market" },
    { label: "ثبت آگهی", href: "/car-market" },
    { label: "کارشناسی تا فروش 24 ساعته", href: "/car-market" },
  ] },
  { label: "بیمه بازار", href: "/app", children: [
    { label: "شرایط عضویت بیمه گذار", href: "/partners" },
    { label: "بازار بیمه", href: "/app" },
    { label: "بیمه رایگان امدادی", href: "/app" },
  ] },
  { label: "جمعه بازار لوازم یدکی", href: "/friday-market", children: [
    { label: "طرح نمایندگی خودرو چاره", href: "/partners" },
    { label: "برق و باتری", href: "/battery" },
    { label: "گیربکس و قطعات اصلی", href: "/friday-market" },
    { label: "بدنه", href: "/friday-market" },
    { label: "تزئین و تیونینگ", href: "/friday-market" },
  ] },
  { label: "دیاگ با هوش مصنوعی", href: "/assistant" },
  { label: "واردات خودرو", href: "/imports", children: [
    { label: "شریک تجاری اوکیان", href: "/imports" },
  ] },
  { label: "مجله", href: "/blog" },
];
