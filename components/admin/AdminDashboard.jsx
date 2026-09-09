"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const typeLabels = {
  web: "Desarrollo Web",
  app: "Aplicación",
  automation: "Automatización",
  ai: "IA",
  other: "Otro",
};

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Cargando...");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/messages?t=${Date.now()}`, { cache: "no-store" });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      if (!res.ok) throw new Error("Error al cargar mensajes");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
      setStatus("En vivo");
      setError("");
    } catch (err) {
      setStatus("Error");
      setError(err.message);
    }
  }, [router]);

  useEffect(() => {
    const initial = setTimeout(load, 0);
    const id = setInterval(load, 15000);
    return () => {
      clearTimeout(initial);
      clearInterval(id);
    };
  }, [load]);

  const logout = async () => {
    await fetch("/api/admin-logout", { method: "POST" });
    router.refresh();
  };

  const filtered = useMemo(
    () => (filter === "all" ? messages : messages.filter((m) => m.project_type === filter)),
    [messages, filter]
  );

  const byType = useMemo(() => {
    const counts = {};
    messages.forEach((m) => {
      counts[m.project_type] = (counts[m.project_type] || 0) + 1;
    });
    return counts;
  }, [messages]);

  const types = Object.keys(typeLabels).filter((t) => byType[t]);

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Panel de Mensajes</h1>
          <p className="mt-1 text-sm text-muted">
            Administra los mensajes de tus clientes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm">
            <span
              className={`h-2 w-2 rounded-full ${
                status === "En vivo" ? "bg-emerald-400" : "bg-amber-400"
              }`}
            />
            {status}
          </span>
          <button
            onClick={logout}
            className="rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-muted transition-colors hover:border-red-400/60 hover:text-red-300"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass rounded-2xl p-5 text-center">
          <p className="font-display text-3xl font-bold text-primary">{messages.length}</p>
          <p className="mt-1 text-xs uppercase tracking-widest text-muted">Mensajes totales</p>
        </div>
        {types.map((t) => (
          <div key={t} className="glass rounded-2xl p-5 text-center">
            <p className="font-display text-3xl font-bold text-secondary">{byType[t]}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">{typeLabels[t]}</p>
          </div>
        ))}
      </div>

      <div className="glass overflow-hidden rounded-3xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
          <h2 className="font-display text-lg font-bold">Mensajes</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-line bg-card px-3 py-2 text-sm text-ink outline-none focus:border-primary"
          >
            <option value="all">Todos los tipos</option>
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
                <th className="px-6 py-4 font-semibold">Nombre</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Tipo</th>
                <th className="px-6 py-4 font-semibold">Mensaje</th>
                <th className="px-6 py-4 font-semibold">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-14 text-center text-muted">
                    {error || "Aún no hay mensajes."}
                  </td>
                </tr>
              ) : (
                filtered.map((m, i) => (
                  <tr
                    key={m.id || `${m.email}-${i}`}
                    className="border-b border-line/60 last:border-0"
                  >
                    <td className="px-6 py-4 font-semibold">{m.name}</td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${m.email}`}
                        className="text-muted transition-colors hover:text-primary"
                      >
                        {m.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {typeLabels[m.project_type] || m.project_type}
                      </span>
                    </td>
                    <td className="max-w-xs px-6 py-4 leading-relaxed text-muted">
                      {m.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-muted">
                      {formatDate(m.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}