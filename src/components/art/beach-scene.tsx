import { cn } from "@/lib/utils";

/** Build a seamlessly tiling wave path (period divides half-width evenly). */
function wavePath(width: number, height: number, amp: number, period: number, baseY: number) {
  let d = `M0 ${baseY}`;
  for (let x = 0; x <= width; x += period) {
    d += ` C ${x + period * 0.25} ${baseY - amp}, ${x + period * 0.75} ${baseY + amp}, ${x + period} ${baseY}`;
  }
  return d + ` L ${width} ${height} L 0 ${height} Z`;
}

function WaveLayer({
  top,
  color,
  opacity,
  amp,
  duration,
  reverse = false,
}: {
  top: string;
  color: string;
  opacity: number;
  amp: number;
  duration: string;
  reverse?: boolean;
}) {
  return (
    <div
      className="absolute left-0 h-40 w-[200%] animate-marquee"
      style={{
        top,
        animationDuration: duration,
        animationDirection: reverse ? "reverse" : "normal",
      }}
    >
      <svg viewBox="0 0 2880 200" preserveAspectRatio="none" className="h-full w-full">
        <path d={wavePath(2880, 200, amp, 360, 40)} fill={color} opacity={opacity} />
      </svg>
    </div>
  );
}

const GLINTS = [
  { l: "12%", t: "30%", s: 7, c: "#bfe0e2", d: "0s" },
  { l: "28%", t: "22%", s: 5, c: "#c2a36b", d: "1.4s" },
  { l: "44%", t: "34%", s: 6, c: "#9cc5b4", d: "0.7s" },
  { l: "63%", t: "26%", s: 5, c: "#a7d3d6", d: "2.1s" },
  { l: "78%", t: "32%", s: 8, c: "#c2a36b", d: "1s" },
  { l: "88%", t: "20%", s: 5, c: "#bfe0e2", d: "2.6s" },
];

/** A layered, gently animated Gulf-Coast scene: sky, drifting sea, sand, sea-glass glints. */
export function BeachScene({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {/* sky */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #f5eddf 0%, #efe8da 26%, #e2ecdf 46%, #cfe7e6 56%)",
        }}
      />
      {/* sun glow */}
      <div className="absolute left-[16%] top-[10%] size-72 rounded-full bg-gold/25 blur-[90px]" />
      <div className="absolute left-[20%] top-[16%] size-24 rounded-full bg-gold-soft/40 blur-2xl" />

      {/* sea */}
      <div
        className="absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background: "linear-gradient(to bottom, #a9cdcf 0%, #6fa78f 45%, #4f86a6 100%)",
        }}
      />

      {/* drifting waves at the horizon */}
      <WaveLayer top="50%" color="#d6eef0" opacity={0.7} amp={10} duration="38s" />
      <WaveLayer top="53%" color="#a9cdcf" opacity={0.7} amp={16} duration="52s" reverse />
      <WaveLayer top="58%" color="#7fae9b" opacity={0.6} amp={20} duration="66s" />

      {/* sand foreground */}
      <div
        className="absolute inset-x-0 bottom-0 h-[13%]"
        style={{ background: "linear-gradient(to bottom, rgba(230,218,195,0), #e6dac3 72%, #d8c4a0)" }}
      />

      {/* floating sea-glass glints */}
      {GLINTS.map((g, i) => (
        <span
          key={i}
          className="absolute animate-float rounded-full"
          style={{
            left: g.l,
            top: g.t,
            width: g.s,
            height: g.s,
            backgroundColor: g.c,
            opacity: 0.7,
            animationDelay: g.d,
            boxShadow: `0 0 ${g.s * 2}px ${g.c}`,
          }}
        />
      ))}
    </div>
  );
}
