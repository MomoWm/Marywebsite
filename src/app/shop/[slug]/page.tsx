import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Mail, Ruler, Hammer, Sparkles, Truck, Heart } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductCard } from "@/components/product/product-card";
import { CtaBand } from "@/components/sections/cta-band";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import {
  products,
  getProductBySlug,
  getCollectionForProduct,
  getRelated,
} from "@/lib/content";
import { copy } from "@/content/site-copy";
import { formatPrice } from "@/lib/utils";
import { productMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return productMetadata(product);
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const collection = getCollectionForProduct(product);
  const related = getRelated(product, 4);

  return (
    <>
      <ProductJsonLd product={product} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Shop", href: "/shop" },
          { name: product.name, href: `/shop/${product.slug}` },
        ]}
      />

      <section className="border-b border-border bg-gradient-to-b from-sand-light/40 to-shell pt-8">
        <div className="container-luxe pb-16 md:pb-20">
          <Breadcrumbs
            className="mb-8"
            items={[
              { name: "Home", href: "/" },
              { name: "Shop", href: "/shop" },
              { name: product.name, href: `/shop/${product.slug}` },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery product={product} />

            <div>
              {collection && (
                <Link
                  href={`/collections/${collection.slug}`}
                  className="eyebrow transition-colors hover:text-deepsea"
                >
                  {collection.name}
                </Link>
              )}
              <h1 className="mt-3 font-display text-4xl leading-tight text-deepsea md:text-5xl">
                {product.name}
              </h1>
              {product.productType && (
                <p className="mt-3 text-sm uppercase tracking-[0.16em] text-slate">
                  {product.productType}
                </p>
              )}

              <div className="mt-6 flex items-end gap-3">
                <span className="font-display text-3xl text-deepsea">
                  {formatPrice(product.price, product.currency)}
                </span>
                <span className="pb-1 text-sm text-slate">guide price · made to order</span>
              </div>

              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {product.shortDescription}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="flex-1">
                  <Link href={`/custom-orders?ref=${product.slug}`}>
                    Commission a piece like this
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="flex-1">
                  <Link href={`/contact?piece=${encodeURIComponent(product.name)}`}>
                    <Mail className="size-4" />
                    Ask about this piece
                  </Link>
                </Button>
              </div>

              <div className="mt-5 rounded-2xl border border-border bg-seafoam-light/30 p-5 text-sm leading-relaxed text-ink-soft">
                <strong className="text-deepsea">Made just for you.</strong> This exact piece
                is one-of-a-kind. Mary doesn&rsquo;t reproduce her work — she creates a brand-new
                custom piece from scratch every time, inspired by what you love here.
              </div>

              {/* Details */}
              <Accordion type="single" collapsible defaultValue="story" className="mt-8">
                <AccordionItem value="description">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>{product.description}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="story">
                  <AccordionTrigger>The story behind the piece</AccordionTrigger>
                  <AccordionContent>{product.story}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="details">
                  <AccordionTrigger>Materials &amp; dimensions</AccordionTrigger>
                  <AccordionContent>
                    <p className="flex items-start gap-2">
                      <Ruler className="mt-0.5 size-4 shrink-0 text-ocean" />
                      <span>{product.dimensions}</span>
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {product.materials.map((m) => (
                        <li
                          key={m}
                          className="rounded-full bg-sand-light px-3 py-1 text-xs text-slate"
                        >
                          {m}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="care">
                  <AccordionTrigger>Care</AccordionTrigger>
                  <AccordionContent>{product.care}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping</AccordionTrigger>
                  <AccordionContent>{product.shipping}</AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Trust */}
              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
                {[
                  { icon: Hammer, label: "Handmade by Mary" },
                  { icon: Sparkles, label: "One of a kind" },
                  { icon: Truck, label: "Ships nationwide" },
                  { icon: Heart, label: "Made with love" },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center gap-2 text-center">
                    <t.icon className="size-5 text-ocean" strokeWidth={1.4} />
                    <span className="text-xs text-slate">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How a commission works */}
      <section className="bg-sand-light/40 py-16 md:py-20">
        <div className="container-luxe">
          <h2 className="text-center font-display text-3xl text-deepsea">
            How a commission works
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {copy.customOrder.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.08} className="flex flex-col gap-3">
                <span className="font-display text-4xl text-gold/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg text-deepsea">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="container-luxe">
            <h2 className="font-display text-3xl text-deepsea">You may also love</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} sizes="(max-width: 640px) 50vw, 25vw" />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand index={0} href={`/custom-orders?ref=${product.slug}`} />
    </>
  );
}
