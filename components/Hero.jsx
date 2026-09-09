"use client";

import { useEffect, useRef, useState } from "react";
import { contactInfo, heroStats } from "@/lib/data";

const phrases = [
  "soluciones digitales",
  "apps inteligentes",
  "automatización",
  "experiencias web",
  "proyectos con IA",
];

function useCountUp(target, start, duration = 1500) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(start + (target - start) * eased);
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, start, duration]);
  return ref;
}

function Stat({ value, label }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const isNumeric = Boolean(match);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const ref = useCountUp(target, 0, 1500);

  return (
    <div className="flex flex-col items-center gap-1 px-4">
      <span className="font-display text-2xl font-bold text-ink sm:text-4xl">
        {isNumeric ? (
          <span ref={ref}>0{suffix}</span>
        ) : (
          value
        )}
      </span>
      <span className="text-xs uppercase tracking-widest text-muted sm:text-sm">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [text, setText] = useState("");
  const [badgeVisible, setBadgeVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBadgeVisible(true), 300);
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
        timer = setTimeout(tick, 28);
      } else {
        charIndex++;
        setText(current.slice(0, charIndex));
        timer = setTimeout(tick, 62);
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

    const start = setTimeout(tick, 600);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 md:pt-28"
    >
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="orb left-[-120px] top-[10%] h-72 w-72 bg-cyan-500/30" aria-hidden="true" />
      <div className="orb right-[-100px] bottom-[5%] h-80 w-80 bg-violet-500/30" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <span
            className={`inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-1.5 text-sm font-medium text-muted transition-all duration-700 ${
              badgeVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
            Disponible para proyectos
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Transformo ideas en{" "}
            <span className="text-gradient">{text}</span>
            <span className="ml-0.5 inline-block w-[3px] animate-pulse bg-primary align-baseline" aria-hidden="true" />
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Soy desarrolladora full-stack especializada en desarrollo web,
            aplicaciones, automatización de procesos e Inteligencia Artificial.
            Creo herramientas que generan resultados reales para tu negocio.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 font-semibold text-bg shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]"
            >
              Agenda una consultoría
            </a>
            <a
              href="#proyectos"
              className="rounded-full border border-line-strong bg-card px-7 py-3.5 font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Ver mis proyectos
            </a>
          </div>

          <div className="mt-12 flex max-w-md items-center gap-2 divide-x divide-line">
            {heroStats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        <div className="hidden justify-center lg:flex">
          <div className="glass animate-float relative w-[300px] rounded-3xl p-8 text-center">
            <div className="orb inset-[-40px] m-auto h-40 w-40 bg-gradient-to-br from-cyan-500/40 to-violet-500/40" aria-hidden="true" />
            <div className="relative">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-3xl font-bold text-bg shadow-2xl shadow-primary/30">
                KM
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">Karen Méndez</h3>
              <p className="mt-1 text-sm text-muted">Desarrolladora Full-Stack</p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
                <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" /> Disponible
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <a
                  href="https://github.com/karen11m"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  GitHub
                </a>
                <a
                  href={`https://wa.me/${contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}