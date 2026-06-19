"use client";

/* eslint-disable @next/next/no-img-element */
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { GALLERY, GALLERY_TABS, type GalleryCategory, type GalleryItem } from "@/lib/gallery";

const isReduced = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("reduced");

const CAT_LABEL: Record<GalleryCategory, string> = {
  wed: "Wedding",
  corp: "Corporate",
  bday: "Ulang Tahun",
  grad: "Wisuda",
};

type Filter = "all" | GalleryCategory;
type Row = { items: GalleryItem[]; height: number; last: boolean };

const smSrc = (src: string) => src.replace(/\.jpg$/, "-sm.jpg");

// Pack items into full-width justified rows. Each row is scaled so its prints,
// at their true aspect ratios, fill the container edge-to-edge — a real gallery
// wall, never the equal-card grid. Mirrors the Flickr/Google-Photos approach.
function buildRows(
  items: GalleryItem[],
  aspect: Record<string, number>,
  width: number,
  gap: number,
  targetH: number
): Row[] {
  if (width <= 0) return [];
  const rows: Row[] = [];
  let line: GalleryItem[] = [];
  let sumAspect = 0;
  for (const it of items) {
    const a = aspect[it.src] || 1.4;
    line.push(it);
    sumAspect += a;
    const projected = sumAspect * targetH + gap * (line.length - 1);
    if (projected >= width) {
      const h = (width - gap * (line.length - 1)) / sumAspect;
      rows.push({ items: line, height: h, last: false });
      line = [];
      sumAspect = 0;
    }
  }
  if (line.length) {
    // Last partial row: keep prints at the target height, left-aligned, so a
    // single leftover photo is never blown up to fill the width.
    rows.push({ items: line, height: targetH, last: true });
  }
  return rows;
}

