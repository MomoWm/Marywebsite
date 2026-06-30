import { Sparkles } from "lucide-react";

export function AnnouncementBar({ text }: { text: string }) {
  return (
    <div className="relative z-50 bg-deepsea text-shell">
      <div className="container-luxe flex items-center justify-center gap-2 py-2.5 text-center text-[0.62rem] font-medium uppercase tracking-[0.12em] sm:text-[0.72rem] sm:tracking-[0.16em]">
        <Sparkles className="size-3.5 shrink-0 text-gold-soft" aria-hidden="true" />
        <span>{text}</span>
      </div>
    </div>
  );
}
