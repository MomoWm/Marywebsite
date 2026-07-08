"use client";

import * as React from "react";
import { Sparkles, ImagePlus, X, Send } from "lucide-react";
import { Label, Input, Textarea, Select, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { leadMailto } from "@/lib/mailto";

const PROJECT_TYPES = [
  "Sea Glass Mirror",
  "Coastal Shadow Box",
  "Coastal Saying / Sign",
  "Sea Glass Christmas Tree",
  "Coastal Wall Art",
  "Beach Gift / Keepsake",
  "Something else",
];
const ROOMS = [
  "Living Room",
  "Primary Bedroom",
  "Entryway / Foyer",
  "Bathroom",
  "Kitchen / Dining",
  "Home Office",
  "Outdoor / Lanai",
  "Vacation Rental / Airbnb",
  "A gift",
  "Other",
];
const BUDGETS = ["Under $150", "$150 – $300", "$300 – $600", "$600+", "Not sure yet"];
const TIMELINES = ["No rush", "Within a month", "1 – 3 months", "I have a specific date"];

export function CustomOrderForm({ reference = "" }: { reference?: string }) {
  const [state, setState] = React.useState<
    "idle" | "loading" | "done" | "manual" | "error"
  >("idle");
  const [mailto, setMailto] = React.useState("");
  const [files, setFiles] = React.useState<string[]>([]);

  function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const names = Array.from(e.target.files ?? []).map((f) => f.name);
    setFiles((prev) => Array.from(new Set([...prev, ...names])).slice(0, 6));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      ...Object.fromEntries(form.entries()),
      attachments: files,
    };
    const data = payload as Record<string, unknown>;
    delete data.inspiration;
    const link = leadMailto(
      `New custom commission from ${data.name || "the website"}`,
      data,
    );
    try {
      const res = await fetch("/api/custom-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { delivered?: boolean };
      if (res.ok && json.delivered) setState("done");
      else if (res.ok) {
        setMailto(link);
        setState("manual");
      } else setState("error");
    } catch {
      setMailto(link);
      setState("manual");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-border bg-seafoam-light/40 p-10 text-center md:p-14">
        <span className="grid mx-auto size-16 place-items-center rounded-full bg-shell text-gold shadow-soft">
          <Sparkles className="size-8" />
        </span>
        <h3 className="mt-6 font-display text-3xl text-deepsea">
          Your commission has begun
        </h3>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Thank you for trusting Mary with your vision. She&rsquo;ll personally review
          your inspiration and reach out within one to two days to begin designing a
          one-of-a-kind piece, made from scratch just for you.
        </p>
      </div>
    );
  }

  if (state === "manual") {
    return (
      <div className="rounded-3xl border border-border bg-seafoam-light/40 p-10 text-center md:p-14">
        <span className="grid mx-auto size-16 place-items-center rounded-full bg-shell text-gold shadow-soft">
          <Send className="size-8" />
        </span>
        <h3 className="mt-6 font-display text-3xl text-deepsea">One last tap to send</h3>
        <p className="mx-auto mt-3 max-w-md text-ink-soft">
          Your commission details are ready — tap below and they open in your email,
          already written out for Mary. Just press send and she&rsquo;ll take it from there.
        </p>
        <Button asChild size="lg" className="mt-7">
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
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-10">
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="reference" defaultValue={reference} />

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-2 font-display text-xl text-deepsea">About you</legend>
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
        <FieldGroup className="sm:max-w-xs">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="(optional)" autoComplete="tel" />
        </FieldGroup>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-2 font-display text-xl text-deepsea">Your piece</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldGroup>
            <Label htmlFor="projectType">What would you love?</Label>
            <Select id="projectType" name="projectType" defaultValue="">
              <option value="" disabled>Choose a type…</option>
              {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="room">Where will it live?</Label>
            <Select id="room" name="room" defaultValue="">
              <option value="" disabled>Choose a room…</option>
              {ROOMS.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="dimensions">Size / dimensions</Label>
            <Input id="dimensions" name="dimensions" placeholder={'e.g. about 24" wide'} />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="colors">Preferred colors</Label>
            <Input id="colors" name="colors" placeholder="e.g. seafoam, aqua, sand" />
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="budget">Budget</Label>
            <Select id="budget" name="budget" defaultValue="">
              <option value="" disabled>Select a range…</option>
              {BUDGETS.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </FieldGroup>
          <FieldGroup>
            <Label htmlFor="timeline">Timeline</Label>
            <Select id="timeline" name="timeline" defaultValue="">
              <option value="" disabled>When do you need it?</option>
              {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
          </FieldGroup>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="mb-2 font-display text-xl text-deepsea">Your inspiration</legend>
        <FieldGroup>
          <Label htmlFor="message" required>Tell Mary about your vision</Label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder="The story, the room, a piece of yours you saw and loved, a memory of the water…"
            className="min-h-36"
          />
        </FieldGroup>
        <FieldGroup>
          <Label htmlFor="inspiration">Inspiration photos</Label>
          <label
            htmlFor="inspiration"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-white/60 px-4 py-4 text-sm text-slate transition-colors hover:border-ocean/50"
          >
            <ImagePlus className="size-5 text-ocean" />
            <span>Add photos of your space or pieces you love (optional)</span>
            <input
              id="inspiration"
              name="inspiration"
              type="file"
              accept="image/*"
              multiple
              onChange={onFiles}
              className="hidden"
            />
          </label>
          {files.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {files.map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-1.5 rounded-full bg-seafoam/20 px-3 py-1 text-xs text-deepsea"
                >
                  {f}
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((x) => x !== f))}
                    aria-label={`Remove ${f}`}
                  >
                    <X className="size-3" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-xs text-muted">
            Selected here for reference — Mary will reply by email to collect full-size
            photos.
          </p>
        </FieldGroup>
      </fieldset>

      {state === "error" && (
        <p role="alert" aria-live="assertive" className="text-sm font-medium text-[#9e3b29]">
          Something went wrong. Please try again, or email{" "}
          <a href="mailto:seaattitudesbymarylee@gmail.com" className="underline">
            seaattitudesbymarylee@gmail.com
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg" disabled={state === "loading"} className="self-start">
          {state === "loading" ? "Sending…" : "Begin my commission"}
          <Sparkles className="size-4" />
        </Button>
        <p className="max-w-md text-sm text-slate">
          No obligation — Mary personally replies within a day or two to talk through ideas
          and pricing. You only commit once you love the design.
        </p>
      </div>
    </form>
  );
}
