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
    `w-full rounded-xl border bg-card px-4 py-3 text-ink placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-1 ${
      hasError
        ? "border-red-400/60 focus:border-red-400 focus:ring-red-400/40"
        : "border-line focus:border-primary focus:ring-primary/40"
    }`;

  return (
    <section id="contacto" className="relative bg-surface/40 py-20 md:py-28">
      <div className="orb right-[-120px] top-[10%] h-72 w-72 bg-violet-500/25" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <span className="mb-3 inline-block rounded-full border border-line bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Contacto
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Hablemos de <span className="text-gradient">tu proyecto</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Si tienes un problema en tu negocio que crees que se puede resolver con
            tecnología, escríbeme. Sin compromisos.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card text-primary" aria-hidden="true">
                ✉️
              </span>
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-muted transition-colors hover:text-primary"
              >
                {contactInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-card text-primary" aria-hidden="true">
                📍
              </span>
              <span className="text-muted">{contactInfo.location}</span>
            </div>
          </div>

          <a
            href={`https://wa.me/${contactInfo.whatsapp}?text=${contactInfo.whatsappText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-transform hover:scale-[1.03]"
          >
            📱 Escríbeme por WhatsApp
          </a>
        </Reveal>

        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            className="glass space-y-5 rounded-3xl p-6 md:p-8"
            noValidate
          >
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
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
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
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
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="type" className="mb-2 block text-sm font-medium">
                Tipo de proyecto <span className="text-primary">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={form.type}
                onChange={handleChange}
                className={`${inputClass(errors.type)} appearance-none`}
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
                <p className="mt-1 text-xs text-red-400">{errors.type}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Cuéntame el problema o tu necesidad <span className="text-primary">*</span>
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
                <p className="mt-1 text-xs text-red-400">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-primary to-secondary py-3.5 font-semibold text-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar mensaje 🚀"}
            </button>

            {status && (
              <p
                role="status"
                className={`rounded-lg px-4 py-3 text-sm ${
                  status.ok
                    ? "border border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border border-red-400/30 bg-red-400/10 text-red-300"
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}