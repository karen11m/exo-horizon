import Reveal from "./Reveal";

export default function Projects({ projects = [] }) {
  return (
    <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => {
        const num = String(i + 1).padStart(2, "0");
        return (
          <Reveal key={`${project.title}-${i}`} delay={(i % 3) * 70}>
            <article className="group relative flex h-full flex-col bg-bg p-7 transition-colors hover:bg-surface">
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs tracking-[0.25em] text-primary">
                  P.{num}
                </span>
                {project.emoji && (
                  <span
                    className="flex h-14 w-14 items-center justify-center border border-line bg-surface/60 text-3xl transition-colors group-hover:border-primary/50"
                    aria-hidden="true"
                  >
                    {project.emoji}
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="border border-primary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  {project.tag}
                </span>
                {project.github && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    GitHub ↗
                  </span>
                )}
              </div>

              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                {project.title}
              </h3>

              <div className="mt-4 flex-1 space-y-3 text-sm leading-relaxed text-muted">
                {project.problem ? (
                  <>
                    <p>
                      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
                        Problema
                      </span>
                      {project.problem}
                    </p>
                    <p>
                      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                        Solución
                      </span>
                      {project.solution}
                    </p>
                  </>
                ) : (
                  <p>{project.solution}</p>
                )}
              </div>

              <a
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="mt-7 inline-flex w-fit items-center gap-2 border border-line-strong px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:border-primary hover:text-primary"
              >
                Ver caso
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}