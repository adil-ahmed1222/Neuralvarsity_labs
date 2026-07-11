import {
  detectFramework,
  detectTechnologies,
  fetchRepositoryDetail,
  fetchUserRepositories,
  slugify,
  clearGitHubCache,
} from "@/lib/github";
import type { GitHubRepository, RepositoryDetail } from "@/types/repository";
import type {
  CMSProject,
  DeploymentStatus,
  ProjectStats,
  ProjectStatus,
} from "@/types/project";

function inferStatus(repo: GitHubRepository): ProjectStatus {
  if (repo.archived) return "Archived";
  if (repo.homepage) return "Production";
  if (repo.open_issues_count > 0) return "Testing";
  const daysSincePush =
    (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);
  if (daysSincePush < 30) return "Development";
  return "Planning";
}

function inferDeployment(repo: GitHubRepository): DeploymentStatus {
  if (!repo.homepage) return "Not Deployed";
  const url = repo.homepage.toLowerCase();
  if (url.includes("staging") || url.includes("preview")) return "Staging";
  return "Live";
}

export function transformRepository(repo: GitHubRepository): CMSProject {
  const framework = detectFramework(repo, null) ?? "";
  const tags = detectTechnologies(null, repo.topics ?? []);

  return {
    id: String(repo.id),
    name: repo.name,
    slug: slugify(repo.name),
    description: repo.description ?? "No description provided.",
    githubUrl: repo.html_url,
    liveUrl: repo.homepage ?? "",
    status: inferStatus(repo),
    deploymentStatus: inferDeployment(repo),
    language: repo.language ?? "Unknown",
    framework,
    tags: [...new Set([...tags, ...(repo.topics ?? [])])],
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    lastUpdated: repo.updated_at,
    createdAt: repo.created_at,
    visibility:
      repo.visibility ??
      ((repo as GitHubRepository & { private?: boolean }).private ? "private" : "public"),
    license: repo.license?.spdx_id ?? repo.license?.name ?? "None",
    topics: repo.topics ?? [],
    defaultBranch: repo.default_branch,
    openIssues: repo.open_issues_count,
  };
}

export async function fetchCMSProjects(): Promise<CMSProject[]> {
  const repos = await fetchUserRepositories();
  return repos.map(transformRepository);
}

export async function fetchCMSProjectBySlug(slug: string): Promise<{
  project: CMSProject;
  detail: RepositoryDetail;
} | null> {
  const repos = await fetchUserRepositories();
  const repo = repos.find((r) => slugify(r.name) === slug);
  if (!repo) return null;
  const [owner] = repo.full_name.split("/");
  const detail = await fetchRepositoryDetail(owner, repo.name);
  const project = transformRepository(repo);
  const framework = detectFramework(repo, detail.readme ?? null);
  if (framework) project.framework = framework;
  project.tags = [
    ...new Set([
      ...detectTechnologies(detail.readme ?? null, repo.topics ?? []),
      ...(repo.topics ?? []),
    ]),
  ];
  if (detail.commits?.[0]) {
    project.latestCommit = detail.commits[0].commit.message;
  }
  return { project, detail };
}

export async function fetchProjectStats(): Promise<ProjectStats> {
  const projects = await fetchCMSProjects();
  const liveProjects = projects.filter((p) => p.deploymentStatus === "Live").length;
  const latestUpdate = projects[0]?.lastUpdated ?? null;

  return {
    totalProjects: projects.length,
    liveProjects,
    githubRepos: projects.length,
    deployments: liveProjects,
    latestUpdate,
  };
}

export function syncGitHubCache(): void {
  clearGitHubCache();
}

/** @deprecated use fetchCMSProjects */
export async function getAllProjects() {
  const repos = await fetchUserRepositories();
  return repos.map(transformRepository);
}

/** @deprecated use fetchCMSProjectBySlug */
export async function getProjectBySlug(slug: string) {
  const result = await fetchCMSProjectBySlug(slug);
  if (!result) return null;
  return { ...result.detail, cms: result.project };
}

export async function getDashboardStats() {
  const projects = await fetchCMSProjects();
  const stats = await fetchProjectStats();
  return {
    totalRepos: stats.totalProjects,
    liveProjects: stats.liveProjects,
    totalStars: projects.reduce((s, p) => s + p.stars, 0),
    totalForks: projects.reduce((s, p) => s + p.forks, 0),
    totalIssues: projects.reduce((s, p) => s + p.openIssues, 0),
    languages: projects.reduce(
      (acc, p) => {
        if (p.language !== "Unknown") acc[p.language] = (acc[p.language] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
    frameworks: projects.reduce(
      (acc, p) => {
        if (p.framework) acc[p.framework] = (acc[p.framework] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ),
    latestCommit: stats.latestUpdate,
    topFramework: Object.entries(
      projects.reduce((acc, p) => {
        if (p.framework) acc[p.framework] = (acc[p.framework] ?? 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A",
    topLanguage: Object.entries(
      projects.reduce((acc, p) => {
        if (p.language !== "Unknown") acc[p.language] = (acc[p.language] ?? 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "N/A",
    recentProjects: projects.slice(0, 6),
  };
}

export async function searchProjects(query: string): Promise<CMSProject[]> {
  const q = query.toLowerCase().trim();
  const projects = await fetchCMSProjects();
  if (!q) return projects;
  return projects.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.language.toLowerCase().includes(q) ||
      p.framework.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.topics.some((t) => t.toLowerCase().includes(q))
  );
}

export function generateMockDeployments(projects: CMSProject[]) {
  return projects
    .filter((p) => p.liveUrl)
    .slice(0, 12)
    .map((p, i) => ({
      id: `dep-${p.id}`,
      projectId: p.id,
      projectName: p.name,
      environment: (["production", "staging", "development"] as const)[i % 3],
      url: p.liveUrl,
      provider: "vercel",
      status: (["success", "success", "building", "failed"] as const)[i % 4],
      commitHash: p.defaultBranch.slice(0, 7),
      version: `v1.${i}.0`,
      buildTime: 45 + i * 12,
      deployedAt: p.lastUpdated,
    }));
}
