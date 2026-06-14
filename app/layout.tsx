import type { Metadata } from "next";
import { Newsreader, Libre_Franklin } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { SiteNav } from "@/components/site-nav";
import { ScrollReveal } from "@/components/scroll-reveal";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-libre-franklin",
  display: "swap",
});

const description =
  "One thing is capping your growth. I find which one is actually holding you back, fix that, and tell you what to leave alone.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pascal Sterzik, growth diagnostician for DTC and ecommerce brands",
    template: "%s · Pascal Sterzik",
  },
  description,
  applicationName: "Pascal Sterzik",
  authors: [{ name: "Pascal Sterzik", url: siteConfig.url }],
  creator: "Pascal Sterzik",
  publisher: "Sterzik Solutions",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Pascal Sterzik",
    title: "Pascal Sterzik, growth diagnostician for DTC and ecommerce brands",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pascal Sterzik, growth diagnostician for DTC and ecommerce brands",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${libreFranklin.variable}`}>
      <body>
        <noscript>
          {/* If JS is unavailable, reveal elements must not stay hidden. */}
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteNav />
        <main id="main-content">{children}</main>
        <ScrollReveal />
      </body>
    </html>
  );
}
