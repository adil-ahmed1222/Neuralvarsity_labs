import Image from "next/image";

const BRAND_LOGO = "/brand/neuralvarsity-logo.png";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-[rgba(255,184,0,0.08)] px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Image
            src={BRAND_LOGO}
            alt="NeuralVarsity Logo"
            width={24}
            height={24}
            className="h-6 w-6 object-contain opacity-80"
          />
          <span className="text-sm text-slate-500">© NeuralVarsity Labs 2026</span>
        </div>
        <p className="text-xs text-slate-600">
          labs.neuralvarsity.ai — AI Tools Lab for students
        </p>
      </div>
    </footer>
  );
}
