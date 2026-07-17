import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SuggestToolForm } from "@/components/SuggestToolForm";

export const metadata: Metadata = {
  title: "Suggest a Tool | NeuralVarsity AI Tools Lab",
  description: "Recommend an AI tool to add to the NeuralVarsity Labs marketplace.",
};

const STEPS = [
  {
    title: "We review every submission",
    body: "Our team checks quality, usefulness for students, and link accuracy.",
  },
  {
    title: "If approved → added within 48 hours",
    body: "Approved tools are published to the marketplace quickly.",
  },
  {
    title: "Contributor gets credited",
    body: "We keep a note of helpful suggestions when we expand the catalog.",
  },
];

export default function SuggestToolPage() {
  return (
    <>
      <Navbar />
      <main className="px-6 py-16 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white sm:text-4xl">Suggest a Tool</h1>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Know an AI tool that should be on NeuralVarsity Labs? Fill out the form
                and we&apos;ll review your suggestion.
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8">
              <SuggestToolForm />
            </div>
          </div>

          <aside className="glass-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white">What Happens Next?</h2>
            <ol className="mt-6 space-y-0">
              {STEPS.map((step, index) => (
                <li key={step.title} className="relative pb-8 last:pb-0">
                  {index < STEPS.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px bg-[rgba(255,184,0,0.2)]"
                    />
                  )}
                  <div className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(255,184,0,0.35)] bg-[rgba(255,184,0,0.1)] text-sm font-bold text-[#FFB800]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{step.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">{step.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
