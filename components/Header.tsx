"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";

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
        <a className="nlogo" href="#top" data-scroll="#top" aria-label="Tetra Photobooth — ke atas">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/word-white.png" alt="tetra photobooth" />
        </a>
        <nav>
          <a className="lnk" href="#galeri" data-scroll="#galeri">
            Galeri
          </a>
          <a className="lnk" href="#format" data-scroll="#format">
            Format
          </a>
          <a className="lnk" href="#cara" data-scroll="#cara">
            Cara Kerja
          </a>
          <a className="btn fill" href={waLink()} target="_blank" rel="noopener noreferrer">
            Chat Admin
          </a>
        </nav>
      </div>
    </header>
  );
}
