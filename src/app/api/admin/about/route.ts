import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData } from "@/lib/data-store";
import { AboutData, PersonData } from "@/types/portfolio";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json({
      success: true,
      data: { about: data.about, person: data.person },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to fetch about data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { about, person } = body as { about?: AboutData; person?: PersonData };

    const data = await getPortfolioData();
    if (about) {
      data.about = about;
    }
    if (person) {
      data.person = person;
    }

    const saved = await savePortfolioData(data);

    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({
      success: true,
      data: { about: saved.about, person: saved.person },
      message: "About information saved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to save about data" },
      { status: 500 }
    );
  }
}
