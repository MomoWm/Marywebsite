import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ProductMedia } from "@/components/product/product-media";
import { formatPrice } from "@/lib/utils";
import type { Collection, Product } from "@/lib/types";

export function FeaturedCollection({
  collection,
  products,
  eyebrow = "The signature collection",
}: {
  collection: Collection;
  products: Product[];
  eyebrow?: string;
}) {
  return (
    <section className="overflow-hidden py-24 md:py-36">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal direction="right" className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-deep">
            {collection.image ? (
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="absolute -bottom-6 -right-2 hidden w-44 rounded-2xl bg-shell p-4 shadow-lift sm:block">
            <p className="font-display text-3xl text-deepsea">{products.length}</p>
            <p className="text-xs uppercase tracking-[0.16em] text-slate">
              one-of-a-kind pieces
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-deepsea md:text-[2.8rem]">
              {collection.name}
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              {collection.description}
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {products.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={0.1 + i * 0.1}>
                <Link href={`/shop/${p.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-shell-deep shadow-soft">
                    <ProductMedia
                      product={p}
                      sizes="160px"
                      artVariant="square"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2 truncate text-xs text-slate">{p.name}</p>
                  <p className="text-xs font-medium text-deepsea">
                    from {formatPrice(p.price, p.currency)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10">
            <Button asChild size="lg">
              <Link href={`/collections/${collection.slug}`}>
                Explore {collection.name}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
