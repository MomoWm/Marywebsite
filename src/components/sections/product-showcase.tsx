import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductShowcase({
  eyebrow,
  title,
  subhead,
  products,
  viewAllHref = "/shop",
  viewAllLabel = "Shop all artwork",
  className,
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  subhead?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
  tone?: "light" | "sand";
}) {
  return (
    <section className={cn("py-20 md:py-28", tone === "sand" && "bg-sand-light/40", className)}>
      <div className="container-luxe">
        <div className="flex flex-col items-end justify-between gap-6 sm:flex-row">
          <Reveal className="max-w-2xl">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 className="mt-4 font-display text-3xl leading-tight text-deepsea md:text-[2.6rem]">
              {title}
            </h2>
            {subhead && <p className="mt-4 max-w-md text-ink-soft">{subhead}</p>}
          </Reveal>
          <Reveal delay={0.1} className="shrink-0">
            <Link
              href={viewAllHref}
              className="link-underline inline-flex items-center gap-2 font-medium text-deepsea"
            >
              {viewAllLabel}
              <ArrowRight className="size-4 text-ocean" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} sizes="(max-width: 640px) 50vw, 25vw" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
