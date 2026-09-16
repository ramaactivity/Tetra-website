import type { Metadata } from "next";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import GaleriBoard from "@/components/galeri/GaleriBoard";
import GaleriFormat from "@/components/galeri/GaleriFormat";
import { GALLERY, galleryAlt } from "@/lib/gallery";

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

// ImageGallery + Breadcrumb — biar tiap foto punya konteks di Google Images,
// sumber traffic terbesar untuk niche visual seperti photobooth.
const JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Galeri Photobooth Tetra",
    url: "https://tetraphoto.com/galeri",
    description:
      "Hasil photobooth Tetra dari acara wedding, corporate, ulang tahun, dan wisuda di Bogor & Jabodetabek.",
    isPartOf: { "@id": "https://tetraphoto.com/#website" },
    associatedMedia: GALLERY.map((g) => ({
      "@type": "ImageObject",
      contentUrl: `https://tetraphoto.com${g.src}`,
      name: g.title,
      caption: galleryAlt(g),
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://tetraphoto.com" },
      { "@type": "ListItem", position: 2, name: "Galeri", item: "https://tetraphoto.com/galeri" },
    ],
  },
];

export default function GaleriPage() {
  return (
    <>
      {JSONLD.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}
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
