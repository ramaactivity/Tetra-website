/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Header from "@/components/Header";
import CtaFooter from "@/components/CtaFooter";
import PriceNav from "@/components/pricelist/PriceNav";
import PackageBlock from "@/components/pricelist/PackageBlock";
import StickyActions from "@/components/pricelist/StickyActions";
import { waLink, waMessage } from "@/lib/site";
import {
  PACKAGES,
  KEYCHAIN,
  LAYOUTS,
  ADDITIONAL,
  BACKDROPS,
  BOOKING_TERMS,
  TECH_TERMS,
  PDF_URL,
  PDF_NAME,
  fmtIDR,
} from "@/lib/pricelist";

// Hidden page: shared by admin via WhatsApp, kept out of search results.
export const metadata: Metadata = {
  title: "Pricelist 2026 — Tetra Photobooth",
  description:
    "Daftar harga & paket Tetra Photobooth 2026: Unlimited Photobooth, 360° Spin, Magazine Box, Photo Stage, dan layanan tambahan.",
  robots: { index: false, follow: false },
};

const WA_BOOK = waLink(
  waMessage(
    "Halo Tetra Photobooth! 👋\n\nSaya dari website Tetra dan mau tanya & booking paket photobooth-nya.\nBoleh dibantu cek ketersediaan & rekomendasi paket buat acara saya?"
  )
);

