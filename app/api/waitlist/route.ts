import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { waitlistEntries } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Insert into database
    await db.insert(waitlistEntries).values({
      email,
    });

    return NextResponse.json(
      { message: "Successfully joined waitlist" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in waitlist signup:", error);
    return NextResponse.json(
      { error: "Failed to join waitlist" },
      { status: 500 }
    );
  }
}
