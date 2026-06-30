import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { collections } from "@/content/collections";
import { collectionCount } from "@/lib/content";
import { sectionIntros } from "@/content/site-copy";
import { cn } from "@/lib/utils";

export function CollectionShowcase({
  heading = true,
  className,
}: {
  heading?: boolean;
  className?: string;
}) {
  const intro = sectionIntros.featured;
  return (
    <section className={cn("py-20 md:py-28", className)}>
      <div className="container-luxe">
        {heading && (
          <SectionHeading
            eyebrow={intro?.eyebrow ?? "Explore"}
            title="Browse by collection"
            subhead="Each grouping is merchandised from Mary's own body of work — start where your eye lands, then commission your own."
          />
        )}

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => {
            const large = i === 0;
            return (
              <Reveal
                key={c.slug}
                delay={i * 0.08}
                className={cn(large && "sm:col-span-2 lg:col-span-1 lg:row-span-2")}
              >
                <Link
                  href={`/collections/${c.slug}`}
                  className="group relative block h-full overflow-hidden rounded-[1.75rem] bg-shell-deep shadow-soft transition-shadow duration-700 hover:shadow-lift"
                >
                  <div
                    className={cn(
                      "relative w-full",
                      large ? "aspect-[4/5] lg:h-full lg:min-h-[30rem]" : "aspect-[4/3]",
                    )}
                  >
                    {c.image && (
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-deepsea/80 via-deepsea/10 to-transparent" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                    <div>
                      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-shell/70">
                        {collectionCount(c.slug)} pieces
                      </p>
                      <h3 className="mt-1.5 font-display text-2xl text-shell">{c.name}</h3>
                      <p className="mt-1 max-w-xs text-sm text-shell/80">{c.tagline}</p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-shell/95 text-deepsea transition-transform duration-500 group-hover:-translate-y-1">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
