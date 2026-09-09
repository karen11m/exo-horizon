import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { processSteps } from "@/lib/data";

export default function Process() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="02.1"
          eyebrow="Metodología"
          title="Cómo te entrego el resultado"
          subtitle="Un proceso claro de cuatro pasos, sin sorpresas ni tecnicismos"
        />

        <div className="relative">
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-1/2"
            aria-hidden="true"
          />
          <div className="space-y-10 md:space-y-0">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 70}>
                <div
                  className={`relative grid gap-6 pl-10 md:grid-cols-2 md:gap-16 md:pl-0 ${
                    i % 2 === 0
                      ? "md:pr-[calc(50%+3rem)]"
                      : "md:pl-[calc(50%+3rem)] md:[&>div]:text-left"
                  }`}
                >
                  <div
                    className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-primary bg-bg md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <span className="h-[7px] w-[7px] rounded-full bg-primary" />
                  </div>
                  <div className="border border-line bg-surface/50 p-6 md:p-8">
                    <span className="font-mono text-xs tracking-[0.25em] text-primary">
                      PASO {step.num}
                    </span>
                    <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}