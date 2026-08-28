import fs from "fs";
import path from "path";

/**
 * Checks if Vercel Blob is configured (Disabled for local-only Git-backed storage).
 */
export function isVercelBlobConfigured(): boolean {
  return false;
}

/**
 * Upload a file buffer to the local /public/uploads directory.
 * Returns the public URL of the uploaded image.
 */
export async function uploadMedia(
  fileBuffer: Buffer,
  filename: string,
  _contentType?: string
): Promise<{ url: string; provider: "local" }> {
  // Sanitize filename
  const cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
  const uniqueName = `${Date.now()}-${cleanName}`;

  // Ensure local uploads directory exists
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
 * Delete a media file from local storage.
 */
export async function deleteMedia(url: string): Promise<boolean> {
  if (!url) return false;

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
 * List media files available in local uploads folder.
 */
export async function listMedia(): Promise<{ url: string; pathname: string; size?: number; uploadedAt?: string }[]> {
  const items: { url: string; pathname: string; size?: number; uploadedAt?: string }[] = [];

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (fs.existsSync(uploadsDir)) {
    const files = fs.readdirSync(uploadsDir);
    for (const file of files) {
      try {
        const stat = fs.statSync(path.join(uploadsDir, file));
        if (stat.isFile()) {
          items.push({
            url: `/uploads/${file}`,
            pathname: `uploads/${file}`,
            size: stat.size,
            uploadedAt: stat.mtime.toISOString(),
          });
        }
      } catch (e) {
        // Skip unreadable files
      }
    }
  }

  return items.sort((a, b) => (b.uploadedAt || "").localeCompare(a.uploadedAt || ""));
}
