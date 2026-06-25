"use client";

/* eslint-disable @next/next/no-img-element */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { PicThumb } from "@/components/Pic";

// Shared fullscreen lightbox used by the homepage Gallery and the /galeri board.
// Behaviour (open bloom, A/B cross-slide, zoom-pan, filmstrip, keyboard nav) is
// moved here verbatim from the two former copies so it stays byte-for-byte the
// same — only the call sites differ.
export type LightboxItem = { src: string; title: string; sub: string };

type Options = {
  /** Fired just before a photo opens (e.g. clear the gallery's hover-slow state). */
  onOpen?: () => void;
};

const isReduced = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("reduced");

const pad2 = (n: number) => `0${n}`.slice(-2);

export function useLightbox(items: LightboxItem[], opts: Options = {}) {
  // Kept fresh for the imperative nav callbacks without reading the ref during
  // render (callers pass the stable GALLERY constant, so this only ever no-ops).
  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const viewerRef = useRef<HTMLDivElement>(null);
  const layerA = useRef<HTMLImageElement>(null);
  const layerB = useRef<HTMLImageElement>(null);
  const activeIsA = useRef(true);
  const busy = useRef(false);
  const zoomed = useRef(false);

  const open = openIdx !== null;
  const current = openIdx !== null ? items[openIdx] : null;
  const counter =
    openIdx !== null ? `${pad2(openIdx + 1)} / ${pad2(items.length)}` : "";

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

  const animateSlide = useCallback(
    (target: number, d: number) => {
      const list = itemsRef.current;
      const front = activeImg();
      const back = backImg();
      if (!front || !back || !list[target]) return;
      busy.current = true;
      const dist = slideDist();
      back.src = list[target].src;
      back.alt = list[target].title || "";
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

  const openAt = useCallback(
    (i: number) => {
      const list = itemsRef.current;
      if (i < 0 || !list[i]) return;
      opts.onOpen?.();
      setOpenIdx(i);
      getLenis()?.stop();
      document.body.style.overflow = "hidden";
      document.body.classList.add("lb-open");
      activeIsA.current = true;
      const a = layerA.current;
      const b = layerB.current;
      if (a) {
        a.src = list[i].src;
        a.alt = list[i].title || "";
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
    },
    [opts]
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
        const len = itemsRef.current.length;
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

  const viewer = (
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
      {/* Filmstrip thumbs render only while open, so they cost nothing on
          initial page load (any device); they reuse the small image variants. */}
      <div className="vfilm" aria-hidden={!open}>
        {open &&
          items.map((g, idx) => (
            <button
              key={g.src}
              className={openIdx === idx ? "on" : undefined}
              tabIndex={0}
              aria-label={g.title}
              onClick={(e) => {
                e.stopPropagation();
                jump(idx);
              }}
            >
              <PicThumb src={g.src} />
            </button>
          ))}
      </div>
    </div>
  );

  const portal = mounted ? createPortal(viewer, document.body) : null;

  return { openAt, portal, isOpen: open };
}
