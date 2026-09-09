"use client";

import { useCallback, useEffect, useState } from "react";

const INTERVAL = 6000;

export default function ProjectsCarousel({ projects = [], onSelectTag }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const total = projects.length;

  const goTo = useCallback(
    (i) => {
      setCurrent(((i % total) + total) % total);
      setExpanded(false);
    },
    [total]
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
      setExpanded(false);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [paused, total]);

  if (total === 0) return null;

  const project = projects[current];
  const monogram =
    (project.title || "LN")
      .split(/[\s\u2013-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("") || "LN";

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Controles superiores */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]">
          <span
            className={`h-2 w-2 rounded-full ${paused ? "bg-muted" : "animate-pulse bg-primary"}`}
            aria-hidden="true"
          />
          <span className="text-primary">Auto</span>
          <span className="text-muted">{paused ? "· en pausa" : "· rotación 6s"}</span>
        </p>
        <div className="flex items-center gap-5">
          <p className="font-mono text-xs text-muted">
            {String(current + 1).padStart(2, "0")}
            <span className="text-primary"> / </span>
            {String(total).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Detener o reanudar"
              className="flex h-11 items-center gap-2 border border-line-strong px-4 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:border-primary hover:text-primary"
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? "▶" : "❚❚"}
            </button>
            <button
              type="button"
              aria-label="Anterior"
              className="flex h-11 w-11 items-center justify-center border border-line-strong text-ink transition-colors hover:border-primary hover:text-primary"
              onClick={prev}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              className="flex h-11 w-11 items-center justify-center border border-line-strong text-ink transition-colors hover:border-primary hover:text-primary"
              onClick={next}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Ventana del slide */}
      <div className="carousel-mask -mx-5 px-5 md:-mx-8 md:px-8" aria-live="polite">
        <div className="relative overflow-hidden border border-line bg-surface/50">
          <div className="bg-noise absolute inset-0 opacity-[0.05]" aria-hidden="true" />

          <div key={current} className="animate-slide-in relative grid gap-8 p-7 md:p-12 lg:grid-cols-[auto_1fr]">
            <span
              className="pointer-events-none absolute -right-6 -top-10 select-none font-display text-[11rem] leading-none text-line-strong md:text-[16rem]"
              aria-hidden="true"
            >
              {monogram}
            </span>

            <div className="relative flex flex-col items-start justify-between gap-8 lg:items-center lg:flex-row lg:gap-0">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center border border-primary font-display text-3xl font-semibold text-primary md:h-32 md:w-32 md:text-4xl">
                {monogram}
              </div>
              <div className="flex h-full items-stretch gap-3 lg:flex-col lg:border-l lg:border-line lg:pl-6">
                <div className="flex flex-col justify-center gap-1 border-l border-line pl-6 lg:pl-0 lg:border-l-0">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                    Concepto {String(current + 1).padStart(2, "0")}
                  </span>
                  <span className="border border-primary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    {project.tag}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <h3 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {project.title}
              </h3>
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted md:text-lg">
                <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
                  Problema
                </span>
                {project.problem}
              </p>
              <div
                className="grid transition-all duration-500"
                style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="mt-4 max-w-2xl border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted md:text-base">
                    <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                      Solución
                    </span>
                    {project.solution}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setExpanded((e) => !e)}
                  className="group inline-flex items-center gap-3 bg-primary px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-[0.15em] text-bg transition-colors hover:bg-ink"
                >
                  {expanded ? "Ocultar solución" : "Ver solución"}
                  <span className="transition-transform group-hover:translate-y-0.5">
                    {expanded ? "↑" : "↓"}
                  </span>
                </button>
                {onSelectTag && (
                  <button
                    type="button"
                    onClick={() => onSelectTag(project.tag)}
                    className="border border-line-strong px-7 py-3.5 font-mono text-sm uppercase tracking-[0.15em] text-ink transition-colors hover:border-primary hover:text-primary"
                  >
                    Ver «{project.tag}»
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progreso */}
      <div className="mt-4 flex items-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a caso ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 flex-1 transition-all duration-300 ${
              i === current ? "bg-primary" : "bg-line hover:bg-line-strong"
            }`}
          />
        ))}
      </div>
    </div>
  );
}