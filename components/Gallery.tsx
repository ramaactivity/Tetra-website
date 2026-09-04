"use client";

import { GALLERY } from "@/lib/gallery";
import { useLightbox } from "./lightbox/useLightbox";
import Pic from "./Pic";
import { IgIcon, TiktokIcon } from "./SocialIcons";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/site";

// Two marquee rows (top scrolls right→left, bottom left→right). Each row uses
// the full set (row B reversed so the rows differ); items are repeated inside
// each group so a group is always wider than the viewport → the rows never run
// out and leave empty space.
const ROW_A = GALLERY;
const ROW_B = [...GALLERY].reverse();

export default function Gallery() {
  // Fullscreen detail view is the shared lightbox (see useLightbox).
  const { openAt, portal } = useLightbox(GALLERY);

  const renderRow = (items: typeof GALLERY, reverse: boolean) => {
    // Repeat the set inside each group so one group spans well past the viewport.
    const groupItems = [...items, ...items];
    return (
      <div className={`gmarq${reverse ? " rev" : ""}`}>
        <div className="gmarq-track">
          {[0, 1].map((dup) => (
            <div className="gmarq-group" key={dup} aria-hidden={dup === 1 || undefined}>
              {groupItems.map((g, k) => (
                <button
                  className="gitem"
                  key={`${dup}-${k}`}
                  type="button"
                  tabIndex={dup === 1 ? -1 : 0}
                  aria-label={`Lihat ${g.title} — ${g.sub}`}
                  onClick={() => openAt(g.i)}
                >
                  <Pic src={g.src} alt={`Hasil photobooth ${g.title} — ${g.sub}`} loading="lazy" />
                  <span className="gitem-cap">
                    <b>{g.title}</b>
                    <i>{g.sub}</i>
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="gal" id="galeri">
        <div className="wrap ghead">
          <div className="eyebrow" data-rv>
            Kilas Momen
          </div>
          <h2 className="sec-title gal-title" data-rv>
            Cara kita merawat <span className="it">ingatan</span> agar terus hidup.
          </h2>
          <p className="lead gal-lead" data-rv>
            Lembaran kenangan dan cerita hangat yang mereka bawa pulang dari acaramu.
          </p>
          <div className="gal-socials" data-rv>
            <span>Lihat portofolio lainnya</span>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram Tetra Photobooth">
              <IgIcon />
              <i>Instagram</i>
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok Tetra Photobooth">
              <TiktokIcon />
              <i>TikTok</i>
            </a>
          </div>
        </div>

        <div className="gmarqs" data-rv>
          {renderRow(ROW_A, false)}
          {renderRow(ROW_B, true)}
        </div>

        <div className="gx-more" data-rv>
          <a className="btn" href="/galeri">
            Lihat Galeri Lengkap
          </a>
        </div>
      </section>

      {portal}
    </>
  );
}
