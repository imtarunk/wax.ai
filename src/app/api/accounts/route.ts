import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { connectedAccounts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { encryptToken } from "@/lib/crypto";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const list = await db.query.connectedAccounts.findMany({
      where: eq(connectedAccounts.userId, session.user.id),
      orderBy: [desc(connectedAccounts.createdAt)],
    });

    return NextResponse.json(list);
  } catch (error: any) {
    console.error("Accounts GET error:", error);
    return NextResponse.json({ message: "Database query failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { platform, username, avatarUrl, label, colorTag, followerCount } = await req.json();

    if (!platform || !username) {
      return NextResponse.json(
        { message: "Platform and username are required fields" },
        { status: 400 }
      );
    }

    // Encrypt some mock credentials representing OAuth tokens
    const accessMock = encryptToken(`mock-access-token-for-${platform}-${username}`);
    const refreshMock = encryptToken(`mock-refresh-token-for-${platform}-${username}`);
    
    // Set token to expire in exactly 5 days (120 hours) for typical demo health status
    const fiveDaysFromNow = new Date();
    fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

    const [newAccount] = await db
      .insert(connectedAccounts)
      .values({
        userId: session.user.id,
        platform,
        username,
        avatarUrl: avatarUrl || `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 100000)}?v=4`,
        accessTokenEnc: accessMock,
        refreshTokenEnc: refreshMock,
        tokenExpiresAt: fiveDaysFromNow,
        followerCount: followerCount || Math.floor(Math.random() * 50000) + 1200,
        status: "connected",
        label: label || `${platform.toUpperCase()} Premium Account`,
        colorTag: colorTag || "#7C3AED",
        lastSyncedAt: new Date(),
        rateLimitUsed: 12,
        rateLimitMax: 200,
      })
      .returning();

    return NextResponse.json(newAccount);
  } catch (error: any) {
    console.error("Accounts POST error:", error);
    return NextResponse.json({ message: "Database insertion failed" }, { status: 500 });
  }
}
