import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { techStack } from "@/lib/data";

export default function TechStack() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="04.1"
          eyebrow="Stack tecnológico"
          title="Caja de herramientas"
          subtitle="Tecnologías con las que construyo tus soluciones, elegidas según el problema"
        />

        <div className="flex flex-wrap gap-3">
          {techStack.map((tech, i) => (
            <Reveal key={tech.name} delay={i * 45}>
              <span
                className="group inline-flex items-center gap-3 border border-line bg-surface/50 px-5 py-3 transition-colors hover:border-primary/60"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: tech.color }}
                  aria-hidden="true"
                />
                <span className="font-mono text-sm font-medium">{tech.name}</span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}