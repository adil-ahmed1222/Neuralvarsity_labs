import { NextResponse } from "next/server";
import { fetchCMSProjectBySlug } from "@/services/github.service";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function GET(_: Request, { params }: Props) {
  const { slug } = await params;
  try {
    const result = await fetchCMSProjectBySlug(slug);
    if (!result) return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json({ ...result.detail, cms: result.project });
  } catch (error) {
    const status = (error as Error & { status?: number }).status ?? 500;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch project" },
      { status: status === 403 ? 429 : 500 }
    );
  }
}
