"use client";

import * as React from "react";
import { Send, Check } from "lucide-react";
import { Label, Input, Textarea, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { leadMailto } from "@/lib/mailto";

const WEB3FORMS_KEY = "95860b0f-813b-4f36-865e-fb0189f8c138";

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [state, setState] = React.useState<
    "idle" | "loading" | "done" | "manual" | "error"
  >("idle");
  const [mailto, setMailto] = React.useState("");
  const [err, setErr] = React.useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries()) as Record<string, string>;
    if (payload.company) return setState("done"); // honeypot: bots see "done"
    setMailto(
      leadMailto(
        `New message from ${payload.name || "the website"}${payload.subject ? ` — ${payload.subject}` : ""}`,
        payload,
      ),
    );
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New message from ${payload.name || "the website"}`,
          from_name: "Sea Attitudes website",
          replyto: payload.email,
          Name: payload.name,
          Email: payload.email,
          Phone: payload.phone || "—",
          "About": payload.subject || "—",
          Message: payload.message,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };
      if (json.success) setState("done");
      else {
        setErr(json.message || "The message service didn't confirm delivery.");
        setState("manual");
      }
    } catch {
      setErr("Couldn't reach the message service.");
      setState("manual");
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

  if (state === "manual") {
    return (
      <div className="rounded-2xl border border-border bg-seafoam-light/40 p-10 text-center">
        <span className="grid mx-auto size-14 place-items-center rounded-full bg-shell text-ocean shadow-soft">
          <Send className="size-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-deepsea">One quick tap to send</h3>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">
          Your message is ready — tap below and it opens in your email, already written
          out for Mary. Just press send.
        </p>
        <Button asChild size="lg" className="mt-6">
          <a href={mailto}>
            Send to Mary
            <Send className="size-4" />
          </a>
        </Button>
        <p className="mt-4 text-sm text-muted">
          Or reach her directly at{" "}
          <a href="mailto:seaattitudesbymarylee@gmail.com" className="underline">
            seaattitudesbymarylee@gmail.com
          </a>
          .
        </p>
        {err && (
          <p className="mx-auto mt-4 max-w-sm text-xs text-muted/80">Details: {err}</p>
        )}
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
        <p role="alert" aria-live="assertive" className="text-sm font-medium text-[#9e3b29]">
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
