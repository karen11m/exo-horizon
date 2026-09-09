export default function Marquee({ items = [], fast = false, className = "" }) {
  const words = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-y border-line bg-surface/60 ${className}`}
    >
      <div
        className={`flex w-max items-center whitespace-nowrap py-3 ${
          fast ? "animate-marquee-fast" : "animate-marquee"
        }`}
      >
        {words.map((word, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
              {word}
            </span>
            <span className="mx-6 text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}