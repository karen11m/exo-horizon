import { githubUsername } from "./data";

export async function loadGitHubRepos() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=3`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos = await res.json();
    if (!Array.isArray(repos)) return [];
    return repos
      .filter((repo) => !repo.fork)
      .slice(0, 3)
      .map((repo) => ({
        tag: repo.language || "Código",
        title: repo.name,
        problem: null,
        solution: repo.description || "Proyecto disponible en GitHub.",
        link: repo.html_url,
        github: true,
      }));
  } catch {
    return [];
  }
}