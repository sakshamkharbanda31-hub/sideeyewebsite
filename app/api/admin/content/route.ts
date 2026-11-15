import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { PageContent } from "@/models/PageContent";

// Revalidate all public pages that read from PageContent
const PUBLIC_PATHS = [
  "/",
  "/services",
  "/about",
  "/tools",
  "/case-studies",
  "/faqs",
  "/contact",
];

async function requireAdminSession() {
  const session = await getSession();
  if (!session) return { ok: false, status: 401 as const };

  return { ok: true as const };
}

export async function GET(request: Request) {
  const check = await requireAdminSession();
  if (!check.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: check.status });
  }

  const { searchParams } = new URL(request.url);
  const pageKey = searchParams.get("pageKey");

  if (!pageKey) {
    return NextResponse.json({ error: "pageKey required" }, { status: 400 });
  }

  await connectDB();
  const record = await PageContent.findOne({ pageKey }).lean();

  return NextResponse.json({ data: record ? (record as any).data : null });
}

export async function POST(request: Request) {
  const check = await requireAdminSession();
  if (!check.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: check.status });
  }

  const body = await request.json();
  const { pageKey, data } = body;

  if (!pageKey || !data) {
    return NextResponse.json({ error: "pageKey and data required" }, { status: 400 });
  }

  await connectDB();
  await PageContent.findOneAndUpdate(
    { pageKey },
    { pageKey, data },
    { upsert: true, new: true }
  );

  // Revalidate all public pages that consume PageContent
  for (const path of PUBLIC_PATHS) {
    revalidatePath(path);
  }

  return NextResponse.json({ success: true });
}