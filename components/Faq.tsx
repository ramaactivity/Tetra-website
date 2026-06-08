"use client";

import { useRef, useState } from "react";

const ITEMS = [
  {
    q: "Berapa harganya?",
    a: "Tergantung paket, durasi, dan format. Chat admin kami — pricelist lengkap langsung kami kirim, disesuaikan sama kebutuhan acaramu.",
  },
  {
    q: "Area jangkauannya mana aja?",
    a: "Berbasis di Bogor, melayani Jabodetabek dan seluruh Indonesia. Untuk luar kota, ada biaya transport yang kami infokan di awal.",
  },
  {
    q: "Frame-nya bisa custom?",
    a: "Selalu. Tiap acara, frame-nya kami desain ulang sesuai tema — wedding, korporat, sampai aktivasi brand.",
  },
  {
    q: "Butuh apa aja dari kami?",
    a: "Cukup colokan listrik dan ruang sekitar 2×2 meter. Sisanya — booth, properti, operator — kami yang bawa.",
  },
  {
    q: "Hasil cetaknya awet?",
    a: "Sangat. Lapisan pelindungnya bikin cetakan tahan air, sidik jari, dan nggak gampang pudar bertahun-tahun.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const answers = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <section className="faq">
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
            const el = answers.current[idx];
            return (
              <div className={`qrow${isOpen ? " open" : ""}`} key={item.q}>
                <div
                  className="q"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  {item.q}
                  <span className="pm" />
                </div>
                <div
                  className="a"
                  ref={(node) => {
                    answers.current[idx] = node;
                  }}
                  style={{ height: isOpen && el ? el.scrollHeight : 0 }}
                >
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
