"use client";

import { useProjects } from "@/hooks/useProjects";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function TechnologiesPage() {
  const { data: projects } = useProjects();
  const techs = new Set<string>();
  projects?.forEach((p: { detectedTechnologies: string[]; language: string | null; framework: string | null }) => {
    p.detectedTechnologies?.forEach((t) => techs.add(t));
    if (p.language) techs.add(p.language);
    if (p.framework) techs.add(p.framework);
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Technology Stack</h1>
        <p className="mt-1 text-sm text-slate-500">Auto-detected from repositories</p>
      </div>
      <Card className="p-6">
        <div className="flex flex-wrap gap-2">
          {Array.from(techs).sort().map((t) => (
            <Badge key={t} variant="info">{t}</Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
