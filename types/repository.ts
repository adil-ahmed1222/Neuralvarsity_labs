export type RepoVisibility = "public" | "private";
export type ProjectStatus = "active" | "archived" | "maintenance";
export type DeploymentStatus = "live" | "building" | "failed" | "unknown" | "not_deployed";

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  size: number;
  license: { spdx_id: string | null; name: string } | null;
  visibility: RepoVisibility;
  default_branch: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  topics?: string[];
  owner: { login: string; avatar_url: string };
  archived: boolean;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  html_url: string;
}

export interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

export interface GitHubBranch {
  name: string;
  commit: { sha: string };
  protected: boolean;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  created_at: string;
}

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string | null;
  published_at: string;
  html_url: string;
}

export interface RepositoryDetail extends GitHubRepository {
  readme: string | null;
  languages: Record<string, number>;
  commits: GitHubCommit[];
  contributors: GitHubContributor[];
  branches: GitHubBranch[];
  issues: GitHubIssue[];
  releases: GitHubRelease[];
  detectedTechnologies: string[];
  framework: string | null;
}

export interface RepositoryStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalIssues: number;
  languages: Record<string, number>;
  frameworks: Record<string, number>;
}
