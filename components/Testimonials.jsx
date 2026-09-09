"use client";

import { useEffect, useState, useCallback } from "react";
import Reveal from "./Reveal";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((next) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(((next % testimonials.length) + testimonials.length) % testimonials.length);
      setVisible(true);
    }, 160);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(id);
  }, [current, paused, goTo]);

  const t = testimonials[current];

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="mb-10 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
            <span>✦ 04.2</span>
            <span className="h-px w-12 bg-line-strong" aria-hidden="true" />
            <span className="text-muted">Clientes reales</span>
          </div>
        </Reveal>

        <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal>
            <figure
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <span className="font-display text-7xl leading-none text-primary/40" aria-hidden="true">
                “
              </span>
              <blockquote
                className="max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-ink transition-opacity duration-200 sm:text-3xl md:text-4xl"
                style={{ opacity: visible ? 1 : 0 }}
              >
                {t.text}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center border border-primary font-display text-sm font-semibold text-primary">
                  {t.avatar}
                </span>
                <span>
                  <span className="block font-display font-semibold">{t.name}</span>
                  <span className="block font-mono text-xs uppercase tracking-[0.2em] text-muted">
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex items-center gap-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                {String(current + 1).padStart(2, "0")}
                <span className="text-primary">/</span>
                {String(testimonials.length).padStart(2, "0")}
              </p>
              <div className="flex gap-2">
                <button
                  aria-label="Testimonio anterior"
                  className="flex h-11 w-11 items-center justify-center border border-line-strong text-ink transition-colors hover:border-primary hover:text-primary"
                  onClick={() => goTo(current - 1)}
                >
                  ←
                </button>
                <button
                  aria-label="Siguiente testimonio"
                  className="flex h-11 w-11 items-center justify-center border border-line-strong text-ink transition-colors hover:border-primary hover:text-primary"
                  onClick={() => goTo(current + 1)}
                >
                  →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}