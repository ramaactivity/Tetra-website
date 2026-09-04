"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Berapa harganya?",
    a: "Tergantung paket, durasi, dan format. Chat admin kami, pricelist lengkap langsung kami kirim sesuai kebutuhan acaramu.",
  },
  {
    q: "Area jangkauannya mana aja?",
    a: "Berbasis di Bogor, melayani seluruh area Jabodetabek. Untuk lokasi lebih jauh, ada biaya transport yang kami infokan di awal.",
  },
  {
    q: "Frame-nya bisa custom?",
    a: "Selalu. Tiap acara, frame-nya kami desain ulang sesuai tema: wedding, korporat, sampai aktivasi brand.",
  },
  {
    q: "Butuh apa aja dari kami?",
    a: "Cukup lokasi dekat sumber listrik dan area sekitar 3×3 meter, plus satu meja dan dua kursi. Sisanya — booth, properti, operator — kami yang bawa.",
  },
  {
    q: "Hasil cetaknya awet?",
    a: "Sangat. Lapisan pelindungnya bikin cetakan tahan air, sidik jari, dan nggak gampang pudar bertahun-tahun.",
  },
];

// FAQPage structured data — mirrors ITEMS so Google (and AI search) can read
// the Q&A without expanding the accordion.
const FAQ_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}).replace(/</g, "\\u003c");

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: FAQ_JSONLD }}
      />
      <div className="wrap">
        <div className="eyebrow" data-rv>
          Pertanyaan
        </div>
        <h2 className="sec-title" data-rv style={{ margin: "16px 0 7vh" }}>
          Yang sering <span className="it">ditanya</span>.
        </h2>
        <div className="qa" id="qa">
          {ITEMS.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div className={`qrow${isOpen ? " open" : ""}`} key={item.q}>
                <h3 className="qh">
                  <button
                    className="q"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : idx)}
                  >
                    {item.q}
                    <span className="pm" aria-hidden />
                  </button>
                </h3>
                <div className="a">
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
