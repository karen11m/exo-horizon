import { isAuthenticated } from "@/lib/auth";
import { fetchMessages } from "@/lib/supabase";

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const messages = await fetchMessages();
    return Response.json(messages);
  } catch (err) {
    console.error("Error al cargar mensajes:", err);
    return Response.json({ error: "Error al obtener mensajes" }, { status: 500 });
  }
}