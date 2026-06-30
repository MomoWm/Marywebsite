"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "div" | "section" | "li" | "span" | "article";
}

/** Soft, ocean-like fade-in on scroll. Respects reduced-motion preferences. */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.8,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, ...(reduce ? {} : offset[direction]) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduce ? 0 : duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered container — children that are <Reveal> or motion items animate in sequence. */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul" | "section";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
