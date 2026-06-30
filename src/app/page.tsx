import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { BeachBanner } from "@/components/sections/beach-banner";
import { FeaturedCollection } from "@/components/sections/featured-collection";
import { MeetMary } from "@/components/sections/meet-mary";
import { CreativeProcess } from "@/components/sections/process";
import { CollectionShowcase } from "@/components/sections/collection-showcase";
import { CtaBand } from "@/components/sections/cta-band";
import { WaveDivider } from "@/components/art/wave-divider";
import {
  getProductBySlug,
  getHomepageProducts,
  getCollectionBySlug,
  getProductsByCollection,
} from "@/lib/content";
import { copy } from "@/content/site-copy";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/");

export default function HomePage() {
  const homepage = getHomepageProducts();
  const heroPicks = [
    getProductBySlug("tidewater-ombre"),
    getProductBySlug("garnet-octopus"),
  ].filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];
  const heroImages = (heroPicks.length ? heroPicks : homepage.slice(0, 2)).filter(
    (p) => p.image,
  );

  const mirrors = getCollectionBySlug("sea-glass-mirrors")!;
  const mirrorProducts = getProductsByCollection("sea-glass-mirrors");

  return (
    <>
      {/* 1 — Arrival: the coast, the promise, one piece */}
      <Hero
        eyebrow={copy.homeHero.eyebrow}
        headline={copy.homeHero.headline}
        subhead={copy.homeHero.subhead}
        primaryCta={copy.homeHero.primaryCta}
        secondaryCta={copy.homeHero.secondaryCta}
        images={heroImages}
      />

      <TrustBar />

      {/* 2 — The place every piece begins */}
      <BeachBanner />

      {/* 3 — The signature work */}
      <FeaturedCollection collection={mirrors} products={mirrorProducts} />

      {/* 4 — The maker */}
      <MeetMary />

      {/* 5 — How a piece is made for you */}
      <div className="bg-seafoam-light/40">
        <WaveDivider fill="#15333d" />
      </div>
      <CreativeProcess />
      <div className="bg-shell">
        <WaveDivider fill="#15333d" flip />
      </div>

      {/* 6 — Browse the collections */}
      <CollectionShowcase />

      {/* 7 — Begin */}
      <CtaBand index={0} />
    </>
  );
}
