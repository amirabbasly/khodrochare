/**
 * North internal-linking rules for blog bodies (round 2 of the North plan).
 * Spread into `contextualLinkRules` in src/app/blog/[slug]/page.tsx.
 *
 * Two lists by design:
 * - northHubLinkRules: "امداد خودرو X" for every north city/province missing
 *   one in the page (18 cities + 3 provinces). Some fire today, the rest are
 *   future-proof for upcoming posts. Hrefs are validity-tested.
 * - northFiringLinkRules: phrases VERIFIED present in current blog bodies.
 *   The test suite asserts every one of them fires in at least one post,
 *   so no dead rule can slip in (tests/unit/north-depth.test.ts).
 */
export type NorthLinkRule = { phrase: string; href: string };

export const northHubLinkRules: NorthLinkRule[] = [
  { phrase: "امداد خودرو لنگرود", href: "/لنگرود" },
  { phrase: "امداد خودرو رودسر", href: "/رودسر" },
  { phrase: "امداد خودرو آستارا", href: "/آستارا" },
  { phrase: "امداد خودرو تالش", href: "/تالش" },
  { phrase: "امداد خودرو فومن", href: "/فومن" },
  { phrase: "امداد خودرو بابل", href: "/بابل" },
  { phrase: "امداد خودرو قائم‌شهر", href: "/قائم-شهر" },
  { phrase: "امداد خودرو قائمشهر", href: "/قائم-شهر" },
  { phrase: "امداد خودرو نوشهر", href: "/نوشهر" },
  { phrase: "امداد خودرو نور", href: "/نور" },
  { phrase: "امداد خودرو محمودآباد", href: "/محمودآباد" },
  { phrase: "امداد خودرو بابلسر", href: "/بابلسر" },
  { phrase: "امداد خودرو رامسر", href: "/رامسر" },
  { phrase: "امداد خودرو تنکابن", href: "/تنکابن" },
  { phrase: "امداد خودرو بهشهر", href: "/بهشهر" },
  { phrase: "امداد خودرو گرگان", href: "/گرگان" },
  { phrase: "امداد خودرو گنبد کاووس", href: "/گنبد-کاووس" },
  { phrase: "امداد خودرو گنبد", href: "/گنبد-کاووس" },
  { phrase: "امداد خودرو بندر ترکمن", href: "/بندر-ترکمن" },
  { phrase: "امداد خودرو علی‌آباد کتول", href: "/علی-آباد-کتول" },
  { phrase: "امداد خودرو علی‌آباد", href: "/علی-آباد-کتول" },
  { phrase: "امداد خودرو گیلان", href: "/گیلان" },
  { phrase: "امداد خودرو مازندران", href: "/مازندران" },
  { phrase: "امداد خودرو گلستان", href: "/گلستان" },
];

export const northFiringLinkRules: NorthLinkRule[] = [
  { phrase: "شمال تهران", href: "/تهران/شمال-تهران" },
  { phrase: "تهران–شمال", href: "/roads/tehran-north" },
  { phrase: "شمال", href: "/شمال" },
  { phrase: "رشت", href: "/رشت" },
  { phrase: "چالوس", href: "/چالوس" },
  { phrase: "ساری", href: "/ساری" },
  { phrase: "آمل", href: "/آمل" },
  { phrase: "گرگان", href: "/گرگان" },
  { phrase: "بهشهر", href: "/بهشهر" },
  { phrase: "آستارا", href: "/آستارا" },
  { phrase: "انزلی", href: "/بندر-انزلی" },
  { phrase: "لاهیجان", href: "/لاهیجان" },
  { phrase: "تالش", href: "/تالش" },
  { phrase: "رودسر", href: "/رودسر" },
  { phrase: "لنگرود", href: "/لنگرود" },
  { phrase: "نوشهر", href: "/نوشهر" },
  { phrase: "گیلان", href: "/گیلان" },
  { phrase: "مازندران", href: "/مازندران" },
  { phrase: "گلستان", href: "/گلستان" },
  { phrase: "هراز", href: "/roads/haraz" },
  { phrase: "فیروزکوه", href: "/roads/firuzkuh" },
  { phrase: "کندوان", href: "/roads/chalus" },
  { phrase: "گردنه حیران", href: "/آستارا" },
  { phrase: "قزوین–رشت", href: "/roads/qazvin-rasht" },
  { phrase: "آزادراه قزوین–رشت", href: "/roads/qazvin-rasht" },
];

/**
 * Round-4 exact-query firing rules (2026-10-13). Each phrase is carried
 * NATURALLY by at least one round-4 guide (verified by test), and every href
 * is a money page: dancing leaders get exact-anchor reinforcement.
 */
export const round4FiringLinkRules: NorthLinkRule[] = [
  { phrase: "امداد خودرو آزادراه تهران شمال", href: "/roads/tehran-north" },
  { phrase: "شماره امداد خودرو شمال", href: "/شمال" },
  { phrase: "یدک کش آنلاین محمودآباد", href: "/محمودآباد/یدک-کش" },
  { phrase: "یدک‌کش محمودآباد", href: "/محمودآباد/یدک-کش" },
  { phrase: "پنچرگیری سیار رشت", href: "/رشت/پنچرگیری-سیار" },
  { phrase: "مکانیک سیار رامسر", href: "/رامسر/مکانیک-سیار" },
  { phrase: "هزینه حمل خودرو با کفی", href: "/pricing" },
  { phrase: "حمل خودرو با کفی", href: "/pricing" },
  { phrase: "تعمیرکار سیار", href: "/services/mobile-mechanic" },
  { phrase: "شماره امداد خودرو تهران", href: "/تهران" },
  { phrase: "امداد خودرو کندوان", href: "/roads/chalus" },
  { phrase: "خودروبر تهران", href: "/تهران/خودروبر" },
];

/**
 * Round-5 exact-query rules (2026-10-14): twelve phrases lifted from Search
 * Console winning/edge queries. Every phrase is verified present in the blog
 * corpus (post or supplemental); tests/unit/north-depth.test.ts asserts it.
 */
export const round5FiringLinkRules: NorthLinkRule[] = [
  { phrase: "شماره امداد خودرو تنکابن", href: "/تنکابن/مکانیک-سیار" },
  { phrase: "مکانیک سیار تنکابن", href: "/تنکابن/مکانیک-سیار" },
  { phrase: "مکانیک سیار بابلسر", href: "/بابلسر/مکانیک-سیار" },
  { phrase: "مکانیک سیار گرگان", href: "/گرگان/مکانیک-سیار" },
  { phrase: "یدک کش تهران", href: "/تهران/یدک-کش" },
  { phrase: "امداد خودرو ایران خودرو", href: "/brands/iran-khodro" },
  { phrase: "امداد خودرو گیشا", href: "/تهران/گیشا" },
  { phrase: "تعمیرات خودرو سیار", href: "/services/mobile-mechanic" },
  { phrase: "پنچرگیری سیار در محل", href: "/services/flat-tire" },
  { phrase: "تعمیرکار سیار تهران", href: "/تهران/مکانیک-سیار" },
  { phrase: "دیاگ سیار خودرو", href: "/تهران/دیاگ-سیار" },
  { phrase: "امداد خودرو آنلاین نیاوران", href: "/تهران/نیاوران" },
];
