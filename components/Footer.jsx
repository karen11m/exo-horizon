import { contactInfo, socialLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-surface/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-5 py-10 md:px-8 lg:flex-row lg:justify-between">
        <a href="#inicio" className="font-display text-2xl font-bold">
          K<span className="text-gradient">M</span>
          <span className="ml-1 text-sm font-medium text-muted">.dev</span>
        </a>

        <div className="flex items-center gap-6">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {s.label}
            </a>
          ))}
        </div>

        <p className="text-sm text-muted">
          Hecho con <span aria-hidden="true">💜</span> desde {contactInfo.location}
        </p>
      </div>
      <div className="border-t border-line/60 py-4 text-center">
        <p className="text-xs text-muted/80">
          © {year} Karen Méndez. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}