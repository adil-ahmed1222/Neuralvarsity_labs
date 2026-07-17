"use client";

import Image from "next/image";
import Link from "next/link";

const BRAND_LOGO = "/brand/neuralvarsity-logo.png";

export function NavbarLogo() {
  return (
    <Link
      href="/labs"
      prefetch
      aria-label="NeuralVarsity Labs home"
      className="group flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#FFB400]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
    >
      <Image
        src={BRAND_LOGO}
        alt="NeuralVarsity Logo"
        width={44}
        height={44}
        priority
        className="h-10 w-10 object-contain sm:h-11 sm:w-11"
      />

      <div>
        <p className="text-base font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#FFB400]">
          NeuralVarsity Labs
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
          AI Agents & Automation
        </p>
      </div>
    </Link>
  );
}
