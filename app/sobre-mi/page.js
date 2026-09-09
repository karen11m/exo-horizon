import PageHeader from "@/components/PageHeader";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import CtaStrip from "@/components/CtaStrip";

export const metadata = {
  title: "Sobre mí",
  description:
    "Karen Méndez, desarrolladora full-stack desde Bogotá, Colombia. Perfil, stack tecnológico y testimonios de clientes.",
};

const marqueeWords = [
  "Ingeniera en formación",
  "Full-Stack",
  "100% remoto",
  "Bogotá, CO",
  "Solucionadora de problemas",
];

export default function SobreMiPage() {
  return (
    <>
      <PageHeader
        index="04"
        route="sobre-mi"
        title="Sobre"
        accent="mí"
        subtitle="La persona detrás del código: cómo trabajo, qué me apasiona y qué dicen quienes han trabajado conmigo."
      />
      <Marquee items={marqueeWords} fast />
      <About />
      <TechStack />
      <Testimonials />
      <CtaStrip
        title="Trabajemos"
        accent="en equipo."
        subtitle="Cuéntame tu proyecto y descubre si somos el match correcto."
      />
    </>
  );
}