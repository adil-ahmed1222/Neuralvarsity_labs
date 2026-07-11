"use client";

import { use } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectOverview } from "@/components/cms/ProjectOverview";
import { useCMSProject } from "@/hooks/useCMSProjects";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { data: project, isLoading, error } = useCMSProject(slug);

  return (
    <>
      <Navbar />
      <main className="px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-32">
              <Loader2 className="h-8 w-8 animate-spin text-[#FFB800]" />
              <p className="mt-4 text-sm text-slate-400">Loading project...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="glass-card rounded-2xl border border-red-500/30 bg-red-500/5 p-12 text-center">
              <AlertCircle className="mx-auto h-10 w-10 text-red-400" />
              <h2 className="mt-4 text-lg font-semibold text-white">Project not found</h2>
              <Link
                href="/projects"
                className="mt-4 inline-block text-[#FFB800] hover:underline"
              >
                ← Back to projects
              </Link>
            </div>
          )}

          {project && !isLoading && <ProjectOverview project={project} />}
        </div>
      </main>
      <Footer />
    </>
  );
}
