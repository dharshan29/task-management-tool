import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"), 
    };
    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
