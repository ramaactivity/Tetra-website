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
const smSrc = (src: string) => src.replace(/\.jpg$/, "-sm.jpg");

// Per-lane base loop duration (seconds) + parallax depth. The CSS keyframe does
// the actual infinite flow; JS only scales playbackRate from scroll velocity.
const LANE_DUR = [46, 62, 52, 70];
const LANE_DEPTH = [1.0, 0.66, 1.22, 0.54];

// Round-robin the filtered set into N lanes, then repeat each lane until it's
// tall enough to loop seamlessly (small categories still fill the column).
function buildLanes(list: GalleryItem[], lanes: number): GalleryItem[][] {
  const out: GalleryItem[][] = Array.from({ length: lanes }, () => []);
  list.forEach((g, i) => out[i % lanes].push(g));
  const MIN = 6;
  return out.map((items, li) => {
    let base = items.length ? items : list.slice();
    if (base.length) {
      const off = li % base.length;
      base = base.slice(off).concat(base.slice(0, off));
    }
    const filled: GalleryItem[] = [];
    while (base.length && filled.length < MIN) filled.push(...base);
    return filled.length ? filled : base;
  });
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

  const [laneCount, setLaneCount] = useState(4);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setLaneCount(w >= 1200 ? 4 : w >= 820 ? 3 : 2);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const lanes = useMemo(() => buildLanes(list, laneCount), [list, laneCount]);

  /* ---- the stream engine ----
     Motion is pure CSS (guaranteed to flow). Scroll velocity scales every
     lane's playbackRate so scrolling visibly drives the stream; hovering a
     print eases the whole stream toward a stop so you can dwell on it. */
  const streamRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const laneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ nx: 0, ny: 0 });
  const hovering = useRef(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isReduced()) return; // CSS collapses to a static column gallery
    const tracks = () =>
      trackRefs.current.slice(0, lanes.length).filter(Boolean) as HTMLDivElement[];

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      rootMargin: "150px",
    });
    if (streamRef.current) io.observe(streamRef.current);

    const getScroll = () => getLenis()?.scroll ?? window.scrollY;
    let raf = 0;
    let last = performance.now();
    let lastScroll = getScroll();
    let vel = 0;
    let mul = 1;
    let scrolledFlag = false;

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const sc = getScroll();
      const inst = (sc - lastScroll) / Math.max(dt, 0.0001);
      lastScroll = sc;
      vel += (inst - vel) * 0.15;

      if (!scrolledFlag && Math.abs(vel) > 80) {
        scrolledFlag = true;
        streamRef.current?.classList.add("scrolled");
      }

      // hovering → ease toward a near-stop; otherwise base speed + scroll boost
      const target = hovering.current ? 0.04 : Math.min(7, 1 + Math.abs(vel) * 0.0032);
      mul += (target - mul) * 0.09;
      const m = Math.max(0, mul);

      if (visible) {
        for (const t of tracks()) {
          const anims = t.getAnimations();
          for (const a of anims) a.playbackRate = m;
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [lanes]);

  // cursor parallax — shift each lane wrapper by depth (separate element from
  // the animated track, so the two transforms never fight)
  const applyParallax = useCallback(() => {
    const { nx, ny } = mouse.current;
    laneRefs.current.forEach((el, i) => {
      if (!el) return;
      const depth = LANE_DEPTH[i % LANE_DEPTH.length];
      const dir = i % 2 ? -1 : 1;
      el.style.transform = `translate3d(${(nx * 26 * depth * dir).toFixed(1)}px, ${(ny * 16 * depth).toFixed(1)}px, 0)`;
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

  /* ---- lightbox (detail view) ---- */
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

  const pick = (next: Filter) => {
    if (next === cat) return;
    if (open) close();
    setCat(next);
  };

  return (
    <section className="gx-board" aria-label="Arus kenangan Tetra Photobooth">
      <div className="gx-stream" ref={streamRef}>
        <div className="gx-stream-sticky" onMouseMove={onMove} onMouseLeave={onLeave}>
          <div className="gx-ghost" aria-hidden>
            selamanya
          </div>

          <div className="gx-stage" ref={stageRef} key={`${cat}-${laneCount}`}>
            {lanes.map((laneItems, li) => (
              <div
                className="gx-lane"
                key={li}
                ref={(el) => {
                  laneRefs.current[li] = el;
                }}
              >
                <div
                  className="gx-track"
                  data-dir={li % 2 ? "down" : "up"}
                  style={{ ["--dur" as string]: `${LANE_DUR[li % LANE_DUR.length]}s` }}
                  ref={(el) => {
                    trackRefs.current[li] = el;
                  }}
                >
                  {[0, 1].map((dup) =>
                    laneItems.map((g, k) => (
                      <button
                        className={`gx-card${dup ? " gx-dup" : ""}`}
                        key={`${dup}-${k}`}
                        type="button"
                        tabIndex={dup ? -1 : 0}
                        aria-hidden={dup ? true : undefined}
                        aria-label={`Lihat ${g.title} — ${g.sub}`}
                        onMouseEnter={enterCard}
                        onMouseLeave={leaveCard}
                        onClick={() => openItem(g)}
                      >
                        <img src={smSrc(g.src)} alt={g.title} draggable={false} decoding="async" />
                        <span className="gx-cap">
                          <b>{g.title}</b>
                          <i>{g.sub}</i>
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="gx-stream-veil" aria-hidden />

          <div className="gx-controls">
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

          <div className="gx-hint" aria-hidden>
            <span className="ln" />
            Gulir untuk mempercepat · arahkan untuk berhenti
            <span className="ln r" />
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
