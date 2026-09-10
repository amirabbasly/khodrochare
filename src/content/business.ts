export const businessFacts = {
  baleUrl: "https://ble.ir/khodrochare",
  coverageSummary: "تهران، کرج، گیلان، مازندران و گلستان",
  emergencyPhone: "09123022064",
  complaintPhone: "09397979861",
  email: "info@khodrochare.ir",
  address: "تهران، خیابان آزادی، جنب تعمیرات یدکی چاره، پلاک ۱۲۱، واحد ۱۴",
  availability: "پاسخ‌گویی ۲۴ ساعته در تمام ۷ روز هفته",
  dispatchTime: "اعلام زمان اعزام پس از بررسی موقعیت و ظرفیت",
  experience: "پیشینه اجرایی تیم در خدمات خودرو",
  networkSize: "شبکه همکاران امداد و حمل خودرو",
  coverage: "پوشش تهران، کرج و شبکه فعال شمال کشور در گیلان، مازندران و گلستان",
  services: [
    "امداد خودرو در محل",
    "یدک‌کش و خودروبر",
    "مکانیک و دیاگ سیار",
    "باتری و برق خودرو",
    "پنچرگیری و تعویض لاستیک",
    "سوخت‌رسانی اضطراری",
    "کارواش سیار",
  ],
  /**
   * Real team members shown on /about (E-E-A-T). Empty = section hidden.
   * Only add real people with real roles; never placeholder names.
   */
  team: [] as readonly { name: string; role: string; bio: string; image?: string }[],
  /**
   * Trust-badge verification links shown in the footer. Empty string = badge hidden.
   * Paste the real verification URLs (enamad.ir trust seal page, e-cer/union page) here.
   */
  trustBadges: { enamadUrl: "", unionUrl: "" },
} as const;
