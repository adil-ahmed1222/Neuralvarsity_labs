import { PageContent } from "@/components/PageContent";

import { tools } from "@/data/tools";

export const metadata = {
  title: "AI Tools Lab | NeuralVarsity",
  description: `Explore and launch ${tools.length}+ AI tools in one place`,
};

export default function LabsPage() {
  return (
    <div className="relative min-h-screen isolate">
      <div className="relative z-10">
        <PageContent />
      </div>
    </div>
  );
}
