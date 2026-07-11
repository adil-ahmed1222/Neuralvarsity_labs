/** Static showcase projects (Labs learning content) */
export type ProjectDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ShowcaseProject {
  id: number;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  technologies: string[];
  icon: string;
}

/** @deprecated Use ShowcaseProject */
export type Project = ShowcaseProject;

export const DIFFICULTY_COLORS: Record<ProjectDifficulty, string> = {
  Beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Intermediate: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  Advanced: "bg-red-500/15 text-red-400 border-red-500/30",
};

/** CMS project model (GitHub repositories) */
export type ProjectStatus =
  | "Planning"
  | "Development"
  | "Testing"
  | "Production"
  | "Archived";

export type DeploymentStatus =
  | "Live"
  | "Staging"
  | "Not Deployed"
  | "Failed";

export interface CMSProject {
  id: string;
  name: string;
  slug: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  status: ProjectStatus;
  deploymentStatus: DeploymentStatus;
  language: string;
  framework: string;
  tags: string[];
  stars: number;
  forks: number;
  lastUpdated: string;
  createdAt: string;
  visibility: string;
  license: string;
  topics: string[];
  defaultBranch: string;
  latestCommit?: string;
  openIssues: number;
}

export interface ProjectStats {
  totalProjects: number;
  liveProjects: number;
  githubRepos: number;
  deployments: number;
  latestUpdate: string | null;
}

export type SortOrder = "newest" | "oldest";

export interface ProjectFilters {
  language: string;
  technology: string;
  status: string;
  deployment: string;
  sort: SortOrder;
}
