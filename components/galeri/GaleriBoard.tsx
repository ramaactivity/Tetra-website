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
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { GALLERY, type GalleryItem } from "@/lib/gallery";

const isReduced = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("reduced");

const smSrc = (src: string) => src.replace(/\.jpg$/, "-sm.jpg");

// Per-lane character: drift direction, gentle ambient speed (px/s), loops a
// full scroll-through scrubs (kept low so scrolling stays calm, not warp-speed),
// and cursor-parallax depth.
const LANE_DIR = [1, -1, 1, -1];
const LANE_AMB = [26, 34, 30, 22];
const LANE_LOOPS = [1.5, 1, 1.6, 1];
const LANE_DEPTH = [1.0, 0.66, 1.22, 0.54];

// Text tiles interleaved among the prints — varied brand voice (not monotone).
type TextTile = { eyebrow?: string; a: string; b: string };
const QUOTES: TextTile[] = [
  { a: "Satu bingkai,", b: "satu cerita." },
  { a: "Setiap momen,", b: "kami rekam." },
  { a: "Memories that", b: "last forever." },
  { a: "Kenangan yang", b: "abadi." },
  { a: "Dibawa pulang,", b: "dikenang selamanya." },
  { a: "Ratusan acara,", b: "satu Tetra." },
  { eyebrow: "Tetra Photobooth", a: "Momen jadi", b: "kenangan." },
  { a: "Tiap cetak,", b: "dirancang khusus." },
];

// Repeating film-tape marquee text — varied so it never reads the same twice.
const TAPE_PHRASES = [
  "Tetra Photobooth",
  "Satu Bingkai, Satu Cerita",
  "Momen",
  "Memories",
  "Galeri & Dokumentasi",
  "Kenangan Yang Abadi",
  "Tetra",
  "Setiap Cerita Berharga",
];

type Entry = { kind: "photo"; item: GalleryItem } | { kind: "text"; tile: TextTile };

// Round-robin the filtered set into N lanes, repeating each lane until tall
// enough to loop seamlessly (thin formats still fill their column).
function buildLanes(list: GalleryItem[], lanes: number): GalleryItem[][] {
  const out: GalleryItem[][] = Array.from({ length: lanes }, () => []);
  list.forEach((g, i) => out[i % lanes].push(g));
  // Keep each lane just long enough to loop past the viewport. Over-filling
  // makes the transformed track exceed the GPU max texture and blur on retina.
  const MIN = 4;
  const MAX = 6;
  return out.map((items, li) => {
    let base = items.length ? items : list.slice();
    if (base.length) {
      const off = li % base.length;
      base = base.slice(off).concat(base.slice(0, off));
    }
    base = base.slice(0, MAX); // cap unique items so the track layer stays small
    const filled: GalleryItem[] = [];
    while (base.length && filled.length < MIN) filled.push(...base); // pad thin lanes
    return filled.length ? filled : base;
  });
}

// Interleave a brand-quote tile every few prints; start offset varies per lane
// so the tiles never line up into a row.
function buildEntries(photos: GalleryItem[], laneIndex: number): Entry[] {
  const out: Entry[] = [];
  let t = laneIndex;
  photos.forEach((p, i) => {
    out.push({ kind: "photo", item: p });
    if (i % 4 === 3) {
      out.push({ kind: "text", tile: QUOTES[t % QUOTES.length] });
      t += 1;
    }
  });
  return out;
}

