import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { MarqueeStrip } from "@/components/sections/marquee-strip";
import { TrustBar } from "@/components/sections/trust-bar";
import { FeaturedCollection } from "@/components/sections/featured-collection";
import { MeetMary } from "@/components/sections/meet-mary";
import { WhyHandmade } from "@/components/sections/why-handmade";
import { CreativeProcess } from "@/components/sections/process";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { CollectionShowcase } from "@/components/sections/collection-showcase";
import { BeachBanner } from "@/components/sections/beach-banner";
import { InstagramGallery } from "@/components/sections/instagram-gallery";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { CtaBand } from "@/components/sections/cta-band";
import { WaveDivider } from "@/components/art/wave-divider";
import {
  getProductBySlug,
  getHomepageProducts,
  getCollectionBySlug,
  getProductsByCollection,
  getBestSellers,
} from "@/lib/content";
import { copy } from "@/content/site-copy";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/");

export default function HomePage() {
  const homepage = getHomepageProducts();
  const heroPicks = [
    getProductBySlug("tidewater-ombre"),
    getProductBySlug("garnet-octopus"),
    getProductBySlug("starfish-tide-pine"),
  ].filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];
  const heroImages = (heroPicks.length === 3 ? heroPicks : homepage.slice(0, 3)).filter(
    (p) => p.image,
  );

  const mirrors = getCollectionBySlug("sea-glass-mirrors")!;
  const mirrorProducts = getProductsByCollection("sea-glass-mirrors");
  const signature = getBestSellers(4);

  return (
    <>
      <Hero
        eyebrow={copy.homeHero.eyebrow}
        headline={copy.homeHero.headline}
        subhead={copy.homeHero.subhead}
        primaryCta={copy.homeHero.primaryCta}
        secondaryCta={copy.homeHero.secondaryCta}
        images={heroImages}
      />

      <MarqueeStrip />

      <TrustBar />

      <FeaturedCollection collection={mirrors} products={mirrorProducts} />

      <BeachBanner />

      <MeetMary />

      <WhyHandmade image="/products/IMG_8887.jpg" />

      <div className="bg-shell">
        <WaveDivider fill="#15333d" />
      </div>
      <CreativeProcess />
      <div className="bg-sand-light/40">
        <WaveDivider fill="#15333d" flip />
      </div>

      <ProductShowcase
        eyebrow="Signature pieces"
        title="A few favorites from the studio"
        subhead="Every piece is one-of-a-kind. Browse for inspiration, then reach out — Mary creates a brand-new custom version, made just for you."
        products={signature}
        viewAllHref="/shop"
        viewAllLabel="See all artwork"
        tone="sand"
      />

      <CollectionShowcase />

      <CtaBand index={0} />

      <InstagramGallery products={homepage.length ? homepage : signature} />

      <NewsletterSection />

      <CtaBand index={3} tone="soft" href="/custom-orders" secondaryLabel="Ask a question" />
    </>
  );
}
