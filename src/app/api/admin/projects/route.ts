import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProject, deleteProject, getPortfolioData, savePortfolioData } from "@/lib/data-store";
import { ProjectItem } from "@/types/portfolio";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const project = (await request.json()) as ProjectItem;
    if (!project.slug || !project.title) {
      return NextResponse.json({ success: false, message: "Title and slug are required" }, { status: 400 });
    }

    const saved = await saveProject(project);

    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${project.slug}`);

    return NextResponse.json({ success: true, data: saved, message: "Project saved successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save project" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      // Reordering all projects
      const portfolio = await getPortfolioData();
      portfolio.projects = body as ProjectItem[];
      await savePortfolioData(portfolio);

      revalidatePath("/");
      revalidatePath("/work");

      return NextResponse.json({ success: true, message: "Projects reordered successfully" });
    } else {
      const project = body as ProjectItem;
      const saved = await saveProject(project);

      revalidatePath("/");
      revalidatePath("/work");
      revalidatePath(`/work/${project.slug}`);

      return NextResponse.json({ success: true, data: saved, message: "Project updated successfully" });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to update projects" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ success: false, message: "Slug is required" }, { status: 400 });
    }

    const deleted = await deleteProject(slug);
    if (!deleted) {
      return NextResponse.json({ success: false, message: "Project not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath(`/work/${slug}`);

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete project" }, { status: 500 });
  }
}
