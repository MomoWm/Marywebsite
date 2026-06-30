import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProductMedia } from "@/components/product/product-media";
import { CtaBand } from "@/components/sections/cta-band";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { products } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/gallery");

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
      />
      <PageHeader
        eyebrow="The lookbook"
        title="A gallery of one-of-a-kind work"
        subhead="A scrapbook of pieces Mary has made — each handcrafted once, each its own small story of the Gulf Coast. Tap any piece to see its story or commission your own."
      />

      <section className="py-16 md:py-20">
        <div className="container-luxe">
          <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/shop/${p.slug}`}
                aria-label={`${p.name} — ${p.productType}. View piece or commission your own.`}
                className="group relative block break-inside-avoid overflow-hidden rounded-2xl bg-shell-deep shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2"
              >
                <div className="relative aspect-[4/5] w-full">
                  <ProductMedia
                    product={p}
                    sizes="(max-width: 768px) 50vw, 25vw"
                    artVariant="portrait"
                    className="transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-deepsea/75 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="font-display text-lg text-shell">{p.name}</p>
                      <p className="text-xs text-shell/80">{p.productType}</p>
                    </div>
                    <ArrowUpRight className="size-5 text-shell" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand index={0} />
    </>
  );
}
