"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

/* ---- helpers (ported from reference, typed) -------------------------------- */

// Split an element's HTML into per-word mask spans (.w > .wi), preserving inline
// element wrappers like <span class="it"> and carrying .it onto the inner span.
function splitWords(el: HTMLElement): HTMLElement[] {
  const tmp = document.createElement("div");
  tmp.innerHTML = el.innerHTML;
  const out: Node[] = [];
  const walk = (n: Node, s: Node[]) => {
    n.childNodes.forEach((x) => {
      if (x.nodeType === 3) {
        (x.textContent || "").split(/(\s+)/).forEach((t) => {
          if (t.trim() === "") {
            s.push(document.createTextNode(t));
            return;
          }
          const a = document.createElement("span");
          a.className = "w";
          const b = document.createElement("span");
          b.className = "wi";
          const parent = n as HTMLElement;
          if (parent.classList && parent.classList.contains("it")) b.classList.add("it");
          b.textContent = t;
          a.appendChild(b);
          s.push(a);
        });
      } else if (x.nodeType === 1) {
        const xe = x as HTMLElement;
        const e = document.createElement(xe.tagName.toLowerCase());
        e.className = xe.className;
        const inner: Node[] = [];
        walk(xe, inner);
        inner.forEach((y) => e.appendChild(y));
        s.push(e);
      }
    });
  };
  walk(tmp, out);
  el.innerHTML = "";
  out.forEach((x) => el.appendChild(x));
  return Array.from(el.querySelectorAll<HTMLElement>(".wi"));
}

function splitChars(el: HTMLElement): HTMLElement[] {
  const t = el.textContent || "";
  el.innerHTML = "";
  return Array.from(t).map((c) => {
    const s = document.createElement("span");
    s.className = "c";
    s.textContent = c === " " ? " " : c;
    el.appendChild(s);
    return s;
  });
}

/* ---------------------------------------------------------------------------- */

