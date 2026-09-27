"use client";

import { useEffect, useState } from "react";
import { WaButton } from "./Wa";
import { SocialLinks } from "./SocialIcons";

const NAV = [
  // Galeri is a full page now (/galeri); the rest stay smooth-scroll anchors.
  { id: "/galeri", label: "Galeri", page: true },
  { id: "#format", label: "Format" },
  { id: "#paket", label: "Paket" },
  { id: "#cara", label: "Cara Kerja" },
];

// Fixed frosted header. Phase 1: simple scroll listener toggles `.solid` after 40px.
// Phase 2 will drive this off Lenis' scroll + add smooth-scroll on nav links.
export default function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header id="hdr" className={solid ? "solid" : undefined}>
      <div className="wrap">
        <a className="nlogo" href="/#top" data-scroll="#top" aria-label="Tetra Photobooth — ke atas">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/word-white.png" alt="Tetra Photobooth" />
        </a>
        <nav>
          {NAV.map((n) =>
            n.page ? (
              // Real route → plain navigation (no smooth-scroll hijack).
              <a key={n.id} className="lnk" href={n.id}>
                <span className="roll">
                  <span>{n.label}</span>
                  <span aria-hidden>{n.label}</span>
                </span>
              </a>
            ) : (
              // root-relative so the smooth-scroll handler works on the home page
              // and the link still navigates home from other routes (e.g. /pricelist)
              <a key={n.id} className="lnk" href={`/${n.id}`} data-scroll={n.id}>
                <span className="roll">
                  <span>{n.label}</span>
                  <span aria-hidden>{n.label}</span>
                </span>
              </a>
            )
          )}
          <SocialLinks className="hdr-socials" />
          <WaButton label="Chat Admin" />
        </nav>
      </div>
    </header>
  );
}
