export type SeoLocation = {
  slug: string;
  name: string;
  region: string;
  description: string;
  keywords: readonly string[];
  areas: readonly string[];
};

export const seoLocations = {
  tehran: { slug: "تهران", name: "تهران", region: "استان تهران", description: "امداد خودرو آنلاین و شبانه‌روزی در همه مناطق تهران، از شمال تا جنوب و شرق تا غرب، همراه با پوشش اسلامشهر و اعزام معمولاً کمتر از ۳۰ دقیقه.", keywords: ["امداد خودرو تهران", "امداد خودرو آنلاین تهران", "امداد خودرو شبانه روزی تهران"], areas: ["شمال تهران؛ نیاوران، زعفرانیه، تجریش و پاسداران", "شرق تهران و بزرگراه‌های امام علی، بابایی و باقری", "غرب تهران و مسیرهای همت، حکیم، ستاری و آزادگان", "مرکز و جنوب تهران", "اسلامشهر و مسیرهای قابل دسترسی اطراف تهران"] },
  karaj: { slug: "کرج", name: "کرج", region: "استان البرز", description: "امداد خودرو آنلاین و شبانه‌روزی در همه مناطق کرج با خدمات امداد در محل، باتری، پنچرگیری، مکانیک سیار، یدک‌کش و خودروبر و اعزام معمولاً کمتر از ۳۰ دقیقه.", keywords: ["امداد خودرو کرج", "امداد خودرو آنلاین کرج", "امداد خودرو شبانه روزی کرج"], areas: ["مرکز کرج، جهانشهر و عظیمیه", "گوهردشت، باغستان و حصارک", "مهرشهر، کیانمهر و محمدشهر", "فردیس، کمالشهر و حومه کرج", "محور تهران–کرج و مسیرهای دسترسی اطراف"] },
} satisfies Record<string, SeoLocation>;

export const seoRegions = {
  eastTehran: { citySlug: "تهران", slug: "شرق-تهران", name: "شرق تهران", description: "راهنمای دریافت امداد خودرو، یدک‌کش، باتری و مکانیک سیار در شرق تهران." },
  westTehran: { citySlug: "تهران", slug: "غرب-تهران", name: "غرب تهران", description: "راهنمای دریافت امداد خودرو، یدک‌کش، باتری و مکانیک سیار در غرب تهران." },
} as const;

// Neighborhood pages stay empty until the operations team confirms real coverage.
export const verifiedNeighborhoods: readonly string[] = [];
