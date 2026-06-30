"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="grid min-h-[60vh] place-items-center bg-shell px-6 text-center">
      <div className="max-w-md">
        <p className="eyebrow">Something drifted off course</p>
        <h1 className="mt-4 font-display text-4xl text-deepsea">A wave knocked this loose</h1>
        <p className="mt-4 text-ink-soft">
          Sorry about that — please try again, or head back to calmer waters.
        </p>
        <div className="mt-8 flex justify-center">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
        </div>
      </div>
    </section>
  );
}
