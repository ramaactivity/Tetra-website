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
        // Header keamanan dasar. Tidak memengaruhi peringkat, tapi menutup
        // MIME-sniffing, clickjacking, dan kebocoran referrer ke pihak ketiga.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
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
