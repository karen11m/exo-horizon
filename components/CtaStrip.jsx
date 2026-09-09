import Link from "next/link";

export default function CtaStrip({
  title = "¿Tienes un problema que la tecnología puede resolver?",
  accent = "Cuéntamelo.",
  subtitle = "Agenda una consultoría sin compromiso y define el plan a tu medida.",
}) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="relative overflow-hidden border border-line bg-surface/60 px-6 py-14 md:px-14 md:py-20">
          <div className="bg-noise absolute inset-0 opacity-[0.06]" aria-hidden="true" />
          <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/70">
            → Proyecto nuevo
          </span>
          <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted/70">
            ✦ 2026
          </span>

          <div className="relative">
            <h2 className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {title} <span className="italic text-gradient">{accent}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base text-muted md:text-lg">{subtitle}</p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-3 bg-primary px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-bg transition-colors hover:bg-ink"
              >
                Escríbeme hoy
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="https://wa.me/573006707655"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-line-strong px-8 py-4 font-mono text-sm uppercase tracking-[0.15em] text-ink transition-colors hover:border-primary hover:text-primary"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}