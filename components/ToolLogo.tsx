"use client";

import Image from "next/image";

interface ToolLogoProps {
  name: string;
  logo: string;
  size?: "sm" | "md";
}

export function ToolLogo({ name, logo, size = "md" }: ToolLogoProps) {
  const dim = size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const img = size === "sm" ? 28 : 32;

  return (
    <div
      className={`${dim} flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[rgba(255,184,0,0.12)] bg-[#0F172A]/90 p-1.5 shadow-inner`}
    >
      <Image
        src={logo}
        alt={`${name} logo`}
        width={img}
        height={img}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
