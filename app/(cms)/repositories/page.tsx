import { ProjectsGrid } from "@/components/projects/ProjectsGrid";

export const metadata = { title: "Repositories | NeuralVarsity CMS" };

export default function RepositoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Repositories</h1>
        <p className="mt-1 text-sm text-slate-500">GitHub repositories from adil-ahmed1222</p>
      </div>
      <ProjectsGrid />
    </div>
  );
}
