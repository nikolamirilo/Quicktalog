import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.logotypes101.com",
      },
      {
        protocol: "https",
        hostname: "st.depositphotos.com",
      },
      {
        protocol: "https",
        hostname: "restoranplato.rs",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "logo.clearbit.com",
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
