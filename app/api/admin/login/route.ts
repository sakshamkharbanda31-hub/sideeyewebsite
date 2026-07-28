import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createSession } from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { username, password } = parsed.data;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH_NEW;

console.log("ADMIN KEY CHECK", {
  usingNewKey: !!process.env.ADMIN_PASSWORD_HASH_NEW,
  newKeyStart: process.env.ADMIN_PASSWORD_HASH_NEW?.slice(0, 7),
  newKeyLength: process.env.ADMIN_PASSWORD_HASH_NEW?.length,
  oldKeyStart: process.env.ADMIN_PASSWORD_HASH?.slice(0, 7),
  oldKeyLength: process.env.ADMIN_PASSWORD_HASH?.length,
});

    if (!adminUsername || !adminPasswordHash) {
      console.log("ADMIN DEBUG", {
        hasUsername: !!adminUsername,
        hasHash: !!adminPasswordHash,
      });

      return NextResponse.json(
        { error: "Admin auth is not configured" },
        { status: 503 }
      );
    }

    console.log("ADMIN DEBUG", {
      hasUsername: !!adminUsername,
      adminUsername,
      hasHash: !!adminPasswordHash,
      hashStart: adminPasswordHash?.slice(0, 7),
      hashLength: adminPasswordHash?.length,
      inputUsername: username,
      usernameMatches: username === adminUsername,
    });

    if (username !== adminUsername) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const passwordMatches = await bcrypt.compare(password, adminPasswordHash);

    console.log("ADMIN DEBUG PASSWORD", {
      passwordMatches,
    });

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    await createSession(username);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}