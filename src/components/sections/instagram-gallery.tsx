import Image from "next/image";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import { sectionIntros } from "@/content/site-copy";
import type { Product } from "@/lib/types";

export function InstagramGallery({ products }: { products: Product[] }) {
  const intro = sectionIntros.instagram;
  const items = products.filter((p) => p.image).slice(0, 6);
  return (
    <section className="bg-sand-light/40 py-20 md:py-28">
      <div className="container-luxe">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow">{intro?.eyebrow ?? "From the studio"}</p>
            <h2 className="mt-4 font-display text-3xl text-deepsea md:text-[2.6rem]">
              {intro?.title ?? "Follow the making"}
            </h2>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 font-medium text-ocean"
            >
              <Instagram className="size-4" />
              @seaattitudesbymarylee
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6">
          {items.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl bg-shell-deep shadow-soft"
                aria-label={`${p.name} on Instagram`}
              >
                <Image
                  src={p.image!}
                  alt={p.altText || p.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-deepsea/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Instagram className="size-6 text-shell" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2 font-medium text-deepsea"
          >
            See more on Instagram
            <ArrowUpRight className="size-4 text-ocean" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
