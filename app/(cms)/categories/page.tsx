import { Card } from "@/components/ui/card";

export const metadata = { title: "Categories | NeuralVarsity CMS" };

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Categories</h1>
      <Card className="p-8 text-center text-slate-500">
        Categories are auto-generated from repository topics and languages. Connect PostgreSQL to persist custom categories.
      </Card>
    </div>
  );
}
