import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "digi-api.com",
        port: "",
        pathname: "/images/digimon/**",
      },
    ],
  },
};

export default nextConfig;
