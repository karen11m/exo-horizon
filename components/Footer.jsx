import Link from "next/link";
import { contactInfo, socialLinks, navLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-primary font-mono text-xs font-bold text-primary">
                K/M
              </span>
              <div className="leading-none">
                <p className="font-display text-xl font-semibold">Karen Méndez</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  Desarrolladora Full-Stack
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Transformo problemas en soluciones digitales funcionales.
              Desarrollo web, apps, automatización e IA.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
              Sitio
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-primary"
                  >
                    {link.index} — {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
              Social / Contacto
            </p>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-primary"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-primary"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 md:flex-row md:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            © {year} Karen Méndez — Todos los derechos reservados
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Diseñado y construido por mí · {contactInfo.location}
          </p>
        </div>
      </div>
    </footer>
  );
}