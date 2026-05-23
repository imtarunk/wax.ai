import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const list = await db.query.posts.findFirst({
      where: eq(posts.userId, session.user.id),
      orderBy: [desc(posts.createdAt)],
    });

    const allPosts = await db.query.posts.findMany({
      where: eq(posts.userId, session.user.id),
      orderBy: [desc(posts.createdAt)],
    });

    return NextResponse.json(allPosts);
  } catch (error: any) {
    console.error("Posts GET error:", error);
    return NextResponse.json({ message: "Database query failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content, caption, platforms, scheduledAt, status, hook, hashtags } = await req.json();

    if (!content || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { message: "Post content and target platforms are required" },
        { status: 400 }
      );
    }

    const [newPost] = await db
      .insert(posts)
      .values({
        userId: session.user.id,
        content,
        caption,
        platforms,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: status || "scheduled",
        hook,
        hashtags,
      })
      .returning();

    return NextResponse.json(newPost);
  } catch (error: any) {
    console.error("Posts POST error:", error);
    return NextResponse.json({ message: "Database insertion failed" }, { status: 500 });
  }
}