export default function PricelistPage() {
  return (
    <>
      <Header />

      {/* ===== Hero ===== */}
      <section className="pl-hero">
        <div className="wrap pl-hero-grid">
          <div className="pl-hero-copy">
            <span className="eyebrow" data-rv>
              Pricelist 2026
            </span>
            <h1 className="pl-hero-title" data-rv>
              Capture fond memories, <span className="it">where every click lasts forever</span>.
            </h1>
            <p className="lead pl-hero-lead" data-rv>
              Daftar harga &amp; paket lengkap Tetra Photobooth. Pilih yang paling pas
              untuk acaramu, lalu amankan tanggalmu bareng admin kami.
            </p>
            <div className="pl-hero-actions" data-rv>
              <a className="btn fill" href={WA_BOOK} target="_blank" rel="noopener noreferrer">
                Booking via WhatsApp
              </a>
              <a className="btn" href={PDF_URL} download={PDF_NAME}>
                Download PDF
              </a>
            </div>
          </div>

          <div className="pl-hero-fan" aria-hidden data-rv>
            <div className="pl-fan-card f1" data-float>
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-strip2-sm.jpg" />
                <img src="/images/g-strip2.jpg" alt="" loading="eager" decoding="async" />
              </picture>
            </div>
            <div className="pl-fan-card f2" data-float>
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-wed1-sm.jpg" />
                <img src="/images/g-wed1.jpg" alt="" loading="eager" decoding="async" />
              </picture>
            </div>
            <div className="pl-fan-card f3" data-float>
              <picture className="rsp">
                <source media="(max-width: 768px)" srcSet="/images/g-corp1-sm.jpg" />
                <img src="/images/g-corp1.jpg" alt="" loading="eager" decoding="async" />
              </picture>
            </div>
            <span className="pl-spark sp1" />
            <span className="pl-spark sp2" />
            <span className="pl-spark sp3" />
          </div>
        </div>
      </section>

      <PriceNav />

      {/* ===== Priced packages (one screen each) ===== */}
      {PACKAGES.map((pkg, i) => (
        <PackageBlock key={pkg.id} pkg={pkg} index={i} total={PACKAGES.length} />
      ))}

      {/* ===== Add-ons: keychain + extra services ===== */}
      <section className="pl-screen" id="tambahan">
        <div className="wrap">
          <div className="pl-screen-head" data-rv>
            <span className="eyebrow">Add-on</span>
            <h2 className="pl-screen-title">
              Bikin lebih <span className="it">seru</span>.
            </h2>
          </div>
          <div className="pl-addon-grid">
            <article className="pl-keychain-card" data-rv>
              <span className="pl-keychain-ico" aria-hidden>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <g className="sway2">
                    <circle cx="8.5" cy="6.5" r="3" />
                    <path d="M10.6 8.8 13 11.4" strokeLinecap="round" />
                    <circle cx="15.5" cy="15.5" r="5.2" />
                    <circle cx="15.5" cy="15.5" r="2.1" opacity="0.5" />
                  </g>
                </svg>
              </span>
              <span className="eyebrow">Experience</span>
              <h3 className="pl-keychain-name">{KEYCHAIN.name}</h3>
              <p className="lead pl-keychain-blurb">{KEYCHAIN.blurb}</p>
              <div className="pl-keychain-price">{KEYCHAIN.priceLabel}</div>
            </article>

            <article className="pl-addons-card" data-rv>
              <h3 className="pl-includes-title">Layanan tambahan</h3>
              <ul className="pl-tiers">
                {ADDITIONAL.map((a) => (
                  <li className="pl-tier" key={a.label}>
                    <span className="pl-tier-label">{a.label}</span>
                    <span className="pl-tier-price">{fmtIDR(a.price)}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* ===== Format & backdrop ===== */}
      <section className="pl-screen" id="pilihan">
        <div className="wrap">
          <div className="pl-screen-head" data-rv>
            <span className="eyebrow">Format &amp; Backdrop</span>
            <h2 className="pl-screen-title">
              Pilihan <span className="it">cetak</span>.
            </h2>
          </div>

          <div className="pl-layouts" data-rv>
            {LAYOUTS.map((l) => (
              <div className="pl-layout-card" key={l.name}>
                <div className={`pl-layout-thumb t-${l.shape}`} aria-hidden>
                  <span className="pl-layout-frame">
                    <img src={l.img} alt="" loading="lazy" decoding="async" />
                  </span>
                </div>
                <div className="pl-layout-meta">
                  <h3 className="pl-layout-name">{l.name}</h3>
                  <p className="pl-layout-size">{l.size}</p>
                  <p className="pl-layout-poses">
                    {l.poses}
                    {l.note ? ` · ${l.note}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pl-backdrops" data-rv>
            <span className="pl-backdrops-label">Backdrop basic</span>
            <div className="pl-backdrops-row">
              {BACKDROPS.map((b) => (
                <div className="pl-backdrop" key={b.name}>
                  <div
                    className={`pl-backdrop-swatch${b.dark ? " dark" : ""}`}
                    style={{ background: b.css }}
                    aria-hidden
                  />
                  <span className="pl-backdrop-name">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Terms ===== */}
      <section className="pl-screen" id="ketentuan">
        <div className="wrap">
          <div className="pl-screen-head" data-rv>
            <span className="eyebrow">Sebelum Booking</span>
            <h2 className="pl-screen-title">
              Ketentuan <span className="it">singkat</span>.
            </h2>
          </div>
          <div className="pl-terms-grid">
            <div className="pl-terms" data-rv>
              <h3 className="pl-includes-title">Ketentuan Booking</h3>
              <ul className="pl-termlist">
                {BOOKING_TERMS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="pl-terms" data-rv>
              <h3 className="pl-includes-title">Ketentuan Teknis Pada Acara</h3>
              <ul className="pl-termlist pl-termlist--compact">
                {TECH_TERMS.map((b) => (
                  <li key={b.title}>
                    <strong>{b.title}.</strong> {b.items.join(" ")}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Closing: download + booking ===== */}
      <section className="pl-download">
        <div className="wrap">
          <div className="pl-download-inner" data-rv>
            <div>
              <span className="eyebrow">Versi PDF</span>
              <h2 className="pl-download-title">Mau simpan versi lengkapnya?</h2>
              <p className="lead">Unduh pricelist resmi 2026 dalam format PDF full-size.</p>
            </div>
            <a className="btn fill" href={PDF_URL} download={PDF_NAME}>
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <CtaFooter />

      {/* clears the mobile sticky action bar so the footer isn't covered */}
      <div className="pl-foot-pad" aria-hidden />
      <StickyActions />
    </>
  );
}
