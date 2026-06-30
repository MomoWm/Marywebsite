"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);

  const [main, accentA, accentB] = images;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden bg-gradient-to-b from-shell via-sand-light/40 to-shell"
    >
      {/* soft coastal glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 size-[34rem] rounded-full bg-aqua/30 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 size-[26rem] rounded-full bg-seafoam/25 blur-[110px]"
      />

      <div className="container-luxe relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-24">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow"
          >
            {eyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.08 }}
            className="display-balance mt-5 font-display text-[2.6rem] leading-[1.04] text-deepsea sm:text-5xl lg:text-[3.6rem]"
          >
            {headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.18 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
          >
            {subhead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.28 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild size="lg">
              <Link href="/custom-orders">{primaryCta}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/shop">
                {secondaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-9 flex items-center gap-3 text-sm text-slate"
          >
            <span className="flex text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-gold" />
              ))}
            </span>
            <span>
              Handmade &amp; one-of-a-kind in {site.location.city},{" "}
              {site.location.region}
            </span>
          </motion.div>
        </div>

        {/* Image composition */}
        <div className="relative h-[26rem] sm:h-[34rem] lg:h-[40rem]">
          {main && (
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease }}
              className="absolute left-1/2 top-1/2 z-10 h-[78%] w-[64%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] shadow-deep ring-1 ring-shell/60"
            >
              <Image
                src={main.image!}
                alt={main.altText || main.name}
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 32vw"
                className="object-cover"
              />
            </motion.div>
          )}
          {accentA && (
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease, delay: 0.2 }}
              className="absolute left-0 top-6 z-20 h-[34%] w-[40%] animate-float-slow overflow-hidden rounded-2xl shadow-lift ring-1 ring-shell/60"
            >
              <Image
                src={accentA.image!}
                alt={accentA.altText || accentA.name}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </motion.div>
          )}
          {accentB && (
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease, delay: 0.32 }}
              className="absolute bottom-4 right-0 z-20 h-[36%] w-[38%] animate-float overflow-hidden rounded-2xl shadow-lift ring-1 ring-shell/60"
            >
              <Image
                src={accentB.image!}
                alt={accentB.altText || accentB.name}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
