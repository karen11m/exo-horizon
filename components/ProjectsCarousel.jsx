"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GAP = 16;

export default function ProjectsCarousel({ projects = [] }) {
  const trackRef = useRef(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 340;
    const card = track.querySelector("[data-card]");
    if (!card) return 340;
    return card.getBoundingClientRect().width + GAP;
  }, []);

  const updateIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const w = step();
    const total = Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / w));
    const i = Math.min(Math.round(track.scrollLeft / w), total);
    setIndex(i);
    setMaxIndex(total);
  }, [step]);

  useEffect(() => {
    updateIndex();
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", updateIndex, { passive: true });
    window.addEventListener("resize", updateIndex);
    return () => {
      track.removeEventListener("scroll", updateIndex);
      window.removeEventListener("resize", updateIndex);
    };
  }, [updateIndex]);

  const scrollToCard = useCallback(
    (i) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: i * step(), behavior: "smooth" });
    },
    [step]
  );

  const advance = useCallback(
    (dir) => {
      if (maxIndex === 0) return;
      let target;
      if (dir > 0) target = index >= maxIndex ? 0 : index + 1;
      else target = index <= 0 ? maxIndex : index - 1;
      scrollToCard(target);
    },
    [index, maxIndex, scrollToCard]
  );

  useEffect(() => {
    if (paused || maxIndex === 0) return;
    const id = setInterval(() => advance(1), 4500);
    return () => clearInterval(id);
  }, [paused, maxIndex, advance]);

  const onPointerDown = (e) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: 0 };
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(dx));
    trackRef.current.scrollLeft = drag.current.startScroll - dx;
  };
  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <div
      className="select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          ✦ Carrusel — arrastra para explorar
        </p>
        <div className="flex items-center gap-5">
          <p className="font-mono text-xs text-muted">
            {String(index + 1).padStart(2, "0")}
            <span className="text-primary"> / </span>
            {String(maxIndex + 1).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Anterior"
              className="flex h-11 w-11 items-center justify-center border border-line-strong text-ink transition-colors hover:border-primary hover:text-primary"
              onClick={() => advance(-1)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Siguiente"
              className="flex h-11 w-11 items-center justify-center border border-line-strong text-ink transition-colors hover:border-primary hover:text-primary"
              onClick={() => advance(1)}
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="carousel-mask no-scrollbar -mx-5 flex gap-4 overflow-x-auto scroll-smooth px-5 pb-4 snap-x snap-mandatory md:-mx-8 md:px-8"
        style={{ cursor: "grab" }}
        onDragStart={(e) => e.preventDefault()}
      >
        {projects.map((project, i) => (
          <article
            key={`${project.title}-${i}`}
            data-card
            className="group relative flex w-[300px] shrink-0 snap-start flex-col overflow-hidden border border-line bg-surface/50 p-6 transition-colors hover:border-primary/50 sm:w-[360px]"
          >
            <span
              className="pointer-events-none absolute -right-4 -top-7 text-[8rem] leading-none opacity-[0.07] transition-opacity group-hover:opacity-[0.12]"
              aria-hidden="true"
            >
              {project.emoji ?? "L/N"}
            </span>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs tracking-[0.25em] text-primary">
                P.{String(i + 1).padStart(2, "0")}
              </span>
              <span className="border border-primary/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                {project.tag}
              </span>
            </div>
            <span className="mt-8 text-5xl" aria-hidden="true">
              {project.emoji ?? "L/N"}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-primary">
              {project.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {project.problem}
            </p>
            <p className="mt-5 border-l-2 border-primary pl-3 font-mono text-xs leading-relaxed text-muted">
              <span className="uppercase tracking-[0.2em] text-primary">Solución: </span>
              {project.solution}
            </p>
            <a
              href={project.link}
              target={project.link.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 border border-line-strong px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Ver caso
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </article>
        ))}
      </div>

      <div className="mt-4 h-px w-full bg-line" aria-hidden="true">
        <div
          className="h-px bg-primary transition-all duration-300"
          style={{ width: maxIndex > 0 ? `${(index / maxIndex) * 100}%` : "0%" }}
        />
      </div>
    </div>
  );
}