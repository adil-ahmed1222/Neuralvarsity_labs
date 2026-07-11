import { DeploymentsTable } from "@/components/deployments/DeploymentsTable";

export const metadata = { title: "Deployments | NeuralVarsity CMS" };

export default function DeploymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Deployments</h1>
        <p className="mt-1 text-sm text-slate-500">Track production, staging, and development deployments</p>
      </div>
      <DeploymentsTable />
    </div>
  );
}
