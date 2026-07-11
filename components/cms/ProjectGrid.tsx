"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, FolderGit2, RefreshCw } from "lucide-react";
import { CMSProjectCard } from "./ProjectCard";
import type { CMSProject, ProjectFilters } from "@/types/project";

function SkeletonCard() {
  return (
    <div className="glass-card animate-pulse rounded-2xl p-5 min-h-[320px]">
      <div className="flex justify-between">
        <div className="h-11 w-11 rounded-xl bg-slate-800" />
        <div className="h-6 w-20 rounded-full bg-slate-800" />
      </div>
      <div className="mt-4 h-5 w-3/4 rounded bg-slate-800" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-slate-800/80" />
        <div className="h-3 w-5/6 rounded bg-slate-800/80" />
      </div>
      <div className="mt-auto pt-16 flex gap-2">
        <div className="h-8 w-16 rounded-lg bg-slate-800" />
        <div className="h-8 w-16 rounded-lg bg-slate-800" />
      </div>
    </div>
  );
}

interface ProjectGridProps {
  projects: CMSProject[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
  search: string;
  filters: ProjectFilters;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export function ProjectGrid({
  projects,
  isLoading,
  error,
  onRetry,
  search,
  filters,
  favorites,
  onToggleFavorite,
}: ProjectGridProps) {
  const filtered = useMemo(() => {
    let result = [...projects];
    const q = search.toLowerCase().trim();

    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.language.toLowerCase().includes(q) ||
          p.framework.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.topics.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (filters.language !== "All") {
      result = result.filter((p) => p.language === filters.language);
    }
    if (filters.technology !== "All") {
      result = result.filter(
        (p) =>
          p.framework === filters.technology ||
          p.tags.includes(filters.technology)
      );
    }
    if (filters.status !== "All") {
      result = result.filter((p) => p.status === filters.status);
    }
    if (filters.deployment !== "All") {
      result = result.filter((p) => p.deploymentStatus === filters.deployment);
    }

    result.sort((a, b) => {
      const da = new Date(a.lastUpdated).getTime();
      const db = new Date(b.lastUpdated).getTime();
      return filters.sort === "newest" ? db - da : da - db;
    });

    return result;
  }, [projects, search, filters]);

  const pinned = filtered.filter((p) => p.stars >= 1).slice(0, 3);
  const recent = [...projects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  const recentlyUpdated = [...projects]
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 3);

  if (error) {
    const isRateLimit = error.message.includes("403") || error.message.includes("rate");
    return (
      <div className="glass-card rounded-2xl border border-red-500/30 bg-red-500/5 p-12 text-center">
        <AlertCircle className="mx-auto h-10 w-10 text-red-400" />
        <h3 className="mt-4 text-lg font-semibold text-white">
          {isRateLimit ? "GitHub Rate Limit Reached" : "Failed to Load Projects"}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
          {isRateLimit
            ? "Add GITHUB_TOKEN to your environment for higher rate limits."
            : error.message}
        </p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFB800]/15 px-5 py-2.5 text-sm font-semibold text-[#FFB800] transition-colors hover:bg-[#FFB800]/25"
          >
            <RefreshCw className="h-4 w-4" /> Retry
          </button>
        )}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-16 text-center">
        <FolderGit2 className="mx-auto h-12 w-12 text-slate-600" />
        <h3 className="mt-4 text-lg font-semibold text-white">No projects found</h3>
        <p className="mt-2 text-sm text-slate-400">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {!search && filters.language === "All" && filters.status === "All" && (
        <QuickSections
          pinned={pinned}
          recent={recent}
          recentlyUpdated={recentlyUpdated}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}

      <div>
        <p className="mb-4 text-sm text-slate-500">
          Showing {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </p>
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <CMSProjectCard
                  project={project}
                  index={index}
                  pinned={pinned.some((p) => p.id === project.id)}
                  favorite={favorites.has(project.id)}
                  onToggleFavorite={() => onToggleFavorite(project.id)}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function QuickSections({
  pinned,
  recent,
  recentlyUpdated,
  favorites,
  onToggleFavorite,
}: {
  pinned: CMSProject[];
  recent: CMSProject[];
  recentlyUpdated: CMSProject[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}) {
  const sections = [
    { title: "Pinned Projects", items: pinned },
    { title: "Recent Projects", items: recent },
    { title: "Recently Updated", items: recentlyUpdated },
  ].filter((s) => s.items.length > 0);

  if (sections.length === 0) return null;

  return (
    <div className="space-y-6">
      {sections.map(({ title, items }) => (
        <div key={title}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((project, i) => (
              <CMSProjectCard
                key={`${title}-${project.id}`}
                project={project}
                index={i}
                pinned={title === "Pinned Projects"}
                favorite={favorites.has(project.id)}
                onToggleFavorite={() => onToggleFavorite(project.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
