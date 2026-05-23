import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(req: Request) {
  try {
    const { description, tone } = await req.json();

    if (!description) {
      return NextResponse.json(
        { message: "Description/prompt is required." },
        { status: 400 }
      );
    }

    const promptTone = tone || "professional";

    if (openai) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are a premium social media copywriter and growth expert. Generate a high-converting caption, popular high-traffic hashtags, and a powerful scroll-stopping hook.",
          },
          {
            role: "user",
            content: `Create a social media caption for this description: "${description}" using a "${promptTone}" tone. Return JSON format with three fields: "hook", "caption", and "hashtags" (as a space-separated string).`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const parsed = JSON.parse(response.choices[0].message.content || "{}");
      return NextResponse.json(parsed);
    } else {
      // High-fidelity fallback simulated growth results
      const hooks = [
        "🚨 STOP SCROLLING! Here is what they don't tell you about this...",
        "Here is the exact framework I used to automate this in 10 minutes flat 👇🏼",
        "If you are not doing this in 2026, you are falling way behind the curve.",
      ];
      const captions = [
        `Automating tasks isn't just about saving time—it's about creating mental space for creative breakthroughs and high-leverage strategic moves. Doing this with a ${promptTone} approach changes everything! Let's get ahead together.`,
        `This is a complete game changer. Designing modern applications requires rapid iteration, clean state management, and highly adaptive micro-interactions. Applied with a perfect ${promptTone} layout.`,
      ];
      const hashtags = "#SocialMediaAutomation #AIContent #GrowthHacking #SaaSGrowth #TechInnovation #FutureOfWork";

      return NextResponse.json({
        hook: hooks[Math.floor(Math.random() * hooks.length)],
        caption: captions[Math.floor(Math.random() * captions.length)],
        hashtags,
      });
    }
  } catch (error: any) {
    console.error("Caption API error:", error);
    return NextResponse.json(
      { message: "Failed to generate AI captions." },
      { status: 500 }
    );
  }
}
