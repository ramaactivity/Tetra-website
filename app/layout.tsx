import type { Metadata } from "next";
import { Marcellus, Outfit } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import Ribbon from "@/components/Ribbon";
import MotionRoot from "@/components/MotionRoot";

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

export const metadata: Metadata = {
  title: "tetra. photobooth — sesuatu untuk dipegang, sesuatu untuk dikenang",
  description:
    "Photobooth premium di Bogor, melayani Jabodetabek & se-Indonesia. Cetakan berkualitas studio dengan frame yang kami desain khusus untuk setiap acaramu.",
};

// Runs before first paint: flags JS/reduced-motion/touch so CSS can gate the
// loader + hidden reveal states (no FOUC for JS users; full content for no-JS).
const FLAGS = `(function(){var d=document.documentElement;d.classList.add('js');try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('reduced');if(matchMedia('(pointer: coarse)').matches)d.classList.add('touch');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${marcellus.variable} ${outfit.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: FLAGS }} />
        <Ribbon />
        <Loader />
        {children}
        <MotionRoot />
      </body>
    </html>
  );
}
