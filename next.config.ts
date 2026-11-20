import type { NextConfig } from "next";

// GitHub Pages serves this project at https://<user>.github.io/<repo>/,
// so every route and asset lives under /<repo>. Must match the repo name.
const basePath = "/shipyard";

const nextConfig: NextConfig = {
  output: "export", // static HTML in out/, no Node server needed
  basePath,
  trailingSlash: true, // /products/x/ -> out/products/x/index.html, which Pages serves directly
  images: {
    // GitHub Pages has no image optimizer. next/image still gives lazy loading,
    // reserved space (no CLS) and preload hints; source images are pre-sized WebP.
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
