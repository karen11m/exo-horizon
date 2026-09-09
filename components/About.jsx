import Reveal from "./Reveal";
import { aboutParagraphs } from "@/lib/data";

export default function About() {
  return (
    <section id="sobre-mi" className="relative bg-surface/40 py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div
              className="absolute -inset-4 rounded-tl-[3rem] rounded-br-[3rem] border border-line"
              aria-hidden="true"
            />
            <div className="glass flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-tl-[3rem] rounded-br-[3rem] p-8 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-3xl font-bold text-bg shadow-2xl shadow-primary/30">
                <span>KM</span>
              </div>
              <p className="text-sm text-muted">Ingeniera de Sistemas en formación</p>
              <p className="font-display text-lg font-bold">Karen Méndez</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="mb-3 inline-block rounded-full border border-line bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Sobre mí
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Cuéntame tu problema,{" "}
              <span className="text-gradient">yo construyo la solución</span>
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="leading-relaxed text-muted">
                  {p.lead ? <strong className="text-ink">{p.text}</strong> : p.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}