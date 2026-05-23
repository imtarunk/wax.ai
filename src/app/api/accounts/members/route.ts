import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { accountMembers, connectedAccounts } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get("accountId");

  if (!accountId) {
    return NextResponse.json({ message: "Account ID is required" }, { status: 400 });
  }

  try {
    // Confirm account ownership
    const account = await db.query.connectedAccounts.findFirst({
      where: and(
        eq(connectedAccounts.id, accountId),
        eq(connectedAccounts.userId, session.user.id)
      ),
    });

    if (!account) {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    const members = await db.query.accountMembers.findMany({
      where: eq(accountMembers.accountId, accountId),
    });

    return NextResponse.json(members);
  } catch (error: any) {
    console.error("Account members GET error:", error);
    return NextResponse.json({ message: "Failed to query account members" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { accountId, memberEmail, role } = await req.json();

    if (!accountId || !memberEmail || !role) {
      return NextResponse.json(
        { message: "Account ID, member email, and role are required fields" },
        { status: 400 }
      );
    }

    // Verify user owns the connected account they are inviting others to
    const account = await db.query.connectedAccounts.findFirst({
      where: and(
        eq(connectedAccounts.id, accountId),
        eq(connectedAccounts.userId, session.user.id)
      ),
    });

    if (!account) {
      return NextResponse.json(
        { message: "You must own this connected account to invite members" },
        { status: 403 }
      );
    }

    const [invitedMember] = await db
      .insert(accountMembers)
      .values({
        accountId,
        memberEmail,
        role: role as "owner" | "editor" | "viewer",
        invitedAt: new Date(),
      })
      .returning();

    return NextResponse.json(invitedMember);
  } catch (error: any) {
    console.error("Account members POST error:", error);
    return NextResponse.json({ message: "Failed to invite account member" }, { status: 500 });
  }
}
