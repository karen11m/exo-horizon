import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { loadGitHubRepos } from "@/lib/github";
import { featuredProjects } from "@/lib/data";

export default async function Home() {
  const githubRepos = await loadGitHubRepos();
  const projects = [...featuredProjects, ...githubRepos];

  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Projects projects={projects} />
      <About />
      <TechStack />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}