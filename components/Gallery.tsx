"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { GALLERY, GALLERY_TABS } from "@/lib/gallery";

const isReduced = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("reduced");

export default function Gallery() {
  const [cat, setCat] = useState<string>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const viewerRef = useRef<HTMLDivElement>(null);
  // Two stacked image layers crossfade-slide between photos so navigation is
  // seamless (no src-swap flash, no dimension jump on a single element).
  const layerA = useRef<HTMLImageElement>(null);
  const layerB = useRef<HTMLImageElement>(null);
  const activeIsA = useRef(true);
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
  const activeImg = useCallback(
    () => (activeIsA.current ? layerA.current : layerB.current),
    []
  );
  const backImg = useCallback(
    () => (activeIsA.current ? layerB.current : layerA.current),
    []
  );

  const resetZoom = useCallback(() => {
    zoomed.current = false;
    const v = activeImg();
    if (v) {
      v.classList.remove("zoomed");
      v.style.transformOrigin = "center center";
    }
  }, [activeImg]);

  const slideDist = () =>
    Math.min(180, (typeof window !== "undefined" ? window.innerWidth : 1200) * 0.11);

  // Crossfade-slide: the incoming photo (preloaded into the back layer) slides
  // in from the travel direction while the current one slides out — both at once,
  // so the change reads as one continuous motion with no flash or jump.
  const animateSlide = useCallback(
    (target: number, d: number) => {
      const front = activeImg();
      const back = backImg();
      if (!front || !back) return;
      busy.current = true;
      const dist = slideDist();
      back.src = GALLERY[target].src;
      back.alt = GALLERY[target].title || "";
      back.classList.remove("zoomed");
      back.style.transformOrigin = "center center";
      gsap.set(back, { x: d * dist, opacity: 0, scale: 0.96, zIndex: 3 });
      gsap.set(front, { zIndex: 2 });
      gsap.to(front, { x: -d * dist * 0.6, opacity: 0, scale: 0.97, duration: 0.62, ease: "power3.inOut" });
      gsap.to(back, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.62,
        ease: "power3.inOut",
        onComplete: () => {
          activeIsA.current = !activeIsA.current;
          busy.current = false;
        },
      });
    },
    [activeImg, backImg]
  );

  const show = useCallback((i: number) => {
    setOpenIdx(i);
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    document.body.classList.add("lb-open");
    activeIsA.current = true;
    const a = layerA.current;
    const b = layerB.current;
    if (a) {
      a.src = GALLERY[i].src;
      a.alt = GALLERY[i].title || "";
    }
    if (b) gsap.set(b, { opacity: 0 });
    if (isReduced()) {
      if (a) gsap.set(a, { opacity: 1, scale: 1, x: 0, y: 0 });
      return;
    }
    requestAnimationFrame(() => {
      if (viewerRef.current) gsap.to(viewerRef.current, { opacity: 1, duration: 0.5 });
      if (a)
        gsap.fromTo(
          a,
          { scale: 0.86, opacity: 0, y: 26, x: 0 },
          { scale: 1, opacity: 1, y: 0, x: 0, duration: 0.85, ease: "expo.out" }
        );
    });
  }, []);

  const close = useCallback(() => {
    resetZoom();
    getLenis()?.start();
    document.body.style.overflow = "";
    document.body.classList.remove("lb-open");
    if (isReduced() || !viewerRef.current) {
      setOpenIdx(null);
      return;
    }
    const v = activeImg();
    if (v) gsap.to(v, { scale: 0.9, opacity: 0, duration: 0.45, ease: "power2.in" });
    gsap.to(viewerRef.current, { opacity: 0, duration: 0.45, onComplete: () => setOpenIdx(null) });
  }, [resetZoom, activeImg]);

  const go = useCallback(
    (d: number) => {
      if (busy.current) return;
      setOpenIdx((i) => {
        if (i === null) return i;
        const ni = (i + d + GALLERY.length) % GALLERY.length;
        resetZoom();
        if (isReduced()) return ni;
        animateSlide(ni, d);
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
        resetZoom();
        if (isReduced()) return target;
        animateSlide(target, d);
        return target;
      });
    },
    [resetZoom, animateSlide]
  );

  const toggleZoom = () => {
    if (isReduced()) return;
    const v = activeImg();
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

  const onImgMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!zoomed.current) return;
    const v = activeImg();
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

  const galleryView = (
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

    </section>
  );

  // Lightbox is portaled to <body> so it escapes the section's stacking
  // context and covers the fixed header (close button + counter stay clickable).
  const viewer = (
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
      <button
        className="vnav prev"
        id="vprev"
        type="button"
        aria-label="Foto sebelumnya"
        tabIndex={open ? 0 : -1}
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        className="vnav next"
        id="vnext"
        type="button"
        aria-label="Foto berikutnya"
        tabIndex={open ? 0 : -1}
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden focusable="false">
          <path d="M9 4l8 8-8 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className="vstage"
        onClick={(e) => {
          e.stopPropagation();
          toggleZoom();
        }}
        onMouseMove={onImgMove}
      >
        <img className="vimg" id="vimg" ref={layerA} alt="" />
        <img className="vimg vimg-b" ref={layerB} alt="" aria-hidden />
      </div>
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
  );

  return (
    <>
      {galleryView}
      {mounted && createPortal(viewer, document.body)}
    </>
  );
}
