// PAKET — "Yang kamu dapat di acaramu". Editorial split: copy + a manifest-style
// checklist (deliberately NOT an icon-title-subtitle card grid, per PRODUCT.md
// anti-references). Scope is shown; price stays off the page → WhatsApp.
import { waLink } from "@/lib/site";

const INCLUDES = [
  { t: "Foto & cetak unlimited", s: "Bebas foto sepuasnya; tiap hasil langsung dicetak di tempat dengan sleeve frame." },
  { t: "2 kru profesional", s: "Standby lebih awal untuk setup & mendampingi tamu sepanjang acara." },
  { t: "Kamera & lighting studio", s: "Peralatan andal standar profesional, hasil konsisten jernih." },
  { t: "Properti & background", s: "Props seru + free background basic polos kalau kamu belum sediakan." },
  { t: "File digital lengkap", s: "QR download di tempat + semua file di flashdisk kayu eksklusif." },
  { t: "Transport gratis", s: "Tanpa biaya perjalanan untuk seluruh area Jabodetabek." },
];

const PKG_MSG =
  "Halo Tetra, saya mau tanya detail paket dan cek ketersediaan tanggal untuk acara saya...";

export default function Package() {
  return (
    <section className="pkg" id="paket">
      <div className="wrap">
        <div className="pkg-copy">
          <div className="eyebrow" data-rv>
            Pilihan Paket
          </div>
          <h2 className="sec-title" data-rv style={{ marginTop: 16 }}>
            Yang kamu <span className="it">dapat</span> di acaramu.
          </h2>
          <p className="lead pkg-lead" data-rv>
            Sudah lengkap, all-in package tanpa biaya tersembunyi.
          </p>
          <p className="pkg-urg" data-rv>
            Booking sekarang sebelum penuh.
          </p>
          <div className="pkg-cta" data-rv>
            <a
              className="btn fill"
              href={waLink(PKG_MSG)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanya Paket &amp; Harga
            </a>
            <a className="btn" href="/harga-sewa-photobooth">
              Lihat Harga
            </a>
          </div>
        </div>

        <div className="pkg-list" data-rv>
          <div className="pkg-list-label">Di setiap paket, sudah include:</div>
          <ul className="manifest">
            {INCLUDES.map((it) => (
              <li className="row" key={it.t}>
                <span className="tick" aria-hidden>
                  <svg viewBox="0 0 24 24">
                    <path
                      d="M5 12.5l4.2 4.2L19 6.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="rtext">
                  <span className="rt">{it.t}</span>
                  <span className="rs">{it.s}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
