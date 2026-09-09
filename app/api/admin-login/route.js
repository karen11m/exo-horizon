import { verifyAdminPassword, createSession } from "@/lib/auth";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }
  const password = typeof body?.password === "string" ? body.password : "";

  if (!(await verifyAdminPassword(password))) {
    return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  await createSession();
  return Response.json({ success: true });
}