import PageHeader from "@/components/PageHeader";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Contacto",
  description:
    "Escríbeme para hablar de tu proyecto. Consultoría gratuita sin compromiso.",
};

const marqueeWords = [
  "Respuesta en 24h",
  "Sin compromiso",
  "WhatsApp directo",
  "Propuesta gratuita",
];

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        index="05"
        route="contacto"
        title="Hablemos de"
        accent="tu proyecto"
        subtitle="El primer paso es gratis: cuéntame el problema y recibe una propuesta de solución clara."
      />
      <Marquee items={marqueeWords} fast />
      <Contact />
    </>
  );
}