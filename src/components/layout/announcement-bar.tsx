import { Sparkles } from "lucide-react";

export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="relative z-50 bg-deepsea text-shell">
      <div className="container-luxe flex items-center justify-center gap-2 py-2 text-center text-[0.72rem] font-medium tracking-[0.16em] uppercase">
        <Sparkles className="size-3.5 text-gold-soft" aria-hidden="true" />
        <span>{text}</span>
      </div>
    </div>
  );
}
