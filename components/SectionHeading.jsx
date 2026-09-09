import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
      {eyebrow && (
        <span className="mb-3 inline-block rounded-full border border-line bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}