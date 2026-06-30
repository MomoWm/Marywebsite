"use client";

import * as React from "react";
import { PillarIcon } from "@/components/ui/pillar-icon";
import { RevealGroup } from "@/components/ui/reveal";
import { motion } from "motion/react";
import { copy } from "@/content/site-copy";

export function TrustBar() {
  const items = copy.brandPillars.slice(0, 5);
  return (
    <section className="border-y border-border bg-sand-light/40">
      <div className="container-luxe py-7">
        <RevealGroup
          as="ul"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 sm:gap-x-6"
          stagger={0.06}
        >
          {items.map((p, i) => (
            <React.Fragment key={p.title}>
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="flex items-center gap-2.5"
              >
                <PillarIcon name={p.icon} className="size-[18px] text-ocean" />
                <span className="text-[0.82rem] font-medium uppercase tracking-[0.12em] text-slate">
                  {p.title}
                </span>
              </motion.li>
              {i < items.length - 1 && (
                <span aria-hidden className="hidden size-1 rounded-full bg-gold/50 sm:block" />
              )}
            </React.Fragment>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/** Compact single-row variant for inside other pages. */
export function TrustStrip() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate">
      {copy.brandPillars.slice(0, 5).map((p) => (
        <span key={p.title} className="flex items-center gap-2">
          <PillarIcon name={p.icon} className="size-4 text-ocean" />
          {p.title}
        </span>
      ))}
    </div>
  );
}
