import type { Metadata } from "next";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import GaleriBoard from "@/components/galeri/GaleriBoard";
import { GALLERY } from "@/lib/gallery";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Galeri & Dokumentasi — Tetra Photobooth",
  description:
    "Jelajahi hasil dokumentasi Tetra Photobooth dari acara wedding, corporate, ulang tahun, hingga wisuda. Cetakan kualitas studio yang dibawa pulang setiap tamu.",
  alternates: { canonical: "/galeri" },
  openGraph: {
    title: "Galeri & Dokumentasi — Tetra Photobooth",
    description:
      "Kumpulan momen dari acara-acara yang pernah kami dampingi. Setiap bingkai, satu cerita.",
    images: ["/images/g-wed1.jpg"],
  },
};

export default function GaleriPage() {
  return (
    <>
      <Header />

      <section className="gx-hero">
        <div className="wrap">
          <span className="eyebrow" data-rv>
            Galeri &amp; Dokumentasi
          </span>
          <h1 className="gx-title" data-rv>
            Setiap bingkai, <span className="it">satu cerita</span>.
          </h1>
          <p className="gx-lead" data-rv>
            Kumpulan momen dari acara-acara yang pernah kami dampingi. Silakan dijelajahi,
            barangkali yang berikutnya adalah acaramu.
          </p>
          <div className="gx-meta" data-rv>
            <span>{GALLERY.length} Momen</span>
            <span className="dot" aria-hidden />
            <span>Wedding</span>
            <span className="dot" aria-hidden />
            <span>Corporate</span>
            <span className="dot" aria-hidden />
            <span>Ulang Tahun</span>
            <span className="dot" aria-hidden />
            <span>Wisuda</span>
            <span className="dot" aria-hidden />
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <span className="dot" aria-hidden />
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
          </div>
        </div>
      </section>

      <GaleriBoard />

      <CtaFooter />
    </>
  );
}
