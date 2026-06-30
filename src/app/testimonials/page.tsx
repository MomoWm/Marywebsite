import type { Metadata } from "next";
import { Star } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { TestimonialCard } from "@/components/sections/testimonials-section";
import { CtaBand } from "@/components/sections/cta-band";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/testimonials");

export default function TestimonialsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Testimonials", href: "/testimonials" },
        ]}
      />
      <PageHeader
        eyebrow="Kind words"
        title="Loved in homes across the country"
        subhead="From beach houses and Airbnbs to anniversary gifts and weddings — a few words from the people who live with Mary's work."
      >
        <div className="mt-6 flex items-center gap-3 text-sm text-slate">
          <span className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-gold" />
            ))}
          </span>
          <span>Five-star, every piece personally made</span>
        </div>
      </PageHeader>

      <section className="py-16 md:py-24">
        <div className="container-luxe">
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
            {testimonials.map((t) => (
              <div key={t.name} className="break-inside-avoid">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand index={1} />
    </>
  );
}
