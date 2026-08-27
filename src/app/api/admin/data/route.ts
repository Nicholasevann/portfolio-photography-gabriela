import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/data-store";
import { isVercelBlobConfigured } from "@/lib/blob-storage";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json({
      success: true,
      data,
      isVercelBlobConfigured: isVercelBlobConfigured(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to fetch data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updated = await savePortfolioData(body);

    // Revalidate public pages
    revalidatePath("/");
    revalidatePath("/work");
    revalidatePath("/about");
    revalidatePath("/gallery");
    revalidatePath("/work/[slug]", "page");

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Portfolio data saved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to save data" },
      { status: 500 }
    );
  }
}
