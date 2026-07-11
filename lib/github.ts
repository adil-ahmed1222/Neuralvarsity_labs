import { GITHUB_API, GITHUB_USERNAME, TECH_PATTERNS } from "./constants";
import type {
  GitHubBranch,
  GitHubCommit,
  GitHubContributor,
  GitHubIssue,
  GitHubRelease,
  GitHubRepository,
  RepositoryDetail,
  RepositoryStats,
} from "@/types/repository";

const CACHE = new Map<string, { data: unknown; expires: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function cachedFetch<T>(key: string, url: string): Promise<T> {
  const hit = CACHE.get(key);
  if (hit && hit.expires > Date.now()) return hit.data as T;

  const res = await fetch(url, { headers: getHeaders(), next: { revalidate: 300 } });
  if (!res.ok) {
    const err = new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    (err as Error & { status: number }).status = res.status;
    throw err;
  }
  const data = (await res.json()) as T;
  CACHE.set(key, { data, expires: Date.now() + CACHE_TTL });
  return data;
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function detectFramework(repo: GitHubRepository, readme: string | null): string | null {
  const text = `${repo.name} ${repo.description ?? ""} ${readme ?? ""}`.toLowerCase();
  if (text.includes("next.js") || text.includes("nextjs")) return "Next.js";
  if (text.includes("fastapi")) return "FastAPI";
  if (text.includes("react")) return "React";
  if (text.includes("vue")) return "Vue";
  if (text.includes("angular")) return "Angular";
  if (repo.language === "Python") return "Python";
  if (repo.language === "TypeScript" || repo.language === "JavaScript") return "Node.js";
  return repo.language;
}

export function detectTechnologies(readme: string | null, topics: string[] = []): string[] {
  const text = `${readme ?? ""} ${topics.join(" ")}`.toLowerCase();
  const detected = new Set<string>();
  for (const [tech, patterns] of Object.entries(TECH_PATTERNS)) {
    if (patterns.some((p) => p.test(text))) detected.add(tech);
  }
  for (const topic of topics) {
    const t = topic.charAt(0).toUpperCase() + topic.slice(1);
    if (TECH_PATTERNS[t] || Object.keys(TECH_PATTERNS).includes(t)) detected.add(t);
  }
  return Array.from(detected);
}

export async function fetchUserRepositories(
  username = GITHUB_USERNAME
): Promise<GitHubRepository[]> {
  const repos: GitHubRepository[] = [];
  let page = 1;
  while (page <= 5) {
    const batch = await cachedFetch<GitHubRepository[]>(
      `repos:${username}:${page}`,
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=100&page=${page}`
    );
    repos.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return repos.sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}

export async function fetchRepository(
  owner: string,
  repo: string
): Promise<GitHubRepository> {
  return cachedFetch(`${owner}/${repo}`, `${GITHUB_API}/repos/${owner}/${repo}`);
}

export async function fetchReadme(owner: string, repo: string): Promise<string | null> {
  try {
    const data = await cachedFetch<{ content: string }>(
      `readme:${owner}/${repo}`,
      `${GITHUB_API}/repos/${owner}/${repo}/readme`
    );
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch {
    return null;
  }
}

export async function fetchLanguages(owner: string, repo: string): Promise<Record<string, number>> {
  return cachedFetch(`langs:${owner}/${repo}`, `${GITHUB_API}/repos/${owner}/${repo}/languages`);
}

export async function fetchCommits(owner: string, repo: string, limit = 10): Promise<GitHubCommit[]> {
  return cachedFetch(
    `commits:${owner}/${repo}`,
    `${GITHUB_API}/repos/${owner}/${repo}/commits?per_page=${limit}`
  );
}

export async function fetchContributors(owner: string, repo: string): Promise<GitHubContributor[]> {
  try {
    return await cachedFetch(
      `contributors:${owner}/${repo}`,
      `${GITHUB_API}/repos/${owner}/${repo}/contributors?per_page=20`
    );
  } catch {
    return [];
  }
}

export async function fetchBranches(owner: string, repo: string): Promise<GitHubBranch[]> {
  try {
    return await cachedFetch(
      `branches:${owner}/${repo}`,
      `${GITHUB_API}/repos/${owner}/${repo}/branches?per_page=30`
    );
  } catch {
    return [];
  }
}

export async function fetchIssues(owner: string, repo: string): Promise<GitHubIssue[]> {
  try {
    return await cachedFetch(
      `issues:${owner}/${repo}`,
      `${GITHUB_API}/repos/${owner}/${repo}/issues?state=all&per_page=20`
    );
  } catch {
    return [];
  }
}

export async function fetchReleases(owner: string, repo: string): Promise<GitHubRelease[]> {
  try {
    return await cachedFetch(
      `releases:${owner}/${repo}`,
      `${GITHUB_API}/repos/${owner}/${repo}/releases?per_page=10`
    );
  } catch {
    return [];
  }
}

export async function fetchRepositoryDetail(
  owner: string,
  repo: string
): Promise<RepositoryDetail> {
  const [repository, readme, languages, commits, contributors, branches, issues, releases] =
    await Promise.all([
      fetchRepository(owner, repo),
      fetchReadme(owner, repo),
      fetchLanguages(owner, repo),
      fetchCommits(owner, repo),
      fetchContributors(owner, repo),
      fetchBranches(owner, repo),
      fetchIssues(owner, repo),
      fetchReleases(owner, repo),
    ]);

  const framework = detectFramework(repository, readme);
  const detectedTechnologies = detectTechnologies(readme, repository.topics);

  return {
    ...repository,
    readme,
    languages,
    commits,
    contributors,
    branches,
    issues,
    releases,
    detectedTechnologies,
    framework,
  };
}

export async function fetchRepositoryStats(username = GITHUB_USERNAME): Promise<RepositoryStats> {
  const repos = await fetchUserRepositories(username);
  const languages: Record<string, number> = {};
  const frameworks: Record<string, number> = {};

  for (const repo of repos) {
    if (repo.language) languages[repo.language] = (languages[repo.language] ?? 0) + 1;
    const fw = detectFramework(repo, null);
    if (fw) frameworks[fw] = (frameworks[fw] ?? 0) + 1;
  }

  return {
    totalRepos: repos.length,
    totalStars: repos.reduce((s, r) => s + r.stargazers_count, 0),
    totalForks: repos.reduce((s, r) => s + r.forks_count, 0),
    totalIssues: repos.reduce((s, r) => s + r.open_issues_count, 0),
    languages,
    frameworks,
  };
}

export function clearGitHubCache(): void {
  CACHE.clear();
}
