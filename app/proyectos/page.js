import PageHeader from "@/components/PageHeader";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import SectionHeading from "@/components/SectionHeading";
import CtaStrip from "@/components/CtaStrip";
import { loadGitHubRepos } from "@/lib/github";
import { featuredProjects } from "@/lib/data";

export const metadata = {
  title: "Proyectos",
  description:
    "Portafolio de Karen Méndez: trabajos seleccionados y proyectos de GitHub.",
};

const marqueeWords = [
  "Reservas online",
  "Chatbots con IA",
  "Dashboards",
  "Inventario",
  "Scrapers",
  "Mobile",
];

export default async function ProyectosPage() {
  const githubRepos = await loadGitHubRepos();
  const projects = [...featuredProjects, ...githubRepos];

  return (
    <>
      <PageHeader
        index="03"
        route="proyectos"
        title="Proyectos"
        accent="seleccionados"
        subtitle="Una muestra de trabajos donde el problema técnico se convirtió en resultado de negocio."
      />
      <Marquee items={marqueeWords} fast />
      <section className="py-20 md:py-28">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <SectionHeading
            index="03.1"
            eyebrow="Portafolio"
            title="Casos que hablan por sí solos"
            subtitle="Featured y repositorios públicos, contados en formato caso-problema-solución."
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