import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { BotanicalDivider } from "@/components/art/botanicals";

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
    <section id={id} className={cn("py-24 md:py-36", className)}>
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
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-2xl",
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag
        className={cn(
          "display-balance text-[2rem] leading-[1.1] tracking-[-0.01em] sm:text-[2.5rem] md:text-[3.1rem]",
          titleClassName,
        )}
      >
        {typeof title === "string"
          ? title.split("*").map((seg, i) =>
              i % 2 === 1 ? (
                <em key={i} className="accent">{seg}</em>
              ) : (
                <React.Fragment key={i}>{seg}</React.Fragment>
              ),
            )
          : title}
      </Tag>
      <BotanicalDivider align={align} className="mt-1" />
      {subhead && (
        <p className="max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
          {subhead}
        </p>
      )}
    </Reveal>
  );
}
