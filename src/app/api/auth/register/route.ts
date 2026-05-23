import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { name, email, password, plan } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email address." },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const [newUser] = await db
      .insert(users)
      .values({
        name: name || "Creator Profile",
        email,
        password: hashedPassword,
        plan: plan || "creator",
      })
      .returning();

    return NextResponse.json(
      {
        message: "Account registered successfully.",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          plan: newUser.plan,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration API error:", error);
    return NextResponse.json(
      { message: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