export default function GaleriBoard() {
  const [cat, setCat] = useState<Filter>("all");
  const list = useMemo(
    () => (cat === "all" ? GALLERY : GALLERY.filter((g) => g.cat === cat)),
    [cat]
  );
  const listRef = useRef(list);
  useEffect(() => {
    listRef.current = list;
  }, [list]);

  /* ---- measure real aspect ratios once, then justify ---- */
  const [aspect, setAspect] = useState<Record<string, number>>({});
  const ready = Object.keys(aspect).length >= GALLERY.length;
  useEffect(() => {
    let cancelled = false;
    const acc: Record<string, number> = {};
    let remaining = GALLERY.length;
    const done = () => {
      remaining -= 1;
      if (remaining === 0 && !cancelled) setAspect({ ...acc });
    };
    GALLERY.forEach((g) => {
      const img = new Image();
      img.onload = () => {
        acc[g.src] = img.naturalHeight > 0 ? img.naturalWidth / img.naturalHeight : 1.4;
        done();
      };
      img.onerror = () => {
        acc[g.src] = 1.4;
        done();
      };
      img.src = smSrc(g.src);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---- track container width for the justified math ---- */
  const gridRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    setWidth(Math.round(el.clientWidth)); // seed immediately so rows never flash blank
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setWidth(Math.round(w));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const gap = width < 600 ? 10 : 14;
  const targetH = width >= 1100 ? 300 : width >= 760 ? 252 : width >= 560 ? 226 : 208;
  const rows = useMemo(
    () => (ready ? buildRows(list, aspect, width, gap, targetH) : []),
    [ready, list, aspect, width, gap, targetH]
  );

  /* ---- lightbox state ---- */
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const viewerRef = useRef<HTMLDivElement>(null);
  const layerA = useRef<HTMLImageElement>(null);
  const layerB = useRef<HTMLImageElement>(null);
  const activeIsA = useRef(true);
  const busy = useRef(false);
  const zoomed = useRef(false);

  const open = openIdx !== null;
  const current = openIdx !== null ? list[openIdx] : null;
  const counter =
    openIdx !== null ? `${`0${openIdx + 1}`.slice(-2)} / ${`0${list.length}`.slice(-2)}` : "";

  const activeImg = useCallback(
    () => (activeIsA.current ? layerA.current : layerB.current),
    []
  );
  const backImg = useCallback(() => (activeIsA.current ? layerB.current : layerA.current), []);

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

  const animateSlide = useCallback(
    (target: number, d: number) => {
      const items = listRef.current;
      const front = activeImg();
      const back = backImg();
      if (!front || !back || !items[target]) return;
      busy.current = true;
      const dist = slideDist();
      back.src = items[target].src;
      back.alt = items[target].title || "";
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
    const items = listRef.current;
    if (!items[i]) return;
    setOpenIdx(i);
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    document.body.classList.add("lb-open");
    activeIsA.current = true;
    const a = layerA.current;
    const b = layerB.current;
    if (a) {
      a.src = items[i].src;
      a.alt = items[i].title || "";
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
        const len = listRef.current.length;
        const ni = (i + d + len) % len;
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

  const pick = (next: Filter) => {
    if (next === cat) return;
    if (open) close();
    setCat(next);
  };

  // flat index into `list` so the lightbox walks photos in reading order
  let flat = -1;

  return (
    <section className="gx-board" aria-label="Galeri karya Tetra Photobooth">
      <div className="gx-bar">
        <div className="wrap">
          <div className="gtabs" role="tablist" aria-label="Saring berdasarkan jenis acara">
            {GALLERY_TABS.map((t) => (
              <button
                key={t.cat}
                type="button"
                role="tab"
                aria-selected={cat === t.cat}
                className={cat === t.cat ? "on" : undefined}
                onClick={() => pick(t.cat)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap">
        {/* key=cat replays the row cascade on each filter switch */}
        <div className="gx-grid" ref={gridRef} key={cat}>
          {!ready && (
            <div className="gx-skel" aria-hidden>
              {Array.from({ length: 9 }).map((_, i) => (
                <span key={i} />
              ))}
            </div>
          )}
          {ready &&
            rows.map((row, r) => (
              <div
                className={`gx-row${row.last ? " is-last" : ""}`}
                key={r}
                style={{ ["--gx-gap" as string]: `${gap}px`, animationDelay: `${Math.min(r, 10) * 0.06}s` }}
              >
                {row.items.map((g) => {
                  flat += 1;
                  const idx = flat;
                  const w = (aspect[g.src] || 1.4) * row.height;
                  return (
                    <button
                      className="gx-card"
                      key={g.src}
                      type="button"
                      aria-label={`Lihat ${g.title} — ${g.sub}`}
                      style={{ width: `${w}px`, height: `${row.height}px`, flexGrow: row.last ? 0 : 1 }}
                      onClick={() => show(idx)}
                    >
                      <picture className="rsp">
                        <source media="(max-width: 768px)" srcSet={smSrc(g.src)} />
                        <img src={g.src} alt={g.title} loading="lazy" decoding="async" />
                      </picture>
                      <span className="gx-tag">{CAT_LABEL[g.cat]}</span>
                      <span className="gx-cap">
                        <b>{g.title}</b>
                        <i>{g.sub}</i>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
        </div>
      </div>

      {mounted &&
        createPortal(
          <div
            className={`viewer${open ? " open" : ""}`}
            ref={viewerRef}
            aria-hidden={!open}
            onClick={close}
          >
            <div className="vcount">{counter}</div>
            <div
              className="vclose"
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
              <img className="vimg" ref={layerA} alt="" />
              <img className="vimg vimg-b" ref={layerB} alt="" aria-hidden />
            </div>
            <div className="vmeta">
              <div className="vnm">{current?.title}</div>
              <div className="vfm">{current?.sub}</div>
            </div>
            <div className="vfilm" aria-hidden={!open}>
              {list.map((g, idx) => (
                <button
                  key={g.src}
                  className={openIdx === idx ? "on" : undefined}
                  tabIndex={open ? 0 : -1}
                  aria-label={g.title}
                  onClick={(e) => {
                    e.stopPropagation();
                    jump(idx);
                  }}
                >
                  <img src={smSrc(g.src)} alt="" />
                </button>
              ))}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
