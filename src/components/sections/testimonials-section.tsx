import Link from "next/link";
import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section";
import { testimonials } from "@/content/testimonials";
import { sectionIntros } from "@/content/site-copy";
import type { Testimonial } from "@/lib/types";
import { cn } from "@/lib/utils";

export function TestimonialCard({
  t,
  className,
}: {
  t: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-white/60 p-7 shadow-soft",
        className,
      )}
    >
      <Quote className="size-7 text-seafoam" aria-hidden />
      <div className="mt-3 flex text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn("size-4", i < t.rating ? "fill-gold" : "fill-none opacity-30")} />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 font-display text-lg leading-relaxed text-deepsea">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <p className="font-medium text-deepsea">{t.name}</p>
        <p className="text-sm text-slate">
          {t.role} · {t.location}
        </p>
      </figcaption>
    </figure>
  );
}

export function TestimonialsSection({
  items = testimonials.slice(0, 3),
}: {
  items?: Testimonial[];
}) {
  const intro = sectionIntros.testimonials;
  return (
    <section className="py-20 md:py-28">
      <div className="container-luxe">
        <SectionHeading
          eyebrow={intro?.eyebrow ?? "Kind words"}
          title={intro?.title ?? "Loved in homes across the country"}
          subhead={intro?.subhead}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="h-full">
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2} className="mt-12 text-center">
          <Link
            href="/testimonials"
            className="link-underline font-medium text-deepsea"
          >
            Read more stories
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
