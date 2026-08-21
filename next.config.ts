import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [{ source: "/قیمت-خدمات", destination: "/pricing" }];
  },
  async redirects() {
    return [
      { source: "/blog/car-battery-warning-signs", destination: "/blog/نشانه-های-خرابی-باتری-خودرو", permanent: true },
      { source: "/blog/safe-towing-guide", destination: "/blog/راهنمای-یدک-کشی-ایمن", permanent: true },
      { source: "/blog/mobile-mechanic-checklist", destination: "/blog/چک-لیست-انتخاب-مکانیک-سیار", permanent: true },
    ];
  },
};

export default nextConfig;
