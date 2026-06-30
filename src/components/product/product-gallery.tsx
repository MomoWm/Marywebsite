"use client";

import * as React from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ZoomIn, X } from "lucide-react";
import { CoastalArt } from "@/components/art/coastal-art";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const hasImage = Boolean(product.image);

  return (
    <div className="lg:sticky lg:top-28">
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild disabled={!hasImage}>
          <button
            className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-[2rem] bg-shell-deep shadow-deep"
            aria-label="Zoom image"
          >
            {hasImage ? (
              <Image
                src={product.image!}
                alt={product.altText || product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            ) : (
              <CoastalArt seed={product.slug} palette={product.colorPalette} variant="portrait" />
            )}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {product.oneOfAKind && <Badge variant="glass">One of a Kind</Badge>}
              {product.bestSeller && <Badge variant="glass">Signature</Badge>}
            </div>
            {hasImage && (
              <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-shell/90 text-deepsea opacity-90 shadow-soft backdrop-blur transition-all duration-500 group-hover:scale-105 group-hover:opacity-100">
                <ZoomIn className="size-5" />
              </span>
            )}
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-deepsea/80 backdrop-blur-sm data-[state=open]:animate-[fade-up_0.3s_ease]" />
          <Dialog.Content className="fixed inset-0 z-50 grid place-items-center p-4 focus:outline-none sm:p-10">
            <Dialog.Title className="sr-only">{product.name}</Dialog.Title>
            {hasImage && (
              <div className="relative h-full max-h-[88vh] w-full max-w-4xl">
                <Image
                  src={product.image!}
                  alt={product.altText || product.name}
                  fill
                  sizes="90vw"
                  className="rounded-xl object-contain"
                />
              </div>
            )}
            <Dialog.Close
              className="fixed right-5 top-5 grid size-11 place-items-center rounded-full bg-shell/90 text-deepsea shadow-lift"
              aria-label="Close"
            >
              <X className="size-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {hasImage && (
        <p className="mt-3 text-center text-xs text-muted">
          Photographed by hand — tap to view in detail.
        </p>
      )}
    </div>
  );
}
