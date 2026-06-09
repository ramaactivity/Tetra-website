// TESTIMONI — placeholder quotes (swap with real client quotes later).
const QUOTES = [
  {
    q: "Hasil cetaknya tajam banget dan nggak ada antre. Tamu kami sampai foto berkali-kali.",
    who: "Panitia Gathering",
    detail: "Corporate Event",
  },
  {
    q: "Frame-nya didesain persis tema pernikahan kami. Detail kecil yang bikin beda.",
    who: "Ami & Awal",
    detail: "Wedding",
  },
  {
    q: "Booth-nya datang tepat waktu, operatornya sigap. Anak-anak senang banget bawa pulang fotonya.",
    who: "Bunda Nerissa",
    detail: "Ulang Tahun",
  },
];

export default function Testimonials() {
  return (
    <section className="testi">
      <div className="wrap">
        <div className="eyebrow" data-rv>
          Kata Mereka
        </div>
        <h2 className="sec-title" data-rv style={{ marginTop: 16 }}>
          Yang <span className="it">dirasakan</span> klien.
        </h2>
        <div className="tgrid">
          {QUOTES.map((t) => (
            <div className="tcard" data-rv key={t.who}>
              <div className="q">{`"${t.q}"`}</div>
              <div className="who">
                <b>{t.who}</b> · {t.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
