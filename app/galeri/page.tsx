import type { Metadata } from "next";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import GaleriBoard from "@/components/galeri/GaleriBoard";

export const metadata: Metadata = {
  title: "Galeri & Dokumentasi — Tetra Photobooth",
  description:
    "Jelajahi hasil dokumentasi Tetra Photobooth dari acara wedding, corporate, ulang tahun, hingga wisuda. Cetakan kualitas studio yang dibawa pulang setiap tamu.",
  alternates: { canonical: "/galeri" },
  openGraph: {
    title: "Galeri & Dokumentasi — Tetra Photobooth",
    description:
      "Ragam momen terkurasi dari mereka yang pernah merayakan harinya bersama kami. Satu bingkai, satu cerita.",
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
            Satu bingkai, <span className="it">satu cerita</span>.
          </h1>
          <p className="gx-lead" data-rv>
            Ragam momen terkurasi dari mereka yang pernah merayakan harinya bersama kami.
            Silakan jelajahi, siapa tahu cerita kamu adalah yang berikutnya.
          </p>
          <div className="gx-meta" data-rv>
            <span>Kurasi dari ratusan acara</span>
            <span className="dot" aria-hidden />
            <span>Wedding</span>
            <span className="dot" aria-hidden />
            <span>Corporate</span>
            <span className="dot" aria-hidden />
            <span>Ulang Tahun</span>
            <span className="dot" aria-hidden />
            <span>Wisuda</span>
          </div>
        </div>
      </section>

      <GaleriBoard />

      <CtaFooter />
    </>
  );
}
