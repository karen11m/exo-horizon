"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectsCarousel from "./ProjectsCarousel";

function monogramFor(title) {
  const words = (title || "LN")
    .split(/[\s\u2013\u2014\u201C\u201D"-]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase());
  if (words.length === 0) return "LN";
  if (words.length === 1) return words[0] + (words[0][1] || "N");
  return words[0] + words[words.length - 1];
}

export default function ProjectsShowcase({ projects = [] }) {
  const [open, setOpen] = useState(null);

  const hasRealLink = (p) => p.github || (p.link && p.link.startsWith("http"));

  return (
    <div>
      <ProjectsCarousel projects={projects} />

      <div className="pt-20 md:pt-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
              <span>✦ 03.2</span>
              <span className="h-px w-12 bg-line-strong" aria-hidden="true" />
              <span className="text-muted">Portafolio</span>
            </div>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Todos los proyectos
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            {String(projects.length).padStart(2, "0")} casos
          </p>
        </div>

        <div className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => {
            const num = String(i + 1).padStart(2, "0");
            const isOpen = open === `${project.title}-${i}`;
            return (
              <article
                key={`${project.title}-${i}`}
                className="group relative flex flex-col bg-bg p-7 transition-colors hover:bg-surface"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs tracking-[0.25em] text-primary">
                    P.{num}
                  </span>
                  <span className="flex h-14 w-14 items-center justify-center border border-line bg-surface/60 font-display text-xl font-semibold text-primary transition-colors group-hover:border-primary/50">
                    {monogramFor(project.title)}
                  </span>
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
                  <p>
                    <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
                      Problema
                    </span>
                    {project.problem}
                  </p>
                  <div
                    className="grid transition-all duration-300"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-0.5">
                        <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                          Solución
                        </span>
                        {project.solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {hasRealLink(project) ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-line-strong px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:border-primary hover:text-primary"
                    >
                      Ver caso ↗
                    </a>
                  ) : (
                    <Link
                      href="/contacto"
                      className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-bg transition-colors hover:bg-ink"
                    >
                      Solicitar propuesta ✦
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : `${project.title}-${i}`)}
                    className="inline-flex items-center gap-2 border border-transparent px-3 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-primary"
                  >
                    {isOpen ? "Ocultar caso" : "Caso completo"}
                    <span>{isOpen ? "↑" : "↓"}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}