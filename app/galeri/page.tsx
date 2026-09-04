import type { Metadata } from "next";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import GaleriBoard from "@/components/galeri/GaleriBoard";
import GaleriFormat from "@/components/galeri/GaleriFormat";

export const metadata: Metadata = {
  title: "Galeri Photobooth Wedding, Corporate & Wisuda",
  description:
    "Jelajahi hasil photobooth Tetra dari acara wedding, corporate, ulang tahun, hingga wisuda di Jabodetabek. Cetakan kualitas studio yang dibawa pulang setiap tamu.",
  alternates: { canonical: "/galeri" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/galeri",
    siteName: "Tetra Photobooth",
    title: "Galeri Photobooth Wedding, Corporate & Wisuda — Tetra Photobooth",
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
        </div>
      </section>

      <GaleriBoard />

      <GaleriFormat />

      <CtaFooter />
    </>
  );
}
