import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { faqGroups } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/faq");

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function FaqPage() {
  const allItems = faqGroups.flatMap((g) => g.items);
  return (
    <>
      <FaqJsonLd faqs={allItems} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "FAQ", href: "/faq" },
        ]}
      />
      <PageHeader
        eyebrow="Good to know"
        title="Questions, answered"
        subhead="Everything about shipping, custom commissions, materials, lead times and care. Still wondering something? Mary is only a message away."
      />

      <section className="py-16 md:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.85fr_2fr]">
          {/* Jump nav */}
          <nav className="lg:sticky lg:top-28 lg:self-start" aria-label="FAQ sections">
            <p className="eyebrow">On this page</p>
            <ul className="mt-4 flex flex-col gap-2">
              {faqGroups.map((g) => (
                <li key={g.category}>
                  <a
                    href={`#${slugify(g.category)}`}
                    className="text-ink-soft transition-colors hover:text-ocean"
                  >
                    {g.category}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-14">
            {faqGroups.map((group) => (
              <div key={group.category} id={slugify(group.category)} className="scroll-mt-28">
                <Reveal>
                  <h2 className="font-display text-2xl text-deepsea md:text-3xl">
                    {group.category}
                  </h2>
                </Reveal>
                <Accordion type="single" collapsible className="mt-4">
                  {group.items.map((item, i) => (
                    <AccordionItem key={i} value={`${group.category}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}

            <p className="rounded-2xl border border-border bg-sand-light/40 p-6 text-ink-soft">
              Can&rsquo;t find what you need?{" "}
              <Link href="/contact" className="font-medium text-ocean underline underline-offset-2">
                Send Mary a note
              </Link>{" "}
              — she answers every message personally.
            </p>
          </div>
        </div>
      </section>

      <CtaBand index={3} tone="soft" />
    </>
  );
}
