import PageHeader from "@/components/PageHeader";
import Marquee from "@/components/Marquee";
import ProjectsShowcase from "@/components/ProjectsShowcase";
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
          <ProjectsShowcase projects={projects} />
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