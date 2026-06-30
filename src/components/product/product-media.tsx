import Image from "next/image";
import { CoastalArt } from "@/components/art/coastal-art";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

type ArtVariant = "wide" | "hero" | "square" | "portrait" | "cover";

/**
 * Renders a product's real photograph (next/image) when available, and a
 * deterministic generative coastal artwork as a graceful fallback otherwise.
 * The surrounding element should establish the aspect ratio + position: relative.
 */
export function ProductMedia({
  product,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  className,
  artVariant = "square",
}: {
  product: Product;
  sizes?: string;
  priority?: boolean;
  className?: string;
  artVariant?: ArtVariant;
}) {
  if (product.image) {
    return (
      <Image
        src={product.image}
        alt={product.altText || product.name}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <CoastalArt
      seed={product.slug}
      palette={product.colorPalette}
      variant={artVariant}
      className={cn(className)}
    />
  );
}
