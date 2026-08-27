import { put, del, list } from "@vercel/blob";
import fs from "fs";
import path from "path";

/**
 * Checks if Vercel Blob is configured with a valid token.
 */
export function isVercelBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/**
 * Upload a file buffer to Vercel Blob (or fallback to local /public/uploads).
 * Returns the public URL of the uploaded image.
 */
export async function uploadMedia(
  fileBuffer: Buffer,
  filename: string,
  contentType?: string
): Promise<{ url: string; provider: "vercel-blob" | "local" }> {
  // Sanitize filename
  const cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const uniqueName = `${Date.now()}-${cleanName}`;

  if (isVercelBlobConfigured()) {
    try {
      const blob = await put(`portfolio/${uniqueName}`, fileBuffer, {
        access: "public",
        contentType: contentType || "image/jpeg",
      });
      return { url: blob.url, provider: "vercel-blob" };
    } catch (error) {
      console.warn("Vercel Blob upload failed, attempting local fallback:", error);
    }
  }

  // Local filesystem fallback
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, uniqueName);
  fs.writeFileSync(filePath, fileBuffer);

  return {
    url: `/uploads/${uniqueName}`,
    provider: "local",
  };
}

/**
 * Delete a media file from Vercel Blob or local storage.
 */
export async function deleteMedia(url: string): Promise<boolean> {
  if (!url) return false;

  if (url.startsWith("https://") && url.includes("vercel-storage.com") && isVercelBlobConfigured()) {
    try {
      await del(url);
      return true;
    } catch (e) {
      console.error("Failed to delete from Vercel Blob:", e);
      return false;
    }
  }

  if (url.startsWith("/uploads/")) {
    const filename = url.replace("/uploads/", "");
    const filePath = path.join(process.cwd(), "public", "uploads", filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        return true;
      } catch (e) {
        console.error("Failed to delete local file:", e);
      }
    }
  }

  return false;
}

/**
 * List media files available in Vercel Blob or local uploads folder.
 */
export async function listMedia(): Promise<{ url: string; pathname: string; size?: number; uploadedAt?: string }[]> {
  const items: { url: string; pathname: string; size?: number; uploadedAt?: string }[] = [];

  if (isVercelBlobConfigured()) {
    try {
      const { blobs } = await list({ prefix: "portfolio/" });
      for (const blob of blobs) {
        items.push({
          url: blob.url,
          pathname: blob.pathname,
          size: blob.size,
          uploadedAt: blob.uploadedAt?.toISOString(),
        });
      }
      return items;
    } catch (e) {
      console.error("Failed to list Vercel blobs:", e);
    }
  }

  // Local uploads list
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    for (const file of files) {
      const stat = fs.statSync(path.join(uploadsDir, file));
      items.push({
        url: `/uploads/${file}`,
        pathname: `uploads/${file}`,
        size: stat.size,
        uploadedAt: stat.mtime.toISOString(),
      });
    }
  }

  return items;
}
