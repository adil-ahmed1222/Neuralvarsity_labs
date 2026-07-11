import { Card } from "@/components/ui/card";

export const metadata = { title: "Resources | NeuralVarsity CMS" };

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Resources</h1>
      <Card className="p-8 text-center text-slate-500">
        CMS resources module. Connect PostgreSQL to manage guides, docs, and templates.
      </Card>
    </div>
  );
}
