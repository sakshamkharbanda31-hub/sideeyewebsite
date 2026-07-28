import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const CONTENT_SESSION_COOKIE = "sev_content_session";

export async function verifyContentPassword(password: string): Promise<boolean> {
  const hash = process.env.CONTENT_EDITOR_PASSWORD_HASH;
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}

export async function createContentSession() {
  const cookieStore = await cookies();
  cookieStore.set(CONTENT_SESSION_COOKIE, "verified", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 4, // 4 hours
    path: "/",
  });
}

export async function hasContentSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(CONTENT_SESSION_COOKIE)?.value === "verified";
}

export async function clearContentSession() {
  const cookieStore = await cookies();
  cookieStore.delete(CONTENT_SESSION_COOKIE);
}