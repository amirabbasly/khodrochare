import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "خودرو چاره",
    short_name: "خودرو چاره",
    description: "امداد خودرو، مکانیک و خدمات خودرویی در محل",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7f9",
    theme_color: "#071a2e",
    lang: "fa",
    dir: "rtl",
    icons: [
      { src: "/app-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/app-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
