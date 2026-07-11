"use client";

import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  ExternalLink,
  GitCommit,
  GitFork,
  Github,
  Globe,
  Rocket,
  Star,
  GitBranch,
  Tag,
  AlertCircle,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { DeploymentBadge } from "./DeploymentBadge";
import { formatDate, formatRelativeDate, formatNumber } from "@/lib/utils";
import type { CMSProject } from "@/types/project";

interface ProjectDetailData {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  updated_at: string;
  created_at: string;
  language: string | null;
  visibility?: string;
  license?: { spdx_id?: string; name?: string } | null;
  readme?: string | null;
  framework?: string | null;
  detectedTechnologies?: string[];
  languages?: Record<string, number>;
  commits?: Array<{
    sha: string;
    html_url: string;
    commit: { message: string; author: { date: string } };
  }>;
  contributors?: Array<{
    login: string;
    avatar_url: string;
    contributions: number;
  }>;
  topics?: string[];
  cms?: CMSProject;
}

interface ProjectOverviewProps {
  project: ProjectDetailData;
}

function GlassSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass-card rounded-2xl p-6 ${className ?? ""}`}>
      <h2 className="text-lg font-bold text-white">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  const cms = project.cms;
  const status = cms?.status ?? "Development";
  const deployment = cms?.deploymentStatus ?? (project.homepage ? "Live" : "Not Deployed");

  return (
    <div className="space-y-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-[#FFB800]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Projects
      </Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={status} />
            <DeploymentBadge status={deployment} />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-3 text-slate-400">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#FFB800]/40 hover:text-[#FFB800]"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#FFB800] px-5 py-2.5 text-sm font-semibold text-[#030712] shadow-lg shadow-[#F59E0B]/20"
            >
              <Rocket className="h-4 w-4" /> Live Demo
            </a>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {[
          { icon: Star, label: "Stars", value: formatNumber(project.stargazers_count) },
          { icon: GitFork, label: "Forks", value: formatNumber(project.forks_count) },
          { icon: AlertCircle, label: "Issues", value: project.open_issues_count },
          { icon: GitBranch, label: "Branch", value: project.default_branch },
          { icon: GitCommit, label: "Updated", value: formatRelativeDate(project.updated_at) },
          { icon: Tag, label: "Created", value: formatDate(project.created_at) },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="glass-card rounded-xl p-4">
            <Icon className="mb-2 h-4 w-4 text-[#FFB800]/60" />
            <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
            <p className="mt-1 truncate text-sm font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassSection title="Overview" className="lg:col-span-2">
          <p className="text-sm leading-relaxed text-slate-400">
            {project.description ?? "No description available."}
          </p>
          {project.topics && project.topics.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.topics.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[rgba(255,184,0,0.15)] bg-[#FFB800]/5 px-3 py-1 text-xs text-[#FFB800]"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </GlassSection>

        <GlassSection title="Repository Info">
          <dl className="space-y-3 text-sm">
            <InfoRow label="Visibility" value={project.visibility ?? cms?.visibility ?? "public"} />
            <InfoRow label="Language" value={project.language ?? cms?.language ?? "—"} />
            <InfoRow label="License" value={project.license?.spdx_id ?? project.license?.name ?? cms?.license ?? "None"} />
            <InfoRow label="Default Branch" value={project.default_branch} />
            <InfoRow label="Repository" value={project.name} mono />
          </dl>
        </GlassSection>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlassSection title="README" className="lg:col-span-2">
          {project.readme ? (
            <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-a:text-[#FFB800]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.readme}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-slate-500">No README available.</p>
          )}
        </GlassSection>

        <div className="space-y-6">
          <GlassSection title="Tech Stack">
            <div className="flex flex-wrap gap-2">
              {(project.detectedTechnologies ?? cms?.tags ?? []).map((t) => (
                <span
                  key={t}
                  className="rounded-lg border border-slate-700/80 px-2.5 py-1 text-xs text-slate-300"
                >
                  {t}
                </span>
              ))}
              {project.framework && (
                <span className="rounded-lg border border-[#FFB800]/20 bg-[#FFB800]/10 px-2.5 py-1 text-xs text-[#FFB800]">
                  {project.framework}
                </span>
              )}
            </div>
          </GlassSection>

          <GlassSection title="Languages Used">
            {project.languages && Object.keys(project.languages).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(project.languages)
                  .sort((a, b) => b[1] - a[1])
                  .map(([lang, bytes]) => {
                    const total = Object.values(project.languages!).reduce((s, v) => s + v, 0);
                    const pct = Math.round((bytes / total) * 100);
                    return (
                      <div key={lang}>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300">{lang}</span>
                          <span className="text-slate-500">{pct}%</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-800">
                          <div
                            className="h-full rounded-full bg-[#FFB800]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <p className="text-sm text-slate-500">{project.language ?? "Unknown"}</p>
            )}
          </GlassSection>

          <GlassSection title="Deployment">
            <DeploymentBadge status={deployment} />
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-[#FFB800] hover:underline"
              >
                <Globe className="h-3.5 w-3.5" /> {project.homepage}
              </a>
            )}
          </GlassSection>
        </div>
      </div>

      {project.commits && project.commits.length > 0 && (
        <GlassSection title="Latest Commits">
          <div className="space-y-3">
            {project.commits.slice(0, 8).map((c) => (
              <div
                key={c.sha}
                className="flex items-start gap-3 rounded-xl border border-slate-800/80 p-3"
              >
                <GitCommit className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB800]" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-white">{c.commit.message}</p>
                  <p className="text-xs text-slate-500">
                    {formatRelativeDate(c.commit.author.date)} · {c.sha.slice(0, 7)}
                  </p>
                </div>
                <a href={c.html_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 text-slate-500 hover:text-[#FFB800]" />
                </a>
              </div>
            ))}
          </div>
        </GlassSection>
      )}

      {project.contributors && project.contributors.length > 0 && (
        <GlassSection title="Contributors">
          <div className="flex flex-wrap gap-4">
            {project.contributors.slice(0, 8).map((c) => (
              <div key={c.login} className="flex items-center gap-2 text-sm">
                <Image
                  src={c.avatar_url}
                  alt={c.login}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
                <span className="text-white">{c.login}</span>
                <span className="text-slate-500">{c.contributions}</span>
              </div>
            ))}
          </div>
        </GlassSection>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-500">{label}</dt>
      <dd className={`text-right text-white ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
