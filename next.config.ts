import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only local images are used; no remotePatterns, so /_next/image cannot proxy arbitrary hosts.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  allowedDevOrigins: ["192.168.29.6"],
  compress: true,

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
