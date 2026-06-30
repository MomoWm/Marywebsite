import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { baseMetadata } from "@/lib/seo";
import { copy } from "@/content/site-copy";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#213a47",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-dvh bg-shell text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-deepsea focus:px-5 focus:py-2 focus:text-sm focus:text-shell"
        >
          Skip to content
        </a>
        <AnnouncementBar text={copy.announcement} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
      </body>
    </html>
  );
}
