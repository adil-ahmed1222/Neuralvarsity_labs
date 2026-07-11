"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { CMSProject, ProjectStats } from "@/types/project";

interface ProjectsResponse {
  projects: CMSProject[];
  stats: ProjectStats;
  total: number;
}

export function useCMSProjects() {
  return useQuery({
    queryKey: ["cms-projects"],
    queryFn: async (): Promise<ProjectsResponse> => {
      const res = await fetch("/api/github/projects");
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to fetch projects");
      }
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useRefreshGitHub() {
  const queryClient = useQueryClient();
  return async () => {
    await fetch("/api/github/projects", { method: "POST" });
    await queryClient.invalidateQueries({ queryKey: ["cms-projects"] });
    await queryClient.invalidateQueries({ queryKey: ["cms-project"] });
  };
}

export function useCMSProject(slug: string) {
  return useQuery({
    queryKey: ["cms-project", slug],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${slug}`);
      if (!res.ok) throw new Error("Project not found");
      return res.json();
    },
    enabled: Boolean(slug),
  });
}
