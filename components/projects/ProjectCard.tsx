"use client";



import Link from "next/link";

import { motion } from "framer-motion";

import {

  ExternalLink,

  GitFork,

  Github,

  Rocket,

  Star,

  GitCommit,

} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { formatRelativeDate, formatNumber } from "@/lib/utils";

import { LANGUAGE_COLORS } from "@/lib/constants";

import type { CMSProject } from "@/types/project";



interface ProjectCardProps {

  project: CMSProject;

  index?: number;

}



export function ProjectCard({ project }: ProjectCardProps) {

  const langColor = project.language ? LANGUAGE_COLORS[project.language] ?? "#64748b" : null;



  return (

    <motion.div

      initial={false}

      whileHover={{ scale: 1.02, y: -4 }}

      transition={{ duration: 0.2 }}

    >

      <Card hover className="flex h-full flex-col p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="flex items-center gap-3 min-w-0">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-slate-700">

              <Github className="h-5 w-5 text-slate-400" />

            </div>

            <div className="min-w-0">

              <Link

                href={`/projects/${project.slug}`}

                className="font-semibold text-white hover:text-amber-400 transition-colors truncate block"

              >

                {project.name}

              </Link>

              <p className="text-xs text-slate-500">{project.visibility}</p>

            </div>

          </div>

          <Badge variant={project.deploymentStatus === "Live" ? "success" : "outline"}>

            {project.deploymentStatus}

          </Badge>

        </div>



        <p className="mt-3 flex-1 text-sm text-slate-400 line-clamp-2 leading-relaxed">

          {project.description}

        </p>



        <div className="mt-4 flex flex-wrap gap-2">

          {project.language && project.language !== "Unknown" && (

            <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 px-2 py-1 text-[10px] text-slate-400">

              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: langColor ?? "#64748b" }} />

              {project.language}

            </span>

          )}

          {project.framework && (

            <Badge variant="info">{project.framework}</Badge>

          )}

          {project.tags.slice(0, 2).map((t) => (

            <Badge key={t} variant="outline">{t}</Badge>

          ))}

        </div>



        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">

          <span className="flex items-center gap-1"><Star className="h-3 w-3" />{formatNumber(project.stars)}</span>

          <span className="flex items-center gap-1"><GitFork className="h-3 w-3" />{formatNumber(project.forks)}</span>

          <span className="flex items-center gap-1"><GitCommit className="h-3 w-3" />{formatRelativeDate(project.lastUpdated)}</span>

        </div>



        <div className="mt-4 flex items-center gap-2 border-t border-slate-800/80 pt-4">

          <Link href={`/projects/${project.slug}`} className="flex-1">

            <Button variant="amber" size="sm" className="w-full">

              View Details

            </Button>

          </Link>

          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">

            <Button variant="outline" size="sm">

              <ExternalLink className="h-3.5 w-3.5" />

            </Button>

          </a>

          {project.liveUrl && (

            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">

              <Button variant="outline" size="sm">

                <Rocket className="h-3.5 w-3.5" />

              </Button>

            </a>

          )}

        </div>

      </Card>

    </motion.div>

  );

}

