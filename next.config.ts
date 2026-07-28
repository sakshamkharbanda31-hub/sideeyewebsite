import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  deploymentId: process.env.DEPLOYMENT_VERSION,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;