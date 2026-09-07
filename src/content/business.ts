/**
 * Single source of truth for the business NAP (Name / Address / Phone) facts.
 *
 * Everything that prints or marks up the business identity — the JSON-LD
 * Organization node, the site footer, /contact and /about — reads from here, so
 * the data can never drift apart. Google's local algorithms and quality raters
 * compare the NAP on the site with Google Business Profile and directories; a
 * single mismatch weakens the whole local signal.
 *
 * Keep these values byte-identical to the Google Business Profile listing.
 */
export const businessFacts = {
  name: "خودرو چاره",
  emergencyPhone: "09123022064",
  complaintPhone: "09397979861",
  /** International format used inside structured data. */
  emergencyPhoneE164: "+989123022064",
  complaintPhoneE164: "+989397979861",
  email: "info@khodrochare.ir",
  address: "تهران، خیابان آزادی، جنب تعمیرات یدکی چاره، پلاک ۱۲۱، واحد ۱۴",
  /** Structured address parts for schema.org PostalAddress. */
  addressParts: {
    streetAddress: "خیابان آزادی، جنب تعمیرات یدکی چاره، پلاک ۱۲۱، واحد ۱۴",
    addressLocality: "تهران",
    addressRegion: "تهران",
    addressCountry: "IR",
  },
  availability: "پاسخ‌گویی ۲۴ ساعته در تمام ۷ روز هفته",
  openingHoursText: "شبانه‌روزی، همه روزها از ۰۰:۰۰ تا ۲۳:۵۹",
  dispatchTime: "اعزام معمولاً کمتر از ۳۰ دقیقه",
  experience: "بیش از ۱۵ سال پیشینه فعالیت تیم اجرایی در خدمات خودرو",
  networkSize: "شبکه حدود ۱۰۰ امدادگر فعال",
  coverage: "پوشش مناطق ۲۲گانه تهران و مناطق فعال کرج و حومه",
  /** Social profiles; the same URLs are published as schema.org `sameAs` and as `rel="me"` links. */
  social: {
    instagram: "https://www.instagram.com/khodrochare",
    bale: "https://web.bale.ai/chat?uid=6102593448",
  },
  services: [
    "امداد خودرو در محل",
    "یدک‌کش و خودروبر",
    "مکانیک و دیاگ سیار",
    "باتری و برق خودرو",
    "پنچرگیری و تعویض لاستیک",
    "سوخت‌رسانی اضطراری",
    "کارواش سیار",
  ],
} as const;

/** `sameAs` list for the Organization node (kept in sync with the footer links). */
export const sameAsProfiles: string[] = [businessFacts.social.instagram, businessFacts.social.bale];
