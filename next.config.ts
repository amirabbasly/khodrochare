import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/قیمت-خدمات", destination: "/pricing", permanent: true },
      { source: "/blog/مناطق-تحت-پوشش-خودرو-چاره", destination: "/blog/car-assistance-coverage-tehran-karaj", permanent: true },
      { source: "/blog/نشانه-های-خرابی-باتری-خودرو", destination: "/blog/car-battery-warning-signs", permanent: true },
      { source: "/blog/راهنمای-یدک-کشی-ایمن", destination: "/blog/safe-towing-guide", permanent: true },
      { source: "/blog/چک-لیست-انتخاب-مکانیک-سیار", destination: "/blog/mobile-mechanic-checklist", permanent: true },
    ];
  },
};

export default nextConfig;
