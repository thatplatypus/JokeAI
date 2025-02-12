import OpenAI from "openai";
import { NextResponse } from "next/server";


console.log("API Key available:", !!process.env.OPENAI_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {

    const { type, audience, instructions } = await request.json();

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
          content: "You are a comedian specialized in generating jokes. Be creative and avoid common, overused jokes. Keep responses concise and only include the joke itself. For general jokes without specific instructions, focus on creating original content rather than well-known jokes.",
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