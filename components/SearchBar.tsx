"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search AI Tools..."
        suppressHydrationWarning
        className="w-full rounded-2xl border border-[rgba(255,184,0,0.15)] bg-[rgba(15,23,42,0.7)] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-xl transition-all focus:border-[#FFB800]/40 focus:outline-none focus:ring-2 focus:ring-[#FFB800]/10"
      />
    </div>
  );
}
