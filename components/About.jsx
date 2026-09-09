import Reveal from "./Reveal";
import { aboutParagraphs } from "@/lib/data";

export default function About() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                ✦ 04 — Sobre mí
              </p>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Cuéntame tu problema,{" "}
                <span className="italic text-gradient">yo construyo la solución.</span>
              </h2>

              <div className="relative mt-12 hidden max-w-sm lg:block">
                <div className="bg-noise absolute inset-0 opacity-[0.06]" aria-hidden="true" />
                <div className="relative aspect-[4/5] border border-line bg-surface/60">
                  <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    KM — 001
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="stroke-primary font-display text-[9rem] leading-none">
                      KM
                    </span>
                  </div>
                  <span className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                    Bogotá · Ingeniera en formación
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 70}>
                <p
                  className={`${
                    p.lead
                      ? "font-display text-2xl font-medium leading-snug text-ink md:text-3xl"
                      : "mt-5 border-l border-line pl-5 text-base leading-relaxed text-muted md:text-lg"
                  }`}
                >
                  {p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}