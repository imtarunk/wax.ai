import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();
    const cleanPlan = ["creator", "team", "agency"].includes(plan) ? plan : "creator";
    
    const demoEmail = `demo-${cleanPlan}@socialai.com`;
    const demoPassword = "demopassword123";

    // Check if demo user already exists
    let existingUser = await db.query.users.findFirst({
      where: eq(users.email, demoEmail),
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(demoPassword, 10);
      const [newUser] = await db
        .insert(users)
        .values({
          name: `Demo ${cleanPlan.charAt(0).toUpperCase() + cleanPlan.slice(1)}`,
          email: demoEmail,
          password: hashedPassword,
          plan: cleanPlan as "creator" | "team" | "agency",
        })
        .returning();
      
      existingUser = newUser;
    } else {
      // Ensure the plan is updated
      await db
        .update(users)
        .set({ plan: cleanPlan as "creator" | "team" | "agency" })
        .where(eq(users.id, existingUser.id));
    }

    return NextResponse.json({
      email: demoEmail,
      plan: cleanPlan,
    });
  } catch (error: any) {
    console.error("Demo login setup API error:", error);
    return NextResponse.json(
      { message: "Could not create demo account." },
      { status: 500 }
    );
  }
}
