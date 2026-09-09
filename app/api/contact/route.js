import { insertMessage } from "@/lib/supabase";
import { sendContactEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const data = await request.json();
    const name = typeof data?.name === "string" ? data.name.trim() : "";
    const email = typeof data?.email === "string" ? data.email.trim() : "";
    const projectType = typeof data?.type === "string" ? data.type.trim() : "";
    const message = typeof data?.message === "string" ? data.message.trim() : "";

    if (!name || !email || !projectType || !message) {
      return Response.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    let stored = false;
    try {
      await insertMessage({
        name,
        email,
        project_type: projectType,
        message,
        created_at: new Date().toISOString(),
      });
      stored = true;
    } catch (err) {
      console.error("Error al guardar en Supabase:", err);
    }

    try {
      await sendContactEmail({ name, email, projectType, message });
    } catch (err) {
      console.error("Error al enviar email:", err);
    }

    if (!stored) {
      return Response.json(
        { error: "No se pudo guardar el mensaje. Intenta más tarde." },
        { status: 500 }
      );
    }

    return Response.json(
      { success: "¡Mensaje guardado correctamente!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error en /api/contact:", err);
    return Response.json(
      { error: "Error interno del servidor al procesar tu solicitud." },
      { status: 500 }
    );
  }
}