export default function GaleriBoard() {
  const list = GALLERY;
  const listRef = useRef(list);

  // More lanes on wider screens keeps each lane's track SHORT. That matters:
  // the track is GPU-composited (transformed), and if it's taller than the
  // max texture size (~16384px device) the browser downscales the whole layer
  // and every photo blurs on retina. Narrower + fewer items per lane keeps it
  // well under that, so the prints stay crisp.
  const [laneCount, setLaneCount] = useState(5);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setLaneCount(w >= 1360 ? 6 : w >= 1080 ? 5 : w >= 820 ? 4 : w >= 560 ? 3 : 2);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const laneEntries = useMemo(
    () => buildLanes(list, laneCount).map((photos, li) => buildEntries(photos, li)),
    [list, laneCount]
  );

  /* ---- the stream engine: pin + scroll-scrub through endless modulo loops ---- */
  const streamRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const laneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ nx: 0, ny: 0 });
  const hovering = useRef(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isReduced()) return;
    const tracks = trackRefs.current.slice(0, laneEntries.length).filter(Boolean) as HTMLDivElement[];
    const stream = streamRef.current;
    const sticky = stickyRef.current;
    if (!tracks.length || !stream || !sticky) return;

    const heightOf = () =>
      tracks.map((t) => Math.max(t.scrollHeight / 2, window.innerHeight * 1.2));
    let H = heightOf();
    const base = tracks.map((_, i) => (H[i] / tracks.length) * i);
    let progress = 0;
    const wrap = (v: number, m: number) => {
      let y = v % m;
      if (y < 0) y += m;
      return y;
    };

    const ro = new ResizeObserver(() => {
      H = heightOf();
    });
    tracks.forEach((t) => ro.observe(t));

    const st = ScrollTrigger.create({
      trigger: stream,
      start: "top top",
      end: () => "+=" + Math.round(window.innerHeight * 3.2),
      pin: sticky,
      pinSpacing: true,
      scrub: 1.1,
      // higher than the Format section's pin (default 0) so this pin (higher on
      // the page) is measured first — otherwise their pin-spacers overlap and
      // the Format section pins on top of the still-pinned gallery (mobile).
      refreshPriority: 1,
      invalidateOnRefresh: true,
      onRefresh: () => {
        H = heightOf();
      },
      onUpdate: (self) => {
        progress = self.progress;
        if (progress > 0.015) stream.classList.add("scrolled");
      },
    });

    const tick = (_time: number, deltaTime: number) => {
      const dt = Math.min(0.05, (deltaTime || 16) / 1000);
      for (let i = 0; i < tracks.length; i++) {
        if (!hovering.current) base[i] += LANE_AMB[i % LANE_AMB.length] * LANE_DIR[i % LANE_DIR.length] * dt;
        const dir = LANE_DIR[i % LANE_DIR.length];
        const scrub = progress * H[i] * LANE_LOOPS[i % LANE_LOOPS.length] * dir;
        const y = wrap(base[i] + scrub, H[i]);
        tracks[i].style.transform = `translate3d(0, ${(-y).toFixed(2)}px, 0)`;
      }
    };
    gsap.ticker.add(tick);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      ro.disconnect();
      st.kill();
    };
  }, [laneEntries]);

  const applyParallax = useCallback(() => {
    const { nx, ny } = mouse.current;
    laneRefs.current.forEach((el, i) => {
      if (!el) return;
      const depth = LANE_DEPTH[i % LANE_DEPTH.length];
      el.style.transform = `translate3d(${(nx * 7 * depth).toFixed(1)}px, ${(ny * 9 * depth).toFixed(1)}px, 0)`;
    });
  }, []);
  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    mouse.current.nx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.ny = (e.clientY / window.innerHeight) * 2 - 1;
    applyParallax();
  };
  const onLeave = () => {
    mouse.current.nx = 0;
    mouse.current.ny = 0;
    applyParallax();
  };
  const enterCard = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    hovering.current = true;
  };
  const leaveCard = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => (hovering.current = false), 70);
  };

  /* ---- lightbox (detail view, photos only) ---- */
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

  const activeImg = useCallback(() => (activeIsA.current ? layerA.current : layerB.current), []);
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
    if (i < 0 || !items[i]) return;
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

  const openItem = useCallback(
    (g: GalleryItem) => show(listRef.current.findIndex((x) => x.src === g.src)),
    [show]
  );

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

  const tapeGroup = (
    <span className="gx-tape-group" aria-hidden>
      {Array.from({ length: 4 }).map((_, r) =>
        TAPE_PHRASES.map((p, i) => (
          <em key={`${r}-${i}`}>
            {p}
            <b>✦</b>
          </em>
        ))
      )}
    </span>
  );

  return (
    <section className="gx-board" aria-label="Arus kenangan Tetra Photobooth">
      <div className="gx-stream" ref={streamRef}>
        <div className="gx-stream-sticky" ref={stickyRef} onMouseMove={onMove} onMouseLeave={onLeave}>
          <div className="gx-ghost" aria-hidden>
            selamanya
          </div>

          <div className="gx-stage" key={laneCount}>
            {laneEntries.map((entries, li) => (
              <div
                className="gx-lane"
                key={li}
                ref={(el) => {
                  laneRefs.current[li] = el;
                }}
              >
                <div
                  className="gx-track"
                  ref={(el) => {
                    trackRefs.current[li] = el;
                  }}
                >
                  {[0, 1].map((dup) =>
                    entries.map((e, k) =>
                      e.kind === "photo" ? (
                        <button
                          className={`gx-card${dup ? " gx-dup" : ""}`}
                          key={`${dup}-${k}`}
                          type="button"
                          tabIndex={dup ? -1 : 0}
                          aria-hidden={dup ? true : undefined}
                          aria-label={`Lihat ${e.item.title} — ${e.item.sub}`}
                          onMouseEnter={enterCard}
                          onMouseLeave={leaveCard}
                          onClick={() => openItem(e.item)}
                        >
                          <picture className="rsp">
                            <source media="(max-width: 768px)" srcSet={smSrc(e.item.src)} />
                            <img src={e.item.src} alt={e.item.title} draggable={false} decoding="async" />
                          </picture>
                          <span className="gx-cap">
                            <b>{e.item.title}</b>
                            <i>{e.item.sub}</i>
                          </span>
                        </button>
                      ) : (
                        <div
                          className={`gx-textcard${dup ? " gx-dup" : ""}`}
                          key={`${dup}-${k}`}
                          aria-hidden={dup ? true : undefined}
                        >
                          {e.tile.eyebrow && <span className="gx-tc-eyebrow">{e.tile.eyebrow}</span>}
                          <span className="gx-tc-line">
                            {e.tile.a} <i>{e.tile.b}</i>
                          </span>
                          <span className="gx-tc-mark" aria-hidden>
                            ✦
                          </span>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="gx-stream-veil" aria-hidden />

          {/* top & bottom film tapes — crisp designed boundaries */}
          <div className="gx-top">
            <div className="gx-tape top" aria-hidden>
              <div className="gx-tape-track">
                {tapeGroup}
                {tapeGroup}
              </div>
            </div>
          </div>

          <div className="gx-tape bottom" aria-hidden>
            <div className="gx-tape-track">
              {tapeGroup}
              {tapeGroup}
            </div>
          </div>
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
