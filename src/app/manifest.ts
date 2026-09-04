import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "خودرو چاره | امداد خودرو آنلاین تهران و کرج",
    short_name: "خودرو چاره",
    description: "امداد خودرو آنلاین، یدک‌کش، خودروبر، مکانیک سیار، باتری و خدمات خودرو در محل در تهران و کرج.",
    start_url: "/?utm_source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f5f7f9",
    theme_color: "#071a2e",
    lang: "fa",
    dir: "rtl",
    categories: ["automotive", "business", "utilities"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/app-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      { name: "درخواست امداد خودرو", short_name: "درخواست امداد", url: "/#request", icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }] },
      { name: "خدمات خودرو", short_name: "خدمات", url: "/services", icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }] },
      { name: "دستیار هوشمند", short_name: "دستیار", url: "/assistant", icons: [{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }] },
    ],
  };
}
