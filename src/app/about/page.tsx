import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Markdown } from "@/components/ui/markdown";
import { CreativeProcess } from "@/components/sections/process";
import { CtaBand } from "@/components/sections/cta-band";
import { TrustStrip } from "@/components/sections/trust-bar";
import { WaveDivider } from "@/components/art/wave-divider";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { copy } from "@/content/site-copy";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/about");

export default function AboutPage() {
  const { about } = copy;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About Mary", href: "/about" },
        ]}
      />
      <PageHeader eyebrow={about.eyebrow} title={about.headline} subhead={about.intro} />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="container-luxe grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal direction="right" className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-deep">
              <Image
                src="/about/mary-portrait.jpg"
                alt="Mary Lee, founder and artist of Sea Attitudes"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lift">
                <Image
                  src="/about/mary-portrait-2.jpg"
                  alt="A handmade sea glass piece from Mary's Englewood studio"
                  fill
                  sizes="22vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center rounded-2xl bg-seafoam-light/50 p-5">
                <p className="font-display text-3xl text-deepsea">100%</p>
                <p className="text-sm text-slate">handmade, one at a time, in {site.location.city}</p>
              </div>
            </div>
          </Reveal>

          <div>
            <Markdown content={about.story} />
            <Reveal className="mt-10">
              <blockquote className="border-l-2 border-gold pl-6 font-display text-2xl italic leading-snug text-slate">
                {about.pullQuote}
              </blockquote>
              <p className="mt-6 font-display text-3xl text-deepsea/80">— {site.founder}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand-light/40 py-20 md:py-24">
        <div className="container-luxe">
          <div className="grid gap-8 md:grid-cols-3">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1} className="rounded-2xl bg-shell p-8 shadow-soft">
                <h3 className="font-display text-xl text-deepsea">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{v.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14">
            <TrustStrip />
          </Reveal>
        </div>
      </section>

      <CreativeProcess />

      <WaveDivider fill="#f5f2ea" className="-mt-px bg-deepsea" />

      <CtaBand index={1} />
    </>
  );
}
