"use client";

import { useEffect, useState } from "react";
import { waLink } from "@/lib/site";
import { SocialLinks } from "./SocialIcons";

const NAV = [
  { id: "#galeri", label: "Galeri" },
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
          <img src="/images/word-white.png" alt="tetra photobooth" />
        </a>
        <nav>
          {NAV.map((n) => (
            // root-relative so the smooth-scroll handler works on the home page
            // and the link still navigates home from other routes (e.g. /pricelist)
            <a key={n.id} className="lnk" href={`/${n.id}`} data-scroll={n.id}>
              <span className="roll">
                <span>{n.label}</span>
                <span aria-hidden>{n.label}</span>
              </span>
            </a>
          ))}
          <SocialLinks className="hdr-socials" />
          <a className="btn fill" href={waLink()} target="_blank" rel="noopener noreferrer">
            Chat Admin
          </a>
        </nav>
      </div>
    </header>
  );
}
