import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SuggestToolForm } from "@/components/SuggestToolForm";

export const metadata: Metadata = {
  title: "Suggest a Tool | NeuralVarsity AI Tools Lab",
  description: "Recommend an AI tool to add to the NeuralVarsity Labs marketplace.",
};

export default function SuggestToolPage() {
  return (
    <>
      <Navbar />
      <main className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">Suggest a Tool</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Know an AI tool that should be on NeuralVarsity Labs? Fill out the form below
              and we&apos;ll review your suggestion.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <SuggestToolForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
