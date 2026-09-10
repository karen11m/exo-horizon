"use client";

import { useCallback, useEffect, useState } from "react";

const INTERVAL = 5000;

function monogramFor(title) {
  const words = (title || "LN")
    .split(/[\s\u2013\u2014\u201C\u201D"-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase());
  if (words.length === 0) return "LN";
  if (words.length === 1) return words[0] + (words[0][1] || "N");
  return words[0] + words[words.length - 1];
}

export default function ProjectsCarousel({ projects = [] }) {
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
  const monogram = monogramFor(project.title);
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Controles superiores */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em]">
          <span
            className={`h-2 w-2 rounded-full ${paused ? "bg-muted" : "animate-pulse bg-primary"}`}
            aria-hidden="true"
          />
          <span className="text-primary">Auto</span>
          <span className="text-muted">{paused ? "· en pausa" : "· rotación 5s"}</span>
        </p>
        <div className="flex items-center gap-4">
          <p className="font-mono text-xs text-muted">
            {String(current + 1).padStart(2, "0")}
            <span className="text-primary"> / </span>
            {String(total).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Detener o reanudar"
              className="flex h-9 items-center gap-2 border border-line-strong px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:border-primary hover:text-primary"
              onClick={() => setPaused((p) => !p)}
            >
              {paused ? "▶" : "❚❚"}
            </button>
            <button
              type="button"
              aria-label="Anterior"
              className="flex h-9 w-9 items-center justify-center border border-line-strong text-ink transition-colors hover:border-primary hover:text-primary"
              onClick={prev}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              className="flex h-9 w-9 items-center justify-center border border-line-strong text-ink transition-colors hover:border-primary hover:text-primary"
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

          <div key={current} className="animate-slide-in relative p-6 md:p-8 lg:p-10">
            <span
              className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[6rem] leading-none text-line-strong md:text-[9rem]"
              aria-hidden="true"
            >
              {monogram}
            </span>

            <div className="relative flex flex-wrap items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center border border-primary font-display text-base font-semibold text-primary md:h-14 md:w-14 md:text-lg">
                {monogram}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                Caso {String(current + 1).padStart(2, "0")}
              </span>
              <span className="border border-primary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                {project.tag}
              </span>
            </div>

            <h3 className="relative mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              {project.title}
            </h3>

            <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
                Problema
              </span>
              {project.problem}
            </p>

            <div
              className="relative grid transition-all duration-500"
              style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="mt-3 max-w-2xl border-l-2 border-primary pl-4 text-sm leading-relaxed text-muted">
                  <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                    Solución
                  </span>
                  {project.solution}
                </p>
              </div>
            </div>

            <div className="relative mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setExpanded((e) => !e)}
                className="group inline-flex items-center gap-3 bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-bg transition-colors hover:bg-ink"
              >
                {expanded ? "Ocultar solución" : "Ver solución"}
                <span className="transition-transform group-hover:translate-y-0.5">
                  {expanded ? "↑" : "↓"}
                </span>
              </button>
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