"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, RefreshCw } from "lucide-react";
import { ProjectSearch } from "@/components/cms/ProjectSearch";
import { ProjectFiltersBar } from "@/components/cms/ProjectFilters";
import { ProjectStats } from "@/components/cms/ProjectStats";
import { ProjectGrid } from "@/components/cms/ProjectGrid";
import { useCMSProjects, useRefreshGitHub } from "@/hooks/useCMSProjects";
import type { ProjectFilters } from "@/types/project";

const DEFAULT_FILTERS: ProjectFilters = {
  language: "All",
  technology: "All",
  status: "All",
  deployment: "All",
  sort: "newest",
};

export function ProjectsPortal() {
  const { data, isLoading, error, refetch, isFetching } = useCMSProjects();
  const refreshGitHub = useRefreshGitHub();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ProjectFilters>(DEFAULT_FILTERS);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [refreshing, setRefreshing] = useState(false);

  const projects = useMemo(() => data?.projects ?? [], [data?.projects]);
  const stats = data?.stats;

  const languages = useMemo(() => {
    const set = new Set(projects.map((p) => p.language).filter((l) => l !== "Unknown"));
    return Array.from(set).sort();
  }, [projects]);

  const technologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.framework) set.add(p.framework);
      p.tags.forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [projects]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshGitHub();
    } finally {
      setRefreshing(false);
    }
  }, [refreshGitHub]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="px-6 py-10 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Projects
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              GitHub repositories synced from{" "}
              <span className="text-[#FFB800]">adil-ahmed1222</span>
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ProjectSearch value={search} onChange={setSearch} />
            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing || isFetching}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-[rgba(255,184,0,0.25)] px-5 py-3 text-sm font-medium text-slate-200 transition-colors hover:border-[#FFB800]/40 hover:bg-[rgba(255,184,0,0.06)] disabled:opacity-50"
            >
              {refreshing || isFetching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh GitHub
            </button>
          </div>
        </div>

        <ProjectFiltersBar
          filters={filters}
          onChange={setFilters}
          languages={languages}
          technologies={technologies}
        />

        {stats && <ProjectStats stats={stats} />}

        <ProjectGrid
          projects={projects}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
          search={search}
          filters={filters}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </motion.div>
  );
}
