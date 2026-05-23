import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { connectedAccounts } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { encryptToken } from "@/lib/crypto";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const deleted = await db
      .delete(connectedAccounts)
      .where(
        and(
          eq(connectedAccounts.id, id),
          eq(connectedAccounts.userId, session.user.id)
        )
      )
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ message: "Account not found or not authorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Account disconnected successfully" });
  } catch (error: any) {
    console.error("Individual account DELETE error:", error);
    return NextResponse.json({ message: "Failed to disconnect account" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const { action, label, colorTag } = body;

    // Retrieve account first
    const account = await db.query.connectedAccounts.findFirst({
      where: and(
        eq(connectedAccounts.id, id),
        eq(connectedAccounts.userId, session.user.id)
      ),
    });

    if (!account) {
      return NextResponse.json({ message: "Account not found" }, { status: 404 });
    }

    let updateFields: any = {};

    if (action === "reauthenticate") {
      // Extend token expiry by another 5 days
      const extendedExpiry = new Date();
      extendedExpiry.setDate(extendedExpiry.getDate() + 5);

      updateFields = {
        status: "connected",
        tokenExpiresAt: extendedExpiry,
        accessTokenEnc: encryptToken(`mock-reauth-access-token-${account.platform}`),
        lastSyncedAt: new Date(),
      };
    } else {
      if (label !== undefined) updateFields.label = label;
      if (colorTag !== undefined) updateFields.colorTag = colorTag;
    }

    const [updated] = await db
      .update(connectedAccounts)
      .set(updateFields)
      .where(eq(connectedAccounts.id, id))
      .returning();

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Individual account PATCH error:", error);
    return NextResponse.json({ message: "Failed to modify account details" }, { status: 500 });
  }
}
