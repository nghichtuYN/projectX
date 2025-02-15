import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com", // Allow Google domains (images on Google Drive, Google Photos)
      },
      {
        protocol: "https",
        hostname: "**.google.com", // Add other domains if needed
      },
      {
        protocol: "https",
        hostname: "**.incnow.com", // Add other domains if needed
      },
      {
        protocol: "https",
        hostname: "**.github.com", // Add other domains if needed
      },
      {
        protocol: "https",
        hostname: "**.vercel-storage.com", // Add other domains if needed
      },
      {
        protocol: "https",
        hostname: "github.com", // Add github.com domain
      },
    ],
  },
};

export default nextConfig;
