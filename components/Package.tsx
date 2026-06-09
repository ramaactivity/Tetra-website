// PAKET — "Yang kamu dapat di hari-H". Editorial split: copy + a manifest-style
// checklist (deliberately NOT an icon-title-subtitle card grid, per PRODUCT.md
// anti-references). Scope is shown; price stays off the page → WhatsApp.
import { waLink, waMessage } from "@/lib/site";

const INCLUDES = [
  { t: "Booth + operator standby", s: "Tim kami jaga dari setup sampai acara beres." },
  { t: "Properti & background", s: "Props seru dan latar yang nyatu sama tema acaramu." },
  { t: "Cetak instan tanpa antre", s: "Keluar ±12 detik, tamu bebas foto berkali-kali." },
  { t: "Frame custom acaramu", s: "Digambar ulang sesuai tema, bukan template seragam." },
  { t: "Galeri digital (QR)", s: "Semua hasil bisa diakses dan dibagikan kapan saja." },
  { t: "Setup ±1 jam sebelum acara", s: "Booth sudah siap sebelum tamu pertama datang." },
];

const PKG_INTRO = "Halo Mintet, saya lihat paket Tetra Photobooth di website.";

export default function Package() {
  return (
    <section className="pkg" id="paket">
      <div className="wrap">
        <div className="pkg-copy">
          <div className="eyebrow" data-rv>
            Paket
          </div>
          <h2 className="sec-title" data-rv style={{ marginTop: 16 }}>
            Yang kamu <span className="it">dapat</span> di hari-H.
          </h2>
          <p className="lead pkg-lead" data-rv>
            Satu paket, semua yang bikin booth-mu jalan mulus dari setup sampai
            tamu terakhir pulang.
          </p>
          <p className="pkg-foot" data-rv>
            Detail durasi dan jumlah cetak menyesuaikan paket. Cerita acaramu,
            kami bantu pilih yang pas.
          </p>
          <p className="pkg-urg" data-rv>
            Jadwal akhir pekan biasanya lebih dulu terisi. Pastikan tanggal
            acaramu masih aman.
          </p>
          <div className="pkg-cta" data-rv>
            <a
              className="btn fill"
              href={waLink(waMessage(PKG_INTRO))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tanya Paket &amp; Harga
            </a>
          </div>
        </div>

        <ul className="manifest" data-rv>
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
    </section>
  );
}
