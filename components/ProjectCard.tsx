"use client";

import {
  ArrowRight,
  Eye,
  FileSearch,
  FileText,
  Headphones,
  Mail,
  MessageSquare,
  Mic,
  Network,
  Share2,
  Target,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { DIFFICULTY_COLORS } from "@/types/project";
import type { ShowcaseProject } from "@/types/project";

const iconMap: Record<string, LucideIcon> = {
  Headphones,
  FileSearch,
  MessageSquare,
  FileText,
  Target,
  Share2,
  Eye,
  Mic,
  Mail,
  Network,
};

interface ProjectCardProps {
  project: ShowcaseProject;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const Icon = iconMap[project.icon] ?? Network;

  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.article
      initial={false}
      whileHover={{
        scale: 1.03,
        y: -6,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      onClick={scrollToTools}
      className={cn(
        "glass-card group relative flex cursor-pointer flex-col rounded-2xl p-5",
        "min-h-[260px] transition-all duration-300",
        "hover:glow-amber hover:border-[rgba(255,184,0,0.35)]",
        "animate-fade-up"
      )}
      style={{ animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(255,184,0,0.15)] bg-[#FFB800]/10">
          <Icon className="h-5 w-5 text-[#FFB800]" />
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
            DIFFICULTY_COLORS[project.difficulty]
          )}
        >
          {project.difficulty}
        </span>
      </div>

      <h3 className="mt-4 text-base font-bold text-white transition-colors group-hover:text-[#FFB800]">
        {project.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3">
        {project.description}
      </p>

      <div className="mt-4 text-[11px] leading-relaxed text-slate-500">
        {project.technologies.join(" • ")}
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#FFB800]">
        View Project
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </motion.article>
  );
}
