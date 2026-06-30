"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeaOats, PalmLeaf } from "@/components/art/botanicals";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

export function Hero({
  eyebrow,
  headline,
  subhead,
  primaryCta,
  secondaryCta,
  images,
}: {
  eyebrow: string;
  headline: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  images: Product[];
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yArch = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -50]);
  const yAccent = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  const [feature, accent] = images;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-shell">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-8%] h-[42rem] w-[42rem] rounded-full bg-aqua/25 blur-[130px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-20%] left-[-12%] h-[34rem] w-[34rem] rounded-full bg-seafoam/15 blur-[120px]"
      />
      <PalmLeaf className="pointer-events-none absolute -left-10 top-10 w-52 -rotate-12 text-seafoam/20" />
      <SeaOats className="pointer-events-none absolute bottom-6 left-2 hidden h-40 text-ocean/15 lg:block" />

      <div className="container-luxe relative grid items-center gap-10 pb-20 pt-12 md:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pb-28 lg:pt-20">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ocean"
          >
            <span className="size-1.5 rounded-full bg-gold" />
            {eyebrow}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease, delay: 0.08 }}
            className="mt-6 font-display text-[clamp(2.8rem,6vw,4.7rem)] font-normal leading-[1.02] tracking-[-0.01em] text-deepsea"
          >
            {headline.split("*").map((seg, i) =>
              i % 2 === 1 ? (
                <em key={i} className="accent">{seg}</em>
              ) : (
                <React.Fragment key={i}>{seg}</React.Fragment>
              ),
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease, delay: 0.18 }}
            className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            {subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease, delay: 0.28 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg">
              <Link href="/custom-orders">{primaryCta}</Link>
            </Button>
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-medium uppercase tracking-[0.08em] text-deepsea"
            >
              {secondaryCta}
              <ArrowRight className="size-4 text-ocean transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.55 }}
            className="mt-12 flex items-center gap-4 border-t border-border pt-6 text-sm text-slate"
          >
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-gold" />
              ))}
            </span>
            <span className="leading-tight">
              Handmade &amp; one-of-a-kind
              <br className="hidden sm:block" /> in {site.location.city}, {site.location.region}
            </span>
          </motion.div>
        </div>

        {/* Arched feature image */}
        <div className="relative mx-auto h-[30rem] w-full max-w-md sm:h-[36rem] lg:h-[42rem]">
          {feature && (
            <motion.div
              style={{ y: yArch }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease }}
              className="absolute inset-x-4 top-0 bottom-8 overflow-hidden rounded-t-[14rem] rounded-b-[2rem] shadow-deep ring-1 ring-shell/70 sm:inset-x-8"
            >
              <Image
                src={feature.image!}
                alt={feature.altText || feature.name}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 rounded-t-[14rem] rounded-b-[2rem] ring-1 ring-inset ring-gold/15" />
            </motion.div>
          )}

          {accent && (
            <motion.div
              style={{ y: yAccent }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.35 }}
              className="absolute -left-2 bottom-0 z-10 h-40 w-32 overflow-hidden rounded-2xl shadow-lift ring-1 ring-shell/70 sm:-left-6 sm:h-48 sm:w-40"
            >
              <Image
                src={accent.image!}
                alt={accent.altText || accent.name}
                fill
                sizes="160px"
                className="object-cover"
              />
            </motion.div>
          )}

          {/* signature plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
            className="absolute -right-1 top-8 z-10 rounded-full bg-shell/90 px-4 py-3 text-center shadow-lift backdrop-blur sm:right-2"
          >
            <p className="font-display text-2xl leading-none text-deepsea">No two</p>
            <p className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-slate">alike</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
