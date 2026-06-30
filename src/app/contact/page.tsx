import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { WaveDivider } from "@/components/art/wave-divider";
import { Starfish, Shell } from "@/components/art/botanicals";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { copy } from "@/content/site-copy";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/contact");

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ piece?: string }>;
}) {
  const { piece } = await searchParams;
  const defaultSubject = piece ? `Inquiry about “${piece}”` : "";
  const { contact } = copy;

  const details = [
    {
      icon: Mail,
      label: "Email",
      value: site.email,
      href: `mailto:${site.email}?subject=Custom%20piece%20inquiry`,
    },
    { icon: Phone, label: "Call or text", value: site.phone, href: site.phoneHref },
    {
      icon: MapPin,
      label: "Studio",
      value: `${site.location.city}, ${site.location.regionName} ${site.location.postalCode}`,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <PageHeader eyebrow={contact.eyebrow} title={contact.headline} subhead={contact.subhead} />

      <section className="py-16 md:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Info */}
          <div>
            <Reveal>
              <div className="flex flex-col gap-6">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-seafoam-light/60 text-ocean">
                      <d.icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-slate">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="font-display text-lg text-deepsea hover:text-ocean">
                          {d.value}
                        </a>
                      ) : (
                        <p className="font-display text-lg text-deepsea">{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-seafoam-light/60 text-ocean">
                    <Clock className="size-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-slate">Availability</p>
                    {site.hours.map((h) => (
                      <p key={h} className="text-deepsea">{h}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-8 flex gap-3">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-11 place-items-center rounded-full border border-border text-slate transition-colors hover:border-ocean hover:text-ocean"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full border border-border text-slate transition-colors hover:border-ocean hover:text-ocean"
              >
                <Instagram className="size-5" />
              </a>
            </Reveal>

            <Reveal delay={0.15} className="mt-8">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Englewood%2C%20Florida"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl bg-deepsea p-8 text-shell shadow-soft"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 size-44 rounded-full bg-ocean/30 blur-2xl" />
                <Starfish className="pointer-events-none absolute right-6 top-6 w-12 -rotate-12 text-shell/15" />
                <Shell className="pointer-events-none absolute bottom-10 right-16 hidden w-10 text-shell/10 sm:block" />
                <p className="eyebrow !text-gold-soft">Find us on the Gulf</p>
                <p className="mt-3 font-display text-3xl text-shell">Englewood, Florida</p>
                <p className="mt-1 text-shell/75">
                  Florida&rsquo;s Gulf Coast · {site.location.postalCode}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-soft">
                  Open in Google Maps
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
                <WaveDivider fill="#1c4a5a" className="absolute inset-x-0 bottom-0 opacity-60" />
              </a>
            </Reveal>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-border bg-white/60 p-6 shadow-soft md:p-10">
            <h2 className="font-display text-2xl text-deepsea">Send a message</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Tell Mary what you have in mind — a custom piece, a question, or just hello.
            </p>
            <div className="mt-7">
              <ContactForm defaultSubject={defaultSubject} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
