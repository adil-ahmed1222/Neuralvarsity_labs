import { Card } from "@/components/ui/card";

export const metadata = { title: "Tags | NeuralVarsity CMS" };

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Tags</h1>
      <Card className="p-8 text-center text-slate-500">
        Repository tags are synced from GitHub topics. Use GitHub Sync to refresh.
      </Card>
    </div>
  );
}
