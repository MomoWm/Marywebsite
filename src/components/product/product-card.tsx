import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductMedia } from "./product-media";
import { Badge } from "@/components/ui/badge";
import { formatPrice, cn } from "@/lib/utils";
import { collections } from "@/content/collections";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  priority = false,
  className,
  sizes,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const collection = collections.find((c) => c.slug === product.collectionSlug);
  return (
    <Link
      href={`/shop/${product.slug}`}
      className={cn("group flex flex-col", className)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-shell-deep shadow-soft transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-lift">
        <ProductMedia
          product={product}
          priority={priority}
          sizes={sizes}
          artVariant="portrait"
          className="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deepsea/30 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.bestSeller && <Badge variant="glass">Signature</Badge>}
          {product.oneOfAKind && !product.bestSeller && (
            <Badge variant="glass">One of a Kind</Badge>
          )}
        </div>

        <span className="absolute bottom-3 right-3 grid size-10 translate-y-2 place-items-center rounded-full bg-shell/90 text-deepsea opacity-0 shadow-soft backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          {collection && (
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ocean">
              {collection.name}
            </p>
          )}
          <h3 className="mt-1 font-display text-lg leading-snug text-deepsea transition-colors group-hover:text-ocean">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 pt-0.5 text-right leading-tight">
          <span className="block text-[0.58rem] font-medium uppercase tracking-[0.16em] text-muted">
            from
          </span>
          <span className="font-display text-lg text-slate">
            {formatPrice(product.price, product.currency)}
          </span>
        </p>
      </div>
    </Link>
  );
}

export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  priorityCount?: number;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
