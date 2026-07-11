"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Star } from "lucide-react";
import { ToolLogo } from "./ToolLogo";
import { cn } from "@/lib/cn";
import { CATEGORY_CARD_LABELS, CATEGORY_COLORS } from "@/types/tool";
import type { Tool } from "@/types/tool";

interface ToolCardProps {
  tool: Tool;
  index: number;
}

export function ToolCard({ tool, index }: ToolCardProps) {
  return (
    <Link href={`/labs/${tool.slug}`} className="block">
      <motion.article
        initial={false}
        whileHover={{
          scale: 1.04,
          y: -8,
          transition: { duration: 0.25, ease: "easeOut" },
        }}
        className={cn(
          "glass-card group relative flex h-[300px] cursor-pointer flex-col rounded-2xl p-6",
          "transition-all duration-300",
          "hover:glow-amber hover:border-[rgba(255,184,0,0.35)]",
          "animate-fade-up"
        )}
        style={{ animationDelay: `${Math.min(index * 0.03, 0.6)}s` }}
      >
        <div className="flex items-start justify-between gap-2">
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
            {tool.featured && (
              <span className="flex items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#FFB800]">
                <Star className="h-3 w-3 fill-[#FFB800]" />
                Featured
              </span>
            )}
            {tool.popular && !tool.featured && (
              <span className="flex items-center gap-0.5 text-[9px] font-semibold uppercase tracking-wider text-orange-400">
                <Flame className="h-3 w-3" />
                Popular
              </span>
            )}
          </div>
        </div>

        <div className="mt-5 flex-1">
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-[#FFB800]">
            {tool.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">
            {tool.description}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {tool.tags.map((tag) => (
              <span key={tag} className="text-[11px] text-slate-500">
                #{tag.toLowerCase().replace(/\s+/g, "")}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#FFB800]">
            View Tool
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 50% 100%, rgba(255,184,0,0.08) 0%, transparent 60%)",
          }}
        />
      </motion.article>
    </Link>
  );
}
