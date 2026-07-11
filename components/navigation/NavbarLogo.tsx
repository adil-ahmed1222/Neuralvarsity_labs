"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const BRAND_LOGO = "/brand/neuralvarsity-logo.png";

export function NavbarLogo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link
      href="/labs"
      aria-label="NeuralVarsity Labs home"
      className="group flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#FFB400]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
    >
      <motion.div
        className="relative shrink-0"
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  filter: [
                    "drop-shadow(0 0 4px rgba(255,180,0,0.15))",
                    "drop-shadow(0 0 12px rgba(255,180,0,0.35))",
                    "drop-shadow(0 0 4px rgba(255,180,0,0.15))",
                  ],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Image
            src={BRAND_LOGO}
            alt="NeuralVarsity Logo"
            width={44}
            height={44}
            priority
            className="h-10 w-10 object-contain transition-opacity duration-300 group-hover:opacity-95 sm:h-11 sm:w-11"
          />
        </motion.div>
      </motion.div>

      <div>
        <p className="text-base font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[#FFB400]">
          NeuralVarsity Labs
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 transition-colors duration-300 group-hover:text-slate-400">
          AI Agents & Automation
        </p>
      </div>
    </Link>
  );
}
