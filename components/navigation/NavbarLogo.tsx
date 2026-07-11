"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Hexagon } from "lucide-react";

export function NavbarLogo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Link
      href="/labs"
      aria-label="NeuralVarsity Labs home"
      className="group flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#FFB400]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
    >
      <motion.div
        className="relative"
        whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { filter: ["drop-shadow(0 0 4px rgba(255,180,0,0.2))", "drop-shadow(0 0 14px rgba(255,180,0,0.5))", "drop-shadow(0 0 4px rgba(255,180,0,0.2))"] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <motion.div
            whileHover={prefersReducedMotion ? undefined : { rotate: 8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Hexagon
              className="h-8 w-8 text-[#FFB400] fill-[#FFB400]/10 transition-colors duration-300 group-hover:fill-[#FFB400]/20 group-hover:text-[#FFC933]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </motion.div>
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
