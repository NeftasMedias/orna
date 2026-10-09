import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // Share images read these files. Bundle them in case an image is regenerated on the server.
  outputFileTracingIncludes: {
    "/opengraph-image": ["./assets/fonts/**"],
    "/products/[slug]/opengraph-image": ["./assets/fonts/**", "./public/products/**"],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
