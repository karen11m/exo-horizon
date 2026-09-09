import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import IndexMenu from "@/components/IndexMenu";
import FeaturedWorks from "@/components/FeaturedWorks";
import CtaStrip from "@/components/CtaStrip";
import { loadGitHubRepos } from "@/lib/github";
import { featuredProjects } from "@/lib/data";

export default async function Home() {
  const githubRepos = await loadGitHubRepos();
  const projects = [...featuredProjects, ...githubRepos];

  return (
    <>
      <Hero />
      <Marquee
        items={[
          "Desarrollo web",
          "Aplicaciones",
          "Automatización",
          "Inteligencia artificial",
          "Consultoría gratuita",
        ]}
      />
      <IndexMenu />
      <FeaturedWorks projects={projects} />
      <CtaStrip />
    </>
  );
}