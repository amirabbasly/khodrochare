import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "خودرو چاره | اپلیکیشن امداد خودرو آنلاین",
    short_name: "خودرو چاره",
    description: "اپلیکیشن امداد خودرو چاره؛ امداد خودرو آنلاین، یدک‌کش، مکانیک سیار و باتری در تهران، کرج و شمال.",
    start_url: "/?utm_source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#091321",
    theme_color: "#091321",
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
