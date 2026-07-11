"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricSkeleton } from "@/components/ui/skeleton";
import { useStats } from "@/hooks/useProjects";
import { formatNumber } from "@/lib/utils";
import {
  FolderKanban,
  Rocket,
  GitBranch,
  Star,
  Code2,
  Layers,
  GitCommit,
} from "lucide-react";

const metrics = [
  { key: "totalRepos", label: "Total Projects", icon: FolderKanban },
  { key: "liveProjects", label: "Live Projects", icon: Rocket },
  { key: "totalStars", label: "Total Stars", icon: Star },
  { key: "totalForks", label: "Total Forks", icon: GitBranch },
] as const;

export function MetricsGrid() {
  const { data, isLoading } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <MetricSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map(({ key, label, icon: Icon }) => (
        <Card key={key} className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
            <Icon className="h-4 w-4 text-amber-500/60" />
          </div>
          <p className="mt-2 text-3xl font-bold text-white">
            {formatNumber(data?.[key] ?? 0)}
          </p>
        </Card>
      ))}
      <Card className="p-5 col-span-2 lg:col-span-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Top Framework</p>
          <Layers className="h-4 w-4 text-blue-400/60" />
        </div>
        <p className="mt-2 text-xl font-bold text-white">{data?.topFramework ?? "—"}</p>
      </Card>
      <Card className="p-5 col-span-2 lg:col-span-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Primary Language</p>
          <Code2 className="h-4 w-4 text-emerald-400/60" />
        </div>
        <p className="mt-2 text-xl font-bold text-white">{data?.topLanguage ?? "—"}</p>
      </Card>
      {data?.latestCommit && (
        <Card className="p-5 col-span-2 lg:col-span-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <GitCommit className="h-4 w-4 text-amber-400" />
            Latest activity: {new Date(data.latestCommit).toLocaleString()}
          </div>
        </Card>
      )}
    </div>
  );
}
