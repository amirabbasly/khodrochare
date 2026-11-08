/** Lightweight menu data. Unit tests keep this projection aligned with canonical profiles. */
export const navigationBrands = [
  {
    "slug": "iran-khodro",
    "name": "ایران خودرو",
    "latin": "Iran Khodro"
  },
  {
    "slug": "saipa",
    "name": "سایپا",
    "latin": "SAIPA"
  },
  {
    "slug": "toyota",
    "name": "تویوتا",
    "latin": "Toyota"
  },
  {
    "slug": "hyundai",
    "name": "هیوندای",
    "latin": "Hyundai"
  },
  {
    "slug": "kia",
    "name": "کیا",
    "latin": "Kia"
  },
  {
    "slug": "mazda",
    "name": "مزدا",
    "latin": "Mazda"
  },
  {
    "slug": "mvm",
    "name": "ام‌وی‌ام",
    "latin": "MVM"
  },
  {
    "slug": "chery",
    "name": "چری",
    "latin": "Chery"
  },
  {
    "slug": "renault",
    "name": "رنو",
    "latin": "Renault"
  },
  {
    "slug": "nissan",
    "name": "نیسان",
    "latin": "Nissan"
  },
  {
    "slug": "bmw",
    "name": "بی‌ام‌و",
    "latin": "BMW"
  },
  {
    "slug": "mercedes-benz",
    "name": "مرسدس بنز",
    "latin": "Mercedes-Benz"
  }
] as const;
export const navigationRegions = [
  {
    "slug": "تهران",
    "name": "تهران"
  },
  {
    "slug": "کرج",
    "name": "کرج"
  },
  {
    "slug": "شمال",
    "name": "شمال"
  }
] as const;
export function regionalBrandPath(region: string, brand: string) { return `/${region}/brands/${brand}`; }
