"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { getCategoryCounts } from "@/lib/tools";
import {
  CATEGORY_SHORT_LABELS,
  FILTER_CATEGORIES,
  type FilterCategory,
  type ToolCategory,
} from "@/types/tool";

interface CategoryFiltersProps {
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
}

function labelFor(cat: FilterCategory) {
  if (cat === "All") return "All";
  return CATEGORY_SHORT_LABELS[cat as ToolCategory] ?? cat;
}

export function CategoryFilters({ active, onChange }: CategoryFiltersProps) {
  const counts = getCategoryCounts();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {FILTER_CATEGORIES.map((cat) => {
        const count = counts[cat] ?? 0;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            suppressHydrationWarning
            className={cn(
              "relative rounded-full px-4 py-2 text-xs font-medium transition-all duration-300",
              active === cat
                ? "text-[#030712]"
                : "border border-[rgba(255,184,0,0.12)] text-slate-400 hover:border-[rgba(255,184,0,0.25)] hover:text-slate-200"
            )}
          >
            {active === cat && (
              <motion.span
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FFB800]"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {labelFor(cat)}
              <span className={cn("ml-1 opacity-80", active === cat ? "opacity-90" : "text-slate-500")}>
                ({count})
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
