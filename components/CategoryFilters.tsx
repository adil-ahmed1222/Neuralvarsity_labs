"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { FILTER_CATEGORIES, type FilterCategory } from "@/types/tool";

interface CategoryFiltersProps {
  active: FilterCategory;
  onChange: (category: FilterCategory) => void;
}

export function CategoryFilters({ active, onChange }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {FILTER_CATEGORIES.map((cat) => (
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
          <span className="relative z-10">{cat}</span>
        </button>
      ))}
    </div>
  );
}
