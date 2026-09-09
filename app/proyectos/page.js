import PageHeader from "@/components/PageHeader";
import Marquee from "@/components/Marquee";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Projects from "@/components/Projects";
import SectionHeading from "@/components/SectionHeading";
import CtaStrip from "@/components/CtaStrip";
import { loadGitHubRepos } from "@/lib/github";
import { featuredProjects, conceptProjects } from "@/lib/data";

export const metadata = {
  title: "Proyectos",
  description:
    "Portafolio de LambNex: conceptos de IA, automatización, ciberseguridad y proyectos seleccionados de Karen Méndez.",
};

const marqueeWords = [
  "Second Brain",
  "Ciudad Inteligente",
  "CyberShield",
  "DevAI",
  "HealthFlow",
  "Smart Home",
  "Memory AI",
  "FraudGuard",
];

export default async function ProyectosPage() {
  const githubRepos = await loadGitHubRepos();
  const projects = [...featuredProjects, ...conceptProjects, ...githubRepos];

  return (
    <>
      <PageHeader
        index="03"
        route="proyectos"
        title="Proyectos"
        accent="LambNex"
        subtitle="Conceptos propios de IA, automatización y sistemas empresariales, más casos seleccionados."
      />
      <Marquee items={marqueeWords} fast />

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="mb-10">
            <SectionHeading
              index="03.1"
              eyebrow="Explora"
              title="Conceptos del estudio"
              subtitle="Ideas en desarrollo dentro de LambNex. Arrastra el carrusel o usa las flechas."
            />
          </div>
          <ProjectsCarousel projects={projects} />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="03.2"
            eyebrow="Portafolio"
            title="Todos los proyectos"
            subtitle="Featured, conceptos y repositorios públicos, contados en formato caso-problema-solución."
          />
          <Projects projects={projects} />
        </div>
      </section>

      <CtaStrip
        title="¿Quieres tu proyecto aquí?"
        accent="Hablemos."
        subtitle="Cuéntame tu idea y construyamos el caso de éxito de tu negocio."
      />
    </>
  );
}