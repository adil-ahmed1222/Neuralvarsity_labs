"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Globe,
  Star,
  GitFork,
  Heart,
  Pin,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { formatRelativeDate } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import { DeploymentBadge } from "./DeploymentBadge";
import type { CMSProject } from "@/types/project";

interface CMSProjectCardProps {
  project: CMSProject;
  index: number;
  pinned?: boolean;
  favorite?: boolean;
  onToggleFavorite?: () => void;
}

export function CMSProjectCard({
  project,
  index,
  pinned,
  favorite,
  onToggleFavorite,
}: CMSProjectCardProps) {
  const techStack = [
    project.language,
    project.framework,
    ...project.tags.slice(0, 3),
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <motion.article
      initial={false}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className={cn(
        "glass-card group relative flex flex-col rounded-2xl p-5",
        "min-h-[320px] transition-all duration-300",
        "hover:glow-amber hover:border-[rgba(255,184,0,0.35)]",
        "animate-fade-up"
      )}
      style={{ animationDelay: `${Math.min(index * 0.04, 0.4)}s` }}
    >
      {pinned && (
        <Pin className="absolute right-4 top-4 h-3.5 w-3.5 text-[#FFB800]/60" />
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(255,184,0,0.15)] bg-[#FFB800]/10">
          <Github className="h-5 w-5 text-[#FFB800]" />
        </div>
        <div className="flex items-center gap-2">
          {onToggleFavorite && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite();
              }}
              className="rounded-lg p-1.5 text-slate-500 transition-colors hover:text-[#FFB800]"
              aria-label="Toggle favorite"
            >
              <Heart
                className={cn("h-4 w-4", favorite && "fill-[#FFB800] text-[#FFB800]")}
              />
            </button>
          )}
          <StatusBadge status={project.status} />
        </div>
      </div>

      <h3 className="mt-4 text-base font-bold text-white transition-colors group-hover:text-[#FFB800]">
        {project.name}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400 line-clamp-2">
        {project.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <DeploymentBadge status={project.deploymentStatus} />
        <span className="rounded-full border border-slate-700/80 px-2 py-0.5 text-[10px] uppercase text-slate-500">
          {project.visibility}
        </span>
      </div>

      {techStack && (
        <div className="mt-3 text-[11px] leading-relaxed text-slate-500 line-clamp-1">
          {techStack}
        </div>
      )}

      <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Star className="h-3 w-3" /> {project.stars}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3 w-3" /> {project.forks}
        </span>
        <span className="ml-auto">{formatRelativeDate(project.lastUpdated)}</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-700/80 px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-[#FFB800]/30 hover:text-[#FFB800]"
        >
          <Github className="h-3.5 w-3.5" /> GitHub
        </a>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-700/80 px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-emerald-500/30 hover:text-emerald-400"
          >
            <Globe className="h-3.5 w-3.5" /> Live
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-lg border border-slate-800 px-2.5 py-1.5 text-xs text-slate-600">
            <ExternalLink className="h-3.5 w-3.5" /> No demo
          </span>
        )}
        <Link
          href={`/projects/${project.slug}`}
          className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-[#FFB800] transition-transform group-hover:translate-x-0.5"
        >
          View Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
