import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(req: Request) {
  try {
    const { incomingMessage, keyword } = await req.json();

    if (!incomingMessage) {
      return NextResponse.json(
        { message: "Incoming message is required." },
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
              "You are an automated brand coordinator replying to client inquiries on IG/LinkedIn/Twitter. Output a friendly, professional response that replies to their inquiry. Keep it brief, conversational, and direct.",
          },
          {
            role: "user",
            content: `Suggest a reply to this DM: "${incomingMessage}" based on matching keyword/intent: "${keyword || "general inquiries"}".`,
          },
        ],
      });

      return NextResponse.json({ reply: response.choices[0].message.content });
    } else {
      let suggestedReply = "Hey there! Thanks so much for reaching out. We've received your message and our team will get back to you with all the details shortly! Have a great day! ✨";
      
      if (keyword && incomingMessage.toLowerCase().includes(keyword.toLowerCase())) {
        suggestedReply = `Hey! Thanks for expressing interest in our promo info. Here is the direct link you requested to access our resources! Let us know if you have any questions! 🚀`;
      }

      return NextResponse.json({ reply: suggestedReply });
    }
  } catch (error: any) {
    console.error("Auto DM Reply API error:", error);
    return NextResponse.json(
      { message: "Failed to generate AI auto-reply suggestions." },
      { status: 500 }
    );
  }
}
