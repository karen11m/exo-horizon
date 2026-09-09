"use client";

import { useEffect, useState, useCallback } from "react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next) => {
      setVisible(false);
      setTimeout(() => {
        setCurrent(next);
        setVisible(true);
      }, 220);
    },
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      goTo((current + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(id);
  }, [current, paused, goTo]);

  const t = testimonials[current];

  return (
    <section id="testimonios" className="relative bg-surface/40 py-20 md:py-28">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Testimonios"
          title="Lo que dicen mis clientes"
          subtitle="Resultados reales de personas reales"
        />

        <Reveal>
          <figure
            className="glass rounded-2xl p-8 text-center md:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 h-8 w-8 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <blockquote
              className="min-h-[7.5rem] text-lg leading-relaxed text-ink transition-opacity duration-200"
              style={{ opacity: visible ? 1 : 0 }}
            >
              &ldquo;{t.text}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-sm font-bold text-bg">
                {t.avatar}
              </span>
              <span className="text-left">
                <span className="block font-display font-bold">{t.name}</span>
                <span className="block text-sm text-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.name}
              aria-label={`Ver testimonio de ${item.name}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-gradient-to-r from-primary to-secondary"
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}