import { NextRequest, NextResponse } from "next/server";
import { getGallery, saveGallery } from "@/lib/data-store";
import { GalleryItem } from "@/types/portfolio";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const gallery = await getGallery();
    return NextResponse.json({ success: true, data: gallery });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let currentGallery = await getGallery();

    if (Array.isArray(body)) {
      // Replace/reorder entire gallery array
      currentGallery = body as GalleryItem[];
    } else {
      // Add single gallery item
      const newItem = body as GalleryItem;
      if (!newItem.id) {
        newItem.id = `gal-${Date.now()}`;
      }
      currentGallery.unshift(newItem);
    }

    const saved = await saveGallery(currentGallery);
    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json({ success: true, data: saved, message: "Gallery updated successfully" });
  } catch (error) {
    console.error("POST /api/admin/gallery error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to update gallery" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, message: "Photo ID is required" }, { status: 400 });
    }

    const currentGallery = await getGallery();
    const updated = currentGallery.filter((item) => item.id !== id);
    await saveGallery(updated);

    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json({ success: true, data: updated, message: "Photo removed from gallery" });
  } catch (error) {
    console.error("DELETE /api/admin/gallery error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Failed to delete photo" },
      { status: 500 }
    );
  }
}
