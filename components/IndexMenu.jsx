import Link from "next/link";

const items = [
  { index: "02", href: "/servicios", label: "Servicios", meta: "Desarrollo · Apps · Automatización · IA" },
  { index: "03", href: "/proyectos", label: "Proyectos", meta: "Trabajos seleccionados + repos" },
  { index: "04", href: "/sobre-mi", label: "Sobre mí", meta: "Perfil · Stack · Clientes" },
  { index: "05", href: "/contacto", label: "Contacto", meta: "Propuesta gratuita" },
];

export default function IndexMenu() {
  return (
    <section className="py-20 md:py-28" aria-label="Índice de secciones">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            ✦ Índice del sitio
          </p>
          <p className="hidden font-mono text-xs uppercase tracking-[0.3em] text-muted sm:block">
            01 Home — 05 Contacto
          </p>
        </div>

        <div>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-5 border-t border-line py-5 last:border-b md:gap-10 md:py-6"
            >
              <span className="font-mono text-sm text-primary">{item.index}</span>
              <span className="font-display text-4xl font-semibold tracking-tight text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-primary sm:text-5xl md:text-6xl">
                {item.label}
              </span>
              <span className="ml-auto hidden text-sm text-muted md:block">
                {item.meta}
              </span>
              <span className="ml-auto rotate-[-45deg] text-2xl text-muted transition-all duration-300 group-hover:rotate-0 group-hover:text-primary md:ml-4">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}