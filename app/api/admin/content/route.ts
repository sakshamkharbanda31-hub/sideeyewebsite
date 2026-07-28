import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { PageContent } from "@/models/PageContent";

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

  return NextResponse.json({ success: true });
}