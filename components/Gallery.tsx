"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY, GALLERY_TABS } from "@/lib/gallery";

export default function Gallery() {
  const [cat, setCat] = useState<string>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Lock grid min-height (measured with all cells shown) so filtering never
  // changes page height — keeps the ribbon stable in Phase 2.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const lock = () => {
      grid.style.minHeight = "";
      grid.style.minHeight = `${grid.offsetHeight}px`;
    };
    lock();
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(lock, 260);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const open = openIdx !== null;

  const go = useCallback(
    (d: number) => {
      setOpenIdx((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length));
    },
    []
  );

  // Lock body scroll + keyboard nav while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go]);

  const current = openIdx !== null ? GALLERY[openIdx] : null;
  const counter =
    openIdx !== null
      ? `${`0${openIdx + 1}`.slice(-2)} / ${GALLERY.length}`
      : "";

  return (
    <section className="gal" id="galeri">
      <div className="wrap">
        <div className="ghead">
          <div className="eyebrow" data-rv>
            Galeri Karya
          </div>
          <h2 className="sec-title" data-rv style={{ marginTop: 16 }}>
            Sesuatu untuk <span className="it">dikenang</span>.
          </h2>
          <p className="lead" data-rv>
            Tiap cetakan adalah benda yang dibawa pulang — pilih jenis acaramu,
            lihat hasilnya.
          </p>
        </div>

        <div className="gtabs" data-rv id="gtabs">
          {GALLERY_TABS.map((t) => (
            <button
              key={t.cat}
              className={cat === t.cat ? "on" : undefined}
              onClick={() => setCat(t.cat)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="ggrid" id="ggrid" ref={gridRef}>
          {GALLERY.map((g) => {
            const show = cat === "all" || g.cat === cat;
            return (
              <div
                key={g.i}
                className="cell"
                data-cat={g.cat}
                style={show ? undefined : { display: "none" }}
                onClick={() => setOpenIdx(g.i)}
              >
                <img src={g.src} alt="" />
                <div className="cap">
                  <div className="t">{g.title}</div>
                  <div className="s">{g.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox viewer (basic Phase 1 — fade/slide polish in Phase 2) */}
      <div
        className={`viewer${open ? " open" : ""}`}
        id="viewer"
        style={
          open
            ? { opacity: 1, background: "rgba(28,22,16,.96)" }
            : undefined
        }
      >
        <div className="vcount" id="vcount">
          {counter}
        </div>
        <div
          className="vclose"
          id="vclose"
          onClick={(e) => {
            e.stopPropagation();
            setOpenIdx(null);
          }}
        >
          Tutup ✕
        </div>
        <div className="vnav prev" id="vprev" onClick={() => go(-1)} />
        <div className="vnav next" id="vnext" onClick={() => go(1)} />
        {current && (
          <img
            className="vimg"
            id="vimg"
            src={current.src}
            alt={current.title}
            style={{ opacity: 1 }}
          />
        )}
        <div className="vmeta">
          <div className="vnm" id="vnm">
            {current?.title}
          </div>
          <div className="vfm" id="vfm">
            {current?.sub}
          </div>
        </div>
      </div>
    </section>
  );
}
