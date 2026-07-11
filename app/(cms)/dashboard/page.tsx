import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { DeploymentsTable } from "@/components/deployments/DeploymentsTable";

export const metadata = {
  title: "Dashboard | NeuralVarsity CMS",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Overview of all GitHub repositories from adil-ahmed1222
        </p>
      </div>

      <MetricsGrid />
      <DashboardCharts />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Recent Projects</h2>
        <ProjectsGrid limit={6} />
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-white">Recent Deployments</h2>
        <DeploymentsTable limit={5} />
      </section>
    </div>
  );
}
