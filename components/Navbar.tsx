"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { NavbarLogo } from "./navigation/NavbarLogo";
import { NavLinkButton } from "./navigation/NavLinkButton";
import { SuggestToolButton } from "./navigation/SuggestToolButton";
import { HamburgerButton, MobileNav } from "./navigation/MobileNav";

const PARTICLES = [
  { top: "18%", left: "12%", size: 3, delay: 0 },
  { top: "62%", left: "28%", size: 2, delay: 1.2 },
  { top: "34%", left: "72%", size: 4, delay: 0.6 },
  { top: "78%", left: "58%", size: 2, delay: 2 },
  { top: "42%", left: "88%", size: 3, delay: 1.8 },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLabs =
    pathname === "/labs" || pathname.startsWith("/labs/") || pathname === "/";
  const isProjects = pathname.startsWith("/projects");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  const handleToolsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isLabs) {
      event.preventDefault();
      document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="sticky top-0 z-50 px-3 pt-3 sm:px-4 md:px-6">
        <motion.header
          role="banner"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
          }
          className={cn(
            "relative mx-auto max-w-7xl overflow-hidden rounded-2xl border transition-[height,box-shadow,backdrop-filter] duration-500 ease-out will-change-transform",
            scrolled
              ? "h-[4.25rem] border-[rgba(255,180,0,0.22)] shadow-[0_8px_40px_rgba(0,0,0,0.55),0_0_30px_rgba(255,180,0,0.08)] backdrop-blur-3xl"
              : "h-20 border-[rgba(255,180,0,0.14)] shadow-[0_4px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(255,180,0,0.05)] backdrop-blur-xl"
          )}
          style={{
            background: scrolled
              ? "rgba(3, 7, 18, 0.88)"
              : "rgba(3, 7, 18, 0.72)",
          }}
        >
          <div
            aria-hidden="true"
            className="nav-gradient-bg pointer-events-none absolute inset-0 opacity-80"
          />
          <div
            aria-hidden="true"
            className="nav-grid-pattern pointer-events-none absolute inset-0 opacity-[0.18]"
          />

          {!prefersReducedMotion &&
            PARTICLES.map((particle, index) => (
              <motion.span
                key={index}
                aria-hidden="true"
                className="pointer-events-none absolute rounded-full bg-[#FFB400]"
                style={{
                  top: particle.top,
                  left: particle.left,
                  width: particle.size,
                  height: particle.size,
                  boxShadow: "0 0 8px rgba(255,180,0,0.6)",
                }}
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.25, 0.7, 0.25],
                }}
                transition={{
                  duration: 4 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.delay,
                }}
              />
            ))}

          <div className="relative flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
            <NavbarLogo />

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-2.5 md:flex lg:gap-3"
            >
              <NavLinkButton
                href="/labs"
                label="Explore Tools"
                isActive={isLabs}
                onClick={handleToolsClick}
                className="hidden sm:inline-flex"
                delay={0.35}
              />
              <NavLinkButton
                href="/projects"
                label="Projects"
                isActive={isProjects}
                delay={0.43}
              />
              <SuggestToolButton delay={0.51} />
            </nav>

            <div className="md:hidden">
              <HamburgerButton
                isOpen={mobileOpen}
                onClick={() => setMobileOpen((open) => !open)}
              />
            </div>
          </div>
        </motion.header>
      </div>

      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isLabs={isLabs}
        isProjects={isProjects}
        onToolsClick={handleToolsClick}
      />
    </>
  );
}
