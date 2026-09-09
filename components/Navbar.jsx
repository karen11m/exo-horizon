"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const ids = ["#inicio", ...navLinks.map((l) => l.href)];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { threshold: 0.35, rootMargin: "-30% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between px-5 md:px-8">
        <a
          href="#inicio"
          onClick={close}
          className="font-display text-2xl font-bold tracking-tight"
          aria-label="Ir al inicio"
        >
          K<span className="text-gradient">M</span>
          <span className="ml-1 text-sm font-medium text-muted">.dev</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active === link.href
                  ? "text-primary"
                  : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
              {active === link.href && (
                <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-primary to-secondary" />
              )}
            </a>
          ))}
          <a
            href="#contacto"
            className="ml-3 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
            Contacto
          </a>
        </nav>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-line bg-bg/95 px-5 pb-6 pt-2 backdrop-blur-xl md:hidden"
          aria-label="Menú móvil"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className={`block rounded-lg px-3 py-3 text-base font-medium ${
                active === link.href ? "text-primary" : "text-muted"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={close}
            className="mt-3 block rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-3 text-center font-semibold text-bg"
          >
            Contacto
          </a>
        </nav>
      )}
    </header>
  );
}