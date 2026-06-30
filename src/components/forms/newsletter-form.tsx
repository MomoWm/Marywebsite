"use client";

import * as React from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterForm({
  className,
  variant = "light",
  source = "footer",
}: {
  className?: string;
  variant?: "light" | "dark";
  source?: string;
}) {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  const dark = variant === "dark";

  if (state === "done") {
    return (
      <p
        className={cn(
          "flex items-center gap-2 text-sm",
          dark ? "text-shell/90" : "text-deepsea",
          className,
        )}
      >
        <Check className="size-4 text-gold" />
        Welcome aboard — watch your inbox for new tides of work.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("flex w-full max-w-md gap-2", className)}>
      <label className="sr-only" htmlFor={`nl-${source}`}>
        Email address
      </label>
      <input
        id={`nl-${source}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className={cn(
          "h-12 w-full rounded-full border px-5 text-sm outline-none transition-colors",
          dark
            ? "border-shell/25 bg-shell/10 text-shell placeholder:text-shell/50 focus:border-shell/60"
            : "border-border bg-white/70 text-deepsea placeholder:text-muted focus:border-ocean/60",
        )}
      />
      <button
        type="submit"
        disabled={state === "loading"}
        aria-label="Subscribe"
        className={cn(
          "grid size-12 shrink-0 place-items-center rounded-full transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60",
          dark ? "bg-gold text-deepsea" : "bg-deepsea text-shell hover:bg-ocean-deep",
        )}
      >
        <ArrowRight className="size-5" />
      </button>
    </form>
  );
}
