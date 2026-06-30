export default function Loading() {
  return (
    <div className="grid min-h-[55vh] place-items-center bg-shell">
      <div className="flex flex-col items-center gap-4">
        <span className="relative size-12" aria-hidden>
          <span className="absolute inset-0 rounded-full border-2 border-ocean/20" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-ocean" />
        </span>
        <p className="font-display text-lg italic text-slate">Gathering the tide…</p>
      </div>
    </div>
  );
}
