import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { Lead } from "@/models/Lead";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  interest: z.string(),
  budget: z.string(),
  message: z.string().min(10),
  website: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, interest, budget, message, website } = parsed.data;

    if (website && website.length > 0) {
      return NextResponse.json({ success: true, message: "Lead received" });
    }

    await connectDB();

    await Lead.create({
      name,
      email,
      phone,
      interest,
      budget,
      message,
      optInTimestamp: new Date(),
      status: "new",
    });

    return NextResponse.json(
      { success: true, message: "Your request has been submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    if (error instanceof Error && error.message.includes("MONGODB_URI")) {
      return NextResponse.json(
        { error: "Database configuration error. Please contact support." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to submit your request. Please try again later." },
      { status: 500 }
    );
  }
}
