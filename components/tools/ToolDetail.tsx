"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Flame, Star } from "lucide-react";
import { ToolLogo } from "@/components/ToolLogo";
import { cn } from "@/lib/cn";
import { CATEGORY_COLORS } from "@/types/tool";
import type { Tool } from "@/types/tool";

interface ToolDetailProps {
  tool: Tool;
  relatedTools: Tool[];
}

export function ToolDetail({ tool, relatedTools }: ToolDetailProps) {
  return (
    <div className="space-y-10">
      <Link
        href="/labs#tools"
        className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-[#FFB800]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to AI Tools
      </Link>

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
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                {tool.name}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                {tool.description}
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

      {relatedTools.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Related Tools
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            More tools in {tool.category}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                    {related.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
