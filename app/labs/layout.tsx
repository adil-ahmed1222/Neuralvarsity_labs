import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnimatedBackground />
      {children}
    </>
  );
}
