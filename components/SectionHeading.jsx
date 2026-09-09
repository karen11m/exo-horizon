import Reveal from "./Reveal";

export default function SectionHeading({ index, eyebrow, title, subtitle }) {
  return (
    <Reveal className="mb-12 max-w-3xl md:mb-16">
      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-[0.25em] text-primary">
        <span>✦ {index}</span>
        <span className="h-px w-12 bg-line-strong" aria-hidden="true" />
        <span className="text-muted">{eyebrow}</span>
      </div>
      <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}