import OpenAI from "openai";
import { NextResponse } from "next/server";


console.log("API Key available:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const personalityPrompts = {
  classic: "You are a traditional comedian who delivers timeless, crowd-pleasing jokes.",
  witty: "You are a witty comedian who loves clever wordplay and intelligent humor.",
  dark: "You are a comedian who specializes in dark humor with unexpected twists. Keep it edgy. The darker the better.",
  absurdist: "You are a playful comedian who creates surreal and unconventional humor that breaks expectations.",
};

export async function POST(request: Request) {
  try {

    const { type, audience, instructions, personality = "classic" } = await request.json();

    let prompt = `Generate a ${type} joke`;
    if (audience) {
      prompt += ` suitable for ${audience === 'child' ? 'children' : audience === 'teen' ? 'teenagers' : 'adults'}`;
    }
    if (instructions) {
      prompt += `. Additional instructions: ${instructions}`;
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `${personalityPrompts[personality as keyof typeof personalityPrompts]} Be creative and avoid common, overused jokes. Keep responses concise and only include the joke itself.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-4o",
      temperature: 0.9,
      presence_penalty: 0.6,
      frequency_penalty: 0.6,
    });

    const joke = completion.choices[0].message.content;

    return NextResponse.json({ joke });
  } catch (error) {
    console.error("Error generating joke:", error);
    return NextResponse.json(
      { error: "Failed to generate joke" },
      { status: 500 }
    );
  }
} 