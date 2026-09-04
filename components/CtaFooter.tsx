/* eslint-disable @next/next/no-img-element */
import { waLink, INSTAGRAM_HANDLE, INSTAGRAM_URL, TIKTOK_HANDLE, TIKTOK_URL, EMAIL } from "@/lib/site";
import { SocialLinks } from "./SocialIcons";
import Pic from "./Pic";
import { AREAS } from "@/lib/areas";

// CTA + Footer. The prototype's "Preview situs" toast and the footer's preview
// fine-print are intentionally removed for production.
export default function CtaFooter() {
  return (
    <>
      <section className="cta" id="kontak">
        <div className="wrap">
          {/* Five scattered prints — a different set from the hero stack
              (hero uses bday1/corp1/strip2/strip3/wed1). */}
          <div className="cfan" data-rv>
            <div className="pcard c1" data-float>
              <Pic src="/images/g-grad2.jpg" alt="Cetakan photobooth acara wisuda" loading="lazy" />
            </div>
            <div className="pcard c2" data-float>
              <Pic src="/images/g-grad1.jpg" alt="Hasil photobooth wisuda sekolah" loading="lazy" />
            </div>
            <div className="pcard c3" data-float>
              <Pic src="/images/g-strip1.jpg" alt="Photo strip 2R acara reuni" loading="lazy" />
            </div>
            <div className="pcard c4" data-float>
              <Pic src="/images/g-wed2.jpg" alt="Cetakan polaroid photobooth pernikahan" loading="lazy" />
            </div>
            <div className="pcard c5" data-float>
              <Pic src="/images/g-corp2.jpg" alt="Hasil photobooth corporate event" loading="lazy" />
            </div>
          </div>
          <h2 data-split>
            Udah punya tanggal acara? Yuk bikin lebih seru bareng{" "}
            <span className="it">Tetra</span>!
          </h2>
          <p className="sub" data-rv>
            Yuk amankan tanggalmu dan konsultasikan dengan admin.
          </p>
          <div data-rv>
            <a
              className="btn fill"
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, padding: "18px 34px" }}
            >
              Tanya Paket &amp; Harga
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="top">
            <div className="col">
              <h3>Tetra Photobooth</h3>
              <p>Sewa photobooth premium — Bogor, Jawa Barat</p>
              <p>Melayani Jakarta, Bogor, Depok, Tangerang &amp; Bekasi</p>
            </div>
            <div className="col">
              <h3>Kontak</h3>
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                Chat Admin (WhatsApp)
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                Instagram {INSTAGRAM_HANDLE}
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
                TikTok {TIKTOK_HANDLE}
              </a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="col">
              <h3>Jelajah</h3>
              <a href="/galeri">Galeri</a>
              <a href="/#format" data-scroll="#format">Format</a>
              <a href="/#cara" data-scroll="#cara">Cara Kerja</a>
            </div>
            <div className="col">
              <h3>Area Layanan</h3>
              {AREAS.map((a) => (
                <a key={a.slug} href={`/sewa-photobooth/${a.slug}`}>
                  Sewa Photobooth {a.name}
                </a>
              ))}
            </div>
          </div>
          <div className="brand">
            <img src="/images/word-white.png" alt="Tetra Photobooth" />
            <SocialLinks className="ftr-socials" />
            <div className="fine">© 2026 Tetra Photobooth</div>
          </div>
        </div>
      </footer>
    </>
  );
}
