import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectsPortal } from "@/components/cms/ProjectsPortal";

export const metadata = {
  title: "Projects | NeuralVarsity Labs",
  description: "Project management portal synced from GitHub",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <ProjectsPortal />
      <Footer />
    </>
  );
}
