import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { copy, sectionIntros } from "@/content/site-copy";
import { site } from "@/lib/site";

export function MeetMary() {
  const intro = sectionIntros.meetMary;
  return (
    <section className="bg-seafoam-light/40 py-24 md:py-36">
      <div className="container-luxe grid items-center gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <Reveal direction="right" className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-deep">
            <Image
              src="/about/mary-portrait.jpg"
              alt="Mary Lee, the artist behind Sea Attitudes, in her coastal studio"
              fill
              sizes="(max-width: 1024px) 80vw, 36vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -left-4 -top-4 -z-10 size-40 rounded-full bg-aqua/40 blur-2xl" />
          <span className="absolute -bottom-5 left-6 rounded-full bg-shell px-5 py-2 font-display text-sm text-deepsea shadow-lift">
            Englewood, Florida
          </span>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">{intro?.eyebrow ?? "Meet the maker"}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-deepsea md:text-[2.8rem]">
              {intro?.title ?? "The hands behind every piece"}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Mary Lee has spent her life along the water, reading the Gulf the way others
              read books. Every piece that leaves her Englewood studio is made entirely by
              hand, from genuine sea glass, crushed glass, and shells — and no two are ever
              the same.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <blockquote className="mt-7 border-l-2 border-gold pl-5 font-display text-xl italic text-slate">
              {copy.about.pullQuote}
            </blockquote>
          </Reveal>
          <Reveal delay={0.26} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href="/about">
                Mary&rsquo;s Story
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <p className="font-display text-2xl text-deepsea/80">— {site.founder}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
