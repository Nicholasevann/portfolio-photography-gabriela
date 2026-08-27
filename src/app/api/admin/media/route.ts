import { NextRequest, NextResponse } from "next/server";
import { listMedia, deleteMedia, isVercelBlobConfigured } from "@/lib/blob-storage";

export async function GET() {
  try {
    const media = await listMedia();
    return NextResponse.json({
      success: true,
      data: media,
      isVercelBlob: isVercelBlobConfigured(),
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to list media" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    if (!url) {
      return NextResponse.json({ success: false, message: "Media URL is required" }, { status: 400 });
    }

    const deleted = await deleteMedia(url);
    return NextResponse.json({ success: deleted, message: deleted ? "File deleted" : "Could not delete file" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete media" }, { status: 500 });
  }
}
