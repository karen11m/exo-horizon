import Link from "next/link";

export default function FeaturedWorks({ projects = [] }) {
  const featured = projects.slice(0, 3);
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              ✦ Trabajos seleccionados
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Casos <span className="italic text-gradient">recientes</span>
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="group hidden shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-primary sm:flex"
          >
            Ver todos
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div>
          {featured.map((project, i) => (
            <article
              key={`${project.title}-${i}`}
              className="group grid gap-2 border-t border-line py-7 transition-colors md:grid-cols-[64px_1fr_auto] md:items-baseline md:gap-8 md:py-9"
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-primary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    {project.tag}
                  </span>
                  {project.github && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                      GitHub ↗
                    </span>
                  )}
                </div>
                <h3 className="mt-3 flex items-center gap-3 font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-primary md:text-4xl">
                  {project.emoji && (
                    <span className="text-2xl" aria-hidden="true">
                      {project.emoji}
                    </span>
                  )}
                  {project.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                  {project.solution}
                </p>
              </div>
              <div className="md:text-right">
                <span className="text-xl text-muted transition-all duration-300 group-hover:-rotate-45 group-hover:text-primary">
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex sm:hidden">
          <Link
            href="/proyectos"
            className="border border-line-strong px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:border-primary hover:text-primary"
          >
            Ver todos los proyectos →
          </Link>
        </div>
      </div>
    </section>
  );
}