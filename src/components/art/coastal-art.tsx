import { hashSeed, mulberry32 } from "@/lib/utils";

/**
 * CoastalArt
 * ----------
 * A deterministic, seeded generative artwork that stands in for product
 * photography. Each piece is derived from its `seed` (e.g. the product slug)
 * and its own `palette`, so every product renders a distinct, on-brand
 * abstract composition reminiscent of sea glass, tide pools and gulf light.
 *
 * It is fully deterministic (seeded PRNG, no Math.random at render) so server
 * and client markup match — no hydration drift. When a real photograph is
 * supplied, swap this for <Image>; the surrounding layout is identical.
 */

type Variant = "wide" | "hero" | "square" | "portrait" | "cover";

const DIMS: Record<Variant, { w: number; h: number }> = {
  wide: { w: 1200, h: 800 },
  hero: { w: 1600, h: 1000 },
  square: { w: 1000, h: 1000 },
  portrait: { w: 1000, h: 1250 },
  cover: { w: 1640, h: 624 },
};

const FALLBACK = ["#9cc5b4", "#a7d3d6", "#4f86a6", "#e8dcc9", "#c2a36b"];

/** Smooth closed blob path via a cardinal/Catmull-Rom spline. */
function blobPath(
  cx: number,
  cy: number,
  radius: number,
  rand: () => number,
  points = 9,
  irregularity = 0.42,
): string {
  const pts: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2;
    const r = radius * (1 - irregularity + rand() * irregularity * 2);
    pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
  }
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} `;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
  }
  return d + "Z";
}

export interface CoastalArtProps {
  seed: string;
  palette?: string[];
  variant?: Variant;
  className?: string;
  /** Show a faint horizon line — nice for hero / lifestyle framing. */
  horizon?: boolean;
  rounded?: boolean;
}

export function CoastalArt({
  seed,
  palette,
  variant = "wide",
  className,
  horizon = false,
  rounded = false,
}: CoastalArtProps) {
  const colors = palette && palette.length >= 3 ? palette : FALLBACK;
  const { w, h } = DIMS[variant];
  const rand = mulberry32(hashSeed(seed) || 1);
  const uid = `ca-${(hashSeed(seed) % 100000).toString(36)}`;

  const pick = (i: number) => colors[i % colors.length];

  // 6–9 layered sea-glass blobs.
  const blobCount = 6 + Math.floor(rand() * 4);
  const blobs = Array.from({ length: blobCount }, (_, i) => {
    const cx = w * (0.12 + rand() * 0.76);
    const cy = h * (0.12 + rand() * 0.76);
    const r = Math.min(w, h) * (0.16 + rand() * 0.26);
    return {
      d: blobPath(cx, cy, r, rand, 8 + Math.floor(rand() * 4)),
      fill: pick(i + 1),
      opacity: 0.28 + rand() * 0.34,
      blend: i % 2 === 0 ? "screen" : "multiply",
    };
  });

  // A few crisp "frosted glass" shards layered on top.
  const shards = Array.from({ length: 3 + Math.floor(rand() * 3) }, (_, i) => {
    const cx = w * (0.18 + rand() * 0.64);
    const cy = h * (0.2 + rand() * 0.6);
    const rr = Math.min(w, h) * (0.05 + rand() * 0.09);
    return {
      cx,
      cy,
      rx: rr,
      ry: rr * (0.6 + rand() * 0.7),
      rot: rand() * 180,
      fill: pick(i + 2),
      opacity: 0.22 + rand() * 0.22,
    };
  });

  // Gold flecks scattered like sun on the water.
  const flecks = Array.from({ length: 14 + Math.floor(rand() * 12) }, () => ({
    cx: rand() * w,
    cy: rand() * h,
    r: 1 + rand() * 3.2,
    o: 0.25 + rand() * 0.5,
  }));

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={pick(0)} />
          <stop offset="55%" stopColor={pick(3)} />
          <stop offset="100%" stopColor={pick(1)} />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="32%" cy="26%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-blur`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation={Math.min(w, h) * 0.05} />
        </filter>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width={w} height={h} fill={`url(#${uid}-bg)`} />

      <g filter={`url(#${uid}-blur)`}>
        {blobs.map((b, i) => (
          <path
            key={i}
            d={b.d}
            fill={b.fill}
            opacity={b.opacity}
            style={{ mixBlendMode: b.blend as React.CSSProperties["mixBlendMode"] }}
          />
        ))}
      </g>

      {shards.map((s, i) => (
        <g key={i} transform={`rotate(${s.rot.toFixed(1)} ${s.cx.toFixed(1)} ${s.cy.toFixed(1)})`}>
          <ellipse
            cx={s.cx}
            cy={s.cy}
            rx={s.rx}
            ry={s.ry}
            fill={s.fill}
            opacity={s.opacity}
            style={{ mixBlendMode: "screen" }}
          />
          <ellipse
            cx={s.cx}
            cy={s.cy}
            rx={s.rx}
            ry={s.ry}
            fill="none"
            stroke="#ffffff"
            strokeOpacity={0.22}
            strokeWidth={1.5}
          />
        </g>
      ))}

      {horizon && (
        <g opacity={0.5}>
          <path
            d={`M 0 ${h * 0.62} C ${w * 0.3} ${h * 0.6}, ${w * 0.7} ${h * 0.64}, ${w} ${h * 0.61}`}
            fill="none"
            stroke="#ffffff"
            strokeOpacity={0.35}
            strokeWidth={1.5}
          />
        </g>
      )}

      {flecks.map((f, i) => (
        <circle key={i} cx={f.cx} cy={f.cy} r={f.r} fill="#c2a36b" opacity={f.o} />
      ))}

      <rect width={w} height={h} fill={`url(#${uid}-glow)`} />
      <rect
        width={w}
        height={h}
        filter={`url(#${uid}-grain)`}
        opacity={0.06}
        style={{ mixBlendMode: "overlay" }}
      />
      {rounded && (
        <rect
          x="1"
          y="1"
          width={w - 2}
          height={h - 2}
          rx="18"
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.18}
        />
      )}
    </svg>
  );
}
