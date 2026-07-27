import { NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { HeroVideo } from "@/models/HeroVideo";

const KEY = "home-hero";

export async function GET() {
  await connectDB();
  const entry = await HeroVideo.findOne({ key: KEY }).lean();
  return NextResponse.json({
    videoPath: entry && "videoPath" in entry ? entry.videoPath : null,
  });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("video/")) {
      return NextResponse.json({ error: "File must be a video" }, { status: 400 });
    }

    const MAX_SIZE = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Video must be under 50MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".mp4";
    const filename = `${KEY}-${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "hero-video");
    await mkdir(uploadDir, { recursive: true });

    await connectDB();
    const existing = await HeroVideo.findOne({ key: KEY }).lean();
    if (existing && "videoPath" in existing) {
      const oldPath = path.join(process.cwd(), "public", existing.videoPath as string);
      await unlink(oldPath).catch(() => {});
    }

    await writeFile(path.join(uploadDir, filename), buffer);
    const videoPath = `/uploads/hero-video/${filename}`;

    await HeroVideo.findOneAndUpdate(
      { key: KEY },
      { key: KEY, videoPath },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, videoPath });
  } catch (error) {
    console.error("Hero video upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const existing = await HeroVideo.findOne({ key: KEY }).lean();

    if (existing && "videoPath" in existing) {
      const filePath = path.join(process.cwd(), "public", existing.videoPath as string);
      await unlink(filePath).catch(() => {});
    }

    await HeroVideo.deleteOne({ key: KEY });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Hero video delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}