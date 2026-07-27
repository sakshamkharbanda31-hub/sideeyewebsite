import { NextResponse } from "next/server";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { Banner } from "@/models/Banner";

const VALID_PAGE_KEYS = [
  "services",
  "tools",
  "about",
  "case-studies",
  "faqs",
  "contact",
  "home",
];

export async function GET() {
  await connectDB();
  const banners = await Banner.find({}).lean();
  return NextResponse.json({ banners: JSON.parse(JSON.stringify(banners)) });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const pageKey = formData.get("pageKey") as string | null;
    const alt = (formData.get("alt") as string) || "";
    const caption = (formData.get("caption") as string) || "";
    const grayscale = formData.get("grayscale") === "true";

    if (!file || !pageKey || !VALID_PAGE_KEYS.includes(pageKey)) {
      return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Image must be under 5MB" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".jpg";
    const filename = `${pageKey}-${Date.now()}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads", "banners");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    const imagePath = `/uploads/banners/${filename}`;

    await connectDB();
    await Banner.findOneAndUpdate(
      { pageKey },
      { pageKey, imagePath, alt, caption, grayscale },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, imagePath });
  } catch (error) {
    console.error("Banner upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const pageKey = body?.pageKey as string | null;

    if (!pageKey || !VALID_PAGE_KEYS.includes(pageKey)) {
      return NextResponse.json({ error: "Invalid page key" }, { status: 400 });
    }

    await connectDB();
    const existing = await Banner.findOne({ pageKey }).lean();

    if (existing && "imagePath" in existing) {
      const filePath = path.join(process.cwd(), "public", existing.imagePath as string);
      await unlink(filePath).catch(() => {});
    }

    await Banner.deleteOne({ pageKey });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Banner delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
