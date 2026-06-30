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
        "flex h-full flex-col rounded-2xl border border-border bg-sand-light/40 p-8 shadow-soft",
        className,
      )}
    >
      <Quote className="size-9 fill-ocean/15 text-ocean/30" aria-hidden />
      <div className="mt-2 flex gap-1 text-ocean">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn("size-4", i < t.rating ? "fill-ocean" : "fill-none opacity-30")} />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 font-display text-[1.35rem] italic leading-snug text-deepsea">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-7">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-seafoam">
          {t.role}
        </p>
        <p className="mt-1.5 font-display text-lg text-deepsea">{t.name}</p>
        <p className="text-sm text-slate">{t.location}</p>
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
