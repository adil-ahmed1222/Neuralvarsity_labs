import { NextResponse } from "next/server";
import { generateMockDeployments, getAllProjects } from "@/services/github.service";

export async function GET() {
  try {
    const projects = await getAllProjects();
    const deployments = generateMockDeployments(projects);
    return NextResponse.json({ deployments, total: deployments.length });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch deployments" },
      { status: 500 }
    );
  }
}
