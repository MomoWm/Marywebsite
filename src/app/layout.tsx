import type { Metadata, Viewport } from "next";
import { Playfair_Display, Jost } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { baseMetadata } from "@/lib/seo";
import { copy } from "@/content/site-copy";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: "#15333d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${jost.variable}`}>
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
