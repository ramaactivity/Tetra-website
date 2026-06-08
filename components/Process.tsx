// CARA KERJA — 5-step timeline. PHASE 1: static (gold line draw + dot-lit on
// scroll wired in Phase 2).
const STEPS = [
  {
    n: "Langkah 01",
    h: "Chat Admin",
    p: "Cerita acaramu — tanggal, tema, jumlah tamu. Kami bantu pilih paket yang pas.",
  },
  {
    n: "Langkah 02",
    h: "Pilih paket & format",
    p: "2R, 4R, polaroid, atau tambah 360 video booth. Tentukan durasi dan kebutuhanmu.",
  },
  {
    n: "Langkah 03",
    h: "Frame didesain custom",
    p: "Tim kami menggambar frame sesuai tema acaramu, lalu kamu approve.",
  },
  {
    n: "Langkah 04",
    h: "Hari-H",
    p: "Booth siap ±1 jam sebelum acara. Tamu foto, cetak instan, bawa pulang.",
  },
  {
    n: "Langkah 05",
    h: "Galeri digital",
    p: "Semua hasil bisa diakses & dibagikan lewat QR — kenangan yang nggak hilang.",
  },
];

export default function Process() {
  return (
    <section className="process" id="cara">
      <div className="wrap">
        <div className="eyebrow" data-rv>
          Cara Kerja
        </div>
        <h2 className="sec-title" data-rv style={{ marginTop: 16 }}>
          Dari chat sampai <span className="it">cetakan</span> di tangan.
        </h2>
        <div className="steps" id="steps">
          <div className="prog" id="stepProg" />
          {STEPS.map((s) => (
            <div className="step" data-rv key={s.n}>
              <div className="dot" />
              <div className="n">{s.n}</div>
              <h4>{s.h}</h4>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
