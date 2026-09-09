"use client";

import { useEffect, useState } from "react";

const phrases = [
  "soluciones digitales",
  "apps inteligentes",
  "automatización",
  "experiencias web",
  "proyectos con IA",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const tick = () => {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        charIndex--;
        setText(current.slice(0, charIndex));
        timer = setTimeout(tick, 24);
      } else {
        charIndex++;
        setText(current.slice(0, charIndex));
        timer = setTimeout(tick, 58);
      }
      if (!isDeleting && charIndex === current.length) {
        clearTimeout(timer);
        setTimeout(() => {
          isDeleting = true;
          tick();
        }, 1500);
        return;
      }
      if (isDeleting && charIndex === 0) {
        clearTimeout(timer);
        phraseIndex = (phraseIndex + 1) % phrases.length;
        isDeleting = false;
        setTimeout(tick, 350);
        return;
      }
    };

    const start = setTimeout(tick, 500);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-16 md:pt-32">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div
            className={`flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-700 ${
              ready ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 text-muted">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
              Disponible para proyectos
            </span>
            <span className="hidden text-muted/60 sm:inline">✦</span>
            <span className="text-muted/70">Bogotá, CO — GMT-5</span>
          </div>

          <h1 className="mt-8 font-display text-[13vw] font-semibold leading-[1.02] tracking-tight sm:text-7xl md:text-8xl lg:text-[6.5rem]">
            Transformo
            <br />
            problemas en{" "}
            <span className="italic text-gradient">soluciones</span>
            <br />
            <span className="font-normal text-primary">{text}</span>
            <span className="ml-1 inline-block h-[0.9em] w-[0.05em] translate-y-2 animate-pulse bg-primary align-baseline" aria-hidden="true" />
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Soy Karen Méndez, desarrolladora full-stack. Creo herramientas
            funcionales — no solo páginas bonitas — para que tu negocio venda
            más y trabaje en automático.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="/contacto"
              className="group inline-flex items-center gap-3 bg-primary px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.15em] text-bg transition-colors hover:bg-ink"
            >
              Agenda una consultoría
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="/proyectos"
              className="inline-flex items-center gap-3 border border-line-strong px-8 py-4 font-mono text-sm uppercase tracking-[0.15em] text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Ver proyectos
            </a>
          </div>

          <div className="mt-14 flex max-w-md flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-6">
            <div>
              <span className="font-display text-3xl font-semibold">20<span className="text-primary">+</span></span>
              <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Proyectos</span>
            </div>
            <div>
              <span className="font-display text-3xl font-semibold">100<span className="text-primary">%</span></span>
              <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Remoto</span>
            </div>
            <div>
              <span className="font-display text-3xl font-semibold">24<span className="text-primary">/7</span></span>
              <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Soporte</span>
            </div>
          </div>
        </div>

        <div className="relative hidden justify-center lg:flex">
          <p className="v-label absolute -left-3 top-0 h-full font-mono text-[10px] uppercase tracking-[0.35em] text-muted/70">
            Full-Stack — Estudio 001
          </p>
          <div className="relative">
            <svg
              aria-hidden="true"
              className="animate-spin-slow h-72 w-72 text-primary/80"
              viewBox="0 0 100 100"
            >
              <defs>
                <path id="hero-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
              </defs>
              <text style={{ fontSize: "8.5px", letterSpacing: "2.2px" }} fill="currentColor" fontFamily="var(--font-jetbrains)">
                <textPath href="#hero-circle">
                  DESARROLLO WEB • AUTOMATIZACIÓN • IA • “CREO HERRAMIENTAS QUE FUNCIONAN” •
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-8 flex flex-col items-center justify-center gap-2 border border-line bg-surface/70 backdrop-blur">
              <span className="font-display text-6xl font-semibold">KM</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                Karen Méndez
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}