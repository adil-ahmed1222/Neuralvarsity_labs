import { NextResponse } from "next/server";
import { getAllProjects, getProjectBySlug } from "@/services/github.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    if (slug) {
      const project = await getProjectBySlug(slug);
      if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json(project);
    }
    const projects = await getAllProjects();
    return NextResponse.json({ projects, total: projects.length });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
