import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData, savePortfolioData, resetToDefaultData } from "@/lib/data-store";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return new NextResponse(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="portfolio-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Backup export failed" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, data } = await request.json();

    if (action === "reset") {
      const reset = await resetToDefaultData();
      revalidatePath("/");
      revalidatePath("/work");
      revalidatePath("/about");
      revalidatePath("/gallery");
      return NextResponse.json({ success: true, message: "Restored to default template data", data: reset });
    }

    if (action === "import" && data) {
      const restored = await savePortfolioData(data);
      revalidatePath("/");
      revalidatePath("/work");
      revalidatePath("/about");
      revalidatePath("/gallery");
      return NextResponse.json({ success: true, message: "Data imported successfully", data: restored });
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Backup restore failed" }, { status: 500 });
  }
}
