"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ToolLogo } from "./ToolLogo";
import { ToolBadges } from "./ToolBadges";
import { cn } from "@/lib/cn";
import { enrichTool } from "@/lib/toolMeta";
import { CATEGORY_CARD_LABELS, CATEGORY_COLORS } from "@/types/tool";
import type { Tool } from "@/types/tool";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  const enriched = enrichTool(tool);

  return (
    <motion.article
      initial={false}
      whileHover={{
        scale: 1.03,
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={cn(
        "glass-card group relative flex h-[300px] flex-col rounded-2xl p-6",
        "transition-all duration-300",
        "hover:glow-amber hover:border-[rgba(255,184,0,0.35)]",
        "animate-fade-up"
      )}
      style={{ animationDelay: `${Math.min(index * 0.03, 0.6)}s` }}
    >
      <Link href={`/labs/${tool.slug}`} className="absolute inset-0 z-0 rounded-2xl" aria-label={`View ${tool.name}`} />

      <div className="relative z-10 flex items-start justify-between gap-2">
        <ToolLogo name={tool.name} logo={tool.logo} />
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide",
              CATEGORY_COLORS[tool.category]
            )}
            title={tool.category}
          >
            {CATEGORY_CARD_LABELS[tool.category]}
          </span>
          <ToolBadges badges={enriched.badges?.slice(0, 1)} />
        </div>
      </div>

      <div className="relative z-10 mt-5 flex-1">
        <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#FFB800]">
          {tool.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
          {tool.description}
        </p>
      </div>

      <div className="relative z-10 mt-auto space-y-3">
        <div className="flex flex-wrap gap-x-2 gap-y-1">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[11px] text-slate-500">
              #{tag.toLowerCase().replace(/\s+/g, "")}
            </span>
          ))}
        </div>

        {/* Hover actions for power users */}
        <div className="flex items-center gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[rgba(255,184,0,0.25)] bg-[rgba(255,184,0,0.08)] px-3 py-2 text-xs font-semibold text-[#FFB800] transition-colors hover:bg-[rgba(255,184,0,0.15)]"
          >
            Open Website
            <ExternalLink className="h-3 w-3" />
          </a>
          <Link
            href={`/labs/${tool.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#FFB800] px-3 py-2 text-xs font-semibold text-[#030712]"
          >
            View Details
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="flex items-center gap-1.5 text-sm font-semibold text-[#FFB800] sm:group-hover:hidden">
          View Tool
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
}
