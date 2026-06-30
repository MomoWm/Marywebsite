import { Sparkle } from "lucide-react";

const ITEMS = [
  "Sea Glass Mirrors",
  "Coastal Shadow Boxes",
  "Custom Commissions",
  "Sea Glass Christmas Trees",
  "Handmade in Englewood",
  "One of a Kind",
  "Beach Gifts & Keepsakes",
];

/** A slow, ocean-like marquee of collections — purely CSS, pauses for reduced motion. */
export function MarqueeStrip() {
  const track = [...ITEMS, ...ITEMS];
  return (
    <section
      className="overflow-hidden border-y border-black/10 py-4 text-shell"
      style={{ backgroundColor: "#3f4736" }}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap will-change-transform">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-lg italic tracking-wide text-shell/90 md:text-xl">
              {item}
            </span>
            <Sparkle className="size-4 fill-gold-soft text-gold-soft" />
          </span>
        ))}
      </div>
    </section>
  );
}
