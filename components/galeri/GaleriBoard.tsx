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
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { GALLERY, type GalleryItem } from "@/lib/gallery";
import { useLightbox } from "@/components/lightbox/useLightbox";

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
  // real hover devices only — touch must never set a sticky hover/dim/slow state
  const canHover = useRef(false);
  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

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

    // Pause the per-frame transforms when the gallery is off-screen — no point
    // animating (and compositing) layers nobody can see.
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      rootMargin: "200px",
    });
    io.observe(stream);

    // Touch devices use NATIVE scroll (no Lenis). GSAP pin + scrub on top of
    // native scroll stutters badly on phones, so there we DON'T pin/scrub — the
    // gallery is just a 100vh band that drifts (ambient) while the page scrolls
    // past it smoothly. Desktop keeps the scroll-scrubbed "fly through" pin.
    const touch = window.matchMedia("(pointer: coarse)").matches;
    const st = touch
      ? null
      : ScrollTrigger.create({
          trigger: stream,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * 3.2),
          pin: sticky,
          pinSpacing: true,
          scrub: 1.1,
          // higher than the Format section's pin (default 0) so this pin (higher
          // on the page) is measured first — otherwise their pin-spacers overlap
          // and the Format section pins on top of the still-pinned gallery.
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
      if (!visible || document.body.classList.contains("lb-open")) return;
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
      io.disconnect();
      st?.kill();
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
    if (!canHover.current) return; // no cursor parallax on touch
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
    if (!canHover.current) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    hovering.current = true;
  };
  const leaveCard = () => {
    if (!canHover.current) return;
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => (hovering.current = false), 70);
  };

  /* ---- lightbox (detail view, photos only) — shared hook ---- */
  const { openAt, portal } = useLightbox(GALLERY, {
    thumb: smSrc,
    // don't leave the stream stuck "slowed" after opening a photo
    onOpen: () => {
      hovering.current = false;
    },
  });

  // Stream order differs from GALLERY order, so map the clicked item → its index.
  const openItem = useCallback(
    (g: GalleryItem) => openAt(GALLERY.findIndex((x) => x.src === g.src)),
    [openAt]
  );

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

      {portal}
    </section>
  );
}
