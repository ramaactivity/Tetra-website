import type { NextConfig } from "next";
import { PDF_NAME, PDF_URL } from "./lib/pricelist";

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
  // Link PDF pricelist (dari tombol maupun yang dikirim admin/bot WA) langsung
  // tersimpan di HP, tidak dibuka dulu di viewer browser.
  async headers() {
    return [
      {
        source: PDF_URL,
        headers: [
          {
            key: "Content-Disposition",
            value: `attachment; filename="${PDF_NAME}"`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
