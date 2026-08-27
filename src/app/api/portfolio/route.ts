import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/data-store";

export async function GET() {
  try {
    const data = await getPortfolioData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch portfolio data" }, { status: 500 });
  }
}
