import { NextRequest, NextResponse } from "next/server";
import { uploadMedia, isVercelBlobConfigured } from "@/lib/blob-storage";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const singleFile = formData.get("file") as File | null;

    const filesToProcess: File[] = [];
    if (singleFile) {
      filesToProcess.push(singleFile);
    }
    if (files && files.length > 0) {
      for (const f of files) {
        if (f && f.name && !filesToProcess.some((p) => p.name === f.name && p.size === f.size)) {
          filesToProcess.push(f);
        }
      }
    }

    if (filesToProcess.length === 0) {
      return NextResponse.json({ success: false, message: "No files uploaded" }, { status: 400 });
    }

    const results: { url: string; filename: string; provider: string }[] = [];

    for (const file of filesToProcess) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const result = await uploadMedia(buffer, file.name, file.type);
      results.push({
        url: result.url,
        filename: file.name,
        provider: result.provider,
      });
    }

    return NextResponse.json({
      success: true,
      url: results[0]?.url,
      files: results,
      isVercelBlob: isVercelBlobConfigured(),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}
