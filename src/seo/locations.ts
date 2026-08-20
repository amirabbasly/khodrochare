export type SeoLocation = {
  slug: string;
  name: string;
  region: string;
  description: string;
  keywords: readonly string[];
};

export const seoLocations = {
  tehran: { slug: "تهران", name: "تهران", region: "استان تهران", description: "خدمات امداد خودرو و خدمات خودرو در محل در تهران با تمرکز بر هماهنگی امدادگر، یدک‌کش و متخصص مناسب.", keywords: ["امداد خودرو تهران", "امداد خودرو آنلاین تهران", "امداد خودرو شبانه روزی تهران"] },
  karaj: { slug: "کرج", name: "کرج", region: "استان البرز", description: "خدمات امداد خودرو و خودرو در محل در کرج با ثبت درخواست برای امداد، باتری، پنچری، مکانیک و حمل خودرو.", keywords: ["امداد خودرو کرج", "امداد خودرو آنلاین کرج", "امداد خودرو شبانه روزی کرج"] },
} satisfies Record<string, SeoLocation>;

export const seoRegions = {
  eastTehran: { citySlug: "تهران", slug: "شرق-تهران", name: "شرق تهران", description: "راهنمای دریافت امداد خودرو، یدک‌کش، باتری و مکانیک سیار در شرق تهران." },
  westTehran: { citySlug: "تهران", slug: "غرب-تهران", name: "غرب تهران", description: "راهنمای دریافت امداد خودرو، یدک‌کش، باتری و مکانیک سیار در غرب تهران." },
} as const;

// Neighborhood pages stay empty until the operations team confirms real coverage.
export const verifiedNeighborhoods: readonly string[] = [];
