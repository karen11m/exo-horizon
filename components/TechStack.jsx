import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { techStack } from "@/lib/data";

export default function TechStack() {
  return (
    <section id="tech" className="relative py-20 md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Stack tecnológico"
          title="Mi stack"
          subtitle="Las herramientas con las que construyo tus soluciones"
        />

        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech, i) => (
            <Reveal key={tech.name} delay={i * 50}>
              <div className="glass card-hover flex items-center gap-3 rounded-full px-5 py-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: tech.color }}
                  aria-hidden="true"
                />
                <span className="font-display text-sm font-semibold">{tech.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}