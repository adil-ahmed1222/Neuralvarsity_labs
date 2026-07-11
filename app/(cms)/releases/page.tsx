import { Card } from "@/components/ui/card";

export const metadata = { title: "Releases | NeuralVarsity CMS" };

export default function ReleasesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Releases</h1>
      <Card className="p-8 text-center text-slate-500">
        View releases on individual project detail pages. GitHub releases are fetched per repository.
      </Card>
    </div>
  );
}
