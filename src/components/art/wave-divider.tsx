import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
  /** Fill color of the wave (defaults to shell white). */
  fill?: string;
  flip?: boolean;
}

/** A soft, layered wave used to transition between sections. */
export function WaveDivider({ className, fill = "#fbf9f6", flip = false }: WaveDividerProps) {
  return (
    <div
      className={cn("pointer-events-none w-full overflow-hidden leading-[0]", className)}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="h-[60px] w-full md:h-[100px]"
      >
        <path
          d="M0,64 C240,112 480,16 720,40 C960,64 1200,120 1440,72 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.6"
        />
        <path
          d="M0,80 C280,40 520,108 760,84 C1000,60 1220,96 1440,80 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
