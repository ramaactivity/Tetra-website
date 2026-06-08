"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { GALLERY, GALLERY_TABS } from "@/lib/gallery";

const isReduced = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("reduced");

export default function Gallery() {
  const [cat, setCat] = useState<string>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const viewerRef = useRef<HTMLDivElement>(null);
  const vimgRef = useRef<HTMLImageElement>(null);
  const firstFilter = useRef(true);
  const busy = useRef(false);
  const zoomed = useRef(false);

  /* Lock grid min-height (measured with all cells) so filtering never changes
     page height — keeps the ribbon geometry stable. */
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

  /* Staggered entrance for cells as the gallery scrolls into view. */
  useEffect(() => {
    if (isReduced()) return;
    const cells = cellRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cells.length) return;
    gsap.set(cells, { opacity: 0, y: 22 });
    const batch = ScrollTrigger.batch(cells, {
      start: "top 92%",
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" }),
    });
    return () => batch.forEach((st) => st.kill());
  }, []);

  /* Filter transition (skips the initial render so it doesn't fight entrance). */
  useEffect(() => {
    const cells = cellRefs.current;
    const reduced = isReduced();
    GALLERY.forEach((g) => {
      const el = cells[g.i];
      if (!el) return;
      const show = cat === "all" || g.cat === cat;
      if (firstFilter.current || reduced) {
        el.style.display = show ? "" : "none";
        return;
      }
      if (show) {
        el.style.display = "";
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        gsap.to(el, {
          opacity: 0,
          scale: 0.92,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      }
    });
    firstFilter.current = false;
    ScrollTrigger.refresh();
  }, [cat]);

  const open = openIdx !== null;
  const current = openIdx !== null ? GALLERY[openIdx] : null;
  const counter =
    openIdx !== null ? `${`0${openIdx + 1}`.slice(-2)} / ${GALLERY.length}` : "";

  /* ---- lightbox controls ---- */
  const resetZoom = useCallback(() => {
    zoomed.current = false;
    const v = vimgRef.current;
    if (v) {
      v.classList.remove("zoomed");
      v.style.transformOrigin = "center center";
    }
  }, []);

  const animateSlide = useCallback((vimg: HTMLImageElement, target: number, d: number) => {
    busy.current = true;
    gsap.to(vimg, {
      x: -d * 110,
      opacity: 0,
      scale: 0.92,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        vimg.src = GALLERY[target].src;
        gsap.fromTo(
          vimg,
          { x: d * 110, opacity: 0, scale: 0.92 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: "expo.out",
            onComplete: () => {
              busy.current = false;
            },
          }
        );
      },
    });
  }, []);

  const show = useCallback((i: number) => {
    setOpenIdx(i);
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    if (isReduced()) return;
    requestAnimationFrame(() => {
      if (viewerRef.current) gsap.to(viewerRef.current, { opacity: 1, duration: 0.5 });
      if (vimgRef.current)
        gsap.fromTo(
          vimgRef.current,
          { scale: 0.86, opacity: 0, y: 26 },
          { scale: 1, opacity: 1, y: 0, duration: 0.85, ease: "expo.out" }
        );
    });
  }, []);

  const close = useCallback(() => {
    resetZoom();
    getLenis()?.start();
    document.body.style.overflow = "";
    if (isReduced() || !viewerRef.current) {
      setOpenIdx(null);
      return;
    }
    if (vimgRef.current)
      gsap.to(vimgRef.current, { scale: 0.9, opacity: 0, duration: 0.45, ease: "power2.in" });
    gsap.to(viewerRef.current, { opacity: 0, duration: 0.45, onComplete: () => setOpenIdx(null) });
  }, [resetZoom]);

  const go = useCallback(
    (d: number) => {
      if (busy.current) return;
      setOpenIdx((i) => {
        if (i === null) return i;
        const ni = (i + d + GALLERY.length) % GALLERY.length;
        const vimg = vimgRef.current;
        resetZoom();
        if (isReduced() || !vimg) return ni;
        animateSlide(vimg, ni, d);
        return ni;
      });
    },
    [resetZoom, animateSlide]
  );

  const jump = useCallback(
    (target: number) => {
      if (busy.current) return;
      setOpenIdx((i) => {
        if (i === null || i === target) return i;
        const d = target > i ? 1 : -1;
        const vimg = vimgRef.current;
        resetZoom();
        if (isReduced() || !vimg) return target;
        animateSlide(vimg, target, d);
        return target;
      });
    },
    [resetZoom, animateSlide]
  );

  const toggleZoom = () => {
    if (isReduced()) return;
    const v = vimgRef.current;
    if (!v) return;
    zoomed.current = !zoomed.current;
    if (zoomed.current) {
      v.classList.add("zoomed");
      gsap.to(v, { scale: 1.9, duration: 0.55, ease: "expo.out" });
    } else {
      v.classList.remove("zoomed");
      v.style.transformOrigin = "center center";
      gsap.to(v, { scale: 1, duration: 0.45, ease: "power3.out" });
    }
  };

  const onImgMove = (e: ReactMouseEvent<HTMLImageElement>) => {
    if (!zoomed.current) return;
    const v = vimgRef.current;
    if (!v) return;
    const r = v.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    v.style.transformOrigin = `${px}% ${py}%`;
  };

  /* keyboard nav while open */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, go]);

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

        <div className="gtabs" data-rv id="gtabs" role="tablist" aria-label="Filter galeri">
          {GALLERY_TABS.map((t) => (
            <button
              key={t.cat}
              role="tab"
              aria-selected={cat === t.cat}
              className={cat === t.cat ? "on" : undefined}
              onClick={() => setCat(t.cat)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="ggrid" id="ggrid" ref={gridRef}>
          {GALLERY.map((g) => (
            <div
              key={g.i}
              className="cell"
              data-cat={g.cat}
              role="button"
              tabIndex={0}
              aria-label={`Lihat ${g.title} — ${g.sub}`}
              ref={(node) => {
                cellRefs.current[g.i] = node;
              }}
              onClick={() => show(g.i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  show(g.i);
                }
              }}
            >
              <img src={g.src} alt={g.title} loading="lazy" decoding="async" />
              <div className="cap">
                <div className="t">{g.title}</div>
                <div className="s">{g.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox viewer */}
      <div
        className={`viewer${open ? " open" : ""}`}
        id="viewer"
        ref={viewerRef}
        aria-hidden={!open}
        onClick={close}
      >
        <div className="vcount" id="vcount">
          {counter}
        </div>
        <div
          className="vclose"
          id="vclose"
          role="button"
          tabIndex={open ? 0 : -1}
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
        >
          Tutup ✕
        </div>
        <div
          className="vnav prev"
          id="vprev"
          onClick={(e) => {
            e.stopPropagation();
            go(-1);
          }}
        />
        <div
          className="vnav next"
          id="vnext"
          onClick={(e) => {
            e.stopPropagation();
            go(1);
          }}
        />
        <img
          className="vimg"
          id="vimg"
          ref={vimgRef}
          src={current?.src || ""}
          alt={current?.title || ""}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          onMouseMove={onImgMove}
        />
        <div className="vmeta">
          <div className="vnm" id="vnm">
            {current?.title}
          </div>
          <div className="vfm" id="vfm">
            {current?.sub}
          </div>
        </div>
        <div className="vfilm" aria-hidden={!open}>
          {GALLERY.map((g) => (
            <button
              key={g.i}
              className={openIdx === g.i ? "on" : undefined}
              tabIndex={open ? 0 : -1}
              aria-label={g.title}
              onClick={(e) => {
                e.stopPropagation();
                jump(g.i);
              }}
            >
              <img src={g.src} alt="" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
