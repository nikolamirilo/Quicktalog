import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hostnames
      },
      {
        protocol: "http",
        hostname: "**", // allow all http domains too (if needed)
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
