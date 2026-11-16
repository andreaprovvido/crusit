import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Project Pages URL: https://andreaprovvido.github.io/crusit/
  ...(isGhPages
    ? {
        basePath: "/crusit",
        assetPrefix: "/crusit/",
      }
    : {}),
  trailingSlash: true,
};

export default nextConfig;
