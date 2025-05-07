import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "8443",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'associate-surprise-executive-liked.trycloudflare.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com", // Allow Google domains (images on Google Drive, Google Photos)
      },
      {
        protocol: "https",
        hostname: "**.example.com", // Allow Google domains (images on Google Drive, Google Photos)
      },
      {
        protocol: "https",
        hostname: "**.black-absolute-damselfly-439.mypinata.cloud", // Allow Google domains (images on Google Drive, Google Photos)
      },
      {
        protocol: "https",
        hostname: "**.google.com", // Add other domains if needed
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com", // Add other domains if needed
      },
      {
        protocol: "https",
        hostname: "**.incnow.com", // Add other domains if needed
      },
      {
        protocol: "https",
        hostname: "**.vietqr.io", // Add other domains if needed
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
    ], // Comma added here to separate domains and remotePatterns
  },
};

export default nextConfig;
