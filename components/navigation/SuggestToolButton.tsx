"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { SUGGEST_TOOL_PATH } from "@/lib/constants";
import { Magnetic } from "./Magnetic";

interface SuggestToolButtonProps {
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export function SuggestToolButton({ className, delay = 0, onClick }: SuggestToolButtonProps) {
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
        <Link
          href={SUGGEST_TOOL_PATH}
          onClick={onClick}
          aria-label="Suggest a new AI tool"
          className={cn(
            "group relative inline-flex cursor-pointer items-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold text-[#030712] outline-none",
            "nav-cta-gradient nav-cta-pulse focus-visible:ring-2 focus-visible:ring-[#FFB400] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]",
            className
          )}
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 nav-cta-shine opacity-0 group-hover:opacity-100"
            initial={{ x: "-120%" }}
            whileHover={prefersReducedMotion ? undefined : { x: "120%" }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          />

          <span className="relative z-10">Suggest Tool</span>
        </Link>
      </motion.div>
    </Magnetic>
  );
}
