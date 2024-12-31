import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ng.jumia.is",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www-konga-com-res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
