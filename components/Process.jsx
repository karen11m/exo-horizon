import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { processSteps } from "@/lib/data";

export default function Process() {
  return (
    <section id="proceso" className="relative bg-surface/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Proceso"
          title="Mi proceso de trabajo"
          subtitle="De la idea a la realidad en cuatro pasos claros"
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 90} className="h-full">
              <div className="glass card-hover relative h-full overflow-hidden rounded-2xl p-6 pt-10">
                <span className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-black text-white/5">
                  {step.num}
                </span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg font-display text-sm font-bold text-bg">
                  <span className="bg-gradient-to-br from-primary to-secondary rounded-lg px-2 py-1">
                    {step.num}
                  </span>
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}