import { NextRequest, NextResponse } from "next/server";

type Session = { lastSeen: number };
const sessions = new Map<string, Session>();
const ACTIVE_WINDOW_MS = 30000;

function pruneAndCount() {
  const now = Date.now();
  for (const [id, s] of sessions) {
    if (now - s.lastSeen > ACTIVE_WINDOW_MS) sessions.delete(id);
  }
  return sessions.size;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const id = body?.id;
  if (typeof id === "string" && id.length > 0) {
    sessions.set(id, { lastSeen: Date.now() });
  }
  return NextResponse.json({ count: pruneAndCount() });
}

export async function GET() {
  return NextResponse.json({ count: pruneAndCount() });
}