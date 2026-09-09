"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, socialLinks } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-line bg-bg/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:h-[76px] md:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Ir al inicio"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-primary font-mono text-xs font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-bg">
              L/N
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-base font-bold tracking-tight">
                LambNex
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Estudio digital
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-underline font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                  isActive(link.href) ? "is-active text-primary" : "text-muted hover:text-ink"
                }`}
              >
                <span className="mr-1 text-[10px] text-primary/70">{link.index}</span>
                {link.label}
              </Link>
            ))}
            <Link
              href="/contacto"
              className="border border-primary px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary hover:text-bg"
            >
              Hablemos ✦
            </Link>
          </nav>

          <button
            className="flex h-10 w-10 items-center justify-center border border-line-strong text-ink lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col bg-bg lg:hidden">
          <div className="flex-1 px-5 pt-28 md:px-8">
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              — Índice
            </p>
            <nav className="flex flex-col" aria-label="Menú móvil">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-line py-5"
                >
                  <span className="font-mono text-xs text-primary">{link.index}</span>
                  <span
                    className={`font-display text-4xl font-semibold tracking-tight transition-colors sm:text-5xl ${
                      isActive(link.href) ? "text-primary" : "text-ink group-hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </span>
                  <span className="ml-auto text-muted transition-transform group-hover:translate-x-1 group-hover:text-primary">
                    →
                  </span>
                </Link>
              ))}
            </nav>
            <p className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              — Social
            </p>
            <div className="mt-4 flex flex-wrap gap-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.18em] text-muted hover:text-primary"
                >
                  {s.label} ↖
                </a>
              ))}
            </div>
          </div>
          <div className="border-t border-line px-5 py-6 md:px-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              LambNex — Bogotá, CO · 2026
            </p>
          </div>
        </div>
      )}
    </>
  );
}