import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { services } from "@/lib/data";

export default function Services() {
  return (
    <section id="servicios" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Servicios"
          title="Cómo puedo ayudarte"
          subtitle="Soluciones tecnológicas a medida que impulsan tu negocio al siguiente nivel"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 90} className="h-full">
              <article className="glass card-hover flex h-full flex-col rounded-2xl p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-gradient-to-br from-primary/15 to-secondary/15 text-2xl">
                  <span aria-hidden="true">{service.icon}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
                <p className="mt-4 rounded-lg border border-line bg-card px-3 py-2 text-xs leading-relaxed text-muted/90">
                  <strong className="font-semibold text-primary">Ejemplo:</strong>{" "}
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