import nodemailer from "nodemailer";

export function emailConfigured() {
  return Boolean(process.env.EMAIL_SENDER && process.env.EMAIL_PASSWORD);
}

export async function sendContactEmail({ name, email, projectType, message }) {
  if (!emailConfigured()) return false;

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_SMTP_PORT || 465),
    secure: Number(process.env.EMAIL_SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Karen Méndez — Portafolio" <${process.env.EMAIL_SENDER}>`,
    to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_SENDER,
    subject: `Nuevo mensaje de portafolio: ${projectType}`,
    text: `Nuevo mensaje de contacto\n\nNombre: ${name}\nEmail: ${email}\nTipo de proyecto: ${projectType}\nMensaje:\n${message}`,
  });

  return true;
}