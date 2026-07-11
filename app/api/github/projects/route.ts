import { NextResponse } from "next/server";
import { fetchCMSProjects, fetchProjectStats, syncGitHubCache } from "@/services/github.service";

export async function GET() {
  try {
    const [projects, stats] = await Promise.all([
      fetchCMSProjects(),
      fetchProjectStats(),
    ]);
    return NextResponse.json({ projects, stats, total: projects.length });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    const message = error instanceof Error ? error.message : "GitHub API failed";
    return NextResponse.json(
      { error: message, retryable: status === 403 || status >= 500 },
      { status: status === 403 ? 429 : 500 }
    );
  }
}

export async function POST() {
  syncGitHubCache();
  return GET();
}
