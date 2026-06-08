/* eslint-disable @next/next/no-img-element */
import { waLink, INSTAGRAM_HANDLE, INSTAGRAM_URL, EMAIL } from "@/lib/site";

// CTA + Footer. The prototype's "Preview situs" toast and the footer's preview
// fine-print are intentionally removed for production.
export default function CtaFooter() {
  return (
    <>
      <section className="cta" id="kontak">
        <div className="wrap">
          <div className="cfan" data-rv>
            <div className="pcard c1" data-float>
              <img src="/images/g-grad1.jpg" alt="" />
            </div>
            <div className="pcard c2" data-float>
              <img src="/images/g-bday1.jpg" alt="" />
            </div>
            <div className="pcard c3" data-float>
              <img src="/images/g-corp2.jpg" alt="" />
            </div>
          </div>
          <h2 data-split>
            Punya tanggal acara? Kami bantu bikin{" "}
            <span className="it">kenangannya</span>.
          </h2>
          <p className="sub" data-rv>
            Cetakan yang dibawa pulang. Momen yang nggak hilang.
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
              <p>Melayani se-Indonesia</p>
            </div>
            <div className="col">
              <h5>Kontak</h5>
              <a href={waLink()} target="_blank" rel="noopener noreferrer">
                Chat Admin (WhatsApp)
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                {INSTAGRAM_HANDLE}
              </a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="col">
              <h5>Jelajah</h5>
              <a href="#galeri">Galeri</a>
              <a href="#format">Format</a>
              <a href="#cara">Cara Kerja</a>
            </div>
          </div>
          <div className="brand">
            <img src="/images/word-white.png" alt="tetra photobooth" />
            <div className="fine">© 2026 Tetra Photobooth</div>
          </div>
        </div>
      </footer>
    </>
  );
}
