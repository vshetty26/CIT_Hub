import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  // no transpilePackages needed — Three.js & R3F ship ESM by default
  images: {
    // Required in Next.js 16 – restrict allowed quality values
    qualities: [50, 75, 85],
    // Serve AVIF first (20% smaller than WebP), fall back to WebP
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 31 days to avoid re-encoding on every visit
    minimumCacheTTL: 2678400,
  },
};

export default nextConfig;
