"use client";

import Image from "next/image";
import { useState } from "react";

const DEFAULT_LOGO = "/logos/default.svg";

interface ToolLogoProps {
  name: string;
  logo: string;
  size?: "sm" | "md";
}

export function ToolLogo({ name, logo, size = "md" }: ToolLogoProps) {
  const [src, setSrc] = useState(logo);
  const dim = size === "sm" ? "h-10 w-10" : "h-12 w-12";
  const px = size === "sm" ? 40 : 48;

  return (
    <Image
      src={src}
      alt={`${name} Logo`}
      width={px}
      height={px}
      loading="lazy"
      unoptimized={src.endsWith(".svg")}
      className={`${dim} shrink-0 rounded-xl bg-transparent object-contain`}
      onError={() => {
        if (src !== DEFAULT_LOGO) setSrc(DEFAULT_LOGO);
      }}
    />
  );
}
