"use client";

import { Sparkles } from "lucide-react";
import { tools } from "@/data/tools";

export function Hero() {
  const toolCount = tools.length;

  return (
    <section className="relative px-6 pb-10 pt-20 text-center lg:px-8 lg:pt-28 lg:pb-12">
      <div className="mx-auto max-w-3xl animate-fade-up">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(255,184,0,0.2)] bg-[rgba(255,184,0,0.06)] px-4 py-1.5 text-sm text-[#FFB800]">
          <Sparkles className="h-3.5 w-3.5" />
          NeuralVarsity AI Tools Lab
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Explore{" "}
          <span className="text-gradient">{toolCount}+ AI Tools</span>
          <br />
          in One Place
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Launch, learn, and build with the world&apos;s best AI tools. Access every
          essential AI platform from one premium dashboard.
        </p>
      </div>
    </section>
  );
}
