"use client";

import { Search } from "lucide-react";

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ProjectSearch({ value, onChange }: ProjectSearchProps) {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects..."
        suppressHydrationWarning
        className="w-full rounded-full border border-[rgba(255,184,0,0.12)] bg-[rgba(15,23,42,0.6)] py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition-colors focus:border-[#FFB800]/40 focus:ring-1 focus:ring-[#FFB800]/20"
      />
    </div>
  );
}
