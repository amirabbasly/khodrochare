import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [{ source: "/قیمت-خدمات", destination: "/pricing" }];
  },
};

export default nextConfig;
