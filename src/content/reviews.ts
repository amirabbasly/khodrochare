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

export type ServiceFeedback = { city: string; service: string; text: string };

/**
 * Owner-supplied service feedback (2026-10-15, 30 items). Display-only: no
 * names, dates, or ratings were provided, so these are NEVER merged into
 * `customerReviews` and NEVER emitted as Review/aggregateRating schema.
 * Texts are published verbatim (no paraphrase, no invented attribution).
 */
export const serviceFeedback: ServiceFeedback[] = [
  { city: "تهران، نیاوران", service: "باتری", text: "ماشین صبح روشن نشد، باتری خوابیده بود، سریع باتری نو آوردن و راه انداختن." },
  { city: "تهران، سعادت‌آباد", service: "یدک‌کش", text: "ماشین وسط اتوبان خاموش کرد، یدک‌کش سریع رسید و بردن تعمیرگاه." },
  { city: "تهران، تجریش", service: "پنچری", text: "لاستیک ترکید، زاپاس هم نداشتم، اومدن در محل درست کردن." },
  { city: "تهران، ونک", service: "خرابی دینام", text: "دینام خراب شده بود، همون‌جا باز کردن و موقت راه انداختن تا برسم تعمیرگاه." },
  { city: "تهران، پاسداران", service: "خودروبر", text: "ماشین تصادفی بود، با خودروبر بردن، بدون دردسر و خیلی مرتب." },
  { city: "تهران، تهرانپارس", service: "مکانیک سیار", text: "ماشین جوش آورده بود، مکانیک اومد، ترموستات رو درست کرد، دیگه لازم نشد یدک بکشم." },
  { city: "تهران، صادقیه", service: "باتری", text: "باطری تموم کرده بود، تست کردن و نو انداختن، قیمت هم همون اول گفتن." },
  { city: "تهران، پیروزی", service: "یدک‌کش", text: "ماشین استارت نمی‌خورد، بردن نمایندگی، برخوردشون خیلی خوب بود." },
  { city: "رشت", service: "پنچری", text: "توی بارون لاستیک پنچر شد، سریع اومدن و عوض کردن." },
  { city: "رشت", service: "خرابی پمپ بنزین", text: "ماشین وسط راه خاموش می‌کرد، فهمیدن پمپ بنزینه، همون‌جا درست کردن." },
  { city: "بندرانزلی", service: "یدک‌کش", text: "ماشین تو جاده انزلی خراب شد، یدک‌کش اومد و برد تعمیرگاه تو شهر." },
  { city: "لاهیجان", service: "مکانیک سیار", text: "صدای عجیب از موتور می‌اومد، مکانیک اومد و تسمه رو تنظیم کرد." },
  { city: "لنگرود", service: "باتری", text: "صبح ماشین روشن نشد، باتری آوردن و نصب کردن، خیلی سریع." },
  { city: "آستارا", service: "خودروبر", text: "ماشینم تو گردنه حیران خراب شد، با خودروبر آوردن پایین، خیلی حرفه‌ای بودن." },
  { city: "رودسر", service: "پنچری", text: "لاستیک پاره شده بود، زاپاس نداشتم، لاستیک نو آوردن و انداختن." },
  { city: "فومن", service: "یدک‌کش", text: "ماشین تو راه ماسوله خاموش کرد، یدک کشیدن تا فومن." },
  { city: "ماسال", service: "خرابی رادیاتور", text: "آب رادیاتور خالی کرده بود و جوش آورده بود، موقت درست کردن تا برسم شهر." },
  { city: "صومعه‌سرا", service: "مکانیک سیار", text: "ماشین ریپ می‌زد، شمع‌ها رو عوض کردن، درست شد." },
  { city: "ساری", service: "باتری", text: "باتری داغ کرده بود و ماشین خاموش شد، سریع عوض کردن." },
  { city: "بابل", service: "یدک‌کش", text: "تصادف کرده بودم، یدک‌کش اومد و ماشین رو برد پارکینگ." },
  { city: "آمل", service: "پنچری", text: "تو جاده هراز لاستیک ترکید، اومدن و درست کردن." },
  { city: "چالوس", service: "خرابی گیربکس", text: "دنده جا نمی‌رفت، مکانیک اومد و گفت باید بره تعمیرگاه، با یدک بردن." },
  { city: "نوشهر", service: "خودروبر", text: "ماشین لوکس بود، با خودروبر کفی بردن، خیلی مراقب بودن." },
  { city: "رامسر", service: "مکانیک سیار", text: "ماشین تو جواهرده خراب شد، اومدن بالا و راه انداختن." },
  { city: "تنکابن", service: "باتری", text: "برق ماشین قطع شده بود، فیوز اصلی سوخته بود، درست کردن." },
  { city: "قائم‌شهر", service: "یدک‌کش", text: "ماشین وسط جاده فیروزکوه خاموش کرد، یدک کشیدن تا قائمشهر." },
  { city: "بابلسر", service: "پنچری", text: "مسافر بودم، لاستیک پنچر شد، سریع اومدن لب ساحل و درست کردن." },
  { city: "گرگان", service: "خرابی استارت", text: "استارت نمی‌خورد، استارت رو باز کردن و ذغالش رو عوض کردن." },
  { city: "علی‌آباد کتول", service: "مکانیک سیار", text: "ماشین تو جاده جنگلی خراب شد، اومدن و سیم‌کشی رو درست کردن." },
  { city: "بندرترکمن", service: "یدک‌کش", text: "ماشین تو جاده گرگان خراب شد، یدک‌کش اومد و برد گرگان." },
];
