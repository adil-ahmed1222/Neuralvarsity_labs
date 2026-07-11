import { Hexagon } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[rgba(255,184,0,0.08)] px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Hexagon className="h-5 w-5 text-[#FFB800]/60" />
          <span className="text-sm text-slate-500">© NeuralVarsity Labs 2026</span>
        </div>
        <p className="text-xs text-slate-600">
          labs.neuralvarsity.ai — AI Tools Lab for students
        </p>
      </div>
    </footer>
  );
}
