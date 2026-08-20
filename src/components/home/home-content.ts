export const navLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "خدمات", href: "/services" },
  { label: "فروشگاه", href: "/store" },
  { label: "محدوده پوشش", href: "/coverage" },
  { label: "اپلیکیشن", href: "/app" },
  { label: "دستیار هوشمند", href: "/assistant" },
  { label: "قوانین و مقررات", href: "/rules" },
  { label: "وبلاگ", href: "/blog" },
] as const;

export const serviceTiles = [
  { title: "امداد و یدک‌کش", icon: "truck" },
  { title: "باتری و برق", icon: "battery" },
  { title: "کارواش سیار", icon: "car" },
  { title: "لوازم یدکی", icon: "gear" },
] as const;

export const miniServices = [
  {
    title: "باتری و برق",
    desc: "تست باتری، باتری به باتری و رفع ایراد برقی خودرو در محل.",
    image: "/images/service-battery.webp",
    position: "70% center",
  },
  {
    title: "مکانیک سیار",
    desc: "اعزام مکانیک متخصص برای عیب‌یابی و تعمیرات سبک در محل.",
    image: "/images/service-mechanic.webp",
    position: "70% center",
  },
  {
    title: "لوازم یدکی",
    desc: "ارسال قطعات مصرفی و اصلی با ضمانت اصالت کالا.",
    image: "/images/parts-catalog.webp",
    position: "76% center",
  },
] as const;

export const products = [
  { title: "تیغه برف‌پاک‌کن", price: "۷۵۰,۰۰۰", image: "/images/products/wiper.webp", rating: "۴.۸" },
  { title: "روغن موتور", price: "۱,۲۵۰,۰۰۰", image: "/images/products/oil.webp", rating: "۴.۹" },
  { title: "لنت ترمز جلو", price: "۹۹۰,۰۰۰", image: "/images/products/brake.png", rating: "۴.۷" },
  { title: "فیلتر روغن", price: "۳۲۰,۰۰۰", image: "/images/products/filter.png", rating: "۴.۹" },
  { title: "باتری خودرو", price: "۲,۴۶۰,۰۰۰", image: "/images/products/battery.webp", rating: "۴.۸" },
] as const;

export const processSteps = [
  { title: "ثبت درخواست", desc: "نوع خدمت و موقعیت خود را وارد کنید.", icon: "form" },
  { title: "تأیید و اعزام", desc: "متخصص نزدیک شما درخواست را می‌پذیرد.", icon: "truck" },
  { title: "پیگیری زنده", desc: "مسیر رسیدن متخصص را لحظه‌ای ببینید.", icon: "pin" },
] as const;

export const trustItems = [
  { title: "خدمات مطمئن", desc: "متخصصان ارزیابی‌شده", image: "/images/trust-safe.svg" },
  { title: "قیمت منصفانه", desc: "اعلام هزینه پیش از شروع", image: "/images/trust-price.svg" },
  { title: "تضمین کیفیت", desc: "گارانتی خدمت و قطعه", image: "/images/quality-guarantee.svg" },
  { title: "پشتیبانی ۲۴/۷", desc: "پاسخ‌گویی شبانه‌روزی", image: "/images/trust-247.svg" },
] as const;

export const brands = [
  { key: "ikco", name: "ایران خودرو" },
  { key: "saipa", name: "سایپا" },
  { key: "hyundai", name: "هیوندای" },
  { key: "kia", name: "کیا" },
  { key: "toyota", name: "تویوتا" },
  { key: "mazda", name: "مزدا" },
  { key: "mvm", name: "مدیران خودرو" },
  { key: "chery", name: "چری" },
] as const;

export const legalNavLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "خدمات", href: "/services" },
  { label: "فروشگاه", href: "/store" },
  { label: "قوانین و مقررات", href: "/rules" },
  { label: "تماس", href: "/#contact" },
] as const;
