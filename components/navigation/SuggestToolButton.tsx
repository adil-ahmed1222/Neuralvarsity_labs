"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Magnetic } from "./Magnetic";

interface SuggestToolButtonProps {
  className?: string;
  delay?: number;
}

export function SuggestToolButton({ className, delay = 0 }: SuggestToolButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Magnetic strength={0.18}>
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <motion.a
          href="mailto:labs@neuralvarsity.ai?subject=Tool%20Suggestion"
          aria-label="Suggest a new AI tool via email"
          className={cn(
            "group relative inline-flex cursor-pointer items-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-[#030712] outline-none",
            "nav-cta-gradient nav-cta-pulse focus-visible:ring-2 focus-visible:ring-[#FFB400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]",
            className
          )}
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 0 40px rgba(255,180,0,0.55), 0 8px 32px rgba(0,0,0,0.35)",
                }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 nav-cta-shine opacity-0 group-hover:opacity-100"
            initial={{ x: "-120%" }}
            whileHover={prefersReducedMotion ? undefined : { x: "120%" }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          />

          <span className="relative z-10">Suggest Tool</span>
        </motion.a>
      </motion.div>
    </Magnetic>
  );
}
