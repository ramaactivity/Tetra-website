import type { Metadata } from "next";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import Divider from "@/components/Divider";
import { AREAS } from "@/lib/areas";

const CITIES = AREAS.filter((a) => !a.parent);
import { PACKAGES, fromPrice, fmtIDR } from "@/lib/pricelist";
import { WaButton } from "@/components/Wa";

// Halaman harga publik — menjawab query "harga sewa photobooth" yang tidak
// bisa ditangkap /pricelist (noindex, dibagikan privat via WhatsApp).
// Hanya harga terendah per paket yang ditampilkan; rincian tier tetap privat.
// Angka diturunkan dari PACKAGES supaya tidak pernah beda dengan pricelist.

const TITLE = "Harga Sewa Photobooth Bogor & Jabodetabek 2026";
const DESCRIPTION =
  "Harga sewa photobooth di Bogor & Jabodetabek mulai Rp 1.500.000. Rincian harga per paket, apa saja yang sudah termasuk, dan hal yang mempengaruhi biaya.";

export const metadata: Metadata = {
  title: "Harga Sewa Photobooth Bogor Mulai 1,5 Juta",
  description: DESCRIPTION,
  alternates: { canonical: "/harga-sewa-photobooth" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/harga-sewa-photobooth",
    siteName: "Tetra Photobooth",
    title: `${TITLE} — Tetra Photobooth`,
    description: DESCRIPTION,
  },
};

const FAQ = [
  {
    q: "Berapa harga sewa photobooth di Bogor?",
    a: "Mulai dari Rp 1.500.000 untuk paket Photo Stage 2 jam, dan Rp 2.000.000 untuk Unlimited Photobooth 2 jam dengan cetak tanpa batas. Area Bogor bebas biaya transport.",
  },
  {
    q: "Apa yang menentukan harga sewa photobooth?",
    a: "Empat hal: jenis paket yang dipilih, durasi sewa, jarak lokasi acara dari Bogor, dan layanan tambahan seperti backdrop khusus atau jam extend.",
  },
  {
    q: "Apakah harga sudah termasuk cetak foto?",
    a: "Sudah. Semua paket photobooth kami cetak unlimited selama durasi sewa, jadi tidak ada biaya per lembar. Frame custom, crew, properti, dan softfile juga sudah termasuk.",
  },
  {
    q: "Ada biaya transport tambahan?",
    a: "Area Bogor bebas biaya transport. Jakarta, Depok, Tangerang, dan Bekasi menyesuaikan jarak dan lokasi, dan selalu kami sebutkan di penawaran awal, bukan di akhir.",
  },
  {
    q: "Ada paket photobooth yang lebih terjangkau?",
    a: "Ada. Photo Stage 2 jam di Rp 1.500.000 adalah titik masuk paling ringan: tamu berfoto lalu mengunduh softfile lewat QR code, tanpa cetak fisik. Kalau yang kamu cari tetap cetakan, Unlimited Photobooth 2 jam di Rp 2.000.000 sudah termasuk cetak tanpa batas.",
  },
  {
    q: "Berapa DP untuk booking?",
    a: "Tanggal diamankan dengan DP, sisanya dilunasi menjelang hari-H. Nominal dan termin lengkapnya kami kirim bersama pricelist saat kamu chat admin.",
  },
];

const AFFECTS = [
  {
    h: "Jenis paket",
    p: "Unlimited Photobooth, 360° Spin, Magazine Box, dan Photo Stage punya perangkat dan crew yang berbeda, jadi titik awal harganya juga berbeda.",
  },
  {
    h: "Durasi sewa",
    p: "Paket dihitung per jam, mulai 2 jam sampai 8 jam. Makin panjang durasinya, makin murah biaya per jamnya.",
  },
  {
    h: "Lokasi acara",
    p: "Seluruh area Bogor gratis biaya transport, kota maupun kabupaten. Jakarta, Depok, Tangerang, dan Bekasi menyesuaikan jarak, dan angkanya kami sebutkan di awal, bukan di akhir.",
  },
  {
    h: "Layanan tambahan",
    p: "Backdrop khusus, keychain station, jam extend, atau format cetak tambahan dihitung terpisah dan sepenuhnya opsional.",
  },
];

