export type CustomerReview = {
  /** Short headline shown above the review, e.g. "خیال‌مان راحت شد". */
  title?: string;
  /** Customer first name + initial only, e.g. "علی م." — never full identity without consent. */
  name: string;
  service: string;
  city: string;
  /** ISO date, e.g. "2026-08-20". */
  dateIso: string;
  /** Persian display date, e.g. "۲۹ مرداد ۱۴۰۵". */
  dateLabel: string;
  /** 1–5. Only the real score the customer gave. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** The customer's own words. Never invent or paraphrase into marketing copy. */
  text: string;
};

/**
 * REAL customer reviews only — each entry below was supplied by the business owner
 * from genuine post-service feedback. Keep every review visible on the page that
 * carries its Review JSON-LD (the SEO audit fails pages whose structured data
 * is not visible).
 *
 * AggregateRating is emitted automatically on the Organization node once there are
 * 5+ reviews (see schemas.ts); the production SEO audit requires reviewCount >= 5
 * for any aggregateRating it finds. Never add ratings for services not rendered.
 */
export const customerReviews: readonly CustomerReview[] = [
  {
    title: "خیال‌مان راحت شد",
    name: "الهام ر.",
    service: "یدک‌کش کفی",
    city: "تهران، صادقیه",
    dateIso: "2025-10-10",
    dateLabel: "۱۸ مهر ۱۴۰۴",
    rating: 5,
    text: "۱۵ دقیقه‌ای رسیدند؛ برخورد محترمانه و قیمت از قبل اعلام شد و همون اجرا شد. استرس من و بچه‌ها واقعاً کم شد.",
  },
  {
    title: "حل مشکل روشن‌نشدن در جا",
    name: "مهدی ک.",
    service: "مکانیک سیار + دیاگ",
    city: "تهران، قلهک",
    dateIso: "2025-09-20",
    dateLabel: "۲۹ شهریور ۱۴۰۴",
    rating: 5,
    text: "نیمه‌شب تکنسین با دستگاه دیاگ مشکل رو پیدا کرد و همون‌جا رفع شد. پیگیری پشتیبانی هم عالی بود.",
  },
  {
    title: "سریع و منصفانه",
    name: "رضا م.",
    service: "باتری‌به‌باتری",
    city: "تهران، چیتگر",
    dateIso: "2025-08-02",
    dateLabel: "۱۱ مرداد ۱۴۰۴",
    rating: 5,
    text: "قیمت منطقی و انجام کار سریع؛ پیامک اطلاعات کارشناس هم قبل از رسیدن ارسال شد. پیشنهاد می‌کنم.",
  },
  {
    title: "ایمنی و نظم در کنار خیابان",
    name: "ستاره الف.",
    service: "پنچرگیری سیار",
    city: "تهران، ولیعصر",
    dateIso: "2025-06-24",
    dateLabel: "۳ تیر ۱۴۰۴",
    rating: 5,
    text: "ابزار کامل، توضیح شفاف مراحل و رعایت نکات ایمنی. تجربه تمیز و سریع بود.",
  },
  {
    title: "هماهنگی عالی با راهور",
    name: "شهاب د.",
    service: "یدک‌کش",
    city: "تهران، تهرانپارس",
    dateIso: "2025-07-15",
    dateLabel: "۲۴ تیر ۱۴۰۴",
    rating: 5,
    text: "خرابی نزدیک بزرگراه بود؛ تیم سریع رسید و هماهنگی با راهور هم بی‌دردسر انجام شد.",
  },
  {
    title: "پاسخ‌گویی شبانه‌روزی واقعی",
    name: "آیدا س.",
    service: "سوخت‌رسانی",
    city: "تهران، نیاوران",
    dateIso: "2025-05-29",
    dateLabel: "۸ خرداد ۱۴۰۴",
    rating: 5,
    text: "ساعت ۳ صبح تماس گرفتم؛ کمتر از نیم‌ساعت مشکل حل شد. واقعاً ۲۴/۷ هستند.",
  },
];
