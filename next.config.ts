import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com", // Cho phép domain của Google (ảnh trên Google Drive, Google Photos)
      },
      {
        protocol: "https",
        hostname: "**.google.com", // Thêm domain khác nếu cần
      },
      {
        protocol: "https",
        hostname: "**.incnow.com", // Thêm domain khác nếu cần
      },
    ],
  },
};

export default nextConfig;
