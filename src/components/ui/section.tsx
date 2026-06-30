import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subhead,
  align = "center",
  className,
  titleClassName,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subhead?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-2xl",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag
        className={cn(
          "display-balance text-3xl leading-[1.08] sm:text-4xl md:text-[2.9rem]",
          titleClassName,
        )}
      >
        {title}
      </Tag>
      {subhead && (
        <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
          {subhead}
        </p>
      )}
    </Reveal>
  );
}
