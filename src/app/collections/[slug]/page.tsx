import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { CollectionJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  collections,
  getCollectionBySlug,
  getProductsByCollection,
} from "@/lib/content";
import { collectionMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};
  return collectionMetadata(collection);
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();
  const items = getProductsByCollection(slug);

  return (
    <>
      <CollectionJsonLd collection={collection} products={items} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Collections", href: "/collections" },
          { name: collection.name, href: `/collections/${collection.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="grid lg:grid-cols-2">
          <div className="relative flex flex-col justify-center px-6 py-16 md:px-12 md:py-24 lg:px-16">
            <Breadcrumbs
              className="mb-8"
              items={[
                { name: "Home", href: "/" },
                { name: "Collections", href: "/collections" },
                { name: collection.name, href: `/collections/${collection.slug}` },
              ]}
            />
            <Reveal>
              <p className="eyebrow">{collection.tagline}</p>
              <h1 className="mt-4 font-display text-4xl leading-tight text-deepsea md:text-5xl">
                {collection.name}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
                {collection.description}
              </p>
              <p className="mt-6 max-w-md leading-relaxed text-ink-soft">{collection.story}</p>
              <Button asChild size="lg" className="mt-9 self-start">
                <Link href="/custom-orders">
                  Commission a piece
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="relative min-h-[20rem] lg:min-h-full">
            {collection.image && (
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-display text-2xl text-deepsea md:text-3xl">
              {items.length} {items.length === 1 ? "piece" : "pieces"} in this collection
            </h2>
            <Link href="/shop" className="link-underline text-sm font-medium text-deepsea">
              View all artwork
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 4} sizes="(max-width: 640px) 50vw, 25vw" />
            ))}
          </div>
        </div>
      </section>

      <CtaBand index={2} />
    </>
  );
}
