import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactFormEntries } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, company, industry, message } =
      await request.json();

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !company ||
      !industry ||
      !message
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Insert into database
    await db.insert(contactFormEntries).values({
      firstName,
      lastName,
      email,
      company,
      industry,
      message,
    });

    return NextResponse.json(
      { message: "Successfully submitted contact form" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in contact form submission:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
