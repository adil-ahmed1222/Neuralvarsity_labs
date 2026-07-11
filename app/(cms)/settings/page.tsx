import { Card } from "@/components/ui/card";

export const metadata = { title: "Settings | NeuralVarsity CMS" };

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <div className="grid gap-4 max-w-xl">
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-white">GitHub Integration</h2>
          <p className="text-sm text-slate-500">Username: adil-ahmed1222</p>
          <p className="text-sm text-slate-500">Set GITHUB_TOKEN in .env for higher rate limits</p>
        </Card>
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-white">Database</h2>
          <p className="text-sm text-slate-500">Set DATABASE_URL for PostgreSQL/Supabase persistence</p>
        </Card>
      </div>
    </div>
  );
}
