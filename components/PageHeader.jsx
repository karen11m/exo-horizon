export default function PageHeader({ index = "00", title, accent, subtitle, route }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          <span className="text-primary">/{route}</span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
          <span>Sección {index} / 05</span>
        </div>

        <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {title}{" "}
          {accent && <span className="italic text-gradient">{accent}</span>}
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {subtitle}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted/70 md:text-right">
            Karen Méndez <br className="md:hidden" />
            <span className="hidden md:inline">— </span>
            Bogotá · 2026
          </p>
        </div>
      </div>
    </section>
  );
}