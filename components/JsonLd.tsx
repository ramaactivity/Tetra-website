import { WA_NUMBER, INSTAGRAM_URL, TIKTOK_URL, EMAIL } from "@/lib/site";

// LocalBusiness + WebSite structured data (schema.org) — rendered once on the
// homepage. Helps Google understand who we are, where we operate, and what we
// offer; feeds the Knowledge Panel and local results. Prices intentionally
// omitted (pricelist is shared privately via WhatsApp).
const BUSINESS = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://tetraphoto.com/#business",
  name: "Tetra Photobooth",
  url: "https://tetraphoto.com",
  image: [
    "https://tetraphoto.com/images/g-wed1.jpg",
    "https://tetraphoto.com/images/g-corp1.jpg",
    "https://tetraphoto.com/images/g-grad1.jpg",
  ],
  logo: "https://tetraphoto.com/images/word-white.png",
  description:
    "Jasa sewa photobooth premium berbasis di Bogor, melayani seluruh Jabodetabek. Cetak instan unlimited, free desain frame custom, dan softfile realtime untuk wedding, ulang tahun, wisuda, dan corporate event.",
  telephone: `+${WA_NUMBER}`,
  email: EMAIL,
  priceRange: "Rp 1.500.000 - Rp 7.000.000",
  currenciesAccepted: "IDR",
  // Jam balas chat admin, bukan jam operasional toko fisik. Ubah di sini kalau
  // jamnya berubah — Google Business Profile harus menyebut jam yang sama.
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "09:00",
    closes: "21:00",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bogor",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  areaServed: [
    { "@type": "City", name: "Jakarta" },
    { "@type": "City", name: "Bogor" },
    { "@type": "City", name: "Depok" },
    { "@type": "City", name: "Tangerang" },
    { "@type": "City", name: "Bekasi" },
  ],
  sameAs: [INSTAGRAM_URL, TIKTOK_URL],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paket Photobooth",
    itemListElement: [
      "Unlimited Photobooth",
      "360° Spin Video Booth",
      "Magazine Box Photobooth",
      "Photo Stage",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, areaServed: "Jabodetabek" },
    })),
  },
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://tetraphoto.com/#website",
  name: "Tetra Photobooth",
  url: "https://tetraphoto.com",
  inLanguage: "id-ID",
  publisher: { "@id": "https://tetraphoto.com/#business" },
};

export default function JsonLd() {
  return (
    <>
      {[BUSINESS, WEBSITE].map((data) => (
        <script
          key={data["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
