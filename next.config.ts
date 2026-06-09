import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical host: send www.tetraphoto.com → tetraphoto.com (apex), preserving
  // the path. 308 (permanent) so browsers/search engines cache the canonical.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tetraphoto.com" }],
        destination: "https://tetraphoto.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
