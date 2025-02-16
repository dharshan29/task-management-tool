import type { NextConfig } from "next";
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"], 
  },
};

export default nextConfig;
