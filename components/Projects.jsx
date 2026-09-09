import Reveal from "./Reveal";

export default function Projects({ projects = [] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => {
        const monogram =
          project.title
            .split(/[\s"-]/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0].toUpperCase())
            .join("") || "KM";

        return (
          <Reveal key={`${project.title}-${i}`} delay={(i % 3) * 90} className="h-full">
            <article className="glass card-hover flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <span className="font-display text-4xl font-black text-gradient">
                  {monogram}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold text-primary">
                    {project.tag}
                  </span>
                  {project.github && (
                    <span className="text-xs text-muted">de GitHub</span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{project.title}</h3>
                {project.problem ? (
                  <>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      <strong className="font-semibold text-ink">Problema:</strong>{" "}
                      {project.problem}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      <strong className="font-semibold text-ink">Solución:</strong>{" "}
                      {project.solution}
                    </p>
                  </>
                ) : (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {project.solution}
                  </p>
                )}
                <a
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  Ver detalles
                </a>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}