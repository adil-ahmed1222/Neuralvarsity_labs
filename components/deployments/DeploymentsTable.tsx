"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useDeployments } from "@/hooks/useProjects";
import { formatRelativeDate } from "@/lib/utils";
import { ExternalLink, RotateCcw, Rocket } from "lucide-react";

const statusVariant = {
  success: "success" as const,
  building: "warning" as const,
  failed: "error" as const,
  pending: "outline" as const,
  cancelled: "outline" as const,
};

export function DeploymentsTable({ limit }: { limit?: number }) {
  const { data: deployments, isLoading } = useDeployments();
  const items = limit ? deployments?.slice(0, limit) : deployments;

  if (isLoading) {
    return <div className="text-slate-500 text-sm">Loading deployments...</div>;
  }

  if (!items?.length) {
    return (
      <Card className="p-8 text-center text-slate-500">
        No deployments tracked yet. Projects with live URLs will appear here.
      </Card>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800/80">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-800/80 bg-slate-900/40 text-[10px] uppercase tracking-widest text-slate-500">
            <th className="px-4 py-3">Project</th>
            <th className="px-4 py-3">Environment</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Provider</th>
            <th className="px-4 py-3">Deployed</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((dep: {
            id: string;
            projectName: string;
            environment: string;
            status: keyof typeof statusVariant;
            provider: string;
            url: string | null;
            deployedAt: string;
            commitHash: string | null;
            buildTime: number | null;
          }) => (
            <tr key={dep.id} className="border-b border-slate-800/50 hover:bg-slate-900/30">
              <td className="px-4 py-3 font-medium text-white">{dep.projectName}</td>
              <td className="px-4 py-3 capitalize text-slate-400">{dep.environment}</td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant[dep.status] ?? "outline"}>{dep.status}</Badge>
              </td>
              <td className="px-4 py-3 text-slate-400 capitalize">{dep.provider}</td>
              <td className="px-4 py-3 text-slate-500">{formatRelativeDate(dep.deployedAt)}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  {dep.url && (
                    <a href={dep.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
                    </a>
                  )}
                  <Button variant="ghost" size="sm" title="Redeploy (UI)"><Rocket className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="sm" title="Rollback (UI)"><RotateCcw className="h-3.5 w-3.5" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
