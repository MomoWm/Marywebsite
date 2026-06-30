import { BeachScene } from "@/components/art/beach-scene";
import { PalmLeaf, Starfish, Shell } from "@/components/art/botanicals";
import { Reveal } from "@/components/ui/reveal";

/** A full-bleed, gently animated Gulf-Coast scene — the brand's beach moment. */
export function BeachBanner() {
  return (
    <section className="relative flex min-h-[80vh] items-start justify-center overflow-hidden">
      <BeachScene />

      {/* palm silhouettes framing the shore */}
      <PalmLeaf className="pointer-events-none absolute -left-8 bottom-4 w-56 -rotate-6 text-deepsea/25 md:w-72" />
      <PalmLeaf className="pointer-events-none absolute -right-8 bottom-8 w-56 -rotate-6 -scale-x-100 text-deepsea/20 md:w-72" />
      <Shell className="pointer-events-none absolute bottom-5 left-[18%] hidden w-10 text-deepsea/25 md:block" />
      <Starfish className="pointer-events-none absolute bottom-6 right-[20%] hidden w-12 -rotate-12 text-deepsea/25 md:block" />

      <Reveal className="relative z-10 mx-auto max-w-2xl px-6 pt-24 text-center md:pt-32">
        <p className="eyebrow">Inspired by Florida&rsquo;s Gulf Coast</p>
        <h2 className="mt-6 font-display text-[2.6rem] leading-[1.04] text-deepsea md:text-6xl">
          Where every piece <em className="accent">begins</em>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
          Gathered along the shore, tumbled soft by the tide, and shaped entirely by hand
          in Englewood — the sea writes the first draft of every piece.
        </p>
      </Reveal>
    </section>
  );
}
