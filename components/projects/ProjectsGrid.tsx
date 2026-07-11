"use client";

import { useMemo, useState } from "react";
import { useProjects } from "@/hooks/useProjects";
import { useCMSStore } from "@/hooks/useCMSStore";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardSkeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import type { CMSProject } from "@/types/project";

const LANGUAGES = ["All", "TypeScript", "JavaScript", "Python", "HTML", "CSS", "Shell"];
const STATUSES = ["All", "Planning", "Development", "Testing", "Production", "Archived"];

export function ProjectsGrid({ limit }: { limit?: number }) {
  const { data: projects, isLoading, error } = useProjects();
  const { searchQuery } = useCMSStore();
  const [language, setLanguage] = useState("All");
  const [status, setStatus] = useState("All");
  const [framework, setFramework] = useState("All");

  const frameworks = useMemo(() => {
    if (!projects) return ["All"];
    const set = new Set(projects.map((p: { framework: string | null }) => p.framework).filter(Boolean));
    return ["All", ...Array.from(set) as string[]];
  }, [projects]);

  const filtered = useMemo(() => {
    if (!projects) return [];
    let result = projects as CMSProject[];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.language.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (language !== "All") result = result.filter((p) => p.language === language);
    if (status !== "All") result = result.filter((p) => p.status === status);
    if (framework !== "All") result = result.filter((p) => p.framework === framework);

    return limit ? result.slice(0, limit) : result;
  }, [projects, searchQuery, language, status, framework, limit]);

  if (error) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
        <p className="text-red-400 font-medium">Failed to load projects</p>
        <p className="text-sm text-slate-500 mt-2">GitHub API may be rate limited. Add GITHUB_TOKEN to .env</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!limit && (
        <div className="flex flex-wrap gap-2">
          <FilterPills label="Language" options={LANGUAGES} value={language} onChange={setLanguage} />
          <FilterPills label="Status" options={STATUSES} value={status} onChange={setStatus} />
          <FilterPills label="Framework" options={frameworks} value={framework} onChange={setFramework} />
        </div>
      )}

      <p className="text-sm text-slate-500">{filtered.length} repositories</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          : filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
      </div>
    </div>
  );
}

function FilterPills({
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition-all border",
            value === opt
              ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
              : "text-slate-500 border-slate-800 hover:border-slate-700 hover:text-slate-300"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
