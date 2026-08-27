import { NextRequest, NextResponse } from "next/server";
import { getAbout, saveAbout, getPerson, savePerson } from "@/lib/data-store";
import { AboutData, PersonData } from "@/types/portfolio";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const about = await getAbout();
    const person = await getPerson();
    return NextResponse.json({ success: true, data: { about, person } });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch about data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { about, person } = body as { about?: AboutData; person?: PersonData };

    if (about) {
      await saveAbout(about);
    }
    if (person) {
      await savePerson(person);
    }

    revalidatePath("/about");
    revalidatePath("/");

    return NextResponse.json({ success: true, message: "About information saved successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to save about data" }, { status: 500 });
  }
}
