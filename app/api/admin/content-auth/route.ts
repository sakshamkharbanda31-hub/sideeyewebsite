import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { verifyContentPassword, createContentSession, hasContentSession } from "@/lib/contentAuth";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { password } = await request.json();
  const valid = await verifyContentPassword(password);


  if (!valid) {
    return NextResponse.json({ error: "Incorrect content password" }, { status: 401 });
  }

  await createContentSession();
  return NextResponse.json({ success: true });
}

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hasAccess = await hasContentSession();
  return NextResponse.json({ hasAccess });
}