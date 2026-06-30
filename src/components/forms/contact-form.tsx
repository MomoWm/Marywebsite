"use client";

import * as React from "react";
import { Send, Check } from "lucide-react";
import { Label, Input, Textarea, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [state, setState] = React.useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-border bg-seafoam-light/40 p-10 text-center">
        <span className="grid mx-auto size-14 place-items-center rounded-full bg-shell text-ocean shadow-soft">
          <Check className="size-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-deepsea">Message sent</h3>
        <p className="mt-2 text-ink-soft">
          Thank you for reaching out — Mary reads every note personally and will be in
          touch within a day or two.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldGroup>
          <Label htmlFor="name" required>Name</Label>
          <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
        </FieldGroup>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <FieldGroup>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(optional)" autoComplete="tel" />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" name="subject" defaultValue={defaultSubject} placeholder="How can we help?" />
        </FieldGroup>
      </div>
      <FieldGroup>
        <Label htmlFor="message" required>Message</Label>
        <Textarea id="message" name="message" required placeholder="Tell Mary what you have in mind…" />
      </FieldGroup>

      {state === "error" && (
        <p className="text-sm text-[#b4543f]">
          Something went wrong. Please try again, or email{" "}
          <a href="mailto:seaattitudesbymarylee@gmail.com" className="underline">
            seaattitudesbymarylee@gmail.com
          </a>
          .
        </p>
      )}

      <Button type="submit" size="lg" disabled={state === "loading"} className="self-start">
        {state === "loading" ? "Sending…" : "Send message"}
        <Send className="size-4" />
      </Button>
    </form>
  );
}
