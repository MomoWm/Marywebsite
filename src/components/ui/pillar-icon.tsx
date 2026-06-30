import {
  Waves,
  Shell,
  Heart,
  Truck,
  Gem,
  Sparkles,
  Hammer,
  Sun,
  Anchor,
  Palette,
  HandHeart,
  Award,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  wave: Waves,
  waves: Waves,
  shell: Shell,
  heart: Heart,
  handheart: HandHeart,
  truck: Truck,
  gem: Gem,
  sparkles: Sparkles,
  hammer: Hammer,
  sun: Sun,
  anchor: Anchor,
  palette: Palette,
  award: Award,
};

export function PillarIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name?.toLowerCase()] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.4} aria-hidden="true" />;
}
