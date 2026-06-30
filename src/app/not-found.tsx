import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grain relative overflow-hidden bg-gradient-to-b from-sand-light/50 to-shell">
      <div className="pointer-events-none absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 rounded-full bg-aqua/25 blur-[120px]" />
      <div className="container-luxe relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">Lost at sea</p>
        <h1 className="mt-4 font-display text-6xl text-deepsea md:text-8xl">404</h1>
        <p className="mt-5 max-w-md text-lg text-ink-soft">
          This tide carried the page somewhere else. Let&rsquo;s get you back to calmer
          waters.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/shop">Browse the collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
