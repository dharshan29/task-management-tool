import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
    };

    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"], // ✅ Allow Google-hosted images
  },
};

export default nextConfig;
