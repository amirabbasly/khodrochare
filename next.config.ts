import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=(self), payment=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
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
