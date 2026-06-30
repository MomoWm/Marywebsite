import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { footerNav, site } from "@/lib/site";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { WaveDivider } from "@/components/art/wave-divider";

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.64 7.86 6.36 9.32-.09-.79-.17-2 .03-2.86.18-.78 1.17-4.97 1.17-4.97s-.3-.6-.3-1.48c0-1.39.81-2.43 1.81-2.43.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24 1 .5 1.81 1.48 1.81 1.78 0 3.14-1.88 3.14-4.58 0-2.39-1.72-4.07-4.18-4.07-2.85 0-4.52 2.13-4.52 4.34 0 .86.33 1.78.74 2.28.08.1.09.19.07.29-.08.32-.25 1-.28 1.14-.04.18-.15.22-.34.13-1.26-.59-2.05-2.42-2.05-3.9 0-3.17 2.31-6.09 6.65-6.09 3.49 0 6.2 2.49 6.2 5.81 0 3.47-2.19 6.26-5.22 6.26-1.02 0-1.98-.53-2.31-1.16l-.63 2.39c-.23.87-.84 1.97-1.26 2.64.95.29 1.95.45 3 .45 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-10 bg-deepsea text-shell">
      <WaveDivider fill="#15333d" className="absolute -top-px left-0 -translate-y-full" />

      {/* Slim newsletter row */}
      <div className="container-luxe border-b border-shell/10 py-10">
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-xl text-shell">Join the Sea Attitudes letter</p>
            <p className="mt-1 text-sm text-shell/70">
              First looks at new pieces and notes from the studio.
            </p>
          </div>
          <NewsletterForm variant="dark" source="footer" />
        </div>
      </div>

      {/* Link grid */}
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/brand/mark.png"
            alt="Sea Attitudes mermaid mark"
            width={72}
            height={48}
            className="mb-4 h-12 w-auto opacity-90"
          />
          <Link href="/" className="font-display text-2xl text-shell">
            Sea Attitudes
          </Link>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-shell/75">
            by Mary Lee
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-shell/80">
            {site.tagline}. Handcrafted on Florida&rsquo;s Gulf Coast from genuine sea
            glass, shells and driftwood — one tide at a time.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid size-10 place-items-center rounded-full border border-shell/20 text-shell/80 transition-colors hover:border-gold hover:text-gold"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full border border-shell/20 text-shell/80 transition-colors hover:border-gold hover:text-gold"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={site.social.pinterest}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="grid size-10 place-items-center rounded-full border border-shell/20 text-shell/80 transition-colors hover:border-gold hover:text-gold"
            >
              <PinterestIcon className="size-4" />
            </a>
          </div>
        </div>

        {Object.entries(footerNav).map(([heading, links]) => (
          <div key={heading}>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold-soft">
              {heading}
            </h3>
            <ul className="mt-5 space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-shell/80 transition-colors hover:text-shell"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact row */}
      <div className="container-luxe grid gap-4 border-t border-shell/10 py-8 text-sm text-shell/80 sm:grid-cols-3">
        <a href={site.phoneHref} className="flex items-center gap-2 hover:text-shell">
          <Phone className="size-4 text-gold-soft" /> {site.phone}
        </a>
        <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-shell">
          <Mail className="size-4 text-gold-soft" /> {site.email}
        </a>
        <span className="flex items-center gap-2">
          <MapPin className="size-4 text-gold-soft" /> {site.location.city},{" "}
          {site.location.region} · {site.location.area}
        </span>
      </div>

      <div className="border-t border-shell/10 py-6">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 text-xs text-shell/65 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All artwork handmade &amp;
            one-of-a-kind.
          </p>
          <div className="flex gap-5">
            <Link href="/faq" className="hover:text-shell/80">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-shell/80">
              Contact
            </Link>
            <Link href="/custom-orders" className="hover:text-shell/80">
              Commissions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
