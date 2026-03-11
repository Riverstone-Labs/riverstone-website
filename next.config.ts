import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    qualities: [75, 85],
  },
};

export default nextConfig;
