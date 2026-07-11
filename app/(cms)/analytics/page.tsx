import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";

export const metadata = { title: "Analytics | NeuralVarsity CMS" };

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500">Repository and deployment insights</p>
      </div>
      <MetricsGrid />
      <DashboardCharts />
    </div>
  );
}
