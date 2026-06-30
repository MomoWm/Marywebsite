import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/art/botanicals";
import { copy } from "@/content/site-copy";
import { cn } from "@/lib/utils";

type Cta = { headline: string; subhead: string; button: string };

export function CtaBand({
  index = 0,
  cta,
  href = "/custom-orders",
  secondaryHref = "/contact",
  secondaryLabel = "Talk with Mary",
  tone = "deep",
}: {
  index?: number;
  cta?: Cta;
  href?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  tone?: "deep" | "soft";
}) {
  const block = cta ?? copy.ctaBank[index % copy.ctaBank.length];
  const deep = tone === "deep";

  return (
    <section className="px-4 py-10 md:px-6">
      <div
        className={cn(
          "grain relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] px-6 py-16 text-center md:px-12 md:py-20",
          deep ? "bg-deepsea text-shell" : "bg-seafoam-light text-deepsea",
        )}
      >
        {deep && (
          <>
            <div className="pointer-events-none absolute -left-20 -top-16 size-72 rounded-full bg-ocean/40 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-seafoam/20 blur-[90px]" />
          </>
        )}
        <Reveal className="relative">
          <Shell
            className={cn("mx-auto mb-4 h-9", deep ? "text-gold-soft/60" : "text-ocean/50")}
          />
          <p className={cn("eyebrow", deep && "!text-gold-soft")}>
            Let&rsquo;s create together
          </p>
          <h2
            className={cn(
              "display-balance mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight md:text-[2.7rem]",
              deep && "text-shell",
            )}
          >
            {block.headline}
          </h2>
          <p
            className={cn(
              "mx-auto mt-5 max-w-lg text-base leading-relaxed md:text-lg",
              deep ? "text-shell/75" : "text-ink-soft",
            )}
          >
            {block.subhead}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant={deep ? "gold" : "primary"}>
              <Link href={href}>
                {block.button}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant={deep ? "onDark" : "outline"}>
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
