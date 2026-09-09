import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="02"
          eyebrow="Servicios"
          title="Qué puedo hacer por ti"
          subtitle="Cuatro frentes donde convierto tecnología en resultados medibles"
        />

        <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 80} className="bg-bg">
              <article className="group relative flex h-full flex-col bg-bg p-7 transition-colors hover:bg-surface md:p-9">
                <span className="pointer-events-none absolute right-5 top-4 font-display text-6xl font-semibold text-line-strong transition-colors group-hover:text-primary/20 md:text-7xl">
                  0{i + 1}
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                    SRV.0{i + 1}
                  </span>
                  <span className="text-2xl" aria-hidden="true">
                    {service.icon}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted md:text-base">
                  {service.description}
                </p>
                <p className="mt-6 border-l-2 border-primary pl-4 font-mono text-xs leading-relaxed text-muted">
                  <span className="uppercase tracking-[0.2em] text-primary">Ejemplo: </span>
                  {service.example}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}