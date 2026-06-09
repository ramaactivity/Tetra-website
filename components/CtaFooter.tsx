/* eslint-disable @next/next/no-img-element */
import { waLink, INSTAGRAM_HANDLE, INSTAGRAM_URL, TIKTOK_HANDLE, TIKTOK_URL, EMAIL } from "@/lib/site";
import { SocialLinks } from "./SocialIcons";

// CTA + Footer. The prototype's "Preview situs" toast and the footer's preview
// fine-print are intentionally removed for production.
export default function CtaFooter() {
  return (
    <>
      <section className="cta" id="kontak">
        <div className="wrap">
          <div className="cfan" data-rv>
            <div className="pcard c1" data-float>
              <img src="/images/g-grad1.jpg" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="pcard c2" data-float>
              <img src="/images/g-bday1.jpg" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="pcard c3" data-float>
              <img src="/images/g-corp2.jpg" alt="" loading="lazy" decoding="async" />
            </div>
            {/* c4 & c5 are mobile-only (hidden on desktop via CSS) — they round
                out the fan into a fuller, well-balanced spread on phones. */}
            <div className="pcard c4">
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-wed1-sm.jpg" />
                <img src="/images/g-wed1.jpg" alt="" loading="lazy" decoding="async" />
              </picture>
            </div>
            <div className="pcard c5">
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-wed2-sm.jpg" />
                <img src="/images/g-wed2.jpg" alt="" loading="lazy" decoding="async" />
              </picture>
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
              <h5>Tetra Photobooth</h5>
              <p>Bogor, Jawa Barat</p>
              <p>Melayani Jabodetabek</p>
            </div>
            <div className="col">
              <h5>Kontak</h5>
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
              <h5>Jelajah</h5>
              <a href="#galeri" data-scroll="#galeri">Galeri</a>
              <a href="#format" data-scroll="#format">Format</a>
              <a href="#cara" data-scroll="#cara">Cara Kerja</a>
            </div>
          </div>
          <div className="brand">
            <img src="/images/word-white.png" alt="tetra photobooth" />
            <SocialLinks className="ftr-socials" />
            <div className="fine">© 2026 Tetra Photobooth</div>
          </div>
        </div>
      </footer>
    </>
  );
}
