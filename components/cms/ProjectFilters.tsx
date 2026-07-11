"use client";

import { cn } from "@/lib/cn";
import type { ProjectFilters, SortOrder } from "@/types/project";

interface ProjectFiltersProps {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
  languages: string[];
  technologies: string[];
}

const STATUSES = ["All", "Planning", "Development", "Testing", "Production", "Archived"];
const DEPLOYMENTS = ["All", "Live", "Staging", "Not Deployed", "Failed"];

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        suppressHydrationWarning
        className="rounded-xl border border-[rgba(255,184,0,0.12)] bg-[rgba(15,23,42,0.6)] px-3 py-2 text-sm text-white outline-none focus:border-[#FFB800]/40"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-slate-900">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function ProjectFiltersBar({
  filters,
  onChange,
  languages,
  technologies,
}: ProjectFiltersProps) {
  const update = (partial: Partial<ProjectFilters>) =>
    onChange({ ...filters, ...partial });

  return (
    <div className="flex flex-wrap items-end gap-3">
      <Select
        label="Language"
        value={filters.language}
        options={["All", ...languages]}
        onChange={(language) => update({ language })}
      />
      <Select
        label="Technology"
        value={filters.technology}
        options={["All", ...technologies]}
        onChange={(technology) => update({ technology })}
      />
      <Select
        label="Status"
        value={filters.status}
        options={STATUSES}
        onChange={(status) => update({ status })}
      />
      <Select
        label="Deployment"
        value={filters.deployment}
        options={DEPLOYMENTS}
        onChange={(deployment) => update({ deployment })}
      />
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
          Sort
        </label>
        <div className="flex rounded-xl border border-[rgba(255,184,0,0.12)] p-0.5">
          {(["newest", "oldest"] as SortOrder[]).map((sort) => (
            <button
              key={sort}
              type="button"
              onClick={() => update({ sort })}
              suppressHydrationWarning
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                filters.sort === sort
                  ? "bg-[#FFB800]/15 text-[#FFB800]"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {sort}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
