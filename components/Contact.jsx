"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { contactInfo } from "@/lib/data";

const initialForm = {
  name: "",
  email: "",
  type: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = (values = form) => {
    const next = {};
    if (!values.name.trim()) next.name = "Este campo es requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = "Ingresa un email válido";
    if (!values.type) next.type = "Selecciona una opción";
    if (!values.message.trim()) next.message = "Cuéntame sobre tu proyecto";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error en el servidor");
      setStatus({ ok: true, message: "¡Mensaje enviado! Te responderé pronto." });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        ok: false,
        message: "No se pudo enviar. Escríbeme por WhatsApp o intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full border bg-card px-4 py-3.5 font-mono text-sm text-ink placeholder:font-sans placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-1 ${
      hasError
        ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/40"
        : "border-line focus:border-primary focus:ring-primary/40"
    }`;

  const labelClass = "mb-2 block font-mono text-[11px] uppercase tracking-[0.25em]";

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
            ✦ 05 — Contacto
          </p>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Hablemos de <span className="italic text-gradient">tu proyecto</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Cuéntame el problema que quieres resolver. Te respondo con una
            propuesta y un plan claro. Sin compromiso.
          </p>

          <div className="mt-10 space-y-3 border-t border-line pt-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-primary">→</span>
              <a
                href={`mailto:${contactInfo.email}`}
                className="font-mono text-sm text-muted transition-colors hover:text-primary"
              >
                {contactInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-primary">→</span>
              <span className="font-mono text-sm text-muted">{contactInfo.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-primary">→</span>
              <span className="font-mono text-sm text-muted">{contactInfo.timezone}</span>
            </div>
          </div>

          <a
            href={`https://wa.me/${contactInfo.whatsapp}?text=${contactInfo.whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 border border-line-strong px-7 py-4 font-mono text-sm uppercase tracking-[0.15em] text-ink transition-colors hover:border-emerald-400 hover:text-emerald-300"
          >
            <span aria-hidden="true">✆</span> WhatsApp directo
          </a>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="border border-line bg-surface/50 p-6 md:p-10"
            noValidate
          >
            <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
                Nuevo mensaje
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                KM / 026
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="name" className={`${labelClass} text-muted`}>
                  Tu nombre <span className="text-primary">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ej. Juan Pérez"
                  autoComplete="name"
                  className={inputClass(errors.name)}
                />
                {errors.name && (
                  <p className="mt-1 font-mono text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={`${labelClass} text-muted`}>
                  Tu email <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  autoComplete="email"
                  className={inputClass(errors.email)}
                />
                {errors.email && (
                  <p className="mt-1 font-mono text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="type" className={`${labelClass} text-muted`}>
                  Tipo de proyecto <span className="text-primary">*</span>
                </label>
                <select
                  id="type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className={inputClass(errors.type)}
                >
                  <option value="" disabled>
                    Selecciona una opción...
                  </option>
                  <option value="web">Desarrollo Web (Landing, web corporativa)</option>
                  <option value="app">Aplicación Móvil / PWA</option>
                  <option value="automation">Automatización (Scripts, integraciones)</option>
                  <option value="ai">Proyecto con IA (Chatbots, análisis)</option>
                  <option value="other">Otro / No estoy seguro</option>
                </select>
                {errors.type && (
                  <p className="mt-1 font-mono text-xs text-red-400">{errors.type}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className={`${labelClass} text-muted`}>
                  El problema o tu necesidad <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Actualmente dedico muchas horas a..."
                  className={inputClass(errors.message)}
                />
                {errors.message && (
                  <p className="mt-1 font-mono text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 font-mono text-sm font-bold uppercase tracking-[0.2em] text-bg transition-colors hover:bg-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Enviando…" : "Enviar mensaje"}
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>

              {status && (
                <p
                  role="status"
                  className={`flex items-center gap-2 px-4 py-3 font-mono text-xs ${
                    status.ok
                      ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border border-red-400/30 bg-red-400/10 text-red-300"
                  }`}
                >
                  {status.ok ? "✓" : "✕"} {status.message}
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}