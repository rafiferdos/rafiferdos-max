import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Avoid failing production builds due to lint rules in existing files.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
