import { NextRequest, NextResponse } from "next/server";
import { analyzeBusinessCard } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  const { image } = await request.json();

  if (!image) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  try {
    const result = await analyzeBusinessCard(image);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error analyzing business card:", error);
    return NextResponse.json(
      { error: "Failed to analyze business card" },
      { status: 500 }
    );
  }
}
