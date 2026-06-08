import type { Metadata } from "next";
import { Marcellus, Outfit } from "next/font/google";
import "./globals.css";

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
  title:
    "tetra. photobooth — sesuatu untuk dipegang, sesuatu untuk dikenang",
  description:
    "Photobooth premium di Bogor, melayani Jabodetabek & se-Indonesia. Cetakan berkualitas studio dengan frame yang kami desain khusus untuk setiap acaramu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${marcellus.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
