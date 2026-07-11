import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnimatedBackground />
      {children}
    </>
  );
}
