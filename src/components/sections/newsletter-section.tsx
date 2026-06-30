import { Mail } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { copy } from "@/content/site-copy";

export function NewsletterSection() {
  return (
    <section className="py-20 md:py-24">
      <div className="container-luxe">
        <Reveal className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-border bg-seafoam-light/50 px-6 py-14 text-center md:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-aqua/30 blur-3xl" />
          <span className="relative grid mx-auto size-12 place-items-center rounded-full bg-shell text-ocean shadow-soft">
            <Mail className="size-5" />
          </span>
          <h2 className="relative mt-5 font-display text-3xl text-deepsea md:text-4xl">
            {copy.newsletter.headline}
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-ink-soft">
            {copy.newsletter.subhead}
          </p>
          <div className="relative mt-8 flex justify-center">
            <NewsletterForm source="newsletter-section" />
          </div>
          <p className="relative mt-4 text-xs text-slate">{copy.newsletter.incentive}</p>
        </Reveal>
      </div>
    </section>
  );
}
