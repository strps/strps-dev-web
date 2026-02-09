import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"], //TODO: add more domains as needed, or consider using a custom loader for dynamic sources
  },

};

export default nextConfig;
