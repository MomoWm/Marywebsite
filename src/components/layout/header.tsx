"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "glass border-b border-border/70 shadow-soft"
          : "border-b border-transparent bg-shell/40",
      )}
    >
      <div className="container-luxe flex h-18 items-center justify-between gap-6 py-3">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "link-underline text-sm tracking-wide text-ink-soft transition-colors hover:text-deepsea",
                  active && "text-deepsea",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/custom-orders">Request a Custom Piece</Link>
          </Button>
        </div>

        {/* Mobile */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="grid size-11 place-items-center rounded-full text-deepsea transition-colors hover:bg-deepsea/[0.05] lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-deepsea/30 backdrop-blur-sm data-[state=open]:animate-[fade-up_0.3s_ease]" />
            <Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-shell p-6 shadow-deep focus:outline-none data-[state=open]:animate-[fade-up_0.4s_ease]">
              <div className="flex items-center justify-between">
                <Logo />
                <Dialog.Close
                  className="grid size-11 place-items-center rounded-full text-deepsea transition-colors hover:bg-deepsea/[0.05]"
                  aria-label="Close menu"
                >
                  <X className="size-6" />
                </Dialog.Close>
              </div>
              <Dialog.Title className="sr-only">Menu</Dialog.Title>
              <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between border-b border-border py-4 font-display text-2xl text-deepsea"
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 text-ocean" />
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border py-4 font-display text-2xl text-deepsea"
                >
                  Contact
                  <ArrowUpRight className="size-5 text-ocean" />
                </Link>
              </nav>
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <Button asChild size="lg" className="w-full">
                  <Link href="/custom-orders" onClick={() => setOpen(false)}>
                    Request a Custom Piece
                  </Link>
                </Button>
                <a
                  href={`mailto:${site.email}`}
                  className="text-center text-sm text-ink-soft"
                >
                  {site.email}
                </a>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
