import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  // no transpilePackages needed — Three.js & R3F ship ESM by default
};

export default nextConfig;
