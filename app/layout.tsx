import type { Metadata, Viewport } from "next";
import { Marcellus, Outfit } from "next/font/google";
import "./globals.css";
import "./mobile.css";
import Loader from "@/components/Loader";
import Ribbon from "@/components/Ribbon";
import MotionRoot from "@/components/MotionRoot";
import { WaProvider, WaSticky } from "@/components/Wa";

// Display / headlines — Marcellus (italic emphasis rendered synthetically via font-style:italic)
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--disp",
  display: "swap",
});

// Body / UI — Outfit
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--sans",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Sewa photobooth premium di Bogor & Jabodetabek. Cetak instan unlimited, frame custom gratis, softfile realtime via QR. Untuk wedding, ulang tahun & corporate event.";

export const metadata: Metadata = {
  metadataBase: new URL("https://tetraphoto.com"),
  title: {
    default: "Sewa Photobooth Bogor & Jabodetabek — Tetra Photobooth",
    template: "%s — Tetra Photobooth",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Tetra Photobooth",
  creator: "Tetra Photobooth",
  publisher: "Tetra Photobooth",
  keywords: [
    "sewa photobooth",
    "sewa photobooth Bogor",
    "sewa photobooth Jakarta",
    "jasa photobooth Jabodetabek",
    "photobooth wedding",
    "photobooth pernikahan",
    "photobooth ulang tahun",
    "photobooth wisuda",
    "photobooth corporate event",
    "360 spin video booth",
    "photobooth cetak instan",
    "photobooth unlimited",
  ],
  category: "photography",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Tetra Photobooth",
    title: "Sewa Photobooth Bogor & Jabodetabek — Tetra Photobooth",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  themeColor: "#15120e",
};

// Runs before first paint: flags JS/reduced-motion/touch + a `lite` profile so
// CSS can gate the loader + hidden reveal states (no FOUC for JS users; full
// content for no-JS). `lite` = the visitor asked to save data, or is on a very
// slow link (2G) — they skip the cinematic intro and get content immediately.
const FLAGS = `(function(){var d=document.documentElement;d.classList.add('js');try{var c=navigator.connection;if((c&&(c.saveData===true||/(^|-)2g$/.test(c.effectiveType||'')))||matchMedia('(prefers-reduced-data: reduce)').matches)d.classList.add('lite');if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');if(matchMedia('(pointer: coarse)').matches)d.classList.add('touch');if(sessionStorage.getItem('tetra_intro')==='1')d.classList.add('seen-intro');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${marcellus.variable} ${outfit.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: FLAGS }} />
        <div className="scrollprog" id="scrollprog" aria-hidden />
        <Ribbon />
        <Loader />
        <WaProvider>
          {children}
          <WaSticky />
        </WaProvider>
        {/* atmosphere overlays (fixed, non-interactive) */}
        <div className="vignette" aria-hidden />
        <div className="grain" aria-hidden />
        <MotionRoot />
      </body>
    </html>
  );
}
