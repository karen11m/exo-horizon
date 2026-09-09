import PageHeader from "@/components/PageHeader";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import CtaStrip from "@/components/CtaStrip";

export const metadata = {
  title: "Servicios",
  description:
    "Desarrollo web, aplicaciones, automatización de procesos y proyectos con IA. Servicios a medida para tu negocio.",
};

const marqueeWords = [
  "Desarrollo web",
  "PWA y apps",
  "Automatización",
  "IA y chatbots",
  "Proceso claro",
];

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        index="02"
        route="servicios"
        title="Servicios"
        accent="a la medida"
        subtitle="No vendo plantillas: analizo tu problema y construyo la solución tecnológica que mejor encaja con tu negocio."
      />
      <Marquee items={marqueeWords} fast />
      <Services />
      <Process />
      <FAQ />
      <CtaStrip
        title="¿Listo para empezar?"
        accent="Contáctame."
        subtitle="Solicita la propuesta inicial gratuita y recibe un plan claro en menos de 48 horas."
      />
    </>
  );
}