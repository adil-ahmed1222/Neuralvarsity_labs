"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { ToolLogo } from "@/components/ToolLogo";
import { ToolBadges } from "@/components/ToolBadges";
import { cn } from "@/lib/cn";
import {
  CATEGORY_COLORS,
  CATEGORY_SLUGS,
  type Tool,
} from "@/types/tool";

interface ToolDetailProps {
  tool: Tool;
  relatedTools: Tool[];
  prevTool?: Tool;
  nextTool?: Tool;
}

function InfoRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-[rgba(255,184,0,0.06)] py-3 last:border-0 sm:flex-row sm:items-start sm:gap-6">
      <dt className="w-40 shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-slate-300">{value}</dd>
    </div>
  );
}

function formatMaybe(value: boolean | string | undefined): string {
  if (value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return value;
}

export function ToolDetail({
  tool,
  relatedTools,
  prevTool,
  nextTool,
}: ToolDetailProps) {
  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/labs" className="transition-colors hover:text-[#FFB800]">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/labs/categories/${CATEGORY_SLUGS[tool.category]}`}
          className="transition-colors hover:text-[#FFB800]"
        >
          {tool.category}
        </Link>
        <span>/</span>
        <span className="text-slate-300">{tool.name}</span>
      </nav>

      <Link
        href="/labs#tools"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-[#FFB800]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to AI Tools
      </Link>

      {/* Header */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-5">
            <ToolLogo name={tool.name} logo={tool.logo} size="md" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide",
                    CATEGORY_COLORS[tool.category]
                  )}
                >
                  {tool.category}
                </span>
                <ToolBadges badges={tool.badges} />
              </div>
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {tool.name}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                by {tool.company ?? "Independent"}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                {tool.overview ?? tool.description}
              </p>
            </div>
          </div>

          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FFB800] px-6 py-3 text-sm font-semibold text-[#030712] transition-opacity hover:opacity-90"
          >
            Launch {tool.name}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-t border-[rgba(255,184,0,0.08)] pt-6">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(255,184,0,0.12)] bg-[rgba(255,184,0,0.04)] px-3 py-1 text-xs text-slate-400"
            >
              #{tag.toLowerCase().replace(/\s+/g, "")}
            </span>
          ))}
        </div>
      </div>

      {/* Wikipedia-style body */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <section className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <Sparkles className="h-5 w-5 text-[#FFB800]" />
              Overview
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {tool.overview ?? tool.description}
            </p>
          </section>

          <section className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">Best For</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {(tool.bestFor ?? []).map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-slate-300"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFB800]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">Key Features</h2>
            <ul className="mt-4 space-y-2">
              {(tool.features ?? []).map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-slate-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB800]" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="glass-card h-fit rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-bold text-white">Quick Facts</h2>
          <dl className="mt-2">
            <InfoRow label="Pricing" value={tool.pricing ?? "—"} />
            <InfoRow label="Free Plan" value={formatMaybe(tool.freePlan)} />
            <InfoRow label="API Availability" value={formatMaybe(tool.apiAvailable)} />
            <InfoRow
              label="Platforms"
              value={(tool.platforms ?? []).join(" · ") || "—"}
            />
            <InfoRow label="Company" value={tool.company ?? "—"} />
            <InfoRow label="Category" value={tool.category} />
          </dl>

          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#FFB800] px-5 py-3 text-sm font-semibold text-[#030712]"
          >
            Launch {tool.name}
            <ExternalLink className="h-4 w-4" />
          </a>
        </aside>
      </div>

      {/* People Also Use */}
      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            People Also Use
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Tools students often explore alongside {tool.name}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((related) => (
              <Link
                key={related.id}
                href={`/labs/${related.slug}`}
                className="glass-card group flex items-center gap-3 rounded-xl p-4 transition-all hover:glow-amber hover:border-[rgba(255,184,0,0.35)]"
              >
                <ToolLogo name={related.name} logo={related.logo} size="sm" />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white transition-colors group-hover:text-[#FFB800]">
                    {related.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {related.company ?? related.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <div className="flex flex-col justify-between gap-3 border-t border-[rgba(255,184,0,0.08)] pt-8 sm:flex-row">
        {prevTool ? (
          <Link
            href={`/labs/${prevTool.slug}`}
            className="group flex items-center gap-2 rounded-xl border border-[rgba(255,184,0,0.12)] px-4 py-3 text-sm text-slate-300 transition-colors hover:border-[rgba(255,184,0,0.3)] hover:text-[#FFB800]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>
              <span className="block text-[10px] uppercase tracking-wider text-slate-500">
                Previous
              </span>
              {prevTool.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {nextTool ? (
          <Link
            href={`/labs/${nextTool.slug}`}
            className="group flex items-center justify-end gap-2 rounded-xl border border-[rgba(255,184,0,0.12)] px-4 py-3 text-sm text-slate-300 transition-colors hover:border-[rgba(255,184,0,0.3)] hover:text-[#FFB800] sm:ml-auto"
          >
            <span className="text-right">
              <span className="block text-[10px] uppercase tracking-wider text-slate-500">
                Next
              </span>
              {nextTool.name}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
