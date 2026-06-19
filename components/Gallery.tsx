"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";
import { GALLERY } from "@/lib/gallery";
import { IgIcon, TiktokIcon } from "./SocialIcons";
import { INSTAGRAM_URL, TIKTOK_URL } from "@/lib/site";

const isReduced = () =>
  typeof document !== "undefined" && document.documentElement.classList.contains("reduced");

// Two marquee rows (top scrolls right→left, bottom left→right). Each row uses
// the full set (row B reversed so the rows differ); items are repeated inside
// each group so a group is always wider than the viewport → the rows never run
// out and leave empty space.
const ROW_A = GALLERY;
const ROW_B = [...GALLERY].reverse();

export default function Gallery() {
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
                  onClick={() => show(g.i)}
                >
                  <picture className="rsp">
                    <source media="(max-width: 768px)" srcSet={g.src.replace(/\.jpg$/, "-sm.jpg")} />
                    <img src={g.src} alt={g.title} loading="lazy" decoding="async" />
                  </picture>
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

  const galleryView = (
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
  );

  // Lightbox is portaled to <body> so it escapes the section's stacking context.
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
