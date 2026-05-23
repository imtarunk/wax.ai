import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();

    if (!niche) {
      return NextResponse.json(
        { message: "Niche parameter is required." },
        { status: 400 }
      );
    }

    if (openai) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are an expert short-form video strategist (TikTok/Reels/Shorts). Output an array of exactly 10 video ideas in JSON format. Each item must have: 'ideaText' (the core concept), 'hook' (first 3 seconds attention grabber), and 'script' (full voiceover narration up to 45 seconds).",
          },
          {
            role: "user",
            content: `Generate 10 trending short-form video ideas for the "${niche}" niche. Return in JSON format with a single key "ideas" containing the array of objects.`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const parsed = JSON.parse(response.choices[0].message.content || "{}");
      return NextResponse.json(parsed.ideas || []);
    } else {
      // High-quality mock response array
      const mockIdeas = Array.from({ length: 10 }).map((_, i) => ({
        ideaText: `Trending Theme #${i + 1} for ${niche.charAt(0).toUpperCase() + niche.slice(1)} Growth`,
        hook: `👉🏼 The absolute best trick for ${niche} that feels illegal to know!`,
        script: `[Visual: Quick cut showing current common mistakes in ${niche}]. Voiceover: "If you are trying to scale your ${niche} results, stop doing this traditional routine. Instead, implement this simple 3-step modern sequence..." [Visual: Demonstration of standard framework]. "Watch your engagement rates compound over the next 30 days!"`,
      }));

      return NextResponse.json(mockIdeas);
    }
  } catch (error: any) {
    console.error("Reel ideas API error:", error);
    return NextResponse.json(
      { message: "Failed to generate video concepts." },
      { status: 500 }
    );
  }
}