const url = "https://tetraphoto.com/harga-sewa-photobooth";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Sewa Photobooth Bogor & Jabodetabek",
    serviceType: "Photobooth rental",
    url,
    description: DESCRIPTION,
    provider: { "@id": "https://tetraphoto.com/#business" },
    areaServed: CITIES.map((a) => ({ "@type": "City", name: a.name })),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: Math.min(...PACKAGES.map(fromPrice)),
      highPrice: Math.max(...PACKAGES.flatMap((p) => p.tiers.map((t) => t.price))),
      offerCount: PACKAGES.length,
      availability: "https://schema.org/InStock",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: "https://tetraphoto.com" },
      { "@type": "ListItem", position: 2, name: "Harga Sewa Photobooth", item: url },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function HargaPage() {
  return (
    <>
      {jsonLd.map((data, i) => (
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
            Harga &amp; Paket
          </span>
          <h1 className="gx-title" data-rv>
            Harga Sewa Photobooth <span className="it">Bogor</span>{" "}
            &amp; Jabodetabek.
          </h1>
          <p className="gx-lead" data-rv>
            Mulai Rp 1.500.000. Semua paket sudah termasuk cetak unlimited, frame yang
            didesain ulang sesuai tema acaramu, crew profesional, dan softfile realtime.
            Tidak ada biaya cetak per lembar, tidak ada biaya kejutan di akhir.
          </p>
          <div className="area-cta" data-rv>
            <WaButton label="Cek Jadwal & Harga" />
            <a className="btn" href="/pricelist">
              Minta Pricelist Lengkap
            </a>
          </div>
        </div>
      </section>

      <Divider />

      <section className="area-points">
        <div className="wrap">
          <h2 className="sec-title" data-rv>
            Harga sewa photobooth per <span className="it">paket</span>.
          </h2>
          <p className="lead area-p" data-rv>
            Angka di bawah adalah harga terendah tiap paket, yaitu durasi paling singkat.
            Rincian tiap durasi dan layanan tambahan kami kirim langsung lewat WhatsApp.
          </p>
          <div className="area-grid">
            {PACKAGES.map((p) => (
              <div className="area-point" data-rv key={p.id}>
                <h3>
                  {p.name} — mulai {fmtIDR(fromPrice(p))}
                </h3>
                <p>{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="area-story">
        <div className="wrap">
          <h2 className="sec-title" data-rv>
            Yang sudah <span className="it">termasuk</span> di harganya.
          </h2>
          <p className="lead area-p" data-rv>
            Cetak foto unlimited selama durasi sewa dalam format 2R photostrip, 4R, atau
            polaroid-style. Peralatan profesional lengkap: kamera, printer, dan lighting.
            Dua crew yang menemani tamu sepanjang acara, properti, serta backdrop pilihan.
          </p>
          <p className="lead area-p" data-rv>
            Empat hal yang sering jadi biaya tambahan di tempat lain, di sini gratis:
            desain frame custom sesuai tema acaramu, properti, backdrop pilihan, dan
            transport untuk seluruh area Bogor. Softfile realtime lewat QR code serta
            flashdisk berisi seluruh dokumentasi juga sudah termasuk. Dari pihakmu cukup
            listrik dan area sekitar 3×3 meter.
          </p>
        </div>
      </section>

      <Divider />

      <section className="area-points">
        <div className="wrap">
          <h2 className="sec-title" data-rv>
            Yang mempengaruhi harga sewa <span className="it">photobooth</span>.
          </h2>
          <div className="area-grid">
            {AFFECTS.map((a) => (
              <div className="area-point" data-rv key={a.h}>
                <h3>{a.h}</h3>
                <p>{a.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      <section className="area-faqsec">
        <div className="wrap">
          <h2 className="sec-title" data-rv>
            Pertanyaan soal harga sewa <span className="it">photobooth</span>.
          </h2>
          <div className="area-faq">
            {FAQ.map((f) => (
              <div className="area-qa" data-rv key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
          <p className="area-others" data-rv>
            Lihat harga per kota:{" "}
            {CITIES.map((a, i) => (
              <span key={a.slug}>
                <a href={`/sewa-photobooth/${a.slug}`}>sewa photobooth {a.name}</a>
                {i < CITIES.length - 2 ? ", " : i === CITIES.length - 2 ? ", dan " : "."}
              </span>
            ))}
          </p>
        </div>
      </section>

      <CtaFooter />
    </>
  );
}
