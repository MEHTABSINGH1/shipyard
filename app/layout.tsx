import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// next/font downloads these at build time and self-hosts them,
// so there is no request to fonts.googleapis.com and no layout shift.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ShipYard",
    template: "%s | ShipYard",
  },
  description: "A small product-catalog storefront built with Next.js and TypeScript",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className={geistSans.className}>
        <header className="site-header">
          <Link href="/" className="logo">
            ⚓ ShipYard
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
