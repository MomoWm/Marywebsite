import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/ui/reveal";
import { CustomOrderForm } from "@/components/forms/custom-order-form";
import { ProductMedia } from "@/components/product/product-media";
import { TestimonialCard } from "@/components/sections/testimonials-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { copy } from "@/content/site-copy";
import { getProductBySlug, getFeatured } from "@/lib/content";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/custom-orders");

export default async function CustomOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const referenced = ref ? getProductBySlug(ref) : undefined;
  const referenceLabel = referenced ? `Inspired by “${referenced.name}”` : "";
  const inspo = getFeatured(4);
  const { customOrder } = copy;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Custom Orders", href: "/custom-orders" },
        ]}
      />
      <PageHeader
        eyebrow={customOrder.eyebrow}
        title={customOrder.headline}
        subhead={customOrder.subhead}
      >
        <div className="mt-6 flex items-center gap-2 text-sm text-slate">
          <span className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-gold" />
            ))}
          </span>
          Loved by collectors &amp; designers nationwide
        </div>
      </PageHeader>

      <section className="py-16 md:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Left: the pitch */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-soft">{customOrder.body}</p>
            </Reveal>

            <ol className="mt-10 flex flex-col gap-6">
              {customOrder.steps.map((step, i) => (
                <Reveal as="li" key={step.title} delay={i * 0.08} className="flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-deepsea font-display text-sm text-shell">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-deepsea">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-border bg-sand-light/40 p-6">
              {[
                "No two pieces are ever alike",
                "Your colors, your size, your story",
                "Handmade in Englewood, ships nationwide",
              ].map((line) => (
                <p key={line} className="flex items-center gap-2 text-sm text-deepsea">
                  <Check className="size-4 text-ocean" />
                  {line}
                </p>
              ))}
            </div>

            {/* Inspiration thumbnails */}
            <div className="mt-10">
              <p className="eyebrow">For inspiration</p>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {inspo.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/shop/${p.slug}`}
                    className="relative aspect-square overflow-hidden rounded-xl bg-shell-deep shadow-soft"
                  >
                    <ProductMedia product={p} sizes="120px" artVariant="square" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: the form */}
          <div>
            <div className="rounded-3xl border border-border bg-white/60 p-6 shadow-soft md:p-10">
              {referenceLabel && (
                <p className="mb-6 rounded-full bg-seafoam/20 px-4 py-2 text-center text-sm text-deepsea">
                  {referenceLabel}
                </p>
              )}
              <CustomOrderForm reference={referenceLabel} />
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="bg-sand-light/40 py-16 md:py-20">
        <div className="container-luxe">
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.slice(5, 8).map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1} className="h-full">
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
