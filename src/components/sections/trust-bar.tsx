"use client";

import { PillarIcon } from "@/components/ui/pillar-icon";
import { RevealGroup } from "@/components/ui/reveal";
import { motion } from "motion/react";
import { copy } from "@/content/site-copy";

export function TrustBar() {
  return (
    <section className="border-y border-border bg-sand-light/50">
      <div className="container-luxe py-12">
        <RevealGroup
          as="ul"
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4"
          stagger={0.08}
        >
          {copy.brandPillars.slice(0, 8).map((p) => (
            <TrustItem key={p.title} icon={p.icon} title={p.title} desc={p.description} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function TrustItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
      className="flex flex-col items-center gap-2 text-center"
    >
      <span className="grid size-12 place-items-center rounded-full bg-shell text-ocean shadow-soft">
        <PillarIcon name={icon} className="size-5" />
      </span>
      <span className="font-display text-base text-deepsea">{title}</span>
      <span className="max-w-[18ch] text-xs leading-relaxed text-slate">{desc}</span>
    </motion.li>
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