export default function MotionRoot() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;

    // Reduced motion: CSS already reveals content + hides the loader. Do nothing.
    if (reduced) return;

    const cleanups: Array<() => void> = [];
    const restores: Array<{ el: HTMLElement; html: string }> = [];

    const ctx = gsap.context(() => {
      /* ---- Lenis smooth scroll, wired to ScrollTrigger ---- */
      const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, touchMultiplier: 1.5 });
      lenisRef.current = lenis;
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const ticker = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
      cleanups.push(() => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
        lenisRef.current = null;
        setLenis(null);
      });

      /* ---- nav smooth-scroll (offset clears the fixed header) ---- */
      const scrollTo = (sel: string) => {
        const e = document.querySelector(sel) as HTMLElement | null;
        if (e) lenis.scrollTo(e, { offset: -92 });
      };
      const navHandlers: Array<[HTMLElement, (ev: Event) => void]> = [];
      document.querySelectorAll<HTMLElement>("[data-scroll]").forEach((a) => {
        const h = (ev: Event) => {
          ev.preventDefault();
          scrollTo(a.getAttribute("data-scroll") || "");
        };
        a.addEventListener("click", h);
        navHandlers.push([a, h]);
      });
      cleanups.push(() => navHandlers.forEach(([a, h]) => a.removeEventListener("click", h)));

      /* ---- scroll reveals ---- */
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        restores.push({ el, html: el.innerHTML });
        const w = splitWords(el);
        gsap.to(w, {
          y: 0,
          duration: 0.9,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      /* ---- hero scrubs (scroll-tied, start immediately) ---- */
      gsap.to("#bgword", {
        xPercent: -26,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        "#heroMedia",
        { rotation: -1.5, yPercent: 0 },
        {
          rotation: 3,
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        }
      );

      /* ---- floating CTA cards (paused by ScrollTrigger while off-screen) ---- */
      document.querySelectorAll<HTMLElement>("[data-float]").forEach((f, i) => {
        const tw = gsap.to(f, {
          y: "+=10",
          duration: 3.2 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
        ScrollTrigger.create({
          trigger: f,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tw.play() : tw.pause()),
        });
      });

      /* ---- why widget: custom-frame cycle ---- */
      const cfrm = document.getElementById("cfrm");
      if (cfrm) {
        const imgs = cfrm.querySelectorAll<HTMLElement>(".ph img");
        const lbl = document.getElementById("cfrmLbl");
        const set = [
          { l: "Wedding", c: "#9C7733" },
          { l: "Corporate", c: "#5B7186" },
          { l: "Ulang Tahun", c: "#C77BA0" },
          { l: "Wisuda", c: "#6E9A6B" },
        ];
        let i = 0;
        const id = window.setInterval(() => {
          i = (i + 1) % set.length;
          imgs.forEach((im, k) => im.classList.toggle("on", k === i));
          if (lbl) {
            lbl.textContent = set[i].l;
            lbl.style.color = set[i].c;
          }
          cfrm.style.borderColor = set[i].c;
        }, 1900);
        cleanups.push(() => window.clearInterval(id));
      }

      /* ---- FORMAT pinned scrollytelling (4R → 2R → Polaroid) ---- */
      formatStory();

      /* ---- WHY pinned 2-col reveal (widgets swap one at a time) ---- */
      whyStory();

      /* ---- process timeline ---- */
      gsap.to("#stepProg", {
        height: "100%",
        ease: "none",
        scrollTrigger: { trigger: "#steps", start: "top 60%", end: "bottom 70%", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".step").forEach((s) => {
        ScrollTrigger.create({
          trigger: s,
          start: "top 72%",
          onEnter: () => s.classList.add("lit"),
          onLeaveBack: () => s.classList.remove("lit"),
        });
      });

      /* ---- gold ribbon ---- */
      ribbon(lenis);

      /* ---- advanced interaction & atmosphere layer ---- */
      scrollProgress();
      dividerReveal();
      pauseOffscreen();
      if (!touch) {
        cursor();
        magnetic();
        heroTilt();
      }

      /* Split H1 now (words sit masked below) so the curtain lift reveals a
         clean line with no text flash; runHero animates them up afterwards. */
      const h1El = document.getElementById("h1");
      let heroWords: HTMLElement[] = [];
      if (h1El) {
        restores.push({ el: h1El, html: h1El.innerHTML });
        heroWords = splitWords(h1El);
      }

      /* ---- hero entrance (runs after the loader) ---- */
      const runHero = () => {
        if (heroWords.length)
          gsap.to(heroWords, { y: 0, duration: 1, stagger: 0.06, ease: "power4.out", delay: 0.1 });
        gsap.to("#he", { opacity: 1, y: 0, duration: 0.9, delay: 0.15 });
        gsap.to("#hs", { opacity: 1, y: 0, duration: 0.9, delay: 0.5 });
        gsap.to("#hc", { opacity: 1, y: 0, duration: 0.9, delay: 0.62 });
        gsap.to("#ht", { opacity: 1, y: 0, duration: 0.9, delay: 0.74 });
        gsap.from("#heroMedia .hgw", {
          opacity: 0,
          y: 36,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.3,
        });
      };

      /* ---- loader intro → curtain wipe → reveal page ---- */
      const loaderEl = document.getElementById("loader");
      const ll = document.getElementById("ll");
      if (loaderEl && ll) {
        const ch = splitChars(ll);
        const markImg = loaderEl.querySelector<HTMLElement>("#ldmark img");
        const sheen = document.getElementById("ldsheen");
        // autofocus blur driver (via CSS var so the rack is buttery, not janky)
        const focus = { b: 18 };
        const setBlur = () => markImg && markImg.style.setProperty("--b", `${focus.b}px`);
        setBlur();
        // gold glint driver — only the gradient moves; its logo-shaped mask stays put
        const glint = { p: 150 };
        const setGlint = () => sheen && (sheen.style.backgroundPositionX = `${glint.p}%`);
        setGlint();

        let heroFired = false;
        const fireHero = () => {
          if (heroFired) return;
          heroFired = true;
          runHero();
        };

        gsap.set("#ldmark img", { scale: 1.09, opacity: 0, transformOrigin: "50% 50%" });
        gsap.set("#ldframe", { scale: 1.12, opacity: 0 });
        gsap.set("#ldreticle", { scale: 1.5, opacity: 0 });

        gsap
          .timeline({ onComplete: () => ScrollTrigger.refresh() })
          // ---- viewfinder powers on, wide ----
          .to("#ldframe", { opacity: 1, duration: 0.6, ease: "power2.out" }, 0)
          .fromTo(
            ".ld-corner",
            { opacity: 0 },
            { opacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" },
            0.05
          )
          .to("#ldreticle", { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.1)
          // mark emerges, out of focus
          .to("#ldmark img", { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.4)
          // ---- AUTOFOCUS: a slow, deliberate hunt toward sharp ----
          .to(focus, { b: 2.6, duration: 1.05, ease: "power2.inOut", onUpdate: setBlur }, 0.6)
          .to("#ldmark img", { scale: 1.0, duration: 1.05, ease: "power2.inOut" }, 0.6)
          .to("#ldframe", { scale: 0.965, duration: 1.05, ease: "power2.inOut" }, 0.6)
          .to("#ldreticle", { scale: 1.02, duration: 1.05, ease: "power2.inOut" }, 0.6)
          // ---- FOCUS LOCK: snap crisp, frame settles, reticle blinks out ----
          .to(focus, { b: 0, duration: 0.45, ease: "power3.out", onUpdate: setBlur }, 1.65)
          .to("#ldframe", { scale: 1, duration: 0.5, ease: "back.out(2.2)" }, 1.65)
          .to("#ldreticle", { scale: 0.92, opacity: 0, duration: 0.4, ease: "power2.out" }, 1.65)
          // gold glint catches the letters on lock (masked to the glyphs)
          .set(sheen, { opacity: 1 }, 1.72)
          .to(
            glint,
            {
              p: -150,
              duration: 1.05,
              ease: "power2.inOut",
              onUpdate: setGlint,
              onComplete: () => sheen && gsap.set(sheen, { opacity: 0 }),
            },
            1.72
          )
          // ---- tagline rises (the "pose") ----
          .to(ch, { y: 0, duration: 0.75, stagger: 0.013, ease: "power3.out" }, 2.05)
          // hold the moment — let the guest settle into frame
          .to({}, { duration: 1.0 })
          // ---- CAPTURE: shutter punch (quick scale grab) then FLASH ----
          .to(".ld-inner", { scale: 0.965, duration: 0.13, ease: "power2.in" })
          .to("#ldframe", { scale: 0.94, opacity: 0.85, duration: 0.13, ease: "power2.in" }, "<")
          .to("#ldflash", { opacity: 1, duration: 0.07, ease: "power1.out" })
          .set("#loader", { display: "none" })
          // the photo "resolves" into the site behind the white, then it clears
          .add(fireHero, "+=0.04")
          .to("#ldflash", { opacity: 0, duration: 0.9, ease: "power2.inOut" }, "+=0.02")
          .set("#ldflash", { display: "none" });
      } else {
        runHero();
      }

      /* ---- refresh after fonts/images settle (pin + ribbon geometry) ---- */
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
      const onLoad = () => window.setTimeout(() => ScrollTrigger.refresh(), 300);
      window.addEventListener("load", onLoad);
      cleanups.push(() => window.removeEventListener("load", onLoad));
      window.setTimeout(() => ScrollTrigger.refresh(), 450);

      /* ===== FORMAT timeline ===== */
      function formatStory() {
        const s4 = document.getElementById("o4r");
        const s2 = document.getElementById("o2r");
        const sp = document.getElementById("opol");
        const c4 = document.getElementById("c4r");
        const c2 = document.getElementById("c2r");
        const cp = document.getElementById("cpol");
        const frame4 = document.getElementById("frame4");
        const img4l = document.getElementById("img4l");
        const img4p = document.getElementById("img4p");
        const oriBadge = document.getElementById("oriBadge");
        const ori4 = document.getElementById("ori4");
        const ds4 = document.getElementById("ds4");
        const seam = document.querySelector<HTMLElement>("#o2r .seam");
        const l2 = document.querySelector<HTMLElement>("#o2r .half.left");
        const r2 = document.querySelector<HTMLElement>("#o2r .half.right");
        const perf = document.querySelector<HTMLElement>("#opol .perf");
        const lp = document.querySelector<HTMLElement>("#opol .half.left");
        const rp = document.querySelector<HTMLElement>("#opol .half.right");
        if (!s4 || !c4) return;

        let oriState = -1;
        const setOri = (st: number) => {
          if (st === oriState) return;
          oriState = st;
          if (st === 0) {
            if (oriBadge) oriBadge.textContent = "Landscape";
            if (ori4) ori4.textContent = "orientasi landscape";
            if (ds4)
              ds4.innerHTML =
                "Cetak utama, lembar utuh. Yang ini <b>landscape</b> — pas buat foto rame-rame.";
          } else {
            if (oriBadge) oriBadge.textContent = "Portrait";
            if (ori4) ori4.textContent = "orientasi portrait";
            if (ds4)
              ds4.innerHTML =
                "Sama-sama 4R, diputar jadi <b>portrait</b> — pas buat potret formal & elegan.";
          }
        };
        setOri(0);

        // One-shot light sweep across a group's photo(s). Runs as its own
        // real-time tween (not part of the scrubbed timeline) so it glides
        // smoothly when an act appears / changes size, regardless of scroll speed.
        let sweepLock = 0;
        const sweepGroup = (group: HTMLElement | null) => {
          if (!group) return;
          const now = performance.now();
          if (now - sweepLock < 280) return; // de-dupe rapid scrub crossings
          sweepLock = now;
          const sheens = group.querySelectorAll<HTMLElement>(".fsheen");
          sheens.forEach((sh) =>
            gsap.fromTo(
              sh,
              { xPercent: -150, opacity: 0 },
              {
                xPercent: 150,
                opacity: 1,
                duration: 0.95,
                ease: "power2.inOut",
                onComplete: () => gsap.set(sh, { opacity: 0 }),
              }
            )
          );
        };

        gsap.set(seam, { scaleY: 0, opacity: 1 });
        gsap.set(perf, { scaleY: 0, opacity: 1 });
        gsap.set([s2, sp, c2, cp], { opacity: 0 });
        gsap.set([s4, c4], { opacity: 1 });
        gsap.set([s2, sp], { rotationY: -90, scale: 0.82, transformOrigin: "50% 50%" });
        gsap.set(s4, { rotationY: 0, scale: 1, transformOrigin: "50% 50%" });
        gsap.set(img4l, { opacity: 1 });
        gsap.set(img4p, { opacity: 0 });
        gsap.set(frame4, { width: 300, height: 200, rotateY: 0, transformOrigin: "50% 50%" });

        const tl = gsap.timeline();
        const flip = { a: 0 };
        tl.call(() => sweepGroup(s4), undefined, 0.15)
          .to({}, { duration: 0.5 })
          .to(flip, {
            a: 1,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              const a = flip.a;
              if (a < 0.5) {
                gsap.set(frame4, { rotateY: a * 180, width: 300, height: 200 });
                gsap.set(img4l, { opacity: 1 });
                gsap.set(img4p, { opacity: 0 });
                setOri(0);
              } else {
                gsap.set(frame4, { rotateY: (a - 1) * 180, width: 200, height: 300 });
                gsap.set(img4l, { opacity: 0 });
                gsap.set(img4p, { opacity: 1 });
                setOri(1);
              }
            },
          })
          .to({}, { duration: 0.7 })
          .to(s4, { rotationY: 90, scale: 0.82, opacity: 0, duration: 0.7, ease: "power2.in" })
          .to(c4, { opacity: 0, duration: 0.45 }, "<")
          .to(s2, { rotationY: 0, scale: 1, opacity: 1, duration: 0.85, ease: "power3.out" }, "-=.4")
          .call(() => sweepGroup(s2), undefined, "<+0.35")
          .to(c2, { opacity: 1, duration: 0.5 }, "<")
          .to(seam, { scaleY: 1, duration: 0.6, ease: "none" })
          .addLabel("cut")
          .to(l2, { xPercent: -55, rotation: -1, duration: 1.0, ease: "power2.inOut" }, "cut")
          .to(r2, { xPercent: 55, rotation: 1, duration: 1.0, ease: "power2.inOut" }, "cut")
          .to(seam, { opacity: 0, duration: 0.4 }, "cut")
          .to({}, { duration: 0.5 })
          .to(s2, { rotationY: 90, scale: 0.82, opacity: 0, duration: 0.7, ease: "power2.in" })
          .to(c2, { opacity: 0, duration: 0.45 }, "<")
          .to(sp, { rotationY: 0, scale: 1, opacity: 1, duration: 0.85, ease: "power3.out" }, "-=.4")
          .call(() => sweepGroup(sp), undefined, "<+0.35")
          .to(cp, { opacity: 1, duration: 0.5 }, "<")
          .to(perf, { scaleY: 1, duration: 0.55, ease: "none" })
          .addLabel("tear")
          .to(lp, { xPercent: -52, rotation: -3, duration: 1.0, ease: "power2.inOut" }, "tear")
          .to(rp, { xPercent: 52, rotation: 3, duration: 1.0, ease: "power2.inOut" }, "tear")
          .to(perf, { opacity: 0, duration: 0.4 }, "tear")
          .to({}, { duration: 0.6 });

        ScrollTrigger.create({
          trigger: ".fmt",
          start: "top top",
          end: "+=3400",
          pin: "#fpin",
          scrub: 1,
          animation: tl,
        });
      }

      /* ===== WHY timeline (pin #wpin, swap the 4 widgets one by one) ===== */
      function whyStory() {
        const stage = document.getElementById("wstage");
        if (!stage) return;
        // Desktop only — on mobile the CSS shows a static stacked fallback.
        if (window.innerWidth <= 900) return;
        const cards = Array.from(stage.querySelectorAll<HTMLElement>(".wd"));
        if (cards.length < 2) return;

        gsap.set(cards, { opacity: 0, y: 26 });
        gsap.set(cards[0], { opacity: 1, y: 0 });

        const tl = gsap.timeline();
        tl.to({}, { duration: 0.55 }); // hold the first widget
        for (let i = 1; i < cards.length; i++) {
          tl.to(cards[i - 1], { opacity: 0, y: -22, duration: 0.4, ease: "power2.in" })
            .fromTo(
              cards[i],
              { opacity: 0, y: 26 },
              { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
              "<0.05"
            )
            .to({}, { duration: 0.6 }); // hold
        }

        ScrollTrigger.create({
          trigger: ".why",
          start: "top top",
          end: "+=2600",
          pin: "#wpin",
          scrub: 1,
          animation: tl,
        });
        gsap.fromTo(
          "#whyProgFill",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: ".why", start: "top top", end: "+=2600", scrub: true },
          }
        );
      }

      /* ===== pause looping animations in sections that are off-screen ===== */
      function pauseOffscreen() {
        const targets = document.querySelectorAll<HTMLElement>("section");
        if (!targets.length || !("IntersectionObserver" in window)) return;
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) =>
              en.target.classList.toggle("amb-off", !en.isIntersecting)
            );
          },
          { rootMargin: "100px" }
        );
        targets.forEach((t) => io.observe(t));
        cleanups.push(() => io.disconnect());
      }

      /* ===== cursor (precise dot + lagging ring) ===== */
      function cursor() {
        const dot = document.getElementById("curDot");
        const ring = document.getElementById("curRing");
        if (!dot || !ring) return;
        document.documentElement.classList.add("cursor-on", "cur-on");
        const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
        const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
        const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
        const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
        const move = (e: MouseEvent) => {
          dx(e.clientX);
          dy(e.clientY);
          rx(e.clientX);
          ry(e.clientY);
        };
        window.addEventListener("mousemove", move);
        cleanups.push(() => {
          window.removeEventListener("mousemove", move);
          document.documentElement.classList.remove("cursor-on", "cur-on");
        });
        const hot = document.querySelectorAll<HTMLElement>('a,button,[role="button"],.qrow .q');
        const hEnter = () => ring.classList.add("hot");
        const hLeave = () => ring.classList.remove("hot");
        const cells = document.querySelectorAll<HTMLElement>(".cell");
        const cEnter = () => {
          ring.classList.add("label");
          ring.textContent = "Lihat";
        };
        const cLeave = () => {
          ring.classList.remove("label");
          ring.textContent = "";
        };
        hot.forEach((el) => {
          el.addEventListener("mouseenter", hEnter);
          el.addEventListener("mouseleave", hLeave);
        });
        cells.forEach((el) => {
          el.addEventListener("mouseenter", cEnter);
          el.addEventListener("mouseleave", cLeave);
        });
        cleanups.push(() => {
          hot.forEach((el) => {
            el.removeEventListener("mouseenter", hEnter);
            el.removeEventListener("mouseleave", hLeave);
          });
          cells.forEach((el) => {
            el.removeEventListener("mouseenter", cEnter);
            el.removeEventListener("mouseleave", cLeave);
          });
        });
      }

      /* ===== magnetic buttons / nav / filter tabs ===== */
      function magnetic() {
        const els = document.querySelectorAll<HTMLElement>(
          ".btn, header nav a.lnk, .gtabs button"
        );
        const reg: Array<[HTMLElement, EventListener, EventListener]> = [];
        els.forEach((el) => {
          const qx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
          const qy = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
          const strength = 0.35;
          const move = ((e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            qx((e.clientX - (r.left + r.width / 2)) * strength);
            qy((e.clientY - (r.top + r.height / 2)) * strength);
          }) as EventListener;
          const leave = (() => {
            qx(0);
            qy(0);
          }) as EventListener;
          el.addEventListener("mousemove", move);
          el.addEventListener("mouseleave", leave);
          reg.push([el, move, leave]);
        });
        cleanups.push(() =>
          reg.forEach(([el, m, l]) => {
            el.removeEventListener("mousemove", m);
            el.removeEventListener("mouseleave", l);
          })
        );
      }

      /* ===== hero 3D tilt + light parallax toward the cursor ===== */
      function heroTilt() {
        const hero = document.querySelector<HTMLElement>(".hero");
        const inner = document.getElementById("heroMediaInner");
        const fluid = document.getElementById("heroFluid");
        const bg = document.getElementById("bgword");
        if (!hero || !inner) return;
        const ry = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3" });
        const rx = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3" });
        const fx = fluid ? gsap.quickTo(fluid, "x", { duration: 0.8, ease: "power3" }) : null;
        const fy = fluid ? gsap.quickTo(fluid, "y", { duration: 0.8, ease: "power3" }) : null;
        const bx = bg ? gsap.quickTo(bg, "x", { duration: 0.9, ease: "power3" }) : null;
        const move = (e: MouseEvent) => {
          const r = hero.getBoundingClientRect();
          const nx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
          const ny = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
          ry(nx * 7);
          rx(-ny * 6);
          if (fx) fx(nx * 26);
          if (fy) fy(ny * 18);
          if (bx) bx(nx * -22);
        };
        const leave = () => {
          ry(0);
          rx(0);
          if (fx) fx(0);
          if (fy) fy(0);
          if (bx) bx(0);
        };
        hero.addEventListener("mousemove", move);
        hero.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          hero.removeEventListener("mousemove", move);
          hero.removeEventListener("mouseleave", leave);
        });
      }

      /* ===== gold scroll-progress bar ===== */
      function scrollProgress() {
        const bar = document.getElementById("scrollprog");
        if (!bar) return;
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });
      }

      /* ===== dividers draw from center on scroll-in ===== */
      function dividerReveal() {
        gsap.utils.toArray<HTMLElement>(".divider").forEach((d) => {
          gsap.fromTo(
            d,
            { scaleX: 0, transformOrigin: "50% 50%" },
            {
              scaleX: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: d, start: "top 92%" },
            }
          );
        });
      }

      /* ===== ribbon ===== */
      function ribbon(lenisInst: Lenis) {
        const svg = document.getElementById("ribbon");
        const glow = document.getElementById("ribbonGlow");
        const core = document.getElementById("ribbonCore") as unknown as SVGPathElement | null;
        const head = document.getElementById("ribbonHead");
        if (!svg || !glow || !core || !head) return;
        let len = 0;
        // Waypoints MUST be listed in vertical (document) order so the spline
        // never backtracks. Mirrors the section order in app/page.tsx.
        const sel = ["#top", ".manifesto", "#galeri", ".why", ".fmt", "#paket", "#cara", ".testi", "#kontak"];
        const sides = [0.5, 0.22, 0.8, 0.2, 0.82, 0.26, 0.78, 0.24, 0.5];

        const build = () => {
          const W = window.innerWidth;
          const H = document.documentElement.scrollHeight;
          svg.setAttribute("width", String(W));
          svg.setAttribute("height", String(H));
          svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
          const pts: Array<[number, number]> = [[W * 0.5, -40]];
          sel.forEach((s, i) => {
            const el = document.querySelector<HTMLElement>(s);
            if (!el) return;
            const y = el.offsetTop + el.offsetHeight * 0.5;
            const x = W * sides[i % sides.length];
            pts.push([x, y]);
          });
          pts.push([W * 0.5, H + 40]);
          let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
          for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i - 1] || pts[i];
            const p1 = pts[i];
            const p2 = pts[i + 1];
            const p3 = pts[i + 2] || p2;
            const c1x = p1[0] + (p2[0] - p0[0]) / 6;
            const c1y = p1[1] + (p2[1] - p0[1]) / 6;
            const c2x = p2[0] - (p3[0] - p1[0]) / 6;
            const c2y = p2[1] - (p3[1] - p1[1]) / 6;
            d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
          }
          glow.setAttribute("d", d);
          core.setAttribute("d", d);
          len = core.getTotalLength();
          core.style.strokeDasharray = String(len);
          glow.style.strokeDasharray = String(len);
        };
        const prog = () => {
          const h = document.documentElement.scrollHeight - window.innerHeight;
          const s = lenisInst ? lenisInst.scroll : window.scrollY;
          const p = h > 0 ? s / h : 0;
          return Math.max(0, Math.min(1, p));
        };
        const draw = () => {
          const p = prog();
          const off = len * (1 - p);
          core.style.strokeDashoffset = String(off);
          glow.style.strokeDashoffset = String(off);
          if (len > 0) {
            const pt = core.getPointAtLength(len * p);
            head.setAttribute("cx", String(pt.x));
            head.setAttribute("cy", String(pt.y));
          }
        };
        build();
        draw();
        lenisInst.on("scroll", draw);
        const onRefresh = () => {
          build();
          draw();
        };
        ScrollTrigger.addEventListener("refresh", onRefresh);
        let rt: ReturnType<typeof setTimeout>;
        const onResize = () => {
          clearTimeout(rt);
          rt = setTimeout(() => {
            build();
            draw();
            ScrollTrigger.refresh();
          }, 220);
        };
        window.addEventListener("resize", onResize);
        cleanups.push(() => {
          ScrollTrigger.removeEventListener("refresh", onRefresh);
          window.removeEventListener("resize", onResize);
          clearTimeout(rt);
        });
      }
    });

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
      restores.forEach(({ el, html }) => {
        el.innerHTML = html;
      });
    };
  }, []);

  return (
    <>
      <div className="cur-ring" id="curRing" aria-hidden />
      <div className="cur-dot" id="curDot" aria-hidden />
    </>
  );
}